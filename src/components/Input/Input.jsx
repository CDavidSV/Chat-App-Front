import React, { useState, useRef, useContext } from 'react'; // Importa useContext
import './Input.css';
import axios from 'axios';
import { AccessTokenContext } from '../../AccessTokenContext'; // Importa AccessTokenContext

const Input = () => {
    const { accessToken } = useContext(AccessTokenContext); // Usa useContext para obtener accessToken
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    const sendMessage = () => {
        if (message.trim() !== '') {
            const messageData = { content: message };

            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Usa accessToken desde el contexto
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