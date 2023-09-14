import React from 'react'
import './Message.css'

const Message = () => {
    return (
        <div className='message owner'>
            <div className="messageInfo">
                <img src="https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?cs=srgb&dl=pexels-maria-orlova-4946515.jpg&fm=jpg" alt="" />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>hello</p>
                <img src="https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?cs=srgb&dl=pexels-maria-orlova-4946515.jpg&fm=jpg" alt="" />
            </div>
        </div>
    )
}

export default Message