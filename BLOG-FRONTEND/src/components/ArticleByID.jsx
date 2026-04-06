import React, {useEffect,useState} from 'react'
import { useLocation, useParams } from 'react-router'
import axios from 'axios'

function ArticleByID() {

  const {articleId} = useParams()
  const location = useLocation()
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);

  const [article,setArticle] = useState(location.state || null)

  const getArticleById = async () =>{
    try{

      let res = await axios.get(
        `http://localhost:4000/author-api/article/${articleId}`
      )

      setArticle(res.data.payload)

    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(!article && articleId){
      getArticleById()
    }
  },[articleId])

  if(!article){
    return <p>Loading...</p>
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-3">
        {article.title}
      </h1>

      <p className="text-gray-500 mb-4">
        Category: {article.category}
      </p>

      <p className="text-gray-600 text-sm mb-6">
        By {article.author?.firstName || "Unknown"} • {""} {new Date(article.createdAt).toLocaleString("en-IN",{timeZone:"Asia/Kolkata",dateStyle:"medium",timeStyle:"short"})}
      </p>

      <p className="leading-7 text-gray-800">
        {article.content}
      </p>

    </div>
  )
}

export default ArticleByID