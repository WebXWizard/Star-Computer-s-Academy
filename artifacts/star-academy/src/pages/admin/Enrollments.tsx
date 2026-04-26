import { useState } from 'react';
import { useListEnrollments, useUpdateEnrollmentStatus, useDeleteEnrollment, getListEnrollmentsQueryKey, getGetAdminStatsQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/layout/AdminSidebar';
import { format } from 'date-fns';
import { Trash2, CheckCircle, XCircle, Clock, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { asArray } from '@/lib/utils';

export default function AdminEnrollments() {
  const { data: enrollmentsData = [], isLoading } = useListEnrollments();
  const enrollments = asArray(enrollmentsData);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  const updateStatusMutation = useUpdateEnrollmentStatus();
  const deleteMutation = useDeleteEnrollment();

  const handleStatusChange = (id: number, status: 'pending' | 'confirmed' | 'cancelled') => {
    updateStatusMutation.mutate({ id, data: { status } }, {
      onSuccess: () => {
        toast({ title: `Status updated to ${status}` });
        queryClient.invalidateQueries({ queryKey: getListEnrollmentsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this enrollment? This cannot be undone.")) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => {
          toast({ title: "Enrollment deleted" });
          queryClient.invalidateQueries({ queryKey: getListEnrollmentsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
        }
      });
    }
  };

  const filtered = enrollments.filter(e => {
    const matchSearch = search === '' ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.course.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search);
    const matchFilter = filter === 'all' || e.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all: enrollments.length,
    pending: enrollments.filter(e => e.status === 'pending').length,
    confirmed: enrollments.filter(e => e.status === 'confirmed').length,
    cancelled: enrollments.filter(e => e.status === 'cancelled').length,
  };

  const statusConfig = {
    pending: { label: 'Pending', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
          <Users size={22} className="text-primary" /> Enrollments
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage all student applications and their course enrollments.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(key => {
          const active = filter === key;
          const labels: Record<string, string> = { all: 'All', pending: 'Pending', confirmed: 'Confirmed', cancelled: 'Cancelled' };
          const colors: Record<string, string> = { all: 'hsl(180,76%,22%)', pending: '#d97706', confirmed: '#16a34a', cancelled: '#dc2626' };
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-xl border p-3 text-left transition-all ${active ? 'shadow-md' : 'bg-white hover:shadow-sm'}`}
              style={active ? { background: colors[key], borderColor: colors[key] } : { borderColor: '#e5e7eb' }}
            >
              <div className={`text-2xl font-extrabold ${active ? 'text-white' : 'text-foreground'}`}>{counts[key]}</div>
              <div className={`text-xs font-semibold mt-0.5 ${active ? 'text-white/80' : 'text-muted-foreground'}`}>{labels[key]}</div>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, course or phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Date</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Student</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Course</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Status</th>
                <th className="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-12 text-muted-foreground">Loading enrollments...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-muted-foreground">No enrollments found.</td></tr>
              ) : filtered.map((enr, idx) => {
                const cfg = statusConfig[enr.status as keyof typeof statusConfig];
                const StatusIcon = cfg?.icon || Clock;
                return (
                  <tr key={enr.id} className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${idx % 2 === 0 ? '' : 'bg-muted/10'}`}>
                    <td className="px-5 py-3.5 text-muted-foreground text-xs whitespace-nowrap">
                      {format(new Date(enr.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: 'hsl(180,76%,22%)' }}>
                          {enr.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{enr.name}</div>
                          <div className="text-xs text-muted-foreground">{enr.phone}{enr.email ? ` • ${enr.email}` : ''}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-medium text-foreground">{enr.course}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      {cfg && (
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                          <StatusIcon size={11} /> {cfg.label}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-1.5">
                        {enr.status === 'pending' && (
                          <Button size="sm" className="h-7 text-xs font-semibold bg-green-600 hover:bg-green-700 text-white px-2.5" onClick={() => handleStatusChange(enr.id, 'confirmed')}>
                            Approve
                          </Button>
                        )}
                        {enr.status === 'pending' && (
                          <Button size="sm" variant="outline" className="h-7 text-xs font-semibold text-red-600 border-red-200 hover:bg-red-50 px-2.5" onClick={() => handleStatusChange(enr.id, 'cancelled')}>
                            Reject
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-muted-foreground hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(enr.id)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-border bg-muted/20 text-xs text-muted-foreground">
            Showing {filtered.length} of {enrollments.length} enrollments
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
