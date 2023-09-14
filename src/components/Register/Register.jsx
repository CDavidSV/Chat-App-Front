import React from 'react'
import './Register.css'
import addPP from '../../assets/addPP.png'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => {

    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
            
            (error) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                });
            }
            );
        } catch (error) {
            setError(true)
        }
    }

    return (
        <div className='formcontainer'>
            <div className='formWrapper'>
                <span className='logo'>Equipazo Chat</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Full name'/>
                    <input type='email' placeholder='Email'/>
                    <input type='password' placeholder='Password'/>
                    <input style={{display:'none'}}type='file' id='file'/>
                    <label htmlFor='file'>
                        <img src={addPP} alt=''/>
                        <span>Profile picture</span>
                    </label>
                    <button>Sign Up</button>
                    {error && <span>Something went wrong!</span>}
                </form>
                <p>You do have an account? Login</p>
            </div>
        </div>
    )
}

export default Register