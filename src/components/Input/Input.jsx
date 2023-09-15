import React, { useState, useRef } from 'react';
import './Input.css';
import axios from 'axios';

const Input = () => {
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ4MzgzNDQsInVpZCI6IjY1MDNkYzRmYjM3NWE3ZGY2YTcwZGEzZCJ9.WjWCAR9-qUbqtxnAO6APy06HZCgUQHjvXZRuY3uCYqY';

    const sendMessage = () => {
        if (message.trim() !== '') {
            const messageData = { content: message };

            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            axios.post('http://localhost:8080/api/send_message', messageData, axiosConfig)
                .then((response) => {
                    console.log('Mensaje enviado:', response.data);
                    setMessage('');
                })
                .catch((error) => {
                    console.error('Error al enviar el mensaje:', error);
                });
        }
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className='input'>
            <input
                type='text'
                placeholder='Type something...'
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                ref={inputRef}
            />
            <div className='send'>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Input;