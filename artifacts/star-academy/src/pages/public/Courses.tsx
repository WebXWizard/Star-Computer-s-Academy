import { motion } from "framer-motion";
import {
  Clock,
  IndianRupee,
  Layers,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useListCourses } from "@workspace/api-client-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateEnrollment } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const enrollmentSchema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  course: z.string().min(1, "Select a course"),
  message: z.string().optional(),
});
type EnrollmentForm = z.infer<typeof enrollmentSchema>;

const courseImages: Record<string, string> = {
  "Basic Computer Course":
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=320&fit=crop",
  "MS Word, Excel & PowerPoint":
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=600&h=320&fit=crop",
  "Typing Classes (Hindi & English)":
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=320&fit=crop",
  "CCC Preparation":
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=320&fit=crop",
  "Internet & Email Training":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=320&fit=crop",
};

const courseMeta: Record<
  string,
  { parts: string; summary: string; accent: string }
> = {
  "Basic Computer Course": {
    parts: "2-4 Parts",
    summary: "Computer fundamentals, Windows, files, internet basics, etc",
    accent: "from-teal-500 to-cyan-500",
  },
  "MS Word, Excel & PowerPoint": {
    parts: "3 Parts",
    summary: "Word, Excel, PowerPoint, charts, reports, presentations, etc",
    accent: "from-blue-500 to-sky-500",
  },
  "Typing Classes (Hindi & English)": {
    parts: "2 Parts",
    summary:
      "Hindi typing, English typing, speed practice, govt exam prep, etc",
    accent: "from-orange-500 to-amber-500",
  },
  "CCC Preparation": {
    parts: "4 Parts",
    summary: "NIELIT CCC syllabus, MS Office, internet, mock tests, etc",
    accent: "from-emerald-500 to-teal-500",
  },
  "Internet & Email Training": {
    parts: "3 Parts",
    summary: "Browsing, email, online forms, banking, digital safety, etc",
    accent: "from-violet-500 to-indigo-500",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Courses() {
  const { data: courses = [], isLoading } = useListCourses();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const createEnrollmentMutation = useCreateEnrollment();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<EnrollmentForm>({
    resolver: zodResolver(enrollmentSchema),
  });

  const openEnroll = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setValue("course", courseTitle);
    setModalOpen(true);
  };

  const onSubmit = (data: EnrollmentForm) => {
    createEnrollmentMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({ title: "Enrollment submitted! We'll contact you soon." });
          setModalOpen(false);
          reset();
        },
        onError: () => {
          toast({
            title: "Failed to submit. Please try again.",
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter,sans-serif" }}>
      <Navbar />

      {/* Header */}
      <section
        className="pt-36 pb-14"
        style={{
          background:
            "linear-gradient(135deg, hsl(180,76%,15%) 0%, hsl(180,76%,23%) 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "hsl(28,90%,70%)" }}
            >
              Our Courses
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              Explore All Courses
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-white/75 text-lg max-w-2xl mx-auto"
            >
              Industry-relevant, practical computer courses designed for
              beginners and job seekers in Sarsaundi.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-16 text-muted-foreground">
              Loading courses...
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {courses.map((course) => {
                const meta = courseMeta[course.title] || {
                  parts: "2-4 Parts",
                  summary: course.description,
                  accent: "from-teal-500 to-orange-500",
                };

                return (
                  <motion.div key={course.id} variants={fadeUp}>
                    <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={
                            courseImages[course.title] ||
                            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=320&fit=crop"
                          }
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div
                          className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${meta.accent}`}
                        />
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-extrabold text-xl text-foreground leading-snug min-h-[3.5rem] mb-4">
                          {course.title}
                        </h3>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 rounded-md bg-muted/70 px-3 py-2">
                            <Clock
                              size={16}
                              className="text-primary flex-shrink-0"
                            />
                            <span className="text-sm font-bold text-foreground">
                              {course.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 rounded-md bg-muted/70 px-3 py-2">
                            <Layers
                              size={16}
                              className="text-secondary flex-shrink-0"
                            />
                            <span className="text-sm font-bold text-foreground">
                              {meta.parts}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed min-h-[3rem]">
                          {meta.summary}
                        </p>

                        {courseDetails[course.title] && (
                          <ul className="space-y-1.5 mb-5">
                            {courseDetails[course.title]
                              .slice(0, 3)
                              .map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-xs text-muted-foreground"
                                >
                                  <CheckCircle
                                    size={13}
                                    className="text-primary mt-0.5 flex-shrink-0"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                          </ul>
                        )}

                        <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-border">
                          <span className="flex items-center gap-1.5 text-primary text-sm font-extrabold">
                            <IndianRupee size={15} /> {course.fee}
                          </span>
                          <Button
                            className="bg-secondary hover:bg-secondary/90 text-white font-bold text-sm px-4"
                            onClick={() => openEnroll(course.title)}
                          >
                            View Courses{" "}
                            <ArrowRight size={15} className="ml-1.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Enrollment Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary">
              Enroll Now
            </DialogTitle>
            {selectedCourse && (
              <p className="text-sm text-muted-foreground mt-1">
                Course: <strong>{selectedCourse}</strong>
              </p>
            )}
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-2">
            <div>
              <Input
                placeholder="Full Name *"
                {...register("name")}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Input
                placeholder="Phone Number *"
                type="tel"
                {...register("phone")}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-xs text-destructive mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <Input
              placeholder="Email (Optional)"
              type="email"
              {...register("email")}
            />
            <div>
              <Select
                value={selectedCourse}
                onValueChange={(val) => {
                  setSelectedCourse(val);
                  setValue("course", val);
                }}
              >
                <SelectTrigger
                  className={errors.course ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select a Course *" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.title}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.course && (
                <p className="text-xs text-destructive mt-1">
                  {errors.course.message}
                </p>
              )}
            </div>
            <Textarea
              placeholder="Any message? (Optional)"
              {...register("message")}
              rows={3}
            />
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
              disabled={createEnrollmentMutation.isPending}
            >
              {createEnrollmentMutation.isPending
                ? "Submitting..."
                : "Submit Application"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
