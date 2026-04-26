import { Link } from 'wouter';
import { MapPin, Phone, Mail, Facebook, Youtube, MessageCircle, ChevronRight } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Courses', href: '/courses' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer style={{ background: 'hsl(180,76%,10%)', fontFamily: 'Inter,sans-serif' }} className="text-white pt-14 pb-8 border-t-4 border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/10 p-1.5 rounded-lg">
                <img src={`${import.meta.env.BASE_URL}images/logo.jpg`} alt="Star Academy" className="h-9 w-9 object-contain" />
              </div>
              <div>
                <span className="font-extrabold text-base block leading-tight text-white">Star Computer's Academy</span>
                <span className="text-xs font-medium block leading-tight" style={{ color: 'hsl(28,90%,68%)' }}>Excellence in Computer Education</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Premier computer education institute in Sarsaundi, UP. Empowering students and job seekers with practical digital skills.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-5 pb-2 border-b border-white/10 flex items-center gap-2">
              <span style={{ color: 'hsl(28,90%,68%)' }}>—</span> Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-secondary transition-colors flex items-center gap-2 text-sm font-medium">
                    <ChevronRight size={13} style={{ color: 'hsl(28,90%,68%)' }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold mb-5 pb-2 border-b border-white/10 flex items-center gap-2">
              <span style={{ color: 'hsl(28,90%,68%)' }}>—</span> Contact Info
            </h3>
            <ul className="space-y-3.5 text-sm text-white/60">
              <li className="flex gap-2.5 items-start">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'hsl(28,90%,68%)' }} />
                <span>X323+PRJ, Sarsaundi,<br />Uttar Pradesh 225001</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone size={16} className="flex-shrink-0" style={{ color: 'hsl(28,90%,68%)' }} />
                <a href="tel:+917275540378" className="hover:text-secondary transition-colors">+91 72755 40378</a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail size={16} className="flex-shrink-0" style={{ color: 'hsl(28,90%,68%)' }} />
                <a href="mailto:staracademydu78@gmail.com" className="hover:text-secondary transition-colors text-xs">staracademydu78@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-base font-bold mb-5 pb-2 border-b border-white/10 flex items-center gap-2">
              <span style={{ color: 'hsl(28,90%,68%)' }}>—</span> Follow Us
            </h3>
            <p className="text-white/60 text-sm mb-4">Stay connected for updates and digital tips.</p>
            <div className="flex gap-2.5">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors" title="Facebook">
                <Facebook size={17} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors" title="YouTube">
                <Youtube size={17} />
              </a>
              <a href="https://wa.me/917275540378" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors" title="WhatsApp">
                <MessageCircle size={17} />
              </a>
            </div>
            <div className="mt-5 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-white/50 mb-1 font-semibold uppercase tracking-wide">Working Hours</p>
              <p className="text-xs text-white/70">Mon–Sat: 7:00 AM – 7:00 PM</p>
              <p className="text-xs text-white/50">Sunday: Closed</p>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Star Computer's Academy, Sarsaundi. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-white/70 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
