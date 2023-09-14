import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <span className='logo'>Chat TEC</span>
            <div className='user'>
                <img src="https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?cs=srgb&dl=pexels-maria-orlova-4946515.jpg&fm=jpg" alt="" />
                <span>Pepe</span>
                <button>logout</button>
            </div>
        </div>
    )
}

export default Navbar