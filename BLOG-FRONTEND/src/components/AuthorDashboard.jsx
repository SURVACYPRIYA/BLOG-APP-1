import { useEffect, useState } from 'react'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { PlusCircle, FileText, Edit3, LogOut, Loader2, Sparkles, LayoutGrid, List } from "lucide-react"

function AuthorDashboard() {
  const { logout, currentUser } = useAuth()
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const getArticles = async () => {
    try {
      setLoading(true)
      let res = await axios.get(
        `https://blog-app-1-kny9.onrender.com/author-api/articles/${currentUser._id}`,
        { withCredentials: true }
      )
      setArticles(res.data.payload)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load your articles")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentUser) {
      getArticles()
    }
  }, [currentUser])

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 animate-fade">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl">
            <img 
              src={currentUser.profileImageUrl || 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=👤'} 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Author Workspace</h1>
            <p className="text-text-muted mt-1 flex items-center gap-2">
              Welcome back, <span className="text-white font-medium">{currentUser.firstName}</span> <Sparkles size={14} className="text-accent" />
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/write-article")}
            className="btn-primary py-4 px-8 text-lg"
          >
            <PlusCircle size={20} /> New Article
          </button>
          <button 
            onClick={async () => {
              await logout()
              toast.success("Logged out")
              navigate("/Login")
            }}
            className="p-4 rounded-xl bg-white/5 border border-glass-border hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={24} />
          </button>
        </div>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        <div className="glass-card p-6 flex items-center gap-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <FileText size={24} />
          </div>
          <div>
            <span className="text-3xl font-bold">{articles.length}</span>
            <p className="text-xs text-text-muted uppercase tracking-widest font-bold mt-1">Total Stories</p>
          </div>
        </div>
        {/* Placeholder stats */}
        <div className="glass-card p-6 flex items-center gap-6 opacity-60">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
            <LayoutGrid size={24} />
          </div>
          <div>
            <span className="text-3xl font-bold">1.2k</span>
            <p className="text-xs text-text-muted uppercase tracking-widest font-bold mt-1">Total Views</p>
          </div>
        </div>
        <div className="glass-card p-6 flex items-center gap-6 opacity-60">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
            <List size={24} />
          </div>
          <div>
            <span className="text-3xl font-bold">48</span>
            <p className="text-xs text-text-muted uppercase tracking-widest font-bold mt-1">Comments</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          Your Published Works
          <span className="px-2 py-0.5 rounded-lg bg-white/10 text-text-muted text-sm font-medium">
            {articles.length}
          </span>
        </h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-text-muted">Loading your workspace...</p>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div 
              key={article._id} 
              className="glass-card group hover:border-primary/50 transition-all flex flex-col h-full overflow-hidden"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                    {article.category}
                  </span>
                </div>

                <h3 
                  onClick={() => navigate(`/article/${article._id}`, { state: article })}
                  className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors cursor-pointer line-clamp-2 leading-snug"
                >
                  {article.title}
                </h3>
                
                <p className="text-text-muted leading-relaxed mb-8 line-clamp-3">
                  {article.content?.substring(0, 100)}...
                </p>

                <div className="mt-auto pt-6 border-t border-glass-border flex items-center justify-between">
                  <div className="text-xs text-text-muted font-medium">
                    Published on {new Date().toLocaleDateString()}
                  </div>
                  <button 
                    onClick={() => navigate(`/edit-article/${article._id}`, { state: article })}
                    className="flex items-center gap-2 text-accent font-bold hover:text-white transition-colors text-sm group/edit"
                  >
                    <Edit3 size={16} className="group-hover/edit:rotate-12 transition-transform" /> Edit Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-20 text-center flex flex-col items-center border-dashed border-2">
          <FileText size={64} className="text-text-muted mb-6" />
          <h3 className="text-2xl font-bold mb-2">You haven't written anything yet</h3>
          <p className="text-text-muted max-w-sm mb-8">
            Start your journey as an author by writing your very first article today!
          </p>
          <button 
            onClick={() => navigate("/write-article")}
            className="btn-primary"
          >
            Write Your First Article
          </button>
        </div>
      )}
    </div>
  )
}

export default AuthorDashboard
