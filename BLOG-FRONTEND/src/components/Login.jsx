import { useForm } from "react-hook-form";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router";
import { toast } from 'react-hot-toast'
import { LogIn, Mail, Lock, ShieldAlert, Loader2 } from "lucide-react"

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { login, isAuthenticated, currentUser, error, loading } = useAuth()
  const navigate = useNavigate()

  const onUserLogin = async (userCredObj) => {
    await login(userCredObj)
  }

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      toast.success("Welcome back!")
      if (currentUser.role === "USER") navigate("/userdashboard")
      else if (currentUser.role === "AUTHOR") navigate("/authordashboard")
      else if (currentUser.role === "ADMIN") navigate("/admindashboard")
    }
  }, [isAuthenticated, currentUser, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="glass-card w-full max-w-md p-10 animate-fade relative overflow-hidden">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
            <LogIn size={32} />
          </div>
          <h2 className="text-3xl font-bold gradient-text">Welcome Back</h2>
          <p className="text-text-muted mt-2">Enter your credentials to continue</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-fade">
            <ShieldAlert size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onUserLogin)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                type="email" 
                placeholder="name@example.com" 
                {...register("email", { required: "Email is required" })} 
                className="input-field pl-12" 
              />
            </div>
            {errors.email && <p className="text-xs text-red-400 ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                {...register("password", { required: "Password is required" })} 
                className="input-field pl-12" 
              />
            </div>
            {errors.password && <p className="text-xs text-red-400 ml-1">{errors.password.message}</p>}
          </div>

          <button 
            disabled={loading}
            className="btn-primary w-full py-4 text-lg mt-4 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-text-muted text-sm">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-primary font-semibold hover:underline">
            Create one now
          </NavLink>
        </p>
      </div>
      
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 -z-10 w-96 h-96 bg-primary/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 -z-10 w-96 h-96 bg-accent/10 blur-[100px] rounded-full"></div>
    </div>
  )
}

export default Login
