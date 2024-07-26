import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Community.css';
import axios from '../axios';

const Community = () => {
    const nav = useNavigate();
    const location = useLocation(); // 현재 페이지 번호 가져오기
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수를 관리할 상태

    const fetchPosts = async (page) => {
        try {
            const response = await axios.post('/list/post', { page });
            const { posts, totalPosts } = response.data; // 서버에서 받은 데이터
            setPosts(posts); // 게시글 목록 업데이트
            setTotalPages(Math.ceil(totalPosts / 6)); // 총 페이지 수 계산
        } catch (error) {
            console.error('Error fetching post', error);
        }
    };
    
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const currentPage = parseInt(query.get('page')) || 1;
        setPage(currentPage);
        fetchPosts(currentPage);
    }, [location.search]);

    useEffect(() => {
        sessionStorage.setItem('currentPage', page);
    }, [page]);

    const goWritePost = () => {
        nav('/writepost'); // 글쓰기 페이지로 이동
    };

    const goToPost = (communityIdx) => {
        nav(`/community-content/${communityIdx}`);
    };

    const handlePageChange = (newPage) => {
        nav(`/community?page=${newPage}`);
    };

    return (
        <main className="community-container">
            <button className="write-post-button" onClick={goWritePost}>글 쓰기</button>
            <section className="posts">
                {posts.map((post) => (
                    <article 
                        key={post.community_idx} 
                        className="post"
                        onClick={() => goToPost(post.community_idx)}
                    >
                        <p className='indexNumber'>{post.community_idx}</p>
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-author">{post.nickname}</p>
                    </article>
                ))}
            </section>
            <section className="pagination">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className='pre'
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className= {`pagination-button ${index + 1 === page ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className='next'
                >
                    Next
                </button>
            </section>
        </main>
    );
};

export default Community;
