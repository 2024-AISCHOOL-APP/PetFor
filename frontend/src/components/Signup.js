import React from 'react';
// import { useState } from 'react';
import { useContext } from 'react';
import './Signup.css';
import axios from '../axios';
import {useNavigate} from 'react-router-dom';
import { UserInfo } from '../UserInfo';

function Signup() {
    const {userId, setUserId, userPw, setUserPw, userNickname, setUserNickname, userProfile, userType} = useContext(UserInfo);
    const nav = useNavigate();

    // const [form, setForm] = useState({
    //     userPw: '',
    //     confirmPassword: ''
    // });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('/user/handleSignUp', {
                userId : userId,
                userPw : userPw,
                userNickname : userNickname,
                userProfile : userProfile,
                userType : userType
            })
            console.log(response.data.success);
            response.data.success
            ? nav('/login')
            : nav('/signup')
        } catch(error) {
            console.error(error);
        }
    };

    const passwordCheck = () => {
        // 비밀번호 중복 확인
    };

    return (
      <main className="signup-container">
        <form onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <label htmlFor="id">아이디</label>
            <input type="text" id="id" name="userId"
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디를 입력하세요."
              required />
            {/* <button type="button"
              onClick={() => handleCheckDuplicate("아이디")}>
              중복확인
            </button> */}
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" name="userPw"
            //   value={form.userPw}
              onChange={e=>setUserPw(e.target.value)}
              placeholder="비밀번호를 입력하세요."
              required />
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input type="password" id="confirmPassword" name="confirmPassword"
            //   value={form.confirmPassword}
              onChange={passwordCheck}
              placeholder="비밀번호를 다시 입력하세요."
              required />
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <input type="text" id="nickname" name="userNickname"
              onChange={e=>setUserNickname(e.target.value)}
              placeholder="닉네임을 입력하세요."
              required />
            {/* <button type="button">중복확인</button> */}
          </fieldset>
          <button type="submit" className="signUp-submit-button">
            회원가입
          </button>
        </form>
      </main>
    );
}

export default Signup;
