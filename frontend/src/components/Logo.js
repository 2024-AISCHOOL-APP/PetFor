import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

function Logo() {
    return (
        <div className="logo">
            <Link to="/">
                <img src="/images/logo.png" alt="PET For Logo" className="logo-image" />
            </Link>
        </div>
    );
}

export default Logo;




