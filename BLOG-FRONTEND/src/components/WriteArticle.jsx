import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { PenTool, Send, Tag, AlignLeft, Loader2, ArrowLeft } from "lucide-react"

function WriteArticle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth(state => state.currentUser)

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const submitArticle = async (articleObj) => {
    setLoading(true);
    articleObj.author = currentUser._id;
    try {
      await axios.post(
        "https://blog-app-1-kny9.onrender.com/author-api/articles",
        articleObj,
        { withCredentials: true }
      );
      toast.success("Story published successfully!");
      reset();
      navigate("/authordashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to publish article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-muted hover:text-white mb-10 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Cancel Writing
      </button>

      <div className="glass-card p-10 md:p-16 animate-fade">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
            <PenTool size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold gradient-text">New Story</h2>
            <p className="text-text-muted">Draft your next masterpiece</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(submitArticle)} className="space-y-10">
          {/* Title */}
          <div className="space-y-4">
            <label className="text-lg font-bold flex items-center gap-2">
              <span className="text-primary"><AlignLeft size={20} /></span>
              Article Title
            </label>
            <input
              type="text"
              className="input-field text-xl py-5"
              placeholder="Give your story a compelling title..."
              {...register("title", {
                required: "Title is required",
                minLength: { value: 5, message: "Title must be at least 5 characters" },
              })}
            />
            {errors.title && <p className="text-xs text-red-400 ml-1">{errors.title.message}</p>}
          </div>

          {/* Category */}
          <div className="space-y-4">
            <label className="text-lg font-bold flex items-center gap-2">
              <span className="text-accent"><Tag size={20} /></span>
              Category
            </label>
            <select
              className="input-field appearance-none"
              {...register("category", { required: "Category is required" })}
            >
              <option value="" className="bg-bg-deep">Choose a topic</option>
              <option value="technology" className="bg-bg-deep">Technology</option>
              <option value="programming" className="bg-bg-deep">Programming</option>
              <option value="ai" className="bg-bg-deep">AI & Future</option>
              <option value="web-development" className="bg-bg-deep">Web Development</option>
              <option value="lifestyle" className="bg-bg-deep">Lifestyle</option>
            </select>
            {errors.category && <p className="text-xs text-red-400 ml-1">{errors.category.message}</p>}
          </div>

          {/* Content */}
          <div className="space-y-4">
            <label className="text-lg font-bold flex items-center gap-2">
              <span className="text-purple-400"><AlignLeft size={20} /></span>
              Content
            </label>
            <textarea
              rows="12"
              className="input-field leading-relaxed"
              placeholder="Tell your story... (minimum 50 characters)"
              {...register("content", {
                required: "Content is required",
                minLength: { value: 50, message: "Content must be at least 50 characters" },
              })}
            />
            {errors.content && <p className="text-xs text-red-400 ml-1">{errors.content.message}</p>}
          </div>

          {/* Submit */}
          <button 
            disabled={loading}
            className="btn-primary w-full py-5 text-xl justify-center shadow-xl shadow-primary/20 mt-8"
          >
            {loading ? <Loader2 className="animate-spin" size={28} /> : (
              <>Publish to Network <Send size={20} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default WriteArticle;
