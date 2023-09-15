import React from 'react'
import './Chat.css'
import more from '../../assets/more.png'
import Messages from '../Messages/Messages'
import Input from '../Input/Input'

const Chat = () => {
    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>Chat General</span>
                <div className="chatIcons">
                    <img src={more} alt="" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat