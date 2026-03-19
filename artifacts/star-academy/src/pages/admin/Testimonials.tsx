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

const avatarColors = ['0f6b6b', 'e07d2c', '2d6a8a', '8a2d6a', '6a8a2d'];

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
        toast({ title: "Testimonial added successfully" });
        queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
        setModalOpen(false);
        reset();
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this testimonial? This cannot be undone.")) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => {
          toast({ title: "Testimonial deleted" });
          queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
        }
      });
    }
  };

  const avgRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : '—';

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <Star size={22} className="text-secondary fill-secondary" /> Testimonials
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage student reviews shown on the public website.</p>
        </div>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 text-white font-semibold" style={{ background: 'hsl(180,76%,22%)' }}>
              <Plus size={16} /> Add Review
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-primary">Add Student Review</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-3">
              <Input placeholder="Student Name *" required {...register("studentName")} />
              <Input placeholder="Course Completed *" required {...register("course")} />
              <Select onValueChange={(v) => setValue("rating", v)} defaultValue="5">
                <SelectTrigger><SelectValue placeholder="Star Rating" /></SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map(n => (
                    <SelectItem key={n} value={n.toString()}>
                      {'★'.repeat(n)} {n} Star{n > 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea placeholder="Student's review *" required rows={4} {...register("review")} />
              <Button type="submit" className="w-full text-white font-semibold" style={{ background: 'hsl(180,76%,22%)' }} disabled={createMutation.isPending}>
                {createMutation.isPending ? "Saving..." : "Save Review"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="text-2xl font-extrabold text-foreground">{testimonials.length}</div>
          <div className="text-xs text-muted-foreground font-medium mt-0.5">Total Reviews</div>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="text-2xl font-extrabold" style={{ color: 'hsl(28,75%,52%)' }}>{avgRating}★</div>
          <div className="text-xs text-muted-foreground font-medium mt-0.5">Average Rating</div>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="text-2xl font-extrabold" style={{ color: 'hsl(180,76%,22%)' }}>{testimonials.filter(t => t.isActive).length}</div>
          <div className="text-xs text-muted-foreground font-medium mt-0.5">Shown on Site</div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading testimonials...</div>
      ) : testimonials.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground bg-white rounded-xl border border-dashed border-border">
          <Star size={36} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No testimonials yet</p>
          <p className="text-sm mt-1">Add your first student review using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <div key={t.id} className="bg-white rounded-xl border border-border shadow-sm p-5 relative group hover:shadow-md transition-shadow">
              <button
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                onClick={() => handleDelete(t.id)}
              >
                <Trash2 size={14} />
              </button>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < t.rating ? 'text-secondary fill-secondary' : 'text-muted-foreground/30 fill-muted-foreground/10'} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic line-clamp-4 leading-relaxed mb-4">"{t.review}"</p>
              <div className="flex items-center gap-2.5 pt-3 border-t border-border">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.studentName)}&background=${avatarColors[idx % avatarColors.length]}&color=fff&size=80&bold=true`}
                  alt={t.studentName}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-sm text-foreground">{t.studentName}</p>
                  <p className="text-xs text-primary font-medium">{t.course}</p>
                </div>
                {t.isActive && (
                  <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Live</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
