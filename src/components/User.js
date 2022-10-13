import React from 'react'

function User({user,selectUser}) {
  return (
    <div className='user_wrapper' onClick={()=>selectUser(user)}>
        <div className='user_info'>
            <div className='user_details'>
                <img src={user?.avatar} alt="unavailabel" className='avatar'/>
                <h4>{user?.name}</h4>
            </div>
            <div className={`${user?.isOnline?"online":"offline"}`}>

            </div>
           

        </div>

    </div>
  )
}

export default User