import { Link, useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';
import { LayoutDashboard, Users, BookOpen, MessageSquare, Star, LogOut } from 'lucide-react';

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
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed top-0 left-0">
      <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800">
        <h2 className="text-white font-display font-bold text-lg flex items-center gap-2">
          <span className="text-primary">★</span> Star Admin
        </h2>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const active = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                active 
                  ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}>
                <item.icon size={20} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
