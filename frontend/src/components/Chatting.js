import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import io from 'socket.io-client';
import './Chatting.css';
import axios from '../axios';

const Chatting = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const nav = useNavigate();
    const location = useLocation();
    const { userId, chatIdx } = location.state || {};

    useEffect(() => {
        if (!isLoggedIn) {
            nav('/login'); // 로그인하지 않은 경우 로그인 페이지로 이동
        }
    }, [isLoggedIn, nav]);

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.post('/chat/history', { chatIdx });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching chat history', error);
            }
        };

        fetchChatHistory();

        const socket = io.connect('http://localhost:8000', {
            path: '/socket.io'
            // transports: ['websocket']
        });

        socket.on('msg', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.disconnect();
        };
    }, [chatIdx]);

    const handleSend = () => {
        if (message.trim()) {
            const socket = io.connect('http://localhost:8000', {
                path: '/socket.io'
                // transports: ['websocket']
            });
            const msgData = { chatIdx, userId, message };
            socket.emit('msg', msgData);
            setMessages((prevMessages) => [...prevMessages, { userId, message }]);
            setMessage('');
            socket.disconnect();
        }
    };

    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            handleSend();
        }
    };

    return (
        <div>
            <h1>Message</h1>
            <div id="chatContent">
                {messages.map((msg, index) => (
                    <div key={index} className={`msgLine ${msg.userId === userId ? 'myMsg' : 'otherMsg'}`}>
                        <div className="msgBox">{msg.message}</div>
                    </div>
                ))}
            </div>
            <input
                id="myChat"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={handleKeyUp}
            />
            <input type="submit" id="send" value="Send" onClick={handleSend} />
        </div>
    );
};

export default Chatting;
