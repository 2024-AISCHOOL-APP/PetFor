import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Updatepost.css';
import axios from '../axios';
import { AuthContext } from '../AuthContext';

const UpdatePost = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const { isLoggedIn, userId } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (!isLoggedIn) {
            nav('/login');
        } else {
            axios.get(`/list/post/${id}`)
                .then((response) => {
                    setTitle(response.data.title);
                    setContent(response.data.content);
                })
                .catch((error) => {
                    console.error('Error fetching post details', error);
                });
        }
    }, [isLoggedIn, nav, id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { userId: userId, title: title, content: content };
            const response = await axios.put(`/list/post/${id}`, data);
            if (response.data.success) {
                nav('/community');
            } else {
                console.error('Failed to update the post');
                alert('글 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };
    const handleBack = () => { nav('/community'); };

    return (
        <div className="write-post-container">
            <button className="update-back-button" onClick={handleBack}>←</button>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" id="title" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="input-group">
                    <textarea id="content" placeholder="내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <button type="submit" className="up-submit-button">수정</button>
            </form>
        </div>
    );
};

export default UpdatePost;
