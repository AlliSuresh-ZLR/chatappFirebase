import React, { useEffect, useRef } from 'react'

function Message({msg,user1}) {
    const scrollref=useRef();

    useEffect(() => {
        scrollref.current?.scrollIntoView({behaviour:"smooth"});
    }, [msg])
    
    return (
    <div className={`msg_wrapper ${msg.from===user1?"me":"friend"}`} ref={scrollref}>
        <p >{msg.text}</p>
        <br/>
        <small>{msg.createdAt.toDate().toDateString()}</small>
    </div>
  )
}

export default Message