import { Link } from "react-router";
import { Mail, Shield, BookOpen, Heart } from "lucide-react";

function Footer() {
  const Logo = () => (
    <Link to="/" className="flex items-center gap-1 group select-none">
      <span className="font-sans font-extrabold text-xl tracking-tighter text-slate-900 group-hover:text-rose-500 transition-colors duration-300">
        Blogr
      </span>
      <span className="w-2 h-2 rounded-full bg-rose-500 -mt-1 group-hover:scale-125 transition-transform duration-300"></span>
    </Link>
  );

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-100/80 pt-16 pb-12 w-full font-sans">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        
        {/* Column 1: Brand & Bio */}
        <div className="flex flex-col gap-4.5 md:col-span-1">
          <Logo />
          <p className="text-slate-500 text-[13px] leading-relaxed max-w-sm">
            A clean, modern, and engaging space for thoughts that inspire and stories that connect. Discover perspectives that motivate you to see the world differently.
          </p>
          <div className="flex items-center gap-2.5 text-slate-400 text-xs mt-1">
            <Mail size={14} className="text-rose-500" />
            <span className="hover:text-rose-500 transition-colors">hello@blogr.com</span>
          </div>
        </div>

        {/* Column 2: Categories */}
        <div className="flex flex-col gap-3.5">
          <h4 className="font-sans text-[11px] tracking-widest uppercase font-bold text-slate-900">
            Categories
          </h4>
          <ul className="flex flex-col gap-2.5 text-[13px] text-slate-500">
            <li>
              <a href="#categories" className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 inline-block">
                Lifestyle
              </a>
            </li>
            <li>
              <a href="#categories" className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 inline-block">
                Travel
              </a>
            </li>
            <li>
              <a href="#categories" className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 inline-block">
                Personal Growth
              </a>
            </li>
            <li>
              <a href="#categories" className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 inline-block">
                Productivity
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className="flex flex-col gap-3.5">
          <h4 className="font-sans text-[11px] tracking-widest uppercase font-bold text-slate-900">
            Resources
          </h4>
          <ul className="flex flex-col gap-2.5 text-[13px] text-slate-500">
            <li>
              <Link to="/write-article" className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 inline-block">
                Write a Story
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 inline-block">
                Subscribe Portal
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 inline-block">
                Author Login
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 inline-block">
                Latest Highlights
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Guidelines */}
        <div className="flex flex-col gap-3.5">
          <h4 className="font-sans text-[11px] tracking-widest uppercase font-bold text-slate-900">
            Our Purpose
          </h4>
          <p className="text-slate-500 text-[13px] leading-relaxed">
            All submitted content is reviewed by our editorial desk to guarantee readability, beautiful layout, and engaging prose.
          </p>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
            <Heart size={14} className="text-rose-500 animate-pulse" />
            <span className="font-sans tracking-wide text-[10px] uppercase font-bold text-rose-500/90">
              Community Centered
            </span>
          </div>
        </div>

      </div>

      {/* Footer Bottom copyright block */}
      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-slate-400">
        <p>&copy; {new Date().getFullYear()} Blogr. All rights reserved.</p>
        <div className="flex gap-5 font-sans text-[11px] font-medium tracking-wide">
          <Link to="/" className="hover:text-rose-500 transition-colors">Privacy Policy</Link>
          <Link to="/" className="hover:text-rose-500 transition-colors">Terms of Service</Link>
          <Link to="/" className="hover:text-rose-500 transition-colors">Contact Desk</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
