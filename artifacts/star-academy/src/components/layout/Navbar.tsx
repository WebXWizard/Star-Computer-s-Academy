import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateEnrollment, useListCourses } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const enrollmentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
  course: z.string().min(1, "Please select a course"),
  message: z.string().optional()
});

type EnrollmentForm = z.infer<typeof enrollmentSchema>;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const { data: courses = [] } = useListCourses();
  const createEnrollmentMutation = useCreateEnrollment();

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<EnrollmentForm>({
    resolver: zodResolver(enrollmentSchema)
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onSubmit = (data: EnrollmentForm) => {
    createEnrollmentMutation.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "Enrollment submitted successfully! We will contact you soon." });
        setModalOpen(false);
        reset();
      },
      onError: () => {
        toast({ title: "Failed to submit enrollment. Please try again.", variant: "destructive" });
      }
    });
  };

  const navLinks = [
    { name: 'Home', href: '/#' },
    { name: 'About Us', href: '/#about' },
    { name: 'Courses', href: '/#courses' },
    { name: 'Features', href: '/#features' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-white py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Star Academy" className="h-10 w-10 object-contain" />
            <span className="font-display font-bold text-xl text-primary">Star Academy</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
            
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogTrigger asChild>
                <Button className="font-semibold rounded-full px-6">Enroll Now</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display text-primary">Start Your Journey</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                  <div>
                    <Input placeholder="Full Name *" {...register("name")} className={errors.name ? "border-destructive" : ""} />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Input placeholder="Phone Number *" type="tel" {...register("phone")} className={errors.phone ? "border-destructive" : ""} />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <Input placeholder="Email Address (Optional)" type="email" {...register("email")} />
                  </div>
                  <div>
                    <Select onValueChange={(val) => setValue("course", val)}>
                      <SelectTrigger className={errors.course ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select a Course *" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.length > 0 ? (
                          courses.map(c => <SelectItem key={c.id} value={c.title}>{c.title}</SelectItem>)
                        ) : (
                          <>
                            <SelectItem value="Basic Computer Course">Basic Computer Course</SelectItem>
                            <SelectItem value="MS Office Training">MS Office Training</SelectItem>
                            <SelectItem value="CCC Preparation">CCC Preparation</SelectItem>
                            <SelectItem value="Typing (Hindi/English)">Typing (Hindi/English)</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    {errors.course && <p className="text-xs text-destructive mt-1">{errors.course.message}</p>}
                  </div>
                  <div>
                    <Textarea placeholder="Any questions or messages? (Optional)" {...register("message")} rows={3} />
                  </div>
                  <Button type="submit" className="w-full" disabled={createEnrollmentMutation.isPending}>
                    {createEnrollmentMutation.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-foreground/80 hover:text-primary p-2 rounded-md hover:bg-muted"
            >
              {link.name}
            </a>
          ))}
          <Button className="w-full mt-2" onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }}>
            Enroll Now
          </Button>
        </div>
      )}
    </nav>
  );
}
