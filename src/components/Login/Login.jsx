import React, { useEffect, useContext } from 'react';
import { AccessTokenContext } from '../../AccessTokenContext';

function Login({ onLoginSuccess }) {
    const { accessToken, setAccessToken } = useContext(AccessTokenContext);

    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => resolve(script);
                script.onerror = () => reject(new Error(`Script load error: ${src}`));
                document.head.appendChild(script);
            });
        };

        Promise.all([
            loadScript('https://www.gstatic.com/firebasejs/8.3.3/firebase-app.js'),
            loadScript('https://www.gstatic.com/firebasejs/8.3.3/firebase-auth.js')
        ]).then(() => {
            const firebaseConfig = {
                apiKey: "AIzaSyCBQ7Bul0bt8pWVyNhmNlf_TW6po0JwZo8",
                authDomain: "chat-app-9562b.firebaseapp.com",
            };
            if (!window.firebase.apps.length) {
                window.firebase.initializeApp(firebaseConfig);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const googleLogin = async () => {
        var provider = new window.firebase.auth.GoogleAuthProvider();

        try {
            const result = await window.firebase.auth().signInWithPopup(provider);
            const user = result.user;
            console.log(result.user);
            await apiLogin(user);
        } catch (error) {
            console.error("Google Login Error:", error);
        }
    };

    const apiLogin = async (user) => {
        try {
            const accountToken = await user.getIdToken();
            const loginResponse = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ account_token: accountToken })
            });
    
            if (loginResponse.status === 200) {
                loginResponse.json().then(data => {
                    console.log("User logged in");
                    console.log("User:", data);
    
                    // Actualizar primero el token en el contexto y realizar la comparación
                    setAccessToken(prevAccessToken => {
                        if (prevAccessToken === data.access_token) {
                            console.log("Access tokens match");
                        } else {
                            console.error("Access tokens do not match");
                        }
                        return data.access_token; // Actualiza el valor de accessToken
                    });
    
                    // Imprimir ambos tokens para verificar la comparación
                    console.log("Access Token from context:", accessToken);
                    console.log("Access Token from response:", data.access_token);
    
                    onLoginSuccess();
                });
            } else {
                const username = prompt("Please enter a username for registration");
    
                if (username) {
                    const registerResponse = await fetch('http://localhost:8080/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ account_token: accountToken, username: username })
                    });
    
                    if (registerResponse.status === 200) {
                        console.log("User registered");
                        registerResponse.json().then(data => {
                            console.log("User:", data);
                        });
                    } else {
                        console.log("Registration failed");
                    }
                } else {
                    console.log("Registration cancelled by user.");
                }
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    };       

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <button onClick={googleLogin} style={{ backgroundColor: '#FFFFFF', color: '#000000', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" style={{ width: '18px', marginRight: '10px' }} />
                Login with Google
            </button>
        </div>
    );
}

export default Login;