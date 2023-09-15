import React, { useState, useEffect, useContext } from 'react'; // Importa useContext
import axios from 'axios';
import './Navbar.css';
import { AccessTokenContext } from '../../AccessTokenContext'; // Importa AccessTokenContext

const Navbar = () => {
    const { accessToken } = useContext(AccessTokenContext); // Usa useContext para obtener accessToken
    const [profileData, setProfileData] = useState({ profile_picture: '', username: 'Cargando...' });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                console.log("Access Token a utilizar:", accessToken); // Imprime en consola el access token

                const response = await axios.get('http://localhost:8080/api/user_profile', {
                    headers: { Authorization: `Bearer ${accessToken}` }, // Usa accessToken desde el contexto
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
    }, [accessToken]); // Agrega accessToken como dependencia

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