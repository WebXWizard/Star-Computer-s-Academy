import { useState } from 'react';
import { useListCourses, useCreateCourse, useDeleteCourse, getListCoursesQueryKey, getGetAdminStatsQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/layout/AdminSidebar';
import { Plus, Trash2, BookOpen, Clock, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

export default function AdminCourses() {
  const { data: courses = [], isLoading } = useListCourses();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);

  const createMutation = useCreateCourse();
  const deleteMutation = useDeleteCourse();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    createMutation.mutate({ data: { ...data, isActive: true, icon: "BookOpen" } }, {
      onSuccess: () => {
        toast({ title: "Course added successfully" });
        queryClient.invalidateQueries({ queryKey: getListCoursesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
        setModalOpen(false);
        reset();
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this course? This cannot be undone.")) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => {
          toast({ title: "Course deleted" });
          queryClient.invalidateQueries({ queryKey: getListCoursesQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
        }
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <BookOpen size={22} className="text-primary" /> Courses
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage all educational programs offered at the academy.</p>
        </div>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 text-white font-semibold" style={{ background: 'hsl(180,76%,22%)' }}>
              <Plus size={16} /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-primary">Add New Course</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-3">
              <Input placeholder="Course Title *" required {...register("title")} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Duration (e.g. 3 Months) *" required {...register("duration")} />
                <Input placeholder="Fee (e.g. ₹1500) *" required {...register("fee")} />
              </div>
              <Textarea placeholder="Course Description *" required rows={4} {...register("description")} />
              <Button type="submit" className="w-full text-white font-semibold" style={{ background: 'hsl(180,76%,22%)' }} disabled={createMutation.isPending}>
                {createMutation.isPending ? "Saving..." : "Save Course"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="text-2xl font-extrabold text-foreground">{courses.length}</div>
          <div className="text-xs text-muted-foreground font-medium mt-0.5">Total Courses</div>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="text-2xl font-extrabold" style={{ color: 'hsl(180,76%,22%)' }}>{courses.filter(c => c.isActive).length}</div>
          <div className="text-xs text-muted-foreground font-medium mt-0.5">Active Courses</div>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="text-2xl font-extrabold" style={{ color: 'hsl(28,75%,52%)' }}>{courses.length > 0 ? courses[courses.length - 1]?.fee : '—'}</div>
          <div className="text-xs text-muted-foreground font-medium mt-0.5">Lowest Fee</div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading courses...</div>
      ) : courses.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground bg-white rounded-xl border border-dashed border-border">
          <BookOpen size={36} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No courses yet</p>
          <p className="text-sm mt-1">Add your first course using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl border border-border shadow-sm relative group hover:shadow-md transition-shadow overflow-hidden">
              {/* Header stripe */}
              <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, hsl(180,76%,22%), hsl(28,75%,52%))' }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'hsl(180,76%,95%)' }}>
                    <BookOpen size={18} style={{ color: 'hsl(180,76%,22%)' }} />
                  </div>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                    onClick={() => handleDelete(course.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <h3 className="font-extrabold text-base text-foreground mb-2 leading-snug">{course.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{course.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    <Clock size={11} /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
                    {course.fee}
                  </span>
                  {course.isActive && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Active</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
