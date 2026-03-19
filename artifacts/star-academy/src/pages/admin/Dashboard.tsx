import { useGetAdminStats } from '@workspace/api-client-react';
import { AdminLayout } from '@/components/layout/AdminSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, UserX, BookOpen, MessageSquare, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useGetAdminStats();

  const statCards = [
    { title: "Total Enrollments", value: stats?.totalEnrollments, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Pending Enrollments", value: stats?.pendingEnrollments, icon: UserX, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Confirmed Enrollments", value: stats?.confirmedEnrollments, icon: UserCheck, color: "text-green-600", bg: "bg-green-100" },
    { title: "Total Courses", value: stats?.totalCourses, icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Messages Received", value: stats?.totalContacts, icon: MessageSquare, color: "text-rose-600", bg: "bg-rose-100" },
    { title: "Testimonials", value: stats?.totalTestimonials, icon: Star, color: "text-indigo-600", bg: "bg-indigo-100" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <Skeleton className="h-12 w-12 rounded-xl mb-4" />
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))
        ) : (
          statCards.map((card, i) => (
            <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-slate-900 mb-1">{card.value || 0}</p>
                    <p className="text-sm font-medium text-slate-500">{card.title}</p>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.bg} ${card.color}`}>
                    <card.icon size={28} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
