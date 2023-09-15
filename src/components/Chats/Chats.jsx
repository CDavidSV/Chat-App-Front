import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chats.css';
import { accessToken } from '../../config';

const Chats = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    
    useEffect(() => {
        const fetchOnlineUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/get_online_users', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                if (response.data.status === "success") {
                    setOnlineUsers(response.data.online_users);
                }
            } catch (error) {
                console.error('Error al obtener los usuarios en línea:', error);
            }
        };

        fetchOnlineUsers();
    }, []);
    
    return (
        <div className='chats'>
            {onlineUsers.map((user, index) => (
                <div className="userChat" key={index}>
                    <img src={user.profile_picture || "https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?cs=srgb&dl=pexels-maria-orlova-4946515.jpg&fm=jpg"} alt="" />
                    <div className="userChatInfo">
                        <span>{user.username || 'Usuario desconocido'}</span>
                        <p>{user.custom_status || 'Hello'}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chats;