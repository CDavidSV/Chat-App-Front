import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
    const [profileData, setProfileData] = useState({ profile_picture: '', username: 'Cargando...' });
    
    useEffect(() => {
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ4MjI2OTgsInVpZCI6IjY1MDM2Y2QyNmZmYWUxZjVmZmZlYmI1MiJ9.q65sPhPRq15HPLoMChizyKY8drpsVoagwwysh_ZgUB0';

        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user_profile', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                if (response.data.status === "success") {
                    setProfileData({
                        profile_picture: response.data.user_profile.profile_picture,
                        username: response.data.user_profile.username,
                    });
                }
            } catch (error) {
                console.error('Error al obtener los datos del perfil:', error);
            }
        };

        fetchProfileData();
    }, []);
    
    return (
        <div className='navbar'>
            <span className='logo'>Chat TEC</span>
            <div className='user'>
                <img src={profileData.profile_picture} alt="Imagen de perfil" />
                <span className='userName'>{profileData.username}</span>
                <button>logout</button>
            </div>
        </div>
    )
}

export default Navbar;