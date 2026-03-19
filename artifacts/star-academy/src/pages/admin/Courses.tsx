import { useState } from 'react';
import { useListCourses, useCreateCourse, useDeleteCourse, getListCoursesQueryKey, getGetAdminStatsQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/layout/AdminSidebar';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
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
    if (confirm("Are you sure you want to delete this course?")) {
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Courses</h1>
          <p className="text-slate-500 mt-1">Manage the educational programs offered.</p>
        </div>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus size={18} /> Add Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <Input placeholder="Course Title" required {...register("title")} />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Duration (e.g., 3 Months)" required {...register("duration")} />
                <Input placeholder="Fee (e.g., 1500)" required {...register("fee")} />
              </div>
              <Textarea placeholder="Course Description" required rows={4} {...register("description")} />
              <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Saving..." : "Save Course"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <p>Loading courses...</p>
        ) : courses.map(course => (
          <Card key={course.id} className="border border-slate-200 shadow-sm relative group overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="secondary" className="h-8 w-8 text-red-600 bg-white shadow-sm" onClick={() => handleDelete(course.id)}>
                <Trash2 size={16} />
              </Button>
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-2 pr-10">{course.title}</h3>
              <div className="flex gap-4 text-sm text-slate-500 mb-4">
                <span className="bg-slate-100 px-2 py-1 rounded">⏱ {course.duration}</span>
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">₹{course.fee}</span>
              </div>
              <p className="text-slate-600 text-sm line-clamp-3">{course.description}</p>
            </CardContent>
          </Card>
        ))}
        {courses.length === 0 && !isLoading && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed">
            No courses found. Add your first course above.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
