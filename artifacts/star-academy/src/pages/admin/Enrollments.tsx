import { useState } from 'react';
import { useListEnrollments, useUpdateEnrollmentStatus, useDeleteEnrollment, getListEnrollmentsQueryKey, getGetAdminStatsQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/layout/AdminSidebar';
import { format } from 'date-fns';
import { Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function AdminEnrollments() {
  const { data: enrollments = [], isLoading } = useListEnrollments();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
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
    if (confirm("Are you sure you want to delete this enrollment?")) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => {
          toast({ title: "Enrollment deleted" });
          queryClient.invalidateQueries({ queryKey: getListEnrollmentsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
        }
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Enrollments</h1>
          <p className="text-slate-500 mt-1">Manage student applications and course enrollments.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : enrollments.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-slate-500">No enrollments found.</TableCell></TableRow>
            ) : (
              enrollments.map((enr) => (
                <TableRow key={enr.id}>
                  <TableCell className="text-sm text-slate-500">
                    {format(new Date(enr.createdAt), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900">{enr.name}</div>
                    <div className="text-sm text-slate-500">{enr.phone} {enr.email && `• ${enr.email}`}</div>
                  </TableCell>
                  <TableCell className="font-medium">{enr.course}</TableCell>
                  <TableCell>
                    {enr.status === 'pending' && <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200"><Clock size={12} className="mr-1"/> Pending</Badge>}
                    {enr.status === 'confirmed' && <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200"><CheckCircle size={12} className="mr-1"/> Confirmed</Badge>}
                    {enr.status === 'cancelled' && <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200"><XCircle size={12} className="mr-1"/> Cancelled</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {enr.status === 'pending' && (
                        <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => handleStatusChange(enr.id, 'confirmed')}>Approve</Button>
                      )}
                      {enr.status === 'pending' && (
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleStatusChange(enr.id, 'cancelled')}>Reject</Button>
                      )}
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-600" onClick={() => handleDelete(enr.id)}>
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
