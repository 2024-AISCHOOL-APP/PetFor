import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './CommunityContent.css';
import axios from '../axios';
import { AuthContext } from '../AuthContext';

const CommunityContent = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 포스트 ID를 가져옴
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`/list/post/${id}`)
            .then((response) => {
                setPost(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching post details', error);
                setError('Failed to load post details');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!post) {
        return <p>Post not found</p>;
    }

    const handleBackClick = () => {
        navigate('/community');
    };

    const handleDeleteClick = () => {
        axios.delete(`/list/post/${id}`, { data: { userId } })
            .then((response) => {
                if (response.data.success) {
                    navigate('/community');
                } else {
                    alert('자신의 글만 삭제 가능합니다');
                }
            })
            .catch((error) => {
                console.error('Error deleting post', error);
                alert('자신의 글만 삭제 가능합니다');
            });
    };

    const handleUpdateClick = () => {
        // 작성자 확인
        if (post.user_id !== userId) {
            alert('자신의 글만 수정 가능합니다');
        } else {
            navigate(`/updatepost/${id}`);
        }
    };

    return (
        <main className="community-content-container">
            <section className="posting-box">
                <button className="community-method-back-button" onClick={handleBackClick}>←</button>
                <article className="content-item">
                    <div className='titleBox'>
                        <h3 className='title'>{post.title}</h3>
                        <h3 className='userId'>작성자 : {post.nickname}</h3>
                    </div>
                    <div className='content'>{post.content}</div>
                </article>
                <div className='changeBox'>
                    <button className='deleteBtn' onClick={handleDeleteClick}>삭제</button>
                    <button className='updateBtn' onClick={handleUpdateClick}>수정</button>
                </div>
            </section>
        </main>
    );
};

export default CommunityContent;
