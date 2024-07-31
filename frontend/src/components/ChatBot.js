import React, { useState, useEffect, useRef } from 'react';
import axios from '../axios';
import './ChatBot.css';

const ChatBot = () => {
  const [query, setQuery] = useState('');
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatbotBodyRef = useRef(null);

  const handleSearch = async (currentQuery) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/search/searching', { prompt: currentQuery });
      setQueries(prevQueries => [...prevQueries, { query: currentQuery, response: res.data.response.replace(/\n/g, '<br />') }]);
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
  useEffect(() => {
    if (chatbotBodyRef.current) { chatbotBodyRef.current.scrollTop = chatbotBodyRef.current.scrollHeight; }
  }, [queries]);

  return (
    <div className="chatbot">
      <div className="chatbot-header">펫포 쳇봇</div>
      <div className="chatbot-body" ref={chatbotBodyRef}>
        <form className="chatbot-box" onSubmit={handleSubmit}>
          {queries.map((item, index) => (
            <div key={index} className="chatbot-response">
              <h2>질문:</h2>
              <p>{item.query}</p>
              <h2>검색 결과:</h2>
              <p dangerouslySetInnerHTML={{ __html: item.response }}></p>
            </div>
          ))}
          {loading && <h4 className='wait'>검색 중...잠시만 기다려주세요</h4>}
          {error && <p className="error">{error}</p>}
          <input className="chatbotInput" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="질문을 입력하세요..." />
          <input type="submit" className="chatbotSubmit" value="전송" disabled={loading} />
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
