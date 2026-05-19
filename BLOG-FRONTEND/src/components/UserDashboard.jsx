import React, { useEffect, useState } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "../axios";
import BlogCard from "./ui/BlogCard";
import { LogOut, BookOpen, Compass, Bookmark, User } from "lucide-react";

function UserDashboard() {
  const logout = useAuth((state) => state.logout);
  const currentUser = useAuth((state) => state.currentUser);
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getArticles = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/common-api/articles");
      setArticles(res.data.payload || []);
    } catch (err) {
      console.error("Error fetching dashboard articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getArticles();
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-rose-100 border-t-rose-500 animate-spin"></div>
        <span className="font-sans text-xs uppercase tracking-wider text-slate-400">Restoring Session...</span>
      </div>
    );
  }

  const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  return (
    <div className="w-full bg-[#fcfbf9] -mt-20 py-12">
      
      {/* 1. Profile Banner (Rose Gradient) */}
      <section className="bg-gradient-to-r from-rose-500 to-rose-600 w-full text-white pt-28 pb-18 px-6 md:px-12 flex flex-col items-center relative overflow-hidden rounded-b-[40px] shadow-lg">
        {/* Decorative background shape */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 pointer-events-none z-0">
          <svg className="w-[300px] h-[300px]" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-white">
            Welcome back, {currentUser.firstName}
          </h2>
          <span className="font-sans text-[10px] uppercase tracking-widest font-extrabold text-rose-100 mt-3.5 bg-rose-600/50 py-1.5 px-4 rounded-full border border-rose-400/30">
            Reader Member
          </span>
        </div>
      </section>



      {/* 3. Feed Grid */}
      <section className="py-16 container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 text-left border-b border-slate-100 pb-5">
          <div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">Saved Feed Digest</h3>
            <p className="text-xs text-slate-400 mt-1">Explore stories published across all departments</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-200 font-sans text-xs tracking-wider uppercase font-bold transition-all duration-300 shadow-sm cursor-pointer hover:bg-slate-50"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-rose-100 border-t-rose-500 animate-spin"></div>
            <span className="font-sans text-xs uppercase tracking-wider text-slate-400">Loading Stories...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-100/50 shadow-sm max-w-2xl mx-auto">
            <p className="font-serif text-lg text-slate-400 italic">No published articles available in your feed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {articles.map((article) => (
              <BlogCard
                key={article._id}
                article={article}
                onClick={() => {
                  navigate(`/article/${article._id}`, { state: article });
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default UserDashboard;
