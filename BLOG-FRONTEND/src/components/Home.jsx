import { ArrowRight, Sparkles, BookOpen, Users, Zap } from "lucide-react"
import { NavLink } from "react-router"

function Home() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center max-w-4xl mx-auto animate-fade">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8">
          <Sparkles size={16} />
          <span>The Future of Digital Publishing</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8">
          Share your <span className="gradient-text">stories</span> with the world.
        </h1>
        
        <p className="text-xl text-text-muted mb-10 max-w-2xl leading-relaxed">
          Join a community of forward-thinking writers and readers. Experience a platform built for speed, beauty, and meaningful interaction.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <NavLink to="/register" className="btn-primary text-lg px-8 py-4">
            Start Writing <ArrowRight size={20} />
          </NavLink>
          <NavLink to="/login" className="px-8 py-4 rounded-xl border border-glass-border hover:bg-white/5 font-semibold transition-colors">
            Explore Articles
          </NavLink>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div className="glass-card p-8 group hover:border-primary/50 transition-all">
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
            <BookOpen size={28} />
          </div>
          <h3 className="text-xl font-bold mb-4">Quality Content</h3>
          <p className="text-text-muted leading-relaxed">
            Curated articles from professional authors across diverse industries and topics.
          </p>
        </div>

        <div className="glass-card p-8 group hover:border-accent/50 transition-all">
          <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
            <Zap size={28} />
          </div>
          <h3 className="text-xl font-bold mb-4">Fast & Fluid</h3>
          <p className="text-text-muted leading-relaxed">
            Lightning-fast loading times and smooth transitions for the ultimate reading experience.
          </p>
        </div>

        <div className="glass-card p-8 group hover:border-purple/50 transition-all">
          <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
            <Users size={28} />
          </div>
          <h3 className="text-xl font-bold mb-4">Community Focused</h3>
          <p className="text-text-muted leading-relaxed">
            Connect with other readers and authors through meaningful comments and interactions.
          </p>
        </div>
      </section>

      {/* Background Blobs */}
      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
    </div>
  )
}

export default Home
