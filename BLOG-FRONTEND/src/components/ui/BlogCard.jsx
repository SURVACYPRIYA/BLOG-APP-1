import React from "react";
import { ArrowUpRight, Calendar, User } from "lucide-react";

function BlogCard({ article, onClick }) {
  // Format creation date
  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-IN", {
        dateStyle: "medium",
      })
    : "Recently Published";

  const authorName = article.author
    ? `${article.author.firstName || ""} ${article.author.lastName || ""}`.trim()
    : "Olivia Hart";

  const authorAvatar = article.author?.profileImageUrl || 
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80";

  // Curated Unsplash cover fallback based on category
  const getCoverImage = () => {
    if (article.imageUrl) return article.imageUrl;
    
    const cat = (article.category || "").toLowerCase();
    if (cat.includes("lifestyle")) {
      return "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80";
    }
    if (cat.includes("travel")) {
      return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80";
    }
    if (cat.includes("personal") || cat.includes("growth")) {
      return "https://images.unsplash.com/photo-1528712306694-db4a60b18f4e?auto=format&fit=crop&w=600&q=80";
    }
    if (cat.includes("productivity") || cat.includes("philosophy")) {
      return "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80";
    }
    if (cat.includes("technology") || cat.includes("science")) {
      return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80";
    }
    // Default beautiful journal fallback
    return "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80";
  };

  // Get pastel colored pill styles based on category
  const getCategoryStyles = () => {
    const cat = (article.category || "").toLowerCase();
    if (cat.includes("lifestyle")) return "bg-rose-50 text-rose-500 border-rose-100";
    if (cat.includes("travel")) return "bg-teal-50 text-teal-500 border-teal-100";
    if (cat.includes("personal") || cat.includes("growth")) return "bg-purple-50 text-purple-500 border-purple-100";
    if (cat.includes("productivity") || cat.includes("philosophy")) return "bg-amber-50 text-amber-500 border-amber-100";
    if (cat.includes("technology") || cat.includes("science")) return "bg-blue-50 text-blue-500 border-blue-100";
    return "bg-slate-50 text-slate-500 border-slate-100";
  };

  return (
    <article
      onClick={onClick}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col h-full text-left"
    >
      {/* Card Content body */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Category Tag */}
        <div className="mb-4">
          <span className={`border text-[10px] font-extrabold tracking-wider uppercase py-1 px-3 rounded-full inline-block ${getCategoryStyles()}`}>
            {article.category || "Lifestyle"}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-xl text-slate-950 group-hover:text-rose-500 transition-colors duration-300 leading-snug mb-3 line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[13px] text-slate-500 leading-relaxed mb-6 flex-grow line-clamp-3">
          {article.content
            ? article.content.substring(0, 120) + "..."
            : "Explore this beautifully written story focusing on deep personal insights, daily routines, and lifestyle development."}
        </p>

        {/* Author footer block */}
        <div className="flex items-center gap-3 border-t border-slate-100 pt-5 mt-auto">
          <div className="flex flex-col text-[11px]">
            <span className="font-sans font-bold text-slate-900 leading-none">{authorName}</span>
            <span className="text-slate-400 leading-none mt-1">{formattedDate}</span>
          </div>
          <div className="ml-auto w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
            <ArrowUpRight size={13} className="group-hover:rotate-45 transition-transform duration-300" />
          </div>
        </div>

      </div>
    </article>
  );
}

export default BlogCard;
