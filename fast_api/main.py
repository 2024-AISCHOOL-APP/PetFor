from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from llama_cpp import Llama
from transformers import AutoTokenizer
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

orig_backends = [
    "http://localhost:3000",  # React 앱의 주소
]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=orig_backends,  # 허용할 도메인
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    prompt: str

model_id = 'MLP-KTLim/llama-3-Korean-Bllossom-8B-gguf-Q4_K_M'
tokenizer = AutoTokenizer.from_pretrained(model_id)

# 모델 파일의 정확한 경로를 지정합니다.
model_path = './llama-3-Korean-Bllossom-8B-Q4_K_M.gguf'  # 정확한 경로로 변경

model = Llama(
    model_path=model_path,
    n_ctx=512,
    n_gpu_layers=-1  # Number of model layers to offload to GPU
)

PROMPT = '''당신은 유용한 AI 어시스턴트입니다. 사용자의 질의에 대해 친절하고 정확하게 답변해야 합니다.
    You are a helpful AI assistant, you'll need to answer users' queries in a friendly and accurate manner.'''

def extract_text_from_response(response):
    if isinstance(response, dict) and 'choices' in response:
        if len(response['choices']) > 0:
            choice = response['choices'][0]
            if 'text' in choice:
                text = choice['text']
                # 'assistant\n' 이후의 텍스트만 추출
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
        # 프롬프트 생성
        prompt = tokenizer.apply_chat_template(
            messages,
            tokenize=False, # False
            add_generation_prompt=True
        )

        # 중복된 리딩 텍스트 제거
        prompt = prompt.replace("\n\n", "\n")

        print(f"Generated prompt: {prompt}")

        # 모델 인퍼런스
        generation_kwargs = {
            "max_tokens": 1024,
            "stop": ["<|eot_id|>"],
            "top_p": 0.9,
            "temperature": 0.6,
            "echo": False,  # Echo the prompt in the output
        }
        
        response = model(prompt, **generation_kwargs)
        
        # 응답 구조 출력
        print("Raw Model response:")
        print(response)
        
        # 응답에서 생성된 텍스트 추출
        response_text = extract_text_from_response(response)
        
        if response_text is None:
            response_text = "모델이 응답을 생성하지 않았습니다."
        
        return {"response": response_text}
    
    except Exception as e:
        print(f"Error during model inference: {e}")
        raise HTTPException(status_code=500, detail="서버 내부 오류")



if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8500, reload=True)