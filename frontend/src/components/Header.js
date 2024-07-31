import React,{useContext} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../AuthContext';

function Header() {
    const nav = useNavigate();
    const { isLoggedIn, nickname, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
        nav('/login');
    };

    return (
        <header className="header">
            <div className="auth-links">
                {isLoggedIn ? (
                    <div>
                        <span> {nickname}님</span>
                        <Link to="/login" onClick={handleLogout}>로그아웃</Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
