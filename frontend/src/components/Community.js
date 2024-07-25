import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Community.css';
import axios from '../axios';

const Community = () => {
    const nav = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        axios.post('/list/post')
            .then((response)=>setPosts(response.data))
            .catch((error)=>console.error('Error fetching post', error));
    }, [])

    const goWritePost = () => {
        nav('/writepost'); // 글쓰기 페이지로 이동
    };

    const goToPost = (communityIdx) => {
        nav(`/community-content/${communityIdx}`);
    };

    return (
        <main className="community-container">
            <button className="write-post-button" onClick={goWritePost}>글 쓰기</button>
            <section className="posts">
                {posts.map((post, index) => (
                     <article 
                     key={post.community_idx} 
                     className="post"
                     onClick={() => goToPost(post.community_idx)}
                     
                 >
                        <p className='indexNumber'>{post.community_idx}</p> 
                        {/* 여기 인덱스 번호도 디자인 만들어 주세요 */}
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-author">{post.user_id}</p>
                    </article>
                    
                ))}
            </section>
        </main>
    );
};

export default Community;
