import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import io from 'socket.io-client';
import './Chatting.css';
import axios from '../axios';

const Chatting = () => {
    const { isLoggedIn, userId: currentUserId } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const nav = useNavigate();
    const location = useLocation();
    const { senderId, receiverId, chatIdx } = location.state || {};
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) {
            nav('/login');
        }
    }, [isLoggedIn, nav]);

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.post('/chat/history', { chatIdx, userId: senderId });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching chat history', error);
            }
        };

        fetchChatHistory();

        const newSocket  = io('http://localhost:8000', {
            path: '/socket.io',
            transports: ['websocket']
        });

        newSocket.on('msg', (data) => {
            if (data.senderId !== currentUserId) {
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [chatIdx, senderId]);

    const handleSend = async () => {
        if (message.trim() && socket) {
            const msgData = { chatIdx, senderId, receiverId, message };
            try {
                await axios.post('/chat/send', msgData);
                const formattedMsg = {
                    ...msgData,
                    isSender: true,
                    message_date: new Date()
                };
                socket.emit('msg', formattedMsg);
                setMessages((prevMessages) => [...prevMessages, formattedMsg]);
                setMessage('');
            } catch(error) {
                console.error('Error sending message', error);
            }
        }
    };

    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            handleSend();
        }
    };

    const handleBack = () => {
        nav('/chat');
    };

    return (
        <div className='chat-container'>
            <h3>{receiverId}</h3>
            <button className="chatting-back-button" onClick={handleBack}>←</button>
            <div id="chatContent">
                {messages.map((msg, index) => (
                    <div key={index} className={`msgLine ${msg.isSender ? 'myMsg' : 'otherMsg'}`}>
                        <div className="msgBox">{msg.message}</div>
                    </div>
                ))}
            </div>
            <div className='chatting-input-box'>
                <input
                    id="myChat"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
                <input type="submit" id="send" value="전송" onClick={handleSend} />
            </div>
        </div>
    );
};

export default Chatting;
