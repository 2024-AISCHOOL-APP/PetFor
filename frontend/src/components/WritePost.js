import React, { useState,useEffect } from 'react';
 import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './WritePost.css';
//import { UserInfo } from '../UserInfo';
import axios from '../axios';
import { AuthContext } from '../AuthContext'; // AuthContext import

const WritePost = () => {
    // const { userId } = useContext(UserInfo);
    //const userId = 'test'; // 로그인 기능 구현 시 변경
    const { isLoggedIn, userId } = useContext(AuthContext); // AuthContext에서 로그인 상태와 userId 가져오기
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            nav('/login'); // 로그인하지 않은 경우 로그인 페이지로 이동
        }
    }, [isLoggedIn, nav]);


    const handleSubmit = async (e) => {
        try {
            const data = {
                userId : userId,
                title : title,
                content : content
            }
            e.preventDefault();
            const response = await axios.post('/list/writepost', data)
                                        .catch((error) => console.error('Error fetching businesses:', error));
            console.log(response.data.success);
            response.data.success
            ? nav('/community')
            : nav('/writepost')
        } catch (error) {
            console.error(error);
        }
    };

    const handleBack = () => {
        nav('/community');
    };

    return (
        <div className="write-post-container">
            <button className="wri-back-button" onClick={handleBack}>←</button>
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
                <button type="submit" className="wri-submit-button">작성</button>
            </form>
        </div>
    );
};

export default WritePost;
