import { NavLink } from "react-router"
import { useAuth } from "../store/authStore"
import { LogIn, UserPlus, Home, LogOut, LayoutDashboard, PenTool } from "lucide-react"

function Header() {
  const { isAuthenticated, currentUser, logout } = useAuth()

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl glass-card py-4 px-8 flex justify-between items-center animate-fade">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <PenTool className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight gradient-text">InsightFlow</span>
      </div>

      <ul className="hidden md:flex items-center gap-8 font-medium">
        <li>
          <NavLink to="/" className={({isActive}) => `flex items-center gap-2 ${isActive ? 'text-accent' : 'text-text-muted hover:text-white'}`}>
            <Home size={18} /> Home
          </NavLink>
        </li>
        
        {isAuthenticated && (
          <li>
            <NavLink 
              to={currentUser.role === 'AUTHOR' ? '/authordashboard' : currentUser.role === 'ADMIN' ? '/admindashboard' : '/userdashboard'} 
              className={({isActive}) => `flex items-center gap-2 ${isActive ? 'text-accent' : 'text-text-muted hover:text-white'}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
          </li>
        )}
      </ul>

      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <NavLink to="/login" className="text-text-muted hover:text-white font-medium flex items-center gap-2">
              <LogIn size={18} /> Login
            </NavLink>
            <NavLink to="/register" className="btn-primary py-2 px-5 text-sm">
              <UserPlus size={18} /> Join Now
            </NavLink>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-semibold">{currentUser.firstName}</span>
              <span className="text-xs text-text-muted capitalize">{currentUser.role.toLowerCase()}</span>
            </div>
            <button onClick={logout} className="p-2 hover:bg-white/10 rounded-full text-red-400 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header
