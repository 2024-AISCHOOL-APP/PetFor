import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Chatting.css';

const Chatting = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
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
    }, []);

    const handleSend = () => {
        if (message.trim()) {
            const socket = io.connect('http://localhost:8000', {
                path: '/socket.io'
                // transports: ['websocket']
            });
            socket.emit('msg', message);
            setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
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
                    <div key={index} className="msgLine">
                        <div className="msgBox">{msg}</div>
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
