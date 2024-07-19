import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WritePost.css';

const WritePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // 글쓰기 로직 처리
        console.log('Title:', title);
        console.log('Content:', content);
    };

    const handleBack = () => {
        navigate('/community');
    };

    return (
        <div className="write-post-container">
            <button className="back-button" onClick={handleBack}>←</button>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        id="title"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <textarea
                        id="content"
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">작성</button>
            </form>
        </div>
    );
};

export default WritePost;
