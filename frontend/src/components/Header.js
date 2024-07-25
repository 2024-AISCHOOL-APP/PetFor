import React,{useContext} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../AuthContext';


function Header() {
    const { isLoggedIn, nickname, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
    };

    return (
        <header className="header">
            <div className="auth-links">
                 {isLoggedIn ? (
                   <>
                   <span> {nickname}님</span> {/* 사용자 ID 표시 */}
                   <Link  to="/login" onClick={handleLogout}>로그아웃</Link>
                   <Link  to="/signup">회원가입</Link>
               </>
                ) : (
                    <>
                        <Link  to="/login">로그인</Link>
                        <Link  to="/signup">회원가입</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
