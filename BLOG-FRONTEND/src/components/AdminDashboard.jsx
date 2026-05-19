import React, { useEffect, useState } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "../axios";
import { LogOut, ShieldAlert, Award, BookOpen, Users, Clock, Trash2, ExternalLink } from "lucide-react";

function AdminDashboard() {
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

  const getGlobalArticles = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/user-api/articles");
      setArticles(res.data.payload || []);
    } catch (err) {
      console.error("Error fetching global articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminDelete = async (articleId) => {
    if (window.confirm("CRITICAL ACTION: Are you sure you want to administratively retract and delete this story?")) {
      try {
        await axios.delete(`/author-api/article/${articleId}`);
        toast.success("Story administratively retracted");
        getGlobalArticles();
      } catch (err) {
        console.error("Error deleting article:", err);
        toast.error("Failed to retract article");
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      getGlobalArticles();
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

  const defaultAvatar = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80";

  // Get pastel colored pill styles based on category
  const getCategoryStyles = (categoryName) => {
    const cat = (categoryName || "").toLowerCase();
    if (cat.includes("lifestyle")) return "bg-rose-50 text-rose-500 border-rose-100";
    if (cat.includes("travel")) return "bg-teal-50 text-teal-500 border-teal-100";
    if (cat.includes("personal") || cat.includes("growth")) return "bg-purple-50 text-purple-500 border-purple-100";
    if (cat.includes("productivity") || cat.includes("philosophy")) return "bg-amber-50 text-amber-500 border-amber-100";
    if (cat.includes("technology") || cat.includes("science")) return "bg-blue-50 text-blue-500 border-blue-100";
    return "bg-slate-50 text-slate-500 border-slate-100";
  };

  return (
    <div className="w-full bg-[#fcfbf9] -mt-20 py-12 text-left">
      
      {/* 1. chief editor banner (Rose Gradient) */}
      <section className="bg-gradient-to-r from-rose-500 to-rose-600 w-full text-white pt-28 pb-18 px-6 md:px-12 flex flex-col items-center relative overflow-hidden rounded-b-[40px] shadow-lg">
        {/* Decorative background shape */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 pointer-events-none z-0">
          <svg className="w-[300px] h-[300px]" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <img
            src={currentUser.profileImageUrl || defaultAvatar}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl relative z-10"
          />

          <h2 className="mt-6 font-serif text-3xl md:text-4xl font-bold tracking-tight text-white">
            Welcome back, {currentUser.firstName}
          </h2>
          <span className="font-sans text-[10px] uppercase tracking-widest font-extrabold text-yellow-300 mt-2 bg-rose-600/50 py-1.5 px-4 rounded-full border border-yellow-500/30 flex items-center gap-1.5">
            <ShieldAlert size={12} />
            <span>Chief Editor (Admin)</span>
          </span>
        </div>
      </section>

      {/* 2. Global Editorial Metrics */}
      <section className="container mx-auto px-6 md:px-12 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-md">
          {/* Metric 1 */}
          <div className="flex items-center gap-4 p-4 border-r border-slate-50 last:border-0">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
              <BookOpen size={18} />
            </div>
            <div>
              <span className="block font-serif text-xl font-bold text-slate-900">{articles.length}</span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-slate-400 font-bold">Total Stories</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex items-center gap-4 p-4 border-r border-slate-50 last:border-0">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
              <Users size={18} />
            </div>
            <div>
              <span className="block font-serif text-xl font-bold text-slate-900">12</span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-slate-400 font-bold">Writers</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex items-center gap-4 p-4 border-r border-slate-50 last:border-0">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <span className="block font-serif text-xl font-bold text-slate-900">0</span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-slate-400 font-bold">Review Queue</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="flex items-center gap-4 p-4 border-r border-slate-50 last:border-0">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
              <Award size={18} />
            </div>
            <div>
              <span className="block font-serif text-xl font-bold text-slate-900">A+</span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-slate-400 font-bold">Journal Rank</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Global Submissions moderation Table */}
      <section className="py-16 container mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6 border-b border-slate-100 pb-5">
          <div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">Global Submissions Board</h3>
            <p className="text-xs text-slate-400 mt-1">Review, preview, or administratively retract any story in the archives</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-200 font-sans text-xs tracking-wider uppercase font-bold transition-all duration-300 shadow-sm cursor-pointer ml-auto hover:bg-slate-50"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Content list */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-rose-100 border-t-rose-500 animate-spin"></div>
            <span className="font-sans text-xs uppercase tracking-wider text-slate-400">Loading Submissions...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100/50 shadow-sm max-w-2xl mx-auto">
            <p className="font-serif text-lg text-slate-400 italic">No published articles available globally.</p>
          </div>
        ) : (
          /* Essay Table List */
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-sans text-[10px] uppercase tracking-wider font-bold">
                    <th className="py-4.5 px-6.5">Title & Category</th>
                    <th className="py-4.5 px-6.5 hidden md:table-cell">Author Details</th>
                    <th className="py-4.5 px-6.5 hidden md:table-cell">Publish Date</th>
                    <th className="py-4.5 px-6.5 text-right">Moderator Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {articles.map((article) => {
                    const authorName = article.author
                      ? `${article.author.firstName || ""} ${article.author.lastName || ""}`.trim()
                      : "Unknown Author";

                    return (
                      <tr key={article._id} className="hover:bg-slate-50/30 transition-colors">
                        {/* Title */}
                        <td className="py-6 px-6.5">
                          <div className="flex flex-col items-start">
                            <span
                              onClick={() => navigate(`/article/${article._id}`, { state: article })}
                              className="font-serif font-bold text-base text-slate-900 hover:text-rose-500 cursor-pointer transition-colors"
                            >
                              {article.title}
                            </span>
                            <span className={`font-sans text-[9px] font-extrabold border uppercase tracking-wider mt-2.5 px-2 py-0.5 rounded-full ${getCategoryStyles(article.category)}`}>
                              {article.category || "Lifestyle"}
                            </span>
                          </div>
                        </td>
                        {/* Author */}
                        <td className="py-6 px-6.5 hidden md:table-cell">
                          <span className="font-sans text-xs text-slate-900 font-bold">
                            {authorName}
                          </span>
                        </td>
                        {/* Publish Date */}
                        <td className="py-6 px-6.5 hidden md:table-cell">
                          <span className="font-sans text-xs text-slate-400 font-medium">
                            {new Date(article.createdAt).toLocaleDateString("en-IN", {
                              dateStyle: "medium",
                            })}
                          </span>
                        </td>
                        {/* Actions */}
                        <td className="py-6 px-6.5 text-right">
                          <div className="flex items-center justify-end gap-2.5">
                            <button
                              onClick={() => navigate(`/article/${article._id}`, { state: article })}
                              className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-500 hover:bg-slate-50 transition-colors cursor-pointer"
                              title="View Story"
                            >
                              <ExternalLink size={13} />
                            </button>
                            <button
                              onClick={() => handleAdminDelete(article._id)}
                              className="p-2 rounded-full border border-red-100 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Retract Story"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
