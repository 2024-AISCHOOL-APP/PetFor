import React, { useEffect, useState } from 'react';
import { useLocation , Link} from 'react-router-dom';
import './SearchResults.css';
import axios from '../axios';

const SearchResults = () => {
    const location = useLocation();
    const [categories, setCategories] = useState({ category1: '', category2: '' });
    const [searches, setSearches] = useState([]);
  
    
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const category1 = queryParams.get('category1');
        const category2 = queryParams.get('category2');
    
        setCategories({ category1, category2 });
    }, [location.search]);

    useEffect(() => {
        if (categories.category1 && categories.category2) {
            axios.get(`/search/searchpage?keyword1=${categories.category1}&keyword2=${categories.category2}`)
                .then((response) => setSearches(response.data))
                .catch((error) => console.error('Error fetching searches:', error));
        }
    }, [categories]);
    const splitString = (str) => str.split('/').map((part, index) => <p key={index}>● {part.trim()}</p>);
    return (
        <main className="search-results-container">
            <h2>{categories.category1} ({categories.category2})</h2>
            <section className="results-list">
                {searches.map((searching, index) => (
                    <article key={index} className="searching-item">
                        
                        <div className='content-container'>
                            <h2>증상</h2>{splitString(searching.symptom)}
                        </div>
                        <div className='content-container'>
                            <h2>원인</h2>
                            <div>{splitString(searching.cause)}</div>
                        </div>
                        <div className='content-container'>
                            <h2>해결 방안</h2>
                            <div>{splitString(searching.solution)}</div>
                        </div>
                        
                    </article>
                ))}
            </section>
            <p >추가 정보 필요 시 채팅을 통해 전문가 연결</p>
            <nav className="chat_button">
                <Link to="/chat" className="button">전문가 채팅 연결</Link>
            </nav>
        </main>
        
    );
};

export default SearchResults;
