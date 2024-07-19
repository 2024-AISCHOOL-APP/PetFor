import React from 'react';
import './Chat.css';

const Chat = () => {
    const chattingPeople = [
        { name: '스트릿패션', imgSrc: '/images/basic.png' },
        { name: '발레리나', imgSrc: '/images/basic.png' },
        { name: '트래커', imgSrc: '/images/basic.png' },
        { name: '디자이너', imgSrc: '/images/basic.png' },
        { name: '유치원쌤', imgSrc: '/images/basic.png' },
        { name: '핑키', imgSrc: '/images/basic.png' },
        { name: '스트릿패션', imgSrc: '/images/basic.png' },
        { name: '발레리나', imgSrc: '/images/basic.png' },
        { name: '트래커', imgSrc: '/images/basic.png' },
        { name: '디자이너', imgSrc: '/images/basic.png' },
        { name: '유치원쌤', imgSrc: '/images/basic.png' },
        { name: '핑키', imgSrc: '/images/basic.png' },
    ];

    const newPeople = [
        { name: '스트릿패션', imgSrc: '/images/basic.png' },
        { name: '발레리나', imgSrc: '/images/basic.png' },
        { name: '트래커', imgSrc: '/images/basic.png' },
        { name: '디자이너', imgSrc: '/images/basic.png' },
        { name: '유치원쌤', imgSrc: '/images/basic.png' },
        { name: '핑키', imgSrc: '/images/basic.png' },
        { name: '스트릿패션', imgSrc: '/images/basic.png' },
        { name: '발레리나', imgSrc: '/images/basic.png' },
        { name: '트래커', imgSrc: '/images/basic.png' },
        { name: '디자이너', imgSrc: '/images/basic.png' },
        { name: '유치원쌤', imgSrc: '/images/basic.png' },
        { name: '핑키', imgSrc: '/images/basic.png' },
    ];

    return (
        <main className="chat-container">
            <section className="chat-section">
                <h2>채팅 목록</h2>
                <ul className="chat-list">
                    {chattingPeople.map((person, index) => (
                        <li key={index} className="chat-item">
                            <img src={person.imgSrc} alt={person.name} className="chat-img" />
                            <span>{person.name}</span>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="chat-section">
                <h2>새로운 사람</h2>
                <ul className="chat-list">
                    {newPeople.map((person, index) => (
                        <li key={index} className="chat-item">
                            <img src={person.imgSrc} alt={person.name} className="chat-img" />
                            <span>{person.name}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Chat;
