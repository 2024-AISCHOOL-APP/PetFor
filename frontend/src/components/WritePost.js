import React, { useState,useEffect } from 'react';
 import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './WritePost.css';
import axios from '../axios';
import { AuthContext } from '../AuthContext';

const WritePost = () => {
    const nav = useNavigate();
    const { isLoggedIn, userId } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => { if (!isLoggedIn) { nav('/login'); } }, [isLoggedIn, nav]);
    const handleSubmit = async (e) => {
        try {
            const data = { userId : userId, title : title, content : content }
            e.preventDefault();
            const response = await axios.post('/list/writepost', data)
                                        .catch((error) => console.error('Error fetching businesses:', error));
            response.data.success
            ? nav('/community')
            : nav('/writepost')
        } catch (error) {
            console.error(error);
        }
    };
    const handleBack = () => { nav('/community'); };

    return (
        <div className="write-post-container">
            <button className="wri-back-button" onClick={handleBack}>←</button>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" id="title" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="input-group">
                    <textarea id="content" placeholder="내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <button type="submit" className="wri-submit-button">작성</button>
            </form>
        </div>
    );
};

export default WritePost;
