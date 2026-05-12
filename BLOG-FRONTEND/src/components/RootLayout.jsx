import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router"
import { useAuth } from "../store/authStore"
import { useEffect } from "react";

function RootLayout() {

  const checkAuth=useAuth((state)=>state.checkAuth);
  const loading=useAuth((state)=>state.loading);

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  //wait until auth check completes
  if(loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-xl font-medium text-text-muted animate-pulse">Initializing InsightFlow...</p>
      </div>
    )
  }


  return (
    <div>
        <Header/>
        <div className="mx-20 min-h-screen">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout
