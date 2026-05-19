import { useForm } from "react-hook-form";
import axios from "../axios";
import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import { User, PenSquare, Upload, ArrowRight, UserPlus, Eye, EyeOff } from "lucide-react";

function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "user",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Watch role selection to style active card
  const selectedRole = watch("role");

  // Clean up object URL previews
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onUserRegister = async (newUser) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    let { role, profileImageUrl, ...userObj } = newUser;

    // Append standard user fields
    Object.keys(userObj).forEach((key) => {
      formData.append(key, userObj[key]);
    });

    // Append file if selected
    if (profileImageUrl && profileImageUrl[0]) {
      formData.append("profileImageUrl", profileImageUrl[0]);
    }

    try {
      let endpoint = role === "user" ? "/user-api/users" : "/author-api/users";
      let resObj = await axios.post(endpoint, formData);

      if (resObj.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Registration failed. Please check details.");
    } finally {
      setLoading(false);
    }
  };

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
        
        {/* Registration Form Container */}
        <div className="p-8 sm:p-10 flex flex-col justify-center bg-slate-50/20 max-h-[85vh] overflow-y-auto">
          <Logo />
          
          <h2 className="font-serif text-2xl font-bold text-slate-900 text-center mb-1">
            Create Account
          </h2>
          <p className="text-xs text-slate-400 text-center mb-6">
            Select your brand role and enter details
          </p>

          {error && (
            <div className="mb-6 p-4.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-sans rounded-2xl text-left">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-rose-100 border-t-rose-500 animate-spin"></div>
              <span className="font-sans text-xs uppercase tracking-wider text-slate-400">Creating Account...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onUserRegister)} className="space-y-4.5 text-left">
              
              {/* Role Selection Cards */}
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2 ml-3">
                  Select Account Type
                </label>
                <div className="grid grid-cols-2 gap-3.5">
                  {/* Reader Role Card */}
                  <div
                    onClick={() => setValue("role", "user")}
                    className={`p-4.5 rounded-2xl border text-center cursor-pointer transition-all duration-300 flex flex-col items-center gap-1.5 ${
                      selectedRole === "user"
                        ? "bg-rose-50/70 border-rose-500 text-rose-950 shadow-sm"
                        : "bg-white border-slate-200 text-slate-400 hover:border-rose-300"
                    }`}
                  >
                    <User size={16} className={selectedRole === "user" ? "text-rose-500" : "text-slate-400"} />
                    <span className="font-sans text-[10px] uppercase tracking-wider font-bold">Reader</span>
                  </div>

                  {/* Author Role Card */}
                  <div
                    onClick={() => setValue("role", "author")}
                    className={`p-4.5 rounded-2xl border text-center cursor-pointer transition-all duration-300 flex flex-col items-center gap-1.5 ${
                      selectedRole === "author"
                        ? "bg-rose-50/70 border-rose-500 text-rose-950 shadow-sm"
                        : "bg-white border-slate-200 text-slate-400 hover:border-rose-300"
                    }`}
                  >
                    <PenSquare size={16} className={selectedRole === "author" ? "text-rose-500" : "text-slate-400"} />
                    <span className="font-sans text-[10px] uppercase tracking-wider font-bold">Writer</span>
                  </div>
                </div>
              </div>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    {...register("firstName", { required: true })}
                    className="w-full bg-white border border-slate-200 px-4 py-3 rounded-full text-xs font-sans focus:outline-none focus:border-rose-500 shadow-sm focus:bg-white"
                  />
                  {errors.firstName && <p className="text-red-500 text-[9px] mt-1 ml-3">Required</p>}
                </div>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    {...register("lastName", { required: true })}
                    className="w-full bg-white border border-slate-200 px-4 py-3 rounded-full text-xs font-sans focus:outline-none focus:border-rose-500 shadow-sm focus:bg-white"
                  />
                  {errors.lastName && <p className="text-red-500 text-[9px] mt-1 ml-3">Required</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  {...register("email", { required: true })}
                  className="w-full bg-white border border-slate-200 px-5.5 py-3.5 rounded-full text-xs font-sans focus:outline-none focus:border-rose-500 shadow-sm focus:bg-white"
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-3">Email address is required</p>}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password (Min 6 chars)"
                    {...register("password", { required: true, minLength: 6 })}
                    className="w-full bg-white border border-slate-200 pl-5.5 pr-12 py-3.5 rounded-full text-xs font-sans focus:outline-none focus:border-rose-500 shadow-sm focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 cursor-pointer focus:outline-none flex items-center justify-center"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-[10px] mt-1 ml-3">Password must be min 6 characters</p>}
              </div>

              {/* Avatar File Uploader */}
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1.5 ml-3">
                  Profile Photo (JPG/PNG, Max 2MB)
                </label>
                <div className="flex items-center gap-4">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-11 h-11 object-cover rounded-full border border-rose-200 bg-white"
                    />
                  ) : (
                    <div className="w-11 h-11 object-cover rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400">
                      <Upload size={15} />
                    </div>
                  )}
                  <div className="flex-grow relative">
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      {...register("profileImageUrl")}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (!["image/jpeg", "image/png"].includes(file.type)) {
                            setError("Only JPG or PNG images are allowed");
                            return;
                          }
                          if (file.size > 2 * 1024 * 1024) {
                            setError("Profile image must be under 2MB");
                            return;
                          }
                          const previewUrl = URL.createObjectURL(file);
                          setPreview(previewUrl);
                          setError(null);
                        }
                      }}
                      className="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4.5 file:rounded-full file:border-0 file:text-[10px] file:uppercase file:font-sans file:font-extrabold file:tracking-wider file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-md shadow-rose-500/10 hover:shadow-lg transition-all duration-300 mt-6 cursor-pointer"
              >
                <UserPlus size={14} />
                <span>Register</span>
              </button>
            </form>
          )}

          {/* Foot Links */}
          <div className="mt-6 text-center text-xs text-slate-400 font-sans">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="text-rose-500 font-semibold hover:underline inline-flex items-center gap-0.5"
            >
              <span>Login Here</span>
              <ArrowRight size={10} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
