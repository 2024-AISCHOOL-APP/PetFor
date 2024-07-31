from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from llama_cpp import Llama
from transformers import AutoTokenizer
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
import pandas as pd
import mysql.connector
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from config import DB_CONFIG

## 모델명 : MLP-KTLim/llama-3-Korean-Bllossom-8B-gguf-Q4_K_M

app = FastAPI()

orig_backends = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Query(BaseModel):
    prompt: str

model_id = 'MLP-KTLim/llama-3-Korean-Bllossom-8B-gguf-Q4_K_M'
tokenizer = AutoTokenizer.from_pretrained(model_id)
model_path = './llama-3-Korean-Bllossom-8B-Q4_K_M.gguf'
model = Llama(
    model_path=model_path,
    n_ctx=512,
    n_gpu_layers=-1
)
PROMPT = '''당신은 유용한 AI 어시스턴트입니다. 사용자의 질의에 대해 친절하고 정확하게 답변해야 합니다.
    You are a helpful AI assistant, you'll need to answer users' queries in a friendly and accurate manner.
    너무 길지 않게 그리고 빠르게 답변해야 합니다.
    You should make answer fast.'''

def extract_text_from_response(response):
    if isinstance(response, dict) and 'choices' in response:
        if len(response['choices']) > 0:
            choice = response['choices'][0]
            if 'text' in choice:
                text = choice['text']
                split_text = text.split('assistant\n', 1)
                if len(split_text) > 1:
                    return split_text[1].strip().replace("\n", "\n")
                return text.strip().replace("\n", "\n")
    return None

@app.post("/generate")
async def generate_response(query: Query):
    messages = [
        {"role": "system", "content": PROMPT},
        {"role": "user", "content": query.prompt}
    ]
    try:
        prompt = tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True
        )
        prompt = prompt.replace("\n\n", "\n")
        generation_kwargs = {
            "max_tokens": 1024,
            "stop": ["<|eot_id|>"],
            "top_p": 0.9,
            "temperature": 0.6,
            "echo": False,
        }
        response = model(prompt, **generation_kwargs)
        response_text = extract_text_from_response(response)
        if response_text is None:
            response_text = "모델이 응답을 생성하지 않았습니다."
        return {"response": response_text}
    except Exception as e:
        print(f"Error during model inference: {e}")
        raise HTTPException(status_code=500, detail="서버 내부 오류")

@app.post("/recommendations")
async def get_recommendations(request: Request):
    try:
        body = await request.json()
        user_id = body["user_id"]
    except KeyError:
        raise HTTPException(status_code=422, detail="user_id field is required")
    except json.JSONDecodeError:
        raise HTTPException(status_code=422, detail="Invalid JSON")
    conn = mysql.connector.connect(
        host=DB_CONFIG['host'],
        user=DB_CONFIG['user'],
        password=DB_CONFIG['password'],
        database=DB_CONFIG['database'],
        port=DB_CONFIG['port']
    )
    cursor = conn.cursor()
    cursor.execute("SELECT user_location FROM user WHERE user_id = %s", (user_id,))
    user_location = cursor.fetchone()
    if user_location is None:
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")
    user_location = user_location[0]
    query = "SELECT * FROM register"
    df = pd.read_sql(query, conn)
    filtered_df = df[df['location'] == user_location]
    if 'store_name' not in filtered_df.columns:
        filtered_df['store_name'] = ''
    filtered_df['description'] = filtered_df['store_name'] + " provides excellent services for pets."
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(filtered_df['description'])
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    ratings_dict = {
        "user_id": [1, 2, 3, 1, 2, 3],
        "store_id": [1, 2, 3, 4, 5, 6],
        "rating": [5, 4, 4, 3, 5, 3],
    }
    df_ratings = pd.DataFrame(ratings_dict)
    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(df_ratings[['user_id', 'store_id', 'rating']], reader)
    trainset, testset = train_test_split(data, test_size=0.25)
    model_cf = SVD()
    model_cf.fit(trainset)

    def hybrid_recommendations(user_id, df, cosine_sim, model_cf, top_n=10):
        df['price_score'] = df['average_price'].max() - df['average_price']
        df['open_score'] = df['24hour_open'].apply(lambda x: 1 if x else 0)
        scaler = MinMaxScaler()
        df[['price_score', 'open_score']] = scaler.fit_transform(df[['price_score', 'open_score']])
        df['final_score'] = df['price_score'] * 0.5 + df['open_score'] * 0.5
        content_scores = cosine_sim[df.index.to_series().map(df.index.get_loc)].sum(axis=1)
        df['content_score'] = content_scores
        df['cf_score'] = df.index.map(lambda x: model_cf.predict(user_id, x % len(df_ratings)).est)
        df['hybrid_score'] = df['final_score'] + df['content_score'] + df['cf_score']
        recommended_stores = df.nlargest(top_n, 'hybrid_score')
        return recommended_stores[['user_id', 'store_name', 'location', 'average_price', '24hour_open', 'hybrid_score']]

    recommended_stores = hybrid_recommendations(user_id, filtered_df, cosine_sim, model_cf)
    conn.close()
    return {"recommendations": recommended_stores.to_dict(orient='records')}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8500, reload=True)