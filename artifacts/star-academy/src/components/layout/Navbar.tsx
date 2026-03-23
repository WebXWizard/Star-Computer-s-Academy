import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Mail, Phone, MapPin } from 'lucide-react';
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
  const [location] = useLocation();
  const { toast } = useToast();

  const { data: courses = [] } = useListCourses();
  const createEnrollmentMutation = useCreateEnrollment();

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<EnrollmentForm>({
    resolver: zodResolver(enrollmentSchema)
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <div className="fixed top-0 w-full z-50">
      {/* Top Info Bar */}
      <div className={`text-white transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`} style={{ background: 'hsl(180,76%,15%)' }}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-1 sm:gap-0">
          <div className="flex items-center gap-4">
            <a href="mailto:starcomputeracademy@gmail.com" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
              <Mail size={13} />
              <span>starcomputeracademy@gmail.com</span>
            </a>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin size={13} className="text-secondary" />
              <span>X323+PRJ, Sarsaundi, UP 225001</span>
            </span>
          </div>
          <a href="tel:+919876543210" className="flex items-center gap-1.5 font-semibold hover:text-secondary transition-colors">
            <Phone size={13} />
            <span>+91 9876543210</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`bg-white border-b border-border transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center group">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.jpg`}
                alt="Star Computer's Academy"
                className="h-12 w-12 object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                      isActive(link.href)
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button className="font-semibold rounded-md px-5 bg-secondary hover:bg-secondary/90 text-white text-sm">
                    Enroll Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[420px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-primary">Start Your Journey</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-3">
                    <div>
                      <Input placeholder="Full Name *" {...register("name")} className={errors.name ? "border-destructive" : ""} />
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Input placeholder="Phone Number *" type="tel" {...register("phone")} className={errors.phone ? "border-destructive" : ""} />
                      {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                    </div>
                    <Input placeholder="Email Address (Optional)" type="email" {...register("email")} />
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
                    <Textarea placeholder="Any message? (Optional)" {...register("message")} rows={3} />
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold" disabled={createEnrollmentMutation.isPending}>
                      {createEnrollmentMutation.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t py-3 px-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold p-2.5 rounded-md transition-colors ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-700 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              className="w-full mt-2 bg-secondary hover:bg-secondary/90 text-white font-semibold"
              onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }}
            >
              Enroll Now
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
