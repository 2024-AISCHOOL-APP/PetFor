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
    const [totalPosts, setTotalPosts] = useState(0); // 총 게시글 수를 관리할 상태
    const [pageGroup, setPageGroup] = useState(0);
    const buttonsPerGroup = 10;
    const postsPerPage = 6; // 페이지 당 게시물 수

    const fetchPosts = async (page) => {
        try {
            const response = await axios.post('/list/post', { page });
            const { posts, totalPosts } = response.data; // 서버에서 받은 데이터
            setPosts(posts); // 게시글 목록 업데이트
            setTotalPosts(totalPosts);
            setTotalPages(Math.ceil(totalPosts / postsPerPage)); // 총 페이지 수 계산
        } catch (error) {
            console.error('Error fetching post', error);
        }
    };
    
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const currentPage = parseInt(query.get('page')) || 1;
        setPage(currentPage);
        fetchPosts(currentPage);
        setPageGroup(Math.floor((currentPage - 1) / buttonsPerGroup)); // 페이지 그룹 업데이트
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

    const handleNextGroup = () => {
        if ((pageGroup + 1) * buttonsPerGroup < totalPages) {
            setPageGroup(pageGroup + 1);
        }
    };

    const handlePrevGroup = () => {
        if (pageGroup > 0) {
            setPageGroup(pageGroup - 1);
        }
    };

    const renderPageButtons = () => {
        const startPage = pageGroup * buttonsPerGroup + 1;
        const endPage = Math.min(startPage + buttonsPerGroup - 1, totalPages);
        const pageButtons = [];
        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`pagination-button ${i === page ? 'active' : ''}`}
                >
                    {i}
                </button>    
            );
        }
        return pageButtons;
    };

    return (
        <main className="community-container">
            <button className="write-post-button" onClick={goWritePost}>글 쓰기</button>
            <section className="posts">
                {posts.map((post, index) => {
                    const displayIdx = totalPosts - ((page - 1) * postsPerPage + index);
                    return (
                        <article 
                            key={post.community_idx} 
                            className="post"
                            onClick={() => goToPost(post.community_idx)}
                        >
                            <p className='indexNumber'>{displayIdx}</p>
                            <h3 className="post-title">{post.title}</h3>
                            <p className="post-author">{post.nickname}</p>
                        </article>
                    )})}
            </section>
            <section className="pagination">
                <button
                    onClick={handlePrevGroup}
                    disabled={pageGroup === 0}
                    className='pre'
                >
                    Previous
                </button>
                {renderPageButtons()}
                <button
                    onClick={handleNextGroup}
                    disabled={(pageGroup + 1) * buttonsPerGroup >= totalPages}
                    className='next'
                >
                    Next
                </button>
            </section>
        </main>
    );
};

export default Community;
