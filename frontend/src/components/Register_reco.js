import React, { useContext, useEffect, useState } from 'react';
import './Register_reco.css';
import axios from '../axios';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Register_reco = () => {
    const { userId, isLoggedIn } = useContext(AuthContext);
    const [chatUsers, setChatUsers] = useState([]);
    const [nonChatUsers, setNonChatUsers] = useState([]);
    const nav = useNavigate();
    const data = { userId : userId };

    useEffect(() => {
        if (!isLoggedIn) {
            nav('/login'); // 로그인하지 않은 경우 로그인 페이지로 이동
        }
    }, [isLoggedIn, nav]);

    useEffect(() => {
        axios.post('/chat/list', data)
            .then((response) => {
                const { chatUsers, nonChatUsers } = response.data;
                setChatUsers(chatUsers);
                setNonChatUsers(nonChatUsers);
            })
            .catch((error) => console.error('Error fetching chat list', error));
    }, [userId]);

    const goChatting = async (person) => {
        nav('/chatting', { state: { senderId: userId, receiverId: person.user.user_id, chatIdx: person.chat_idx[0] } });
    };

    return (
        <main className="recommand-chatlist-container">
            <section className="recommand-chat-section">
                <h2>채팅 목록</h2>
                <ul className="recommand-chat-list">
                    {chatUsers.map((person, index) => (
                        <li key={index} className="recommand-chat-item" onClick={()=>{goChatting(person)}}>
                            <img src={person.user.user_profile} alt={person.user.nickname} className="chat-img" />
                            <span>{person.user.nickname}</span>
                        </li>
                    ))}
                </ul>
            </section>
            
            <section className="recommand-chat-section">
                <h2>추천 업체</h2>
                <ul className="recommand-chat-list">
                    {nonChatUsers.map((person, index) => (
                        <li key={index} className="recommand-chat-item">
                            <img src={person.user.user_profile} alt={person.user.nickname} className="chat-img" />
                            <span>{person.user.nickname}</span>
                        </li>
                    ))}
                </ul>
            </section>
            
        </main>
    );
};

export default Register_reco;
