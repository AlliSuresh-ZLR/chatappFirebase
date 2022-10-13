import React, { useEffect } from 'react'
import {useContext,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Camera from '../components/svg/Camera'
import {authcontext} from '../context/Auth'
import Login from './Login'
import {storage,db,auth} from "../fireconfig"
import {ref,getDownloadURL,uploadBytes } from "firebase/storage"
import { doc, getDoc, updateDoc } from 'firebase/firestore'

function Profile() {
  const [img,setImg]=useState("")
  const [user,setuser]=useState();
  console.log("this is "+img);
  const navigate=useNavigate();
    // const {user}=useContext(authcontext);
    
    useEffect(() => {

      user&&navigate("/login")
      getDoc(doc(db,"users",auth.currentUser.uid)).then((docsnap)=>{
        if(docsnap.exists){
          setuser(docsnap.data());
        }
      })
      if(img){
        // alert("helo")
        const uploadImg= async()=>{
          const imgRef=ref(storage,`Avatar/${new Date().getTime()}-${img.name}`)
          try{
            const snap=await uploadBytes(imgRef,img);
          const url=await getDownloadURL(ref(storage,snap.ref.fullPath));
          await updateDoc(doc(db,"users",auth.currentUser.uid),{avatar:url,avatarPath:snap.ref.fullPath})
          console.log(snap.ref.fullPath)
          console.log(url);
          setImg("");

          }
          catch(error){
            console.log(error.message);

          }
          
        }
        uploadImg()
      }
     
    
      
    }, [img])
  return (
    <center>
      <div className='profile_container'>
        <div className='img_container'>
          <img src={user?.avatar||'https://www.whatsappimages.in/wp-content/uploads/2021/07/Top-HD-sad-quotes-for-whatsapp-status-in-hindi-Pics-Images-Download-Free.gif'}alt='Avatar'/>
        <div className='overlay'>
          <div>
            <label htmlFor='photo'>
            <Camera/>
            </label>
            <input type='file' accept='image/*' style={{display:"none"}} id="photo" onChange={(e)=>{setImg(e.target.files[0])}}/>
          </div>
        </div>
        </div>
        <div className='text_container'>
          <h3>
            {user?.name}
          </h3>
          <p>{user?.email}</p>
          <small>
            joined On {user?.createdAt.toDate().toDateString()}
          </small>
        </div>
      </div>
    </center>
  )
  
}

export default Profile