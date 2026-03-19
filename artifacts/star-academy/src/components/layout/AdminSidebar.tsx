import { Link, useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';
import { LayoutDashboard, Users, BookOpen, MessageSquare, Star, LogOut, ExternalLink } from 'lucide-react';

export function AdminSidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Users, label: 'Enrollments', href: '/admin/enrollments' },
    { icon: BookOpen, label: 'Courses', href: '/admin/courses' },
    { icon: MessageSquare, label: 'Messages', href: '/admin/contacts' },
    { icon: Star, label: 'Testimonials', href: '/admin/testimonials' },
  ];

  return (
    <aside
      className="w-64 flex flex-col h-screen fixed top-0 left-0 z-40"
      style={{ background: 'hsl(180,76%,10%)' }}
    >
      {/* Brand Header */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'hsl(180,60%,18%)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-lg" style={{ background: 'hsl(28,75%,52%)' }}>
            ★
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">Star Computer's</p>
            <p className="text-xs font-medium leading-tight" style={{ color: 'hsl(28,90%,68%)' }}>Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const active = location === item.href || location.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all cursor-pointer text-sm font-semibold ${
                active
                  ? 'text-white shadow-md'
                  : 'text-white/55 hover:text-white hover:bg-white/8'
              }`}
                style={active ? { background: 'hsl(28,75%,52%)' } : {}}
              >
                <item.icon size={18} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 space-y-1 border-t" style={{ borderColor: 'hsl(180,60%,18%)' }}>
        <Link href="/">
          <div className="flex items-center gap-3 w-full px-4 py-2.5 text-white/50 hover:text-white hover:bg-white/8 rounded-lg transition-all cursor-pointer text-sm font-medium">
            <ExternalLink size={17} />
            View Website
          </div>
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-white/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-sm font-medium"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'hsl(40,20%,96%)', fontFamily: 'Inter,sans-serif' }}>
      <AdminSidebar />
      <main className="ml-64 min-h-screen">
        {/* Top bar */}
        <div className="h-14 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="text-sm text-muted-foreground font-medium">
            Star Computer's Academy — Admin Portal
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'hsl(180,76%,22%)' }}>
              A
            </div>
            <span className="text-sm font-semibold text-foreground">Admin</span>
          </div>
        </div>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
