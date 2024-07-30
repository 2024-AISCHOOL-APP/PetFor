import React, { useContext, useEffect, useState } from 'react';
import './Register_reco.css';
import axios from '../axios'; // axios 인스턴스 임포트
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Register_reco = () => {
    const { userId, isLoggedIn } = useContext(AuthContext);
    const [chatUsers, setChatUsers] = useState([]);
    const [nonChatUsers, setNonChatUsers] = useState([]);
    const nav = useNavigate();
    const data = { userId: userId };

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
// eslint-disable-next-line
    }, [userId]);

    useEffect(() => {
        axios.post('/chat/recommendations', data)
            .then((response) => {
                const recommendations = response.data.recommendations;
                setNonChatUsers(recommendations);
            })
            .catch((error) => console.error('Error fetching recommendations', error));
// eslint-disable-next-line
    }, [userId]);

    const goChatting = async (person) => {
        nav('/RegisterChat', { state: { senderId: userId, receiverId: person.user.user_id, chatIdx: person.chat_idx[0] } });
    };

    const newChatting = async (user_id) => {
        const existingChat = chatUsers.find(user => user.user.user_id === user_id);

        if (existingChat) {
            // 채팅방이 이미 존재하면 해당 채팅방으로 이동
            goChatting(existingChat);
        } else {
            // 채팅방이 존재하지 않으면 새 채팅방 생성
            const newChatData = {
                userId: userId,
                receiver: user_id
            };

            try {
                const response = await axios.post('/chat/newChatting', newChatData);
                if (response.data.success) {
                    // 새 채팅방 생성 성공 시 해당 채팅방으로 이동
                    nav('/RegisterChat', { state: { senderId: userId, receiverId: user_id, chatIdx: response.data.chatIdx } });
                }
            } catch (error) {
                console.error('Error creating new chat', error);
            }
        }

        // const newChatData = {
        //     userId: userId,
        //     receiver : user_id
        // }
        // const userIdcheck = chatUsers.find(user => user.user.user_id === userId);
        // if(userIdcheck === user_id){
        //     goChatting(chatUsers)
        // } else {
        //     const response = await axios.post('/chat/newChatting', newChatData)
        //     if (response.data.success){
        //         nav('/chatting', { state: { senderId: userId, receiverId: user_id, chatIdx: response.data.chatIdx } });
        //     }
        // }
        //  else {
        //     nav('/chatting', { state: { senderId: userId, receiverId: user_id, chatIdx: response.data.chatIdx } });
        // }
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
                        <li key={index} className="recommand-chat-item" onClick={()=>{newChatting(person.user_id, chatUsers)}}>
                            <img src="/images/basic.png" className="chat-img" alt="Basic" />

                            <span>{person.store_name}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Register_reco;
