import { useForm } from "react-hook-form";
import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "react-hot-toast";
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff } from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const login = useAuth((state) => state.login);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const error = useAuth((state) => state.error);
  const navigate = useNavigate();

  const onUserLogin = async (userCredObj) => {
    await login(userCredObj);
  };

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      toast.success("Logged in successfully");
      if (currentUser.role === "USER") {
        navigate("/user-dashboard");
      } else if (currentUser.role === "AUTHOR") {
        navigate("/author-dashboard");
      } else if (currentUser.role === "admin") {
        navigate("/admin-dashboard");
      }
    }
  }, [isAuthenticated, currentUser, navigate]);

  const Logo = () => (
    <div className="flex items-center gap-1 justify-center mb-6">
      <span className="font-sans font-extrabold text-2xl tracking-tighter text-slate-900">
        Blogr
      </span>
      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 -mt-1.5"></span>
    </div>
  );

  return (
    <div className="min-h-[85vh] -mt-20 w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#fcfbf9]">
      <div className="max-w-md w-full bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">
        
        {/* Form Container */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-slate-50/20">
          <Logo />
          
          <h2 className="font-serif text-2xl font-bold text-slate-900 text-center mb-1">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-400 text-center mb-8">
            Access your writer dashboard or reader account
          </p>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-sans rounded-2xl text-left">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onUserLogin)} className="space-y-4 text-left">
            {/* Email Field */}
            <div>
              <label className="block font-sans text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1.5 ml-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  {...register("email", { required: true })}
                  className="w-full bg-white border border-slate-200 pl-12 pr-5 py-3.5 rounded-full text-xs font-sans focus:outline-none focus:border-rose-500 shadow-sm focus:bg-white"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-4">Email address is required</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block font-sans text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1.5 ml-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                  className="w-full bg-white border border-slate-200 pl-12 pr-12 py-3.5 rounded-full text-xs font-sans focus:outline-none focus:border-rose-500 shadow-sm focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 cursor-pointer focus:outline-none flex items-center justify-center"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[10px] mt-1 ml-4">Password is required</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-md shadow-rose-500/10 hover:shadow-lg transition-all duration-300 mt-6 cursor-pointer"
            >
              <LogIn size={14} />
              <span>Log In</span>
            </button>
          </form>

          {/* Foot Links */}
          <div className="mt-8 text-center text-xs text-slate-400 font-sans">
            <span>Don't have an account? </span>
            <Link
              to="/register"
              className="text-rose-500 font-semibold hover:underline inline-flex items-center gap-0.5"
            >
              <span>Register Here</span>
              <ArrowRight size={10} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
