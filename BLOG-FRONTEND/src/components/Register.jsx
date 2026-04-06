import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import { errorClass, loadingClass, submitBtn } from "../styles/common";
import { useState } from "react";
import { useEffect } from "react";

function Register() {

  const { register, handleSubmit, formState:{errors} } = useForm();

  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview,setPreview]=useState();

  const navigate = useNavigate();

  useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
        }, [preview]);
  const onUserRegister = async (newUser) => {
  
    setLoading(true);
    
    // Create form data object
        const formData = new FormData();
        //get user object
        let { role, profileImageUrl, ...userObj } = newUser;
        //add all fields except profilePic to FormData object
        Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
        });
        // add profilePic to Formdata object
        formData.append("profileImageUrl", profileImageUrl[0]);

    

    
    try {

     // user registration
      if(role === "user"){

        let resObj = await axios.post(
          "http://localhost:4000/user-api/users",
          formData
        );

        if(resObj.status === 201){
          navigate("/Login");
        }
      }

      // author registration
      if(role === "author"){

        let resObj = await axios.post(
          "http://localhost:4000/author-api/users",
          formData
        );

        if(resObj.status === 201){
          navigate("/Login");
        }
      }

    } catch(err){
      console.log(err)
      setError(err.response?.data?.error || "Registration failed");
    } finally{
      setLoading(false);
    }
  }


  if(loading){
    return <p className={loadingClass}>Loading...</p>
  }

  /*if(error){
    return <p className={errorClass}>{error.message}</p>
  }*/

  return (
    <div className="flex justify-center mt-10">
      
    <div className="w-80">
    {error && (
      <p className={errorClass}>
        {error}
      </p>
    )}
      <form onSubmit={handleSubmit(onUserRegister)} className="w-80 space-y-4">

        <h2 className="text-2xl font-bold text-center">Register</h2>

        <div>
          <label>Select Role</label><br/>

          <input type="radio" value="user"
          {...register("role",{required:true})}/> User

          <input type="radio" value="author"
          {...register("role",{required:true})}/> Author

          {errors.role && <p className="text-red-500">Role required</p>}
        </div>
        
        <input
        type="text"
        placeholder="First name"
        {...register("firstName",{required:true})}
        className="border w-full p-2"
        />

        {errors.firstName && <p className="text-red-500">First name required</p>}

        <input
        type="text"
        placeholder="Last name"
        {...register("lastName",{required:true})}
        className="border w-full p-2"
        />

        <input
        type="email"
        placeholder="Email"
        {...register("email",{required:true})}
        className="border w-full p-2"
        />

        <input
        type="password"
        placeholder="Password"
        {...register("password",{required:true,minLength:6})}
        className="border w-full p-2"
        />

        <input
        type="file"
        accept="image/png, image/jpeg"
        {...register("profileImageUrl")}
        onChange={(e) => {

            //get image file
            const file = e.target.files[0];
            // validation for image format
            if (file) {
                if (!["image/jpeg", "image/png"].includes(file.type)) {
                setError("Only JPG or PNG allowed");
                return;
                }
                //validation for file size
                if (file.size > 2 * 1024 * 1024) {
                setError("File size must be less than 2MB");
                return;
                }
                //Converts file → temporary browser URL(create preview URL)
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
                setError(null);
            }

        }} />

        {preview && (
                <div className="mt-3 flex justify-center">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                />
                </div>
            )}

        <button className={submitBtn}>
          Register
        </button>

      </form>
    </div>
    </div>
  )
}

export default Register;