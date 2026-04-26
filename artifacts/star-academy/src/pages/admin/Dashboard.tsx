import { useGetAdminStats, useListEnrollments, useListCourses } from '@workspace/api-client-react';
import { AdminLayout } from '@/components/layout/AdminSidebar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { Users, UserCheck, Clock, BookOpen, MessageSquare, Star, TrendingUp, ArrowUpRight } from 'lucide-react';
import { asArray } from '@/lib/utils';

const TEAL = 'hsl(180,76%,22%)';
const AMBER = 'hsl(28,75%,52%)';
const GREEN = '#22c55e';
const RED = '#ef4444';
const PURPLE = '#8b5cf6';
const BLUE = '#3b82f6';

const PIE_COLORS = [AMBER, TEAL, RED, PURPLE, BLUE, GREEN];

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useGetAdminStats();
  const { data: enrollmentsData = [] } = useListEnrollments();
  const { data: coursesData = [] } = useListCourses();
  const enrollments = asArray(enrollmentsData);
  const courses = asArray(coursesData);

  // Enrollments by course (bar chart data)
  const courseEnrollmentData = courses.map(c => ({
    name: c.title.length > 18 ? c.title.slice(0, 18) + '…' : c.title,
    count: enrollments.filter(e => e.course === c.title).length,
  })).filter(c => c.count > 0);

  // Status breakdown (pie chart data)
  const pending = enrollments.filter(e => e.status === 'pending').length;
  const confirmed = enrollments.filter(e => e.status === 'confirmed').length;
  const cancelled = enrollments.filter(e => e.status === 'cancelled').length;
  const statusData = [
    { name: 'Pending', value: pending },
    { name: 'Confirmed', value: confirmed },
    { name: 'Cancelled', value: cancelled },
  ].filter(d => d.value > 0);

  // Monthly trend: group enrollments by month (last 6 months)
  const now = new Date();
  const monthLabels = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return { label: d.toLocaleString('default', { month: 'short' }), year: d.getFullYear(), month: d.getMonth() };
  });
  const trendData = monthLabels.map(({ label, year, month }) => ({
    month: label,
    enrollments: enrollments.filter(e => {
      const d = new Date(e.createdAt);
      return d.getFullYear() === year && d.getMonth() === month;
    }).length,
  }));

  const statCards = [
    { title: "Total Enrollments", value: stats?.totalEnrollments, icon: Users, color: TEAL, bg: 'hsl(180,76%,95%)', change: '+12%' },
    { title: "Pending Review", value: stats?.pendingEnrollments, icon: Clock, color: AMBER, bg: 'hsl(28,90%,95%)', change: 'Needs attention' },
    { title: "Confirmed", value: stats?.confirmedEnrollments, icon: UserCheck, color: GREEN, bg: '#f0fdf4', change: 'Approved' },
    { title: "Courses", value: stats?.totalCourses, icon: BookOpen, color: PURPLE, bg: '#f5f3ff', change: 'Active programs' },
    { title: "Messages", value: stats?.totalContacts, icon: MessageSquare, color: BLUE, bg: '#eff6ff', change: 'Unread queries' },
    { title: "Testimonials", value: stats?.totalTestimonials, icon: Star, color: '#f59e0b', bg: '#fffbeb', change: 'Student reviews' },
  ];

  const recentEnrollments = [...enrollments]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-white border border-border rounded-lg px-3 py-2">
          <TrendingUp size={13} className="text-primary" />
          Live data
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statsLoading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-border p-5 shadow-sm">
              <Skeleton className="h-10 w-10 rounded-xl mb-4" />
              <Skeleton className="h-7 w-16 mb-2" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))
        ) : statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                <ArrowUpRight size={14} className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
              </div>
              <div className="text-3xl font-extrabold text-foreground mb-0.5">{card.value ?? 0}</div>
              <div className="text-sm font-medium text-muted-foreground">{card.title}</div>
              <div className="mt-2 text-xs font-semibold" style={{ color: card.color }}>{card.change}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Area Chart - Monthly Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-base font-bold text-foreground">Enrollment Trend</h2>
            <p className="text-xs text-muted-foreground">Monthly enrollments — last 6 months</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={TEAL} stopOpacity={0.18} />
                  <stop offset="95%" stopColor={TEAL} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#888' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#888' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: 10, fontSize: 13, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                cursor={{ stroke: TEAL, strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area type="monotone" dataKey="enrollments" stroke={TEAL} strokeWidth={2.5} fill="url(#tealGrad)" dot={{ fill: TEAL, r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Status Breakdown */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-base font-bold text-foreground">Enrollment Status</h2>
            <p className="text-xs text-muted-foreground">Current breakdown</p>
          </div>
          {statusData.length === 0 ? (
            <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((_, index) => (
                    <Cell key={index} fill={[AMBER, TEAL, RED][index] || PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 13, border: '1px solid #e5e7eb' }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Bar Chart + Recent Enrollments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Bar Chart - Enrollments by Course */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-base font-bold text-foreground">Enrollments by Course</h2>
            <p className="text-xs text-muted-foreground">Which courses are most popular</p>
          </div>
          {courseEnrollmentData.length === 0 ? (
            <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">No enrollment data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={courseEnrollmentData} margin={{ top: 5, right: 10, left: -25, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} angle={-25} textAnchor="end" />
                <YAxis tick={{ fontSize: 12, fill: '#888' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 10, fontSize: 13, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                />
                <Bar dataKey="count" fill={AMBER} radius={[6, 6, 0, 0]} name="Enrollments" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Recent Enrollments */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">Recent Enrollments</h2>
              <p className="text-xs text-muted-foreground">Latest 5 applications</p>
            </div>
          </div>
          {recentEnrollments.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] text-muted-foreground text-sm">No enrollments yet</div>
          ) : (
            <div className="space-y-3">
              {recentEnrollments.map((enr) => {
                const statusColor = enr.status === 'confirmed' ? GREEN : enr.status === 'cancelled' ? RED : AMBER;
                return (
                  <div key={enr.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: TEAL }}>
                      {enr.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">{enr.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{enr.course}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ color: statusColor, background: statusColor + '18' }}>
                      {enr.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
