import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, NavLink } from "react-router";
import { useState, useEffect } from "react";
import { UserPlus, Mail, Lock, User, Image, ShieldAlert, Loader2, UserCircle2, BookOpenCheck } from "lucide-react"
import { toast } from 'react-hot-toast'

function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const selectedRole = watch("role");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onUserRegister = async (newUser) => {
    setLoading(true);
    const formData = new FormData();
    let { role, profileImageUrl, ...userObj } = newUser;
    
    Object.keys(userObj).forEach((key) => {
      formData.append(key, userObj[key]);
    });
    
    if (profileImageUrl?.[0]) {
      formData.append("profileImageUrl", profileImageUrl[0]);
    }

    try {
      const endpoint = role === "user" 
        ? "https://blog-app-1-kny9.onrender.com/user-api/users" 
        : "https://blog-app-1-kny9.onrender.com/author-api/users";

      let resObj = await axios.post(endpoint, formData);

      if (resObj.status === 201) {
        toast.success("Account created! Please login.");
        navigate("/Login");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Only JPG or PNG allowed");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("File size must be less than 2MB");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setError(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4">
      <div className="glass-card w-full max-w-2xl p-10 animate-fade relative overflow-hidden">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-bold gradient-text">Create Account</h2>
          <p className="text-text-muted mt-2">Join our community of passionate writers</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-fade">
            <ShieldAlert size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onUserRegister)} className="space-y-8">
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4">
            <label className={`relative glass-card p-4 flex flex-col items-center gap-3 cursor-pointer transition-all ${selectedRole === 'user' ? 'border-primary bg-primary/10' : 'hover:bg-white/5'}`}>
              <input type="radio" value="user" {...register("role", { required: true })} className="absolute opacity-0" />
              <UserCircle2 size={32} className={selectedRole === 'user' ? 'text-primary' : 'text-text-muted'} />
              <span className={`font-semibold ${selectedRole === 'user' ? 'text-white' : 'text-text-muted'}`}>Reader</span>
              <p className="text-[10px] text-center text-text-muted">Discover and comment on stories</p>
            </label>

            <label className={`relative glass-card p-4 flex flex-col items-center gap-3 cursor-pointer transition-all ${selectedRole === 'author' ? 'border-accent bg-accent/10' : 'hover:bg-white/5'}`}>
              <input type="radio" value="author" {...register("role", { required: true })} className="absolute opacity-0" />
              <BookOpenCheck size={32} className={selectedRole === 'author' ? 'text-accent' : 'text-text-muted'} />
              <span className={`font-semibold ${selectedRole === 'author' ? 'text-white' : 'text-text-muted'}`}>Author</span>
              <p className="text-[10px] text-center text-text-muted">Write and publish your own content</p>
            </label>
          </div>
          {errors.role && <p className="text-xs text-red-400 text-center -mt-4">Please select a role</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted ml-1">First Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input type="text" placeholder="John" {...register("firstName", { required: "First name is required" })} className="input-field pl-12" />
              </div>
              {errors.firstName && <p className="text-xs text-red-400 ml-1">{errors.firstName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted ml-1">Last Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input type="text" placeholder="Doe" {...register("lastName", { required: "Last name is required" })} className="input-field pl-12" />
              </div>
              {errors.lastName && <p className="text-xs text-red-400 ml-1">{errors.lastName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input type="email" placeholder="john@example.com" {...register("email", { required: "Email is required" })} className="input-field pl-12" />
              </div>
              {errors.email && <p className="text-xs text-red-400 ml-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input type="password" placeholder="••••••••" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })} className="input-field pl-12" />
              </div>
              {errors.password && <p className="text-xs text-red-400 ml-1">{errors.password.message}</p>}
            </div>
          </div>

          {/* Profile Upload */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-text-muted ml-1">Profile Picture</label>
            <div className="flex items-center gap-6 p-6 border-2 border-dashed border-glass-border rounded-2xl bg-white/5">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary bg-bg-deep flex items-center justify-center">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} className="text-text-muted" />
                  )}
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm text-text-muted">PNG or JPG, max 2MB</p>
                <input 
                  type="file" 
                  accept="image/png, image/jpeg" 
                  {...register("profileImageUrl")} 
                  onChange={handleFileChange}
                  className="block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            className="btn-primary w-full py-4 text-lg justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-8 text-text-muted text-sm">
          Already have an account?{" "}
          <NavLink to="/Login" className="text-primary font-semibold hover:underline">
            Sign In
          </NavLink>
        </p>
      </div>

      {/* Background Blobs */}
      <div className="absolute top-1/4 right-1/4 -z-10 w-96 h-96 bg-primary/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/4 -z-10 w-96 h-96 bg-accent/10 blur-[100px] rounded-full"></div>
    </div>
  )
}

export default Register;
