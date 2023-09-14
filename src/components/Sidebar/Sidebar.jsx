import React from 'react'
import './Sidebar.css'
import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import Chats from '../Chats/Chats'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}

export default Sidebar