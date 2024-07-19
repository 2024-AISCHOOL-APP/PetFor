import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Community.css';

const Community = () => {
    const posts = [
        { title: '강아지 자랑', author: '임재환' },
        { title: '저희집 강아지 상태좀 봐주세요', author: '임은영' },
        { title: '금요일 회식', author: '임재환' },
        { title: '오늘 크로스핏 미친놈임', author: '임재환' },
        { title: 'DB빨리 뽑아주세요', author: '임재환' },
        { title: '시험봐야해서 바빠요', author: '임재환' },
        { title: '멘탈 나감', author: '임재환' },
        { title: '멘탈 나감', author: '임재환' },
        { title: '멘탈 나감', author: '임재환' },
        
    ];

    const navigate = useNavigate();

    const handleWritePost = () => {
        navigate('/writepost'); // 글쓰기 페이지로 이동
    };

    return (
        <main className="community-container">
            <button className="write-post-button" onClick={handleWritePost}>글 쓰기</button>
            <section className="posts">
                {posts.map((post, index) => (
                    <article key={index} className="post">
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-author">{post.author}</p>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default Community;
