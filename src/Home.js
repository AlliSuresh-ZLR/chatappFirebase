import React from 'react'
import {useEffect,useState} from 'react'
import {db,auth} from './fireconfig' 
import {collection,query,where,onSnapshot, addDoc,Timestamp, orderBy} from 'firebase/firestore'
import User from './components/User';
import './App.css'
import MsgForm from './components/MsgForm';
import { async } from '@firebase/util';
import Message from './components/Message';

function Home() {
  const user1=auth.currentUser.uid;

  const [users,setUsers]=useState([]);
  const [chat,setChat]=useState();
  const [text,setText]=useState("");
  const [msgs,setMsgs]=useState([]);
  useEffect(()=>{
    const usersref=collection(db,'users');
    const q=query(usersref,where('uid','not-in',[user1]));
    const unsub=onSnapshot(q,querySnapshot=>{
      let users=[];
      querySnapshot.forEach(doc=>users.push(doc.data()))
    setUsers(users);

    })
    return ()=>unsub()

  },[])
  const selectUser=(user)=>{
setChat(user);
const user2=user.uid;
const id=user1>user2?`${user1+user2}`:`${user2+user1}`;
const msgsRef=collection(db,'messages',id,'chat');
const q=query(msgsRef,orderBy('createdAt','asc'));
onSnapshot(q,querySnapshot=>{
  let msgs=[];
  querySnapshot.forEach(doc=>{
    msgs.push(doc.data())
  })
  setMsgs(msgs);
})
  }
  console.log(msgs);
  const handleSubmit= async(e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      const user2=chat.uid;
      const id=user1>user2?`${user1+user2}`:`${user2+user1}`
      await addDoc(collection(db,'messages',id,'chat'),{
        text,
        from:user1,
        to:user2,
        createdAt:Timestamp.fromDate(new Date())
      });
      setText("");

    }
    // e.preventDefault();
    // const user2=chat.uid;
    // const id=user1>user2?`${user1+user2}`:`${user2+user1}`
    // await addDoc(collection(db,'messages',id,'chat'),{
    //   text,
    //   from:user1,
    //   to:user2,
    //   createdAt:Timestamp.fromDate(new Date())
    // });
    // setText("");
  }
  return (
    <div className='home_container'>
      <div className='users_container'>
        {users.map(user=><User key={user.uid} user={user} selectUser={selectUser}/>)}

      </div>
      <div className='msg_container'>
        {chat?
        <>
        <div className='msg_users'>
          <h3>{chat.name}</h3>
        </div>
        <div className='msgs'>
          {msgs.length?msgs.map((msg,i)=><Message key={i} msg={msg} user1={user1} />):""}
        </div>
        <MsgForm handleSubmit={handleSubmit} text={text} setText={setText}/>
        </>
        :<h3 className='no_conv'>selectUser to start conversation</h3>
        
        }
          

      </div>
      
    </div>
  )
}

export default Home