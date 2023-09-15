import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Message.css';
import Pusher from 'pusher-js';

const Message = () => {
    const [messageData, setMessageData] = useState(null);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ4MDAzMjIsInVpZCI6IjY1MDM0ODQyNmYzMGQ2MjQ5Mjg4NGUxZCJ9.qmK7_4JxOxST675TQp1nks_qKKkS_O6_SVZNidjGMrE';

        const pusher = new Pusher('ee7ae47591298cf84395', {
            cluster: 'mt1',
        });

        const channel = pusher.subscribe('super-chat-channel');

        channel.bind('main', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        const loadMessages = () => {
            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            axios.get('http://localhost:8080/api/get_messages', axiosConfig)
                .then((response) => {
                    setMessageData(response.data);
                    setMessages(response.data.messages);
                })
                .catch((error) => {
                    console.error('Error al obtener los datos del mensaje:', error);
                });
        };

        loadMessages();

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    useEffect(() => {
        scrollToNewMessage();
    }, [messages]);

    const scrollToNewMessage = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!messageData) {
        return null;
    }

    return (
        <div>
            {messages.map((message) => {
                const createdAtDate = new Date(message.created_at);
                const formattedDate = createdAtDate.toLocaleDateString();
                const formattedTime = createdAtDate.toLocaleTimeString();

                return (
                    <div className={`message ${message.me ? 'owner' : 'other'}`} key={message.id}>
                        <div className="messageInfo">
                            <img src={message.user.profile_picture} alt="User" />
                            <span>{formattedDate}</span>
                            <span>{formattedTime}</span>
                        </div>
                        <div className="messageContent">
                            <p>{message.content}</p>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef}></div>
        </div>
    );
};

export default Message;