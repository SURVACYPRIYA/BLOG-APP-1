import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router'
import { useAuth } from '../store/authStore'
import axios from 'axios'
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark, MessageSquare, Loader2 } from "lucide-react"

function ArticleByID() {
  const { articleId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const currentUser = useAuth((state) => state.currentUser)
  const [article, setArticle] = useState(location.state || null)
  const [loading, setLoading] = useState(!article)

  const getArticleById = async () => {
    try {
      setLoading(true)
      let res = await axios.get(
        `https://blog-app-1-kny9.onrender.com/author-api/article/${articleId}`
      )
      setArticle(res.data.payload)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!article && articleId) {
      getArticleById()
    }
  }, [articleId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Article not found</h2>
        <button onClick={() => navigate(-1)} className="btn-primary">Go Back</button>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
      {/* Navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-muted hover:text-white mb-10 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      {/* Article Header */}
      <header className="mb-12 animate-fade">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-text-muted text-xs font-medium">
            <Clock size={14} /> 8 min read
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-glass-border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 overflow-hidden border border-glass-border shadow-lg">
              {article.author?.profileImageUrl ? (
                <img src={article.author.profileImageUrl} alt="Author" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted">
                  <User size={24} />
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-text-muted mb-1">Written by</p>
              <h4 className="font-bold text-lg">{article.author?.firstName || "Anonymous Writer"}</h4>
            </div>
          </div>

          <div className="flex items-center gap-6 text-text-muted">
            <div className="flex flex-col items-end">
              <p className="text-sm mb-1">Published on</p>
              <div className="flex items-center gap-2 font-bold text-white">
                <Calendar size={16} />
                {new Date(article.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="glass-card p-10 md:p-16 mb-12 animate-fade">
        <div className="prose prose-invert max-w-none">
          <p className="text-xl leading-relaxed text-slate-200 whitespace-pre-wrap">
            {article.content}
          </p>
        </div>
      </article>

      {/* Engagement Sidebar/Footer */}
      <div className="flex items-center justify-center gap-4 py-8 border-t border-glass-border">
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-glass-border hover:bg-white/10 transition-all text-text-muted hover:text-white">
          <MessageSquare size={20} /> 12 Comments
        </button>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-glass-border hover:bg-white/10 transition-all text-text-muted hover:text-white">
          <Share2 size={20} /> Share
        </button>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-glass-border hover:bg-white/10 transition-all text-text-muted hover:text-white">
          <Bookmark size={20} /> Save
        </button>
      </div>
    </div>
  )
}

export default ArticleByID
