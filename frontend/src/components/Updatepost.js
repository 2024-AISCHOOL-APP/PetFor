import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Updatepost.css';
import axios from '../axios';
import { AuthContext } from '../AuthContext';

const UpdatePost = () => {
    const { isLoggedIn, userId } = useContext(AuthContext);
    const { id } = useParams(); // URL에서 포스트 ID를 가져옴
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        console.log('Post ID from URL:', id); // 추가: id 값 출력
        if (!isLoggedIn) {
            nav('/login'); // 로그인하지 않은 경우 로그인 페이지로 이동
        } else {
            // 게시글 정보 불러오기
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
            const data = {
                userId: userId,
                title: title,
                content: content
            };
            console.log('Submitting data:', data); // 콘솔 로그 추가
            const response = await axios.put(`/list/post/${id}`, data);
            console.log('Response:', response.data); // 콘솔 로그 추가
            if (response.data.success) {
                console.log('Post updated successfully');
                nav('/community'); // 성공적으로 수정된 후 Community 페이지로 이동
            } else {
                console.error('Failed to update the post');
                alert('글 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleBack = () => {
        nav('/community');
    };

    return (
        <div className="write-post-container">
            <button className="update-back-button" onClick={handleBack}>←</button>
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
                <button type="submit" className="up-submit-button">수정</button>
            </form>
        </div>
    );
};

export default UpdatePost;
