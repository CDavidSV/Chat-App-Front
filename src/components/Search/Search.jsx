import React from 'react'
import './Search.css'

const Search = () => {
    return (
        <div className='search'>
            <div className='searchForm'>
                <input type="text" placeholder='Find a user'/>
            </div>
            <div className="userChat">
                <img src="https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?cs=srgb&dl=pexels-maria-orlova-4946515.jpg&fm=jpg" alt="" />
                <div className="userChatInfo">
                    <span>Jane</span>
                </div>
            </div>
        </div>
    )
}

export default Search