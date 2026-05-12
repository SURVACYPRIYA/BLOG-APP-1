import { NavLink } from 'react-router';
import { Code, Send, Briefcase, PenTool } from "lucide-react"

function Footer() {
  return (
    <footer className="mt-40 border-t border-glass-border py-20 bg-bg-deep/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <PenTool className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight gradient-text">InsightFlow</span>
            </div>
            <p className="text-text-muted text-lg max-w-sm leading-relaxed">
              Empowering creators to share their stories with a global audience through a beautiful and seamless digital publishing experience.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Platform</h4>
            <ul className="space-y-4">
              <li><NavLink to="/" className="text-text-muted hover:text-primary transition-colors">Home</NavLink></li>
              <li><NavLink to="/login" className="text-text-muted hover:text-primary transition-colors">Author Login</NavLink></li>
              <li><NavLink to="/register" className="text-text-muted hover:text-primary transition-colors">Join Community</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-sm">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-glass-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Code size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-glass-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Send size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-glass-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Briefcase size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">© 2025 InsightFlow. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-text-muted">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
