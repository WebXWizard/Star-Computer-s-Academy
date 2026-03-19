import { Link } from 'wouter';
import { MapPin, Phone, Mail, Facebook, Youtube, MessageCircle, ChevronRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-8 border-t-[6px] border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-1 rounded-md">
                <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Star Academy" className="h-10 w-10 object-contain" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">Star Academy</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leading computer education institute in Sarsaundi. Empowering students with practical digital skills to succeed in the modern professional world.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-secondary rounded"></span>
            </h3>
            <ul className="space-y-3">
              <li><a href="/#" className="text-slate-400 hover:text-secondary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-secondary" /> Home</a></li>
              <li><a href="/#about" className="text-slate-400 hover:text-secondary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-secondary" /> About Us</a></li>
              <li><a href="/#courses" className="text-slate-400 hover:text-secondary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-secondary" /> Our Courses</a></li>
              <li><a href="/#contact" className="text-slate-400 hover:text-secondary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-secondary" /> Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 inline-block">
              Get In Touch
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-secondary rounded"></span>
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-3 items-start">
                <MapPin className="text-secondary shrink-0 mt-0.5" size={18} />
                <span>X323+PRJ, Sarsaundi,<br/>Uttar Pradesh, 225001</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="text-secondary shrink-0" size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="text-secondary shrink-0" size={18} />
                <span>starcomputeracademy@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 inline-block">
              Connect With Us
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-secondary rounded"></span>
            </h3>
            <p className="text-slate-400 text-sm mb-4">Follow us on social media for updates and tech tips.</p>
            <div className="flex gap-3">
              <a href="#" className="h-10 w-10 rounded bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube size={18} />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="h-10 w-10 rounded bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Star Computer's Academy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-secondary transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
