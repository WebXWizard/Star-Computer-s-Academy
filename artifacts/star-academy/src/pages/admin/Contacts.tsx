import { useListContacts, useDeleteContact, getListContactsQueryKey, getGetAdminStatsQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/layout/AdminSidebar';
import { format } from 'date-fns';
import { Trash2, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function AdminContacts() {
  const { data: contacts = [], isLoading } = useListContacts();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const deleteMutation = useDeleteContact();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => {
          toast({ title: "Message deleted" });
          queryClient.invalidateQueries({ queryKey: getListContactsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
        }
      });
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">Messages</h1>
        <p className="text-slate-500 mt-1">Inquiries from the website contact form.</p>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <p>Loading messages...</p>
        ) : contacts.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed">
            No messages received yet.
          </div>
        ) : (
          contacts.map((contact) => (
            <Card key={contact.id} className="border-slate-200 shadow-sm">
              <CardHeader className="py-4 px-6 border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{contact.name}</h3>
                  <div className="flex gap-4 text-sm text-slate-500 mt-1">
                    {contact.phone && <span className="flex items-center gap-1"><Phone size={14}/> {contact.phone}</span>}
                    {contact.email && <span className="flex items-center gap-1"><Mail size={14}/> {contact.email}</span>}
                    <span className="text-slate-400 pl-4 border-l">{format(new Date(contact.createdAt), 'PPp')}</span>
                  </div>
                </div>
                <Button variant="ghost" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(contact.id)}>
                  <Trash2 size={18} />
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-slate-700 whitespace-pre-wrap">{contact.message}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
