import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router";
import axios from "../axios";
import { useAuth } from "../store/authStore";
import { motion } from "framer-motion";
import { Heart, Share2, Bookmark, ArrowLeft, Clock, Calendar, User, CheckCircle2, MessageSquare } from "lucide-react";
import { toast } from "react-hot-toast";

function ArticleByID() {
  const { articleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(!article);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    try {
      setSubmittingComment(true);
      await axios.post(`/user-api/articles/${articleId}`, {
        user: currentUser._id,
        articleId,
        comment: commentText
      });
      toast.success("Comment added successfully!");
      setCommentText("");
      getArticleById(); // refresh to show new comment
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setSubmittingComment(false);
    }
  };

  // Read scroll progress for progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getArticleById = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/common-api/articles/${articleId}`);
      setArticle(res.data.payload);
    } catch (err) {
      console.error("Error fetching article by ID:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!article && articleId && currentUser) {
      getArticleById();
    }
  }, [articleId, currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-[#fcfbf9] -mt-20">
        <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-6 shadow-sm">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Member Only Story</h2>
        <p className="text-slate-500 text-sm mb-8 max-w-md leading-relaxed">
          Please sign in to your account or register to unlock and read this full editorial piece.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="inline-flex items-center justify-center min-w-[140px] bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-sans text-xs font-semibold uppercase tracking-wider py-3.5 px-8 rounded-full transition-all duration-300 shadow-sm"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center min-w-[140px] bg-rose-500 hover:bg-rose-600 text-white font-sans text-xs font-semibold uppercase tracking-wider py-3.5 px-8 rounded-full transition-all duration-300 shadow-md shadow-rose-500/10"
          >
            Register
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-rose-100 border-t-rose-500 animate-spin"></div>
        <span className="font-sans text-xs uppercase tracking-wider text-slate-400">Loading Story...</span>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-[#fcfbf9]">
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">Story Not Found</h2>
        <p className="text-slate-500 text-sm mb-6 max-w-sm">
          The article you are looking for does not exist or may have been archived by the author.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-sans text-xs font-semibold uppercase tracking-wider py-3 px-6.5 rounded-full transition-all duration-300 shadow-md shadow-rose-500/10"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  // Calculate approximate read time
  const wordCount = article.content ? article.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const authorName = article.author
    ? `${article.author.firstName || ""} ${article.author.lastName || ""}`.trim()
    : "Olivia Hart";

  const authorAvatar = article.author?.profileImageUrl || 
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80";

  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-IN", {
        dateStyle: "long",
      })
    : "Recently Published";

  // Curated Unsplash cover fallback based on category
  const getCoverImage = () => {
    if (article.imageUrl) return article.imageUrl;
    
    const cat = (article.category || "").toLowerCase();
    if (cat.includes("lifestyle")) {
      return "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80";
    }
    if (cat.includes("travel")) {
      return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80";
    }
    if (cat.includes("personal") || cat.includes("growth")) {
      return "https://images.unsplash.com/photo-1528712306694-db4a60b18f4e?auto=format&fit=crop&w=1200&q=80";
    }
    if (cat.includes("productivity") || cat.includes("philosophy")) {
      return "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80";
    }
    if (cat.includes("technology") || cat.includes("science")) {
      return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";
    }
    return "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80";
  };

  return (
    <div className="w-full bg-[#fcfbf9] -mt-20 relative">
      
      {/* A. Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-rose-500 z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* B. Clean Minimalist Header */}
      <section className="relative pt-36 pb-12 w-full flex items-end overflow-hidden bg-[#fcfbf9]">
        {/* Hero Meta & Title Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 w-full text-left max-w-4xl border-b border-slate-100 pb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-xs font-sans uppercase font-semibold tracking-wider mb-8"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>

          <div>
            {/* Category Tag */}
            <span className="inline-block bg-rose-50 text-rose-500 border border-rose-100 font-sans text-[10px] font-extrabold tracking-wider uppercase py-1 px-3 rounded-full mb-4">
              {article.category || "Lifestyle"}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Author/Date Row */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-sans tracking-wide mt-2">
            <span className="flex items-center gap-1.5">
              <User size={13} className="text-rose-500" />
              <span className="font-semibold text-slate-900">{authorName}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-rose-500" />
              <span>{formattedDate}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-rose-500" />
              <span>{readTime} min read</span>
            </span>
          </div>
        </div>
      </section>

      {/* C. Essay Body & Sticky Social Bar */}
      <section className="py-16 md:py-20 container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="flex justify-center relative">
          
          {/* Center: Editorial Content */}
          <div className="max-w-3xl w-full text-left">
            <article className="font-serif text-slate-900 text-base md:text-lg leading-relaxed md:leading-loose space-y-7">
              {article.content?.split("\n\n").map((para, idx) => {
                if (idx === 0) {
                  return (
                    <p key={idx} className="text-justify leading-relaxed md:leading-loose">
                      {para}
                    </p>
                  );
                }
                return (
                  <p key={idx} className="text-justify leading-relaxed md:leading-loose">
                    {para}
                  </p>
                );
              })}
            </article>

            {/* Mobile share row */}
            <div className="flex lg:hidden items-center gap-3 py-6 border-y border-slate-100 my-8">
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-400 font-extrabold">Interact:</span>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isLiked ? "bg-rose-500 border-rose-500 text-white" : "border-slate-200 text-slate-500"
                }`}
              >
                <Heart size={13} fill={isLiked ? "currentColor" : "none"} />
                <span>Like</span>
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isBookmarked ? "bg-rose-500 border-rose-500 text-white" : "border-slate-200 text-slate-500"
                }`}
              >
                <Bookmark size={13} fill={isBookmarked ? "currentColor" : "none"} />
                <span>Bookmark</span>
              </button>
            </div>

            {/* Author Biography Box */}
            <section className="mt-14 pt-8 border-t border-slate-100 bg-white p-7.5 rounded-3xl border border-slate-100 shadow-sm text-center sm:text-left">
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h4 className="font-serif font-bold text-lg text-slate-900">
                    {authorName}
                  </h4>
                  <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-500 font-sans text-[9px] uppercase tracking-widest font-extrabold py-0.5 px-2.5 rounded-full border border-rose-100 max-w-max mx-auto sm:mx-0">
                    <CheckCircle2 size={10} />
                    Verified Writer
                  </span>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  {article.author?.bio ||
                    "An editor and creative writer specializing in daily routines, personal development, lifestyle habits, and modern critiques for Blogr."}
                </p>
              </div>
            </section>

            {/* Discussion / Comments Section */}
            <section className="mt-12 pt-10 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-8">
                <MessageSquare size={20} className="text-slate-900" />
                <h3 className="font-serif text-2xl font-bold text-slate-900">Discussion ({article.comments?.length || 0})</h3>
              </div>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-10">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts on this story..."
                  className="w-full bg-white border border-slate-200 p-4.5 rounded-2xl text-sm font-sans focus:outline-none focus:border-rose-500 shadow-sm resize-none mb-3"
                  rows="3"
                ></textarea>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submittingComment || !commentText.trim()}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs uppercase tracking-widest font-bold py-2.5 px-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submittingComment ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {(!article.comments || article.comments.length === 0) ? (
                  <p className="text-slate-500 text-sm italic">No comments yet. Be the first to start the discussion!</p>
                ) : (
                  [...article.comments].reverse().map((c, idx) => (
                    <div key={idx} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-400">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-sans font-bold text-sm text-slate-900">
                            {c.user?.firstName || "Unknown User"}
                          </span>
                          {c.createdAt && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span className="text-slate-400 text-[10px] font-sans uppercase tracking-wider">
                                {new Date(c.createdAt).toLocaleDateString(undefined, {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{c.comment}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

          </div>

        </div>
      </section>
    </div>
  );
}

export default ArticleByID;
