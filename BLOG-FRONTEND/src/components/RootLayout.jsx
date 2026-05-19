import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function RootLayout() {
  const checkAuth = useAuth((state) => state.checkAuth);
  const loading = useAuth((state) => state.loading);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Premium, state-of-the-art loading screen matching the Blogr. brand
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfbf9] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-rose-100 border-t-rose-500 animate-spin"></div>
        <p className="font-serif text-xl tracking-widest text-rose-500 font-semibold animate-pulse uppercase">Blogr.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col overflow-x-hidden">
      <Header />
      
      {/* Full bleed wrapper. Internal container constraints will be set per page */}
      <main className="flex-grow pt-20 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}

export default RootLayout;
