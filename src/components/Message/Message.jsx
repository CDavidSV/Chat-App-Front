import React, { useEffect, useState, useRef, useContext } from 'react'; // Importa useContext
import axios from 'axios';
import './Message.css';
import Pusher from 'pusher-js';
import { AccessTokenContext } from '../../AccessTokenContext'; // Importa AccessTokenContext

const Message = () => {
    const { accessToken } = useContext(AccessTokenContext); // Usa useContext para obtener accessToken
    const [messageData, setMessageData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {

        axios.get('http://localhost:8080/api/user_profile', {
            headers: { Authorization: `Bearer ${accessToken}` }, // Usa accessToken desde el contexto
        }).then(response => {
            if (response.data.status === "success") {
                setUserId(response.data.user_profile.id);
            }
        }).catch(error => {
            console.error('Error al obtener el perfil de usuario:', error);
        });

        const pusher = new Pusher('ee7ae47591298cf84395', {
            cluster: 'mt1',
        });

        const channel = pusher.subscribe('super-chat-channel');

        channel.bind('main', (data) => {
            console.log('Mensaje recibido:', data);
            setMessages((prevMessages) => [...prevMessages, {
                ...data,
                me: data.sender_id === userId,
            }]);
        });

        const loadMessages = () => {
            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Usa accessToken desde el contexto
                },
            };

            axios.get('http://localhost:8080/api/get_messages', axiosConfig)
                .then((response) => {
                    console.log(response.data);
                    setMessageData(response.data);
                    setMessages(response.data.messages.map(message => ({
                        ...message,
                        me: message.sender_id === userId
                    })));
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
    }, [userId, accessToken]); // Agrega accessToken como dependencia

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