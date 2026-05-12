import React, {useEffect,useState} from 'react'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router'
import { cardClass, submitBtn, pageWrapper, headingClass } from '../styles/common'
import {toast} from 'react-hot-toast'
import axios from 'axios'

function UserDashboard() {
  
  //get logout func from auth store
  const logout = useAuth(state => state.logout)
  const currentUser = useAuth(state => state.currentUser)
  const navigate = useNavigate()
  const [articles,setArticles] = useState([])

  if(!currentUser){
  return <p className="text-center mt-10">Restoring session...</p>
}

  //perform logout and make it to navigate to login
  const onLogout = async() =>{
    //logout
    await logout()
    toast.success("Logged out successfully")
    //navigate
    navigate("/Login")
  }

  //read articles of all authors
  const getArticles = async () =>{
    try{
      let res = await axios.get("https://blog-app-1-kny9.onrender.com/user-api/articles", {withCredentials:true})
      setArticles(res.data.payload)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
  if(currentUser){
    getArticles()
  }
},[currentUser])
  
  return (
    <div className={pageWrapper}>
      <div className="flex justify-between mb-6">
        <h2 className={headingClass}>UserDashboard</h2>
    </div>
      {currentUser && (
  <div className="mb-12 text-center">
    
    <div className="flex justify-center">
      <img 
        src={currentUser.profileImageUrl || 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=👤'} 
        alt="Profile"
        className="w-28 h-28 rounded-full object-cover border border-[#e8e8ed]"
      />
    </div>

    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#1d1d1f]">
      Welcome back, {currentUser.firstName}
    </h2>

    <p className="text-[#6e6e73] mt-1 text-sm">
      Explore the latest articles from authors
    </p>

  </div>
)}

    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'>
      {articles.map((article)=>(
        <div key={article._id} className={cardClass} onClick={()=>navigate(`/article/${article._id}`,{state:article})}>
        <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
        <p className="text-gray-600 text-sm">{article.content?.substring(0,12)}...</p>
        <p className="text-gray-400 text-xs mt-3">Category: {article.category}</p>
        </div>
      ))}
    </div>
    <button className={submitBtn} onClick={onLogout}>Logout</button>
    </div>
  )
}

//read articles of all authors
//display them in the form of grid of cardds
//1 card for extra small
//2 cards for small
//3 cards for medium
//4 cards from large screen onwards

export default UserDashboard
