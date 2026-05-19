import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "../axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../store/authStore";
import { PenSquare, ArrowLeft, HelpCircle } from "lucide-react";

function WriteArticle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth((state) => state.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitArticle = async (articleObj) => {
    if (!currentUser) {
      toast.error("You must be logged in as a writer to publish articles.");
      return;
    }
    setLoading(true);

    // Bind author ID
    articleObj.author = currentUser._id;
    try {
      await axios.post("/author-api/articles", articleObj);
      toast.success("Story published successfully!");
      reset();
      navigate("/author-dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to publish story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#fcfbf9] -mt-20 py-12 text-left">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl pt-24">
        {/* Navigation back anchor */}
        <Link
          to="/author-dashboard"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors text-xs font-sans uppercase font-bold tracking-wider mb-8"
        >
          <ArrowLeft size={14} />
          <span>Back to Workspace</span>
        </Link>

        {/* Form Container Card */}
        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 sm:p-12 shadow-md">
          <div className="flex items-center gap-2 mb-3 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full text-rose-500 font-sans text-[10px] uppercase tracking-wider font-extrabold max-w-max">
            <PenSquare size={12} />
            <span>New Publication</span>
          </div>

          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">
            Draft New Story
          </h2>
          <p className="text-xs text-slate-400 mb-8 pb-6 border-b border-slate-100">
            Publish your creative insights, daily routines, or lifestyle narratives directly to the home feed.
          </p>

          <form onSubmit={handleSubmit(submitArticle)} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block font-sans text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2 ml-3">
                Story Title / Headline
              </label>
              <input
                type="text"
                required
                placeholder="e.g., The Art of Simple Living: A Guide to Slow Morning Routines"
                {...register("title", {
                  required: "Story Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters long",
                  },
                })}
                className="w-full bg-white border border-slate-200 px-5.5 py-3.5 rounded-full text-xs font-sans focus:outline-none focus:border-rose-500 shadow-sm focus:bg-white"
              />
              {errors.title && <p className="text-red-500 text-[10px] mt-1.5 ml-4">{errors.title.message}</p>}
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block font-sans text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2 ml-3">
                Story Category
              </label>
              <div className="relative">
                <select
                  required
                  {...register("category", { required: "Story Category is required" })}
                  className="w-full bg-white border border-slate-200 px-5.5 py-3.5 rounded-full text-xs font-sans focus:outline-none focus:border-rose-500 shadow-sm cursor-pointer focus:bg-white"
                >
                  <option value="">Select Category</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Programming">Programming</option>
                  <option value="Travel">Travel</option>
                  <option value="Personal Growth">Personal Growth</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Technology">Technology</option>
                  <option value="Health">Health</option>
                </select>
              </div>
              {errors.category && <p className="text-red-500 text-[10px] mt-1.5 ml-4">{errors.category.message}</p>}
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block font-sans text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2 ml-3">
                Manuscript Content (Markdown supported)
              </label>
              <textarea
                required
                rows="10"
                placeholder="Compose your beautiful lifestyle story here..."
                {...register("content", {
                  required: "Manuscript content is required",
                  minLength: {
                    value: 50,
                    message: "Manuscript content must be at least 50 characters",
                  },
                })}
                className="w-full bg-white border border-slate-200 p-6 rounded-3xl text-sm font-serif leading-relaxed focus:outline-none focus:border-rose-500 shadow-sm focus:bg-white"
              />
              {errors.content && <p className="text-red-500 text-[10px] mt-1.5 ml-4">{errors.content.message}</p>}
            </div>

            {/* Guidelines Help Tip */}
            <div className="flex gap-3 bg-slate-50 p-4.5 rounded-2xl border border-slate-100 text-xs text-slate-400">
              <HelpCircle size={17} className="text-rose-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Publication Standard:</strong> Ensure beautiful storytelling paragraphs are separated by double linebreaks for a clean reading flow.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-md shadow-rose-500/10 hover:shadow-lg transition-all duration-300 mt-8 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PenSquare size={14} />
              <span>{loading ? "Publishing Story..." : "Publish Story"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WriteArticle;
