import React from 'react'
import './Login.css'

const Login = () => {
    return (
        <div className='formcontainer'>
            <div className='formWrapper'>
                <span className='logo'>Equipazo Chat</span>
                <span className='title'>Login</span>
                <form>
                    <input type='email' placeholder='Email'/>
                    <input type='password' placeholder='Password'/>
                    <button>Sign In</button>
                </form>
                <p>You don't have an account? Register</p>
            </div>
        </div>
    )
}

export default Login