import React from 'react'
import './Chats.css'

const Chats = () => {
    return (
        <div className='chats'>
            <div className="userChat">
                <img src="https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?cs=srgb&dl=pexels-maria-orlova-4946515.jpg&fm=jpg" alt="" />
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img src="https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?cs=srgb&dl=pexels-maria-orlova-4946515.jpg&fm=jpg" alt="" />
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img src="https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?cs=srgb&dl=pexels-maria-orlova-4946515.jpg&fm=jpg" alt="" />
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    )
}

export default Chats