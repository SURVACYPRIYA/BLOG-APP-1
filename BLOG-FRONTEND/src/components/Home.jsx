import React from "react";
import { Link } from "react-router";
import { useAuth } from "../store/authStore";

function Home() {
  const currentUser = useAuth((state) => state.currentUser);

  return (
    <div className="w-full bg-[#fcfbf9] -mt-20 overflow-x-hidden min-h-[85vh] flex items-center justify-center">
      
      {/* Centered Landing Hero Section */}
      <section className="relative pt-36 pb-20 w-full bg-gradient-to-b from-rose-50/20 via-transparent to-transparent">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Centered Hero Content */}
          <div className="text-center flex flex-col items-center max-w-3xl mx-auto">
            <span className="font-sans text-[11px] uppercase tracking-widest font-extrabold text-rose-500 bg-rose-50 border border-rose-100 py-1.5 px-4 rounded-full mb-6">
              New Story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-slate-900 tracking-tight mb-6">
              Thoughts That Inspire, Stories That Connect.
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              Discover ideas, perspectives, and stories that inspire you to see the world differently. Written by passionate minds, curated for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4.5">
              {currentUser ? (
                <Link
                  to={
                    currentUser.role === "admin"
                      ? "/admin-dashboard"
                      : currentUser.role === "author"
                      ? "/author-dashboard"
                      : "/user-dashboard"
                  }
                  className="px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-sans text-xs font-semibold tracking-wider uppercase shadow-md shadow-rose-500/10 hover:shadow-lg transition-all duration-300"
                >
                  Go to Dashboard &rarr;
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-sans text-xs font-semibold tracking-wider uppercase shadow-md shadow-rose-500/10 hover:shadow-lg transition-all duration-300"
                >
                  Explore Articles &rarr;
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
