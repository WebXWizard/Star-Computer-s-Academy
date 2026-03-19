import { motion } from 'framer-motion';
import { Clock, IndianRupee, BookOpen, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useListCourses } from '@workspace/api-client-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateEnrollment } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const enrollmentSchema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
  course: z.string().min(1, "Select a course"),
  message: z.string().optional()
});
type EnrollmentForm = z.infer<typeof enrollmentSchema>;

const courseImages: Record<string, string> = {
  'Basic Computer Course': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=320&fit=crop',
  'MS Word, Excel & PowerPoint': 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=600&h=320&fit=crop',
  'Typing Classes (Hindi & English)': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=320&fit=crop',
  'CCC Preparation': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=320&fit=crop',
  'Internet & Email Training': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=320&fit=crop',
};

const courseDetails: Record<string, string[]> = {
  'Basic Computer Course': [
    'Introduction to computers & operating systems',
    'File management and folder organization',
    'Hardware components and peripherals',
    'Keyboard shortcuts & efficiency tips',
    'Basic troubleshooting skills',
  ],
  'MS Word, Excel & PowerPoint': [
    'MS Word — formatting, tables, mail merge',
    'MS Excel — formulas, charts, pivot tables',
    'MS PowerPoint — professional presentations',
    'Real-world projects and assignments',
    'Tips for faster productivity',
  ],
  'Typing Classes (Hindi & English)': [
    'Proper finger placement on keyboard',
    'Hindi typing using Mangal/Krutidev font',
    'English typing from 20 to 50+ WPM',
    'Daily speed and accuracy practice',
    'Preparation for govt typing exams',
  ],
  'CCC Preparation': [
    'Complete NIELIT CCC syllabus coverage',
    'Introduction to computers & OS',
    'MS Office basics (Word, Excel, PPT)',
    'Internet, email, and digital payments',
    'Mock tests and previous year papers',
  ],
  'Internet & Email Training': [
    'Safe and efficient internet browsing',
    'Professional email writing and management',
    'Online forms, transactions, and banking',
    'Google Workspace tools (Docs, Drive)',
    'Social media and online safety',
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

export default function Courses() {
  const { data: courses = [], isLoading } = useListCourses();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const createEnrollmentMutation = useCreateEnrollment();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<EnrollmentForm>({
    resolver: zodResolver(enrollmentSchema)
  });

  const openEnroll = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setValue('course', courseTitle);
    setModalOpen(true);
  };

  const onSubmit = (data: EnrollmentForm) => {
    createEnrollmentMutation.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "Enrollment submitted! We'll contact you soon." });
        setModalOpen(false);
        reset();
      },
      onError: () => {
        toast({ title: "Failed to submit. Please try again.", variant: "destructive" });
      }
    });
  };

  return (
    <div className="min-h-screen" style={{fontFamily:'Inter,sans-serif'}}>
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-14" style={{ background: 'linear-gradient(135deg, hsl(180,76%,15%) 0%, hsl(180,76%,23%) 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'hsl(28,90%,70%)' }}>Our Courses</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Explore All Courses
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-lg max-w-2xl mx-auto">
              Industry-relevant, practical computer courses designed for beginners and job seekers in Sarsaundi.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-16 text-muted-foreground">Loading courses...</div>
          ) : (
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {courses.map((course) => (
                <motion.div key={course.id} variants={fadeUp}>
                  <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 group">
                    <div className="h-52 overflow-hidden">
                      <img
                        src={courseImages[course.title] || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=320&fit=crop'}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3 gap-2">
                        <h3 className="font-extrabold text-lg text-foreground leading-snug">{course.title}</h3>
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap">{course.fee}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{course.description}</p>

                      {courseDetails[course.title] && (
                        <div className="mb-4">
                          <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">What You'll Learn:</p>
                          <ul className="space-y-1.5">
                            {courseDetails[course.title].slice(0, 4).map((item) => (
                              <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <CheckCircle size={13} className="text-primary mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex items-center gap-4 mb-4 text-xs font-semibold">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock size={13} className="text-primary" /> Duration: {course.duration}
                        </span>
                      </div>

                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm"
                        onClick={() => openEnroll(course.title)}
                      >
                        Enroll in This Course <ArrowRight size={15} className="ml-1.5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Enrollment Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary">Enroll Now</DialogTitle>
            {selectedCourse && <p className="text-sm text-muted-foreground mt-1">Course: <strong>{selectedCourse}</strong></p>}
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-2">
            <div>
              <Input placeholder="Full Name *" {...register("name")} className={errors.name ? "border-destructive" : ""} />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Input placeholder="Phone Number *" type="tel" {...register("phone")} className={errors.phone ? "border-destructive" : ""} />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
            </div>
            <Input placeholder="Email (Optional)" type="email" {...register("email")} />
            <div>
              <Select value={selectedCourse} onValueChange={(val) => { setSelectedCourse(val); setValue("course", val); }}>
                <SelectTrigger className={errors.course ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select a Course *" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(c => <SelectItem key={c.id} value={c.title}>{c.title}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.course && <p className="text-xs text-destructive mt-1">{errors.course.message}</p>}
            </div>
            <Textarea placeholder="Any message? (Optional)" {...register("message")} rows={3} />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold" disabled={createEnrollmentMutation.isPending}>
              {createEnrollmentMutation.isPending ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
