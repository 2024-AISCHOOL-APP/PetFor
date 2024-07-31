import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Community.css';
import axios from '../axios';

const Community = () => {
    const nav = useNavigate();
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [pageGroup, setPageGroup] = useState(0);
    const buttonsPerGroup = 10;
    const postsPerPage = 6;

    const fetchPosts = async (page) => {
        try {
            const response = await axios.post('/list/post', { page });
            const { posts, totalPosts } = response.data;
            setPosts(posts);
            setTotalPosts(totalPosts);
            setTotalPages(Math.ceil(totalPosts / postsPerPage));
        } catch (error) {
            console.error('Error fetching post', error);
        }
    };
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const currentPage = parseInt(query.get('page')) || 1;
        setPage(currentPage);
        fetchPosts(currentPage);
        setPageGroup(Math.floor((currentPage - 1) / buttonsPerGroup));
    }, [location.search]);
    useEffect(() => { sessionStorage.setItem('currentPage', page); }, [page]);
    const goWritePost = () => { nav('/writepost'); };
    const goToPost = (communityIdx) => { nav(`/community-content/${communityIdx}`); };
    const handlePageChange = (newPage) => { nav(`/community?page=${newPage}`); };
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
                <button key={i} onClick={() => handlePageChange(i)} className={`pagination-button ${i === page ? 'active' : ''}`}>{i}</button>    
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
                        <article key={post.community_idx} className="post" onClick={() => goToPost(post.community_idx)}>
                            <p className='indexNumber'>{displayIdx}</p>
                            <h3 className="post-title">{post.title}</h3>
                            <p className="post-author">{post.nickname}</p>
                        </article>
                    )})}
            </section>
            <section className="pagination">
                <button onClick={handlePrevGroup} disabled={pageGroup === 0} className='pre'>Previous</button>
                {renderPageButtons()}
                <button onClick={handleNextGroup} disabled={(pageGroup + 1) * buttonsPerGroup >= totalPages} className='next'>Next</button>
            </section>
        </main>
    );
};

export default Community;
