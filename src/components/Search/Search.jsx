import React, { useState, useEffect, useContext } from 'react'; // Importa useContext
import axios from 'axios';
import './Search.css';
import { AccessTokenContext } from '../../AccessTokenContext'; // Importa AccessTokenContext

const Search = () => {
    const { accessToken } = useContext(AccessTokenContext); // Usa useContext para obtener accessToken
    const [profileData, setProfileData] = useState({ 
        profile_picture: "https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?cs=srgb&dl=pexels-maria-orlova-4946515.jpg&fm=jpg", 
        username: 'Cargando...', 
        custom_status: '' 
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user_profile', {
                    headers: { Authorization: `Bearer ${accessToken}` }, // Usa accessToken desde el contexto
                });

                if (response.data.status === "success") {
                    setProfileData({
                        profile_picture: response.data.user_profile.profile_picture,
                        username: response.data.user_profile.username,
                        custom_status: response.data.user_profile.custom_status,
                    });
                }
            } catch (error) {
                console.error('Error al obtener los datos del perfil:', error);
            }
        };

        fetchProfileData();
    }, [accessToken]); // Agrega accessToken como dependencia

    return (
        <div className='search'>
            <div className='searchForm'>
                <input type="text" placeholder='Find a user'/>
            </div>
            <div className="userChat">
                <img src={profileData.profile_picture} alt="Imagen de perfil" />
                <div className="userChatInfo">
                    <span>{profileData.username}</span>
                    <p>{profileData.custom_status}</p>
                </div>
            </div>
        </div>
    )
}

export default Search;