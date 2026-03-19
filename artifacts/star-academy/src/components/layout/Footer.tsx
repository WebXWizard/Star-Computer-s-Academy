import { Link } from 'wouter';
import { MapPin, Phone, Mail, Facebook, Youtube, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-1 rounded-md">
                <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Star Academy" className="h-8 w-8 object-contain" />
              </div>
              <span className="font-display font-bold text-2xl">Star Academy</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering students with practical digital skills to succeed in the modern professional world. Your journey to becoming job-ready starts here in Sarsaundi.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube size={18} />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold mb-6 border-b border-white/10 pb-4 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/#about" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"><span className="text-primary text-xs">▶</span> About Us</a></li>
              <li><a href="/#courses" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"><span className="text-primary text-xs">▶</span> Our Courses</a></li>
              <li><a href="/#testimonials" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"><span className="text-primary text-xs">▶</span> Student Reviews</a></li>
              <li><a href="/#contact" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"><span className="text-primary text-xs">▶</span> Contact Us</a></li>
              <li><Link href="/admin" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"><span className="text-primary text-xs">▶</span> Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display font-bold mb-6 border-b border-white/10 pb-4 inline-block">Contact Info</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-3 items-start">
                <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
                <span>X323+PRJ, Sarsaundi,<br/>Uttar Pradesh, 225001<br/>India</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="text-primary shrink-0" size={18} />
                <span>info@staracademy.in</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Star Computer's Academy. All rights reserved.</p>
          <p>Designed with ❤️ for education</p>
        </div>
      </div>
    </footer>
  );
}
