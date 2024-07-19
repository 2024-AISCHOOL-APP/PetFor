import React, { useState } from 'react';
// import { useContext } from 'react';
import './Signup.css';
// import axios from '../axios';
// import {useNavigate} from 'react-router-dom';
// import { UserInfo } from '../UserInfo';

function Signup() {
    // const {} = useContext(UserInfo);
    // const nav = useNavigate();
    const [form, setForm] = useState({
        id: '',
        password: '',
        confirmPassword: '',
        nickname: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // const response = await axios.post('/user/handleSignUp', {
            //     // userId : id,
            //     // UserPw : userPw,
            //     // NickName : nickname
            // })
            // console.log(response.data.success);
            // response.data.success
            // ? nav('/')
            // : nav('/home')
        } catch(error) {
            console.error(error);
        }
        // 회원가입 로직 처리
        console.log('Form data:', form);
    };

    const handleCheckDuplicate = (field) => {
        // 중복 확인 로직 처리
        console.log(`${field} 중복 확인`);
    };

    return (
        <main className="signup-container">
            <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                    <label htmlFor="id">아이디</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={form.id}
                        onChange={handleChange}
                        placeholder="아이디를 입력하세요."
                        required
                    />
                    <button type="button" onClick={() => handleCheckDuplicate('아이디')}>
                        중복확인
                    </button>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
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
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="비밀번호를 입력하세요."
                        required
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="nickname">닉네임</label>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={form.nickname}
                        onChange={handleChange}
                        placeholder="닉네임을 입력하세요."
                        required
                    />
                    <button type="button" onClick={() => handleCheckDuplicate('닉네임')}>
                        중복확인
                    </button>
                </fieldset>
                <button type="submit" className="submit-button">Join Us!</button>
            </form>
        </main>
    );
}

export default Signup;
