import React, { useState, useContext } from 'react';
import './Signup.css';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from '../UserInfo';

function Signup() {
    const { userId, setUserId, userPw, setUserPw, userNickname, setUserNickname, userProfile, userType } = useContext(UserInfo);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(null); // 비밀번호 일치 여부 상태
    const [isDuplicate, setIsDuplicate] = useState(null); // 아이디 중복 여부 상태
    const [userLocation, setUserLocation] = useState('서울특별시'); // 지역 정보 상태
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userPw !== confirmPassword) {
            setPasswordMatch(false);
            return;
        }
        try {
            const response = await axios.post('/user/handleSignUp', {
                userId: userId,
                userPw: userPw,
                userNickname: userNickname,
                userProfile: userProfile,
                userType: userType,
                userLocation: userLocation // 추가된 부분
            });
            console.log(response.data.success);
            response.data.success ? nav('/login') : nav('/signup');
        } catch (error) {
            console.error(error);
        }
    };

    const CheckDuplicate = async () => {
        // 아이디 중복확인
        try {
            const response = await axios.post('/user/checkDuplicate', { userId });
            setIsDuplicate(response.data.isDuplicate);
        } catch (error) {
            console.error('Error checking duplicate ID', error);
        }
    };

    const passwordCheck = (e) => {
        // 비밀번호 중복 확인
        setConfirmPassword(e.target.value);
        setPasswordMatch(e.target.value === userPw);
    };

    return (
        <main className="signup-container">
            <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                    <label htmlFor="id">아이디</label>
                    <input
                        type="text"
                        id="id"
                        name="userId"
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="아이디를 입력하세요."
                        required
                    />
                    <button type="button" onClick={CheckDuplicate} className="duplicate">
                        중복확인
                    </button>
                </fieldset>
                {isDuplicate === true && (
                    <p className="error-message">아이디가 중복됩니다</p>
                )}
                {isDuplicate === false && (
                    <p className="success-message">아이디를 사용할 수 있습니다</p>
                )}
                <fieldset className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="userPw"
                        className="signup-input"
                        onChange={(e) => setUserPw(e.target.value)}
                        placeholder="비밀번호를 입력하세요."
                        required
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="signup-input"
                        onChange={passwordCheck}
                        placeholder="비밀번호를 다시 입력하세요."
                        required
                    />
                </fieldset>
                {passwordMatch === false && (
                    <p className="error-message">비밀번호가 일치하지 않습니다</p>
                )}
                {passwordMatch === true && (
                    <p className="success-message">비밀번호가 일치합니다</p>
                )}
                <fieldset className="form-group">
                    <label htmlFor="nickname">닉네임</label>
                    <input
                        type="text"
                        id="nickname"
                        name="userNickname"
                        onChange={(e) => setUserNickname(e.target.value)}
                        placeholder="닉네임을 입력하세요."
                        required
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="location">지역</label>
                    <select
                        id="location"
                        name="userLocation"
                        value={userLocation}
                        onChange={(e) => setUserLocation(e.target.value)}
                        required
                    >
                        <option value="서울특별시">서울특별시</option>
                        <option value="인천광역시">인천광역시</option>
                        <option value="경기도">경기도</option>
                        <option value="대전광역시">대전광역시</option>
                        <option value="세종특별자치시">세종특별자치시</option>
                        <option value="충청북도">충청북도</option>
                        <option value="충청남도">충청남도</option>
                        <option value="광주광역시">광주광역시</option>
                        <option value="전라북도">전라북도</option>
                        <option value="전라남도">전라남도</option>
                        <option value="부산광역시">부산광역시</option>
                        <option value="대구광역시">대구광역시</option>
                        <option value="울산광역시">울산광역시</option>
                        <option value="경상북도">경상북도</option>
                        <option value="경상남도">경상남도</option>
                        <option value="강원도">강원도</option>
                        <option value="제주특별자치도">제주특별자치도</option>
                    </select>
                </fieldset>
                <button type="submit" className="signUp-submit-button">
                    회원가입
                </button>
            </form>
        </main>
    );
}

export default Signup;
