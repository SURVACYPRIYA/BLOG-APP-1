import { useForm } from "react-hook-form";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { errorClass } from "../styles/common";
import { submitBtn } from "../styles/common";
import {toast} from 'react-hot-toast'

function Login() {

  const {register,handleSubmit,formState:{errors}}=useForm()
  const login = useAuth(state => state.login)
  const isAuthenticated = useAuth((state)=> state.isAuthenticated)
  const currentUser = useAuth((state)=>state.currentUser)
  const error = useAuth((state)=>state.error)
  const navigate = useNavigate()

  //console.log(("isAuthenticated: ",isAuthenticated))
  const onUserLogin = async(userCredObj) => {
    await login(userCredObj)
  }
  useEffect(()=>{
    if (isAuthenticated){
      if(currentUser.role === "USER"){
        toast.success("Logged in successfully")
        navigate("/userdashboard")
      }
    if(currentUser.role === "AUTHOR"){
      toast.success("Logged in successfully")
      navigate("/authordashboard")
    }
  }},[isAuthenticated,currentUser])

  const onSubmit=(data)=>{
    console.log(data)
  }

  return(
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit(onUserLogin)} className="w-80 space-y-4">
        {error && (
  <p className={errorClass}>
    {error}
  </p>
)}
        <h2 className="text-xl text-center">Login</h2>

        <input type="email" placeholder="Email" {...register("email",{required:true})} className="border w-full p-2" />

        <input type="password" placeholder="Password" {...register("password",{required:true})} className="border w-full p-2" />

        <button className={submitBtn}> Login </button>

      </form>
    </div>
  )
}

export default Login