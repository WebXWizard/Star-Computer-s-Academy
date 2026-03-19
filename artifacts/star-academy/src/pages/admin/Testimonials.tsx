import { useState } from 'react';
import { useListTestimonials, useCreateTestimonial, useDeleteTestimonial, getListTestimonialsQueryKey, getGetAdminStatsQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/layout/AdminSidebar';
import { Plus, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

export default function AdminTestimonials() {
  const { data: testimonials = [], isLoading } = useListTestimonials();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);

  const createMutation = useCreateTestimonial();
  const deleteMutation = useDeleteTestimonial();

  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = (data: any) => {
    createMutation.mutate({ data: { ...data, rating: Number(data.rating || 5), isActive: true } }, {
      onSuccess: () => {
        toast({ title: "Testimonial added" });
        queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
        setModalOpen(false);
        reset();
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this testimonial?")) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => {
          toast({ title: "Deleted successfully" });
          queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
        }
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Testimonials</h1>
          <p className="text-slate-500 mt-1">Manage student reviews shown on the website.</p>
        </div>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus size={18} /> Add Review</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Student Review</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <Input placeholder="Student Name" required {...register("studentName")} />
              <Input placeholder="Course Completed" required {...register("course")} />
              <Select onValueChange={(v) => setValue("rating", v)} defaultValue="5">
                <SelectTrigger><SelectValue placeholder="Rating (1-5)" /></SelectTrigger>
                <SelectContent>
                  {[5,4,3,2,1].map(n => <SelectItem key={n} value={n.toString()}>{n} Stars</SelectItem>)}
                </SelectContent>
              </Select>
              <Textarea placeholder="Review Content" required rows={4} {...register("review")} />
              <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Saving..." : "Save Review"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? <p>Loading...</p> : testimonials.map(t => (
          <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative group">
            <Button size="icon" variant="ghost" className="absolute top-4 right-4 text-slate-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(t.id)}>
              <Trash2 size={16} />
            </Button>
            <div className="flex gap-1 text-amber-400 mb-3">
              {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-slate-700 italic mb-4 line-clamp-4">"{t.review}"</p>
            <div className="border-t pt-4 mt-auto">
              <p className="font-bold text-slate-900">{t.studentName}</p>
              <p className="text-xs text-slate-500">{t.course}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
