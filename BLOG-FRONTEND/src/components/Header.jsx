import { NavLink, Link, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { useState, useEffect } from "react";
import { LogOut, PenSquare, User, Menu, X } from "lucide-react";

function Header() {
  const { currentUser, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Scroll detection for sticky glass transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getDashboardPath = () => {
    if (!currentUser) return "/";
    if (currentUser.role === "admin") return "/admin-dashboard";
    if (currentUser.role === "author") return "/author-dashboard";
    return "/user-dashboard";
  };

  const Logo = () => (
    <Link to="/" className="flex items-center gap-1.5 group select-none">
      <span className="font-sans font-extrabold text-2xl tracking-tighter text-slate-900 group-hover:text-rose-500 transition-colors duration-300">
        Blogr
      </span>
      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 group-hover:scale-125 transition-transform duration-300 -mt-1.5"></span>
    </Link>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-sm py-3.5 bg-white/90"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Left Side: Brand Logo */}
        <Logo />

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 font-sans font-medium text-[13px] tracking-wide text-slate-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-rose-500 transition-colors relative py-1 ${
                isActive ? "text-rose-500 font-semibold" : ""
              }`
            }
          >
            Home
          </NavLink>




        </nav>

        <div className="hidden lg:flex items-center gap-5">


          {currentUser ? (
            <div className="flex items-center gap-4">
              {/* Write treatise trigger */}
              {(currentUser.role?.toUpperCase() === "AUTHOR" || currentUser.role?.toUpperCase() === "ADMIN") && (
                <Link
                  to="/write-article"
                  className="flex items-center gap-2 px-4.5 py-2 rounded-full border border-rose-200 text-rose-500 hover:bg-rose-50 font-sans text-xs tracking-wider uppercase font-semibold transition-all duration-300 shadow-sm"
                >
                  <PenSquare size={13} />
                  <span>Write</span>
                </Link>
              )}

              {/* User profile avatar */}
              <Link
                to={getDashboardPath()}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold border border-rose-200 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                  <User size={15} />
                </div>
                <span className="font-sans text-xs text-slate-800 font-medium group-hover:text-rose-500 transition-colors tracking-wide">
                  {currentUser.firstName || currentUser.name?.split(" ")[0]}
                </span>
              </Link>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                title="Logout"
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-slate-600 hover:text-rose-500 font-sans text-xs font-semibold tracking-wide py-2 px-3 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-rose-500 text-white hover:bg-rose-600 font-sans text-xs font-semibold tracking-wide py-2.5 px-6.5 rounded-full shadow-md shadow-rose-500/10 hover:shadow-lg transition-all duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-800 hover:text-rose-500 transition-colors p-1"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 glass border-t border-slate-100 py-6 px-8 flex flex-col gap-4.5 shadow-lg max-h-[85vh] overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-sans font-semibold text-base text-slate-800 hover:text-rose-500 transition-colors"
          >
            Home
          </Link>



          {currentUser ? (
            <>

              {(currentUser.role?.toUpperCase() === "AUTHOR" || currentUser.role?.toUpperCase() === "ADMIN") && (
                <>
                  <Link
                    to="/write-article"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 font-sans font-semibold text-base text-rose-500"
                  >
                    <PenSquare size={17} />
                    <span>Write Article</span>
                  </Link>
                  <hr className="border-slate-100 my-1" />
                </>
              )}
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs text-slate-400">
                  Signed in as {currentUser.firstName || currentUser.name}
                </span>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-1 font-sans text-xs uppercase tracking-wider font-bold text-red-500"
                >
                  <LogOut size={13} />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <hr className="border-slate-100 my-1" />
              <div className="flex flex-col gap-3 font-sans text-xs uppercase tracking-wider font-semibold text-center">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="border border-slate-200 py-3 rounded-full text-slate-700 hover:bg-slate-50 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-rose-500 text-white py-3 rounded-full hover:bg-rose-600 transition-all shadow-md shadow-rose-500/10"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
