import { useListContacts, useDeleteContact, getListContactsQueryKey, getGetAdminStatsQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/layout/AdminSidebar';
import { format } from 'date-fns';
import { Trash2, Mail, Phone, MessageSquare, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { asArray } from '@/lib/utils';

export default function AdminContacts() {
  const { data: contactsData = [], isLoading } = useListContacts();
  const contacts = asArray(contactsData);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  const deleteMutation = useDeleteContact();

  const handleDelete = (id: number) => {
    if (confirm("Delete this message? This cannot be undone.")) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => {
          toast({ title: "Message deleted" });
          queryClient.invalidateQueries({ queryKey: getListContactsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
        }
      });
    }
  };

  const filtered = contacts.filter(c =>
    search === '' ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
          <MessageSquare size={22} className="text-primary" /> Messages
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Inquiries and queries received from the website contact form.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="text-2xl font-extrabold text-foreground">{contacts.length}</div>
          <div className="text-xs text-muted-foreground font-medium mt-0.5">Total Messages</div>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="text-2xl font-extrabold" style={{ color: 'hsl(180,76%,22%)' }}>
            {contacts.filter(c => c.email).length}
          </div>
          <div className="text-xs text-muted-foreground font-medium mt-0.5">With Email</div>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="text-2xl font-extrabold" style={{ color: 'hsl(28,75%,52%)' }}>
            {contacts.length > 0 ? format(new Date(contacts[0]?.createdAt), 'MMM d') : '—'}
          </div>
          <div className="text-xs text-muted-foreground font-medium mt-0.5">Latest Message</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 bg-white"
        />
      </div>

      {/* Messages */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground bg-white rounded-xl border border-border">Loading messages...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground bg-white rounded-xl border border-dashed border-border">
            <MessageSquare size={36} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No messages yet</p>
            <p className="text-sm mt-1">Messages sent via the contact form will appear here.</p>
          </div>
        ) : filtered.map((contact) => (
          <div key={contact.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="px-5 py-3.5 border-b border-border bg-muted/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: 'hsl(180,76%,22%)' }}>
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-foreground text-sm">{contact.name}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-0.5">
                    {contact.phone && (
                      <a href={`tel:${contact.phone}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Phone size={11} /> {contact.phone}
                      </a>
                    )}
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Mail size={11} /> {contact.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-muted-foreground whitespace-nowrap">{format(new Date(contact.createdAt), 'MMM d, yyyy')}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(contact.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{contact.message}</p>
            </div>
            <div className="px-5 py-3 border-t border-border bg-muted/10 flex gap-2">
              <a href={`tel:${contact.phone}`}>
                <Button size="sm" variant="outline" className="h-7 text-xs font-semibold gap-1.5">
                  <Phone size={11} /> Call
                </Button>
              </a>
              {contact.email && (
                <a href={`mailto:${contact.email}`}>
                  <Button size="sm" variant="outline" className="h-7 text-xs font-semibold gap-1.5">
                    <Mail size={11} /> Reply via Email
                  </Button>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
