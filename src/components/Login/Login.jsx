import React, { useEffect } from 'react';

function Login() {
    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = 'https://www.gstatic.com/firebasejs/8.3.3/firebase-app.js';
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = 'https://www.gstatic.com/firebasejs/8.3.3/firebase-auth.js';
        document.head.appendChild(script2);

        script2.onload = () => {
            const firebaseConfig = {
                apiKey: "AIzaSyCBQ7Bul0bt8pWVyNhmNlf_TW6po0JwZo8",
                authDomain: "chat-app-9562b.firebaseapp.com",
            };
            window.firebase.initializeApp(firebaseConfig);
        };
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

        if (loginResponse.status !== 200) {
            const username = prompt("Please enter a username for registration:");

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
        } else {
            console.log("User logged in");
            loginResponse.json().then(data => {
            console.log("User:", data);
            });
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