import React, {useEffect,useState} from 'react'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router'
import { cardClass, submitBtn, pageWrapper, headingClass } from '../styles/common'
import {toast} from 'react-hot-toast'
import axios from 'axios'

function AuthorDashboard() {
  
  const logout = useAuth(state => state.logout)
  const navigate = useNavigate()
  const [articles,setArticles] = useState([])
  const currentUser = useAuth(state => state.currentUser)

  const onLogout = async() =>{
    await logout()
    toast.success("Logged out successfully")
    navigate("/Login")
  }

  const getArticles = async () =>{
  try{
    let res = await axios.get(
      `http://localhost:4000/author-api/articles/${currentUser._id}`,
      {withCredentials:true}
    )
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
        <h2 className={headingClass}>Author Dashboard</h2>
    </div>

    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6'>
      {articles.map((article)=>(
        <div key={article._id} className={cardClass} onClick={()=>navigate(`/article/${article._id}`,{state:article})}>
        <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
        <p className="text-sm">{article.content?.substring(0,20)}...</p>
        <p className="text-xs mt-3">Category: {article.category}</p>
        <button className="text-blue-500 mt-3" onClick={()=> navigate(`/edit-article/${article._id}`, {state: article})}>Edit</button>
        </div>
      ))}
    </div>
    <button className={submitBtn} onClick={() => navigate("/write-article")}>
      Write Article
    </button>
    <button className={submitBtn} onClick={onLogout}>Logout</button>
    </div>
  )
}

export default AuthorDashboard