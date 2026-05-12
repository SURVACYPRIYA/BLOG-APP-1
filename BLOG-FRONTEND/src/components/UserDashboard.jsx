import { useEffect, useState } from 'react'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { BookOpen, Calendar, Clock, ChevronRight, User as UserIcon, LogOut, Loader2, Sparkles } from "lucide-react"

function UserDashboard() {
  const { logout, currentUser } = useAuth()
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const getArticles = async () => {
    try {
      setLoading(true)
      let res = await axios.get("https://blog-app-1-kny9.onrender.com/user-api/articles", { withCredentials: true })
      setArticles(res.data.payload)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load articles")
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
      {/* Profile Header */}
      <header className="glass-card p-10 mb-16 flex flex-col md:flex-row items-center gap-8 animate-fade">
        <div className="relative">
          <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl">
            <img 
              src={currentUser.profileImageUrl || 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=👤'} 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-xl flex items-center justify-center border-4 border-bg-deep shadow-lg">
            <UserIcon size={18} className="text-bg-deep" />
          </div>
        </div>

        <div className="text-center md:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
            <h2 className="text-4xl font-bold gradient-text">Hello, {currentUser.firstName}</h2>
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              {currentUser.role}
            </span>
          </div>
          <p className="text-text-muted text-lg max-w-xl">
            Dive into the latest insights and stories from our top-tier authors. Your journey through knowledge begins here.
          </p>
        </div>

        <button 
          onClick={async () => {
            await logout()
            toast.success("See you soon!")
            navigate("/Login")
          }}
          className="px-6 py-3 rounded-xl bg-white/5 border border-glass-border hover:bg-red-500/10 hover:border-red-500/30 text-text-muted hover:text-red-400 transition-all flex items-center gap-2 group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
        </button>
      </header>

      {/* Articles Section */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
          <Sparkles size={20} />
        </div>
        <h2 className="text-2xl font-bold">Featured Stories</h2>
        <div className="flex-1 h-[1px] bg-glass-border"></div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-text-muted">Fetching latest stories...</p>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article 
              key={article._id} 
              onClick={() => navigate(`/article/${article._id}`, { state: article })}
              className="glass-card group cursor-pointer hover:border-primary/50 transition-all hover:-translate-y-2 flex flex-col h-full overflow-hidden"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-text-muted text-xs">
                    <Clock size={14} /> 5 min read
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>
                
                <p className="text-text-muted leading-relaxed mb-8 line-clamp-3">
                  {article.content?.substring(0, 150)}...
                </p>

                <div className="mt-auto pt-6 border-t border-glass-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                      {article.author?.profileImageUrl ? (
                        <img src={article.author.profileImageUrl} alt="Author" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon size={14} />
                      )}
                    </div>
                    <span className="text-sm font-medium text-text-muted">
                      {article.author?.firstName || 'Anonymous'}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="glass-card p-20 text-center flex flex-col items-center">
          <BookOpen size={64} className="text-text-muted mb-6" />
          <h3 className="text-2xl font-bold mb-2">No articles yet</h3>
          <p className="text-text-muted max-w-sm">
            Check back later for new stories or explore other sections.
          </p>
        </div>
      )}
    </div>
  )
}

export default UserDashboard
