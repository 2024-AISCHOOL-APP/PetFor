import React, { useState } from 'react';
import axios from '../axios';
import './ChatBot.css';

const ChatBot = () => {
  const [query, setQuery] = useState('');
  const [queries, setQueries] = useState([]); // 추가: queries 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (currentQuery) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/search/searching', { prompt: currentQuery });
      console.log('서버 응답:', res.data); // 응답 데이터 로그
      setQueries(prevQueries => [...prevQueries, { query: currentQuery, response: res.data.response.replace(/\n/g, '<br />') }]); // 수정: 새로운 질문과 응답 추가
    } catch (err) {
      setError('검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      handleSearch(query);
      setQuery('');
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">펫포 쳇봇</div>
      <div className="chatbot-body">
        <form className="chatbot-box" onSubmit={handleSubmit}>
          {queries.map((item, index) => (
            <div key={index} className="chatbot-response">
              <h2>질문:</h2>
              <p>{item.query}</p>
              <h2>검색 결과:</h2>
              <p dangerouslySetInnerHTML={{ __html: item.response }}></p>
            </div>
          ))}
           {loading && <h4>검색 중...잠시만 기다려주세요</h4>}
           {error && <p className="error">{error}</p>}
          <input
            className="chatbotInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="질문을 입력하세요..."
          />
          <input type="submit" className="chatbotSubmit" value="전송" disabled={loading} />
        </form>
      </div>
    </div>
  );
};

export default ChatBot;