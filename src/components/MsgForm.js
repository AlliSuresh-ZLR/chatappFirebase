import { TextField } from '@mui/material'
import React from 'react'

function MsgForm({handleSubmit,text,setText}) {
  return (
    <div>
        <div className='msg_form' onSubmit={handleSubmit}>
            <div>
            
<TextField
          label="Enter to send message"
          id="filled-size-normal"
          defaultValue="Normal"
          fullWidth
          placeholder='Type here'
          variant="filled"
          onKeyDown={(e)=>{handleSubmit(e)}} value={text} onChange={e=>setText(e.target.value)}
        />
            </div>
            
        </div>
    </div>
  )
}

export default MsgForm