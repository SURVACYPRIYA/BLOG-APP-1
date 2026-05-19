import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { ShieldAlert, ArrowRight, Home } from "lucide-react";

const Unauthorized = ({ redirectTo = "/login", delay = 4000 }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, redirectTo, delay]);

  return (
    <div className="min-h-[85vh] -mt-20 w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#fcfbf9]">
      <div className="max-w-md w-full bg-white rounded-[2rem] border border-slate-100 p-8 sm:p-10 shadow-xl text-center flex flex-col items-center">
        
        {/* Animated Shield/Alert Icon Box */}
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-6.5 animate-bounce">
          <ShieldAlert size={30} />
        </div>

        {/* Branding header */}
        <span className="font-sans text-[10px] uppercase tracking-widest font-extrabold text-rose-500 mb-3 bg-rose-50 border border-rose-100/60 py-1.5 px-4 rounded-full">
          Restricted Entry
        </span>

        {/* Serif Headline */}
        <h1 className="font-serif text-3xl font-bold text-slate-900 leading-tight mb-4">
          Access Denied
        </h1>

        {/* Description body */}
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-xs">
          Your credentials do not grant access to this secure workspace. You will be automatically redirected to safety in a moment.
        </p>

        {/* Progress indicator */}
        <div className="w-full bg-slate-50 h-1 rounded-full overflow-hidden mb-8 relative">
          <div className="absolute top-0 left-0 h-full bg-rose-500 w-full origin-left duration-[4000ms] ease-out animate-[shimmer_4s_infinite]" style={{ animationDuration: `${delay}ms` }}></div>
        </div>

        {/* Back CTAs */}
        <div className="flex flex-col gap-3.5 w-full">
          <Link
            to="/"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-sans text-xs uppercase tracking-widest font-bold py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md shadow-rose-500/10 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <Home size={13} />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/login"
            className="w-full border border-slate-200 text-slate-700 hover:bg-slate-50 font-sans text-xs uppercase tracking-widest font-bold py-3.5 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
          >
            <span>Sign In with another Account</span>
            <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Unauthorized;
