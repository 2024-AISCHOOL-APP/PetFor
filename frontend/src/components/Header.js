import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="auth-links">
                <Link to="/login">로그인</Link>
                <Link to="/signup">회원가입</Link>
            </div>
        </header>
    );
}

export default Header;
