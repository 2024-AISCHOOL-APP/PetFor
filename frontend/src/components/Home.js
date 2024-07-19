import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search?query=${searchQuery}`);
    };

    return (
        <main className="home">
            <nav className="buttons">
                <Link to="/register" className="button">등록 업체</Link>
                <Link to="/community" className="button">커뮤니티</Link>
                <Link to="/chat" className="button">채팅</Link>
            </nav>
            <section className="search-container">
                <input 
                    type="text" 
                    placeholder="검색" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
            </section>
        </main>
    );
}

export default Home;
