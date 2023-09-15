import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chat.css';
import more from '../../assets/more.png';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import { accessToken } from '../../config';

const Chat = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const menuRef = useRef(null);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setMenuVisible(prevState => !prevState);
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuVisible(false);
            setInputVisible(false);
        }
    };

    const handleMenuItemClick = (option, event) => {
        event.stopPropagation();
        setSelectedOption(option);
        setMenuVisible(false);
        setInputVisible(true);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async () => {
        const url = selectedOption === 'Cambiar usuario'
            ? 'http://localhost:8080/api/change_username'
            : 'http://localhost:8080/api/change_custom_status';

        const data = selectedOption === 'Cambiar usuario'
            ? { username: inputValue }
            : { custom_status: inputValue };

        try {
            await axios.post(url, data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setInputVisible(false);
            setInputValue('');
            window.location.reload();
        } catch (error) {
            console.error('Error al cambiar datos:', error);
        }
    };    

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>Chat General</span>
                <div className="chatIcons" ref={menuRef}>
                    <img src={more} alt="more" onClick={toggleMenu} />
                    {menuVisible && (
                        <div className="menu">
                            <div className="menuItem" onClick={(event) => handleMenuItemClick('Cambiar usuario', event)}>Cambiar usuario</div>
                            <div className="menuItem" onClick={(event) => handleMenuItemClick('Cambiar estado', event)}>Cambiar estado</div>
                        </div>
                    )}
                    {inputVisible && (
                        <div className="menu">
                            <input type="text" value={inputValue} onChange={handleChange} onKeyPress={handleKeyPress} />
                            <button onClick={handleSubmit}>Enviar</button>
                        </div>
                    )}
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
}

export default Chat;