import React from "react";
import { useRouteError, Link } from "react-router";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

function ErrorBoundary() {
  const error = useRouteError();
  console.error("ErrorBoundary caught an active route error:", error);

  // Safely extract error details
  const errorMessage = error?.data || error?.message || "An unexpected application error occurred.";
  const errorStatus = error?.status || "Unknown Code";
  const errorStatusText = error?.statusText || "Internal Application Crash";

  return (
    <div className="min-h-[85vh] -mt-20 w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#fcfbf9]">
      <div className="max-w-2xl w-full bg-white rounded-[2rem] border border-slate-100 p-8 sm:p-12 shadow-xl text-center flex flex-col items-center">
        
        {/* Coral Alert Icon Box */}
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-6.5 animate-pulse">
          <AlertTriangle size={30} />
        </div>

        {/* Brand Department Tag */}
        <span className="font-sans text-[10px] uppercase tracking-widest font-extrabold text-rose-500 mb-3 bg-rose-50 border border-rose-100/60 py-1.5 px-4 rounded-full">
          Editorial Catch
        </span>

        {/* Serif Headline */}
        <h1 className="font-serif text-3xl font-bold text-slate-900 leading-tight mb-4">
          An Unexpected Story Turn
        </h1>

        {/* Excerpt */}
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-md mx-auto">
          We encountered an issue reading or composing this section of the digital archives. The error details have been logged for review.
        </p>

        {/* Diagnostic Code Card */}
        <div className="w-full bg-[#fcfbf9] border border-slate-100 p-6.5 rounded-[1.5rem] text-left mb-8.5 max-h-[160px] overflow-y-auto font-mono text-[11px] text-slate-500 select-all leading-normal">
          <div className="text-rose-500 font-extrabold uppercase text-[9px] tracking-wider mb-2 border-b border-slate-100 pb-1.5">
            Diagnostic Code: {errorStatus} — {errorStatusText}
          </div>
          <div className="whitespace-pre-wrap">{errorMessage}</div>
        </div>

        {/* Back CTAs */}
        <div className="flex flex-col sm:flex-row gap-4.5 w-full justify-center">
          <Link
            to="/"
            className="px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-md shadow-rose-500/10 hover:shadow-lg transition-all duration-300 cursor-pointer shrink-0"
          >
            <Home size={13} />
            <span>Return to Home</span>
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer shrink-0"
          >
            <RotateCcw size={13} />
            <span>Reload Document</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default ErrorBoundary;
