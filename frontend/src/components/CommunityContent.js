import React, { useEffect, useState } from 'react';
import { useNavigate,useParams} from 'react-router-dom';
import './CommunityContent.css';
import axios from '../axios';


const CommunityContent = () => {
   
    const navigate = useNavigate();
    
    const { id } = useParams(); // URL에서 포스트 ID를 가져옴
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가

    useEffect(() => {
        axios.get(`/list/post/${id}`) // 백엔드에서 포스트 세부 정보 가져오기
        .then((response) => {
            setPost(response.data);
            setLoading(false); // 데이터 로딩 완료 시 로딩 상태를 false로 설정
        })
        .catch((error) => {
            console.error('Error fetching post details', error);
            setError('Failed to load post details'); // 에러 상태 설정
            setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
        });
}, [id]);

if (loading) {
    return <p>Loading...</p>; // 로딩 중일 때 표시
}

if (error) {
    return <p>{error}</p>; // 에러 발생 시 표시
}

if (!post) {
    return <p>Post not found</p>; // 포스트가 없는 경우 표시
}

const handleBackClick = () => {
    navigate('/community');
};

    
    return (
        <main className="community-content-container">
            
            <section className="results-list">
                
            <button className="community-method-back-button" onClick={handleBackClick}>←</button>
                
                    <article className="content-item">
                    <div className='titleBox'><h3 className='title'>{post.title}</h3><h3 className='userId'>작성자 : {post.user_id}</h3></div>
                    
                        <div className='content'>{post.content}</div>
                    </article>
                
            </section>
            
        </main>
        
    );
};

export default CommunityContent;
