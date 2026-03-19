import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Monitor, Wifi, Printer, Clock, GraduationCap, Laptop, CheckCircle2, MapPin, Phone, Mail, Users, BookOpen, Quote, ChevronRight } from 'lucide-react';
import { useListCourses, useListTestimonials, useCreateContact } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
  message: z.string().min(10, "Please enter a descriptive message")
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Home() {
  const { data: courses = [], isLoading: loadingCourses } = useListCourses();
  const { data: testimonials = [], isLoading: loadingTestimonials } = useListTestimonials();
  
  const createContactMutation = useCreateContact();
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onContactSubmit = (data: ContactForm) => {
    createContactMutation.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "Message sent! We'll get back to you shortly." });
        reset();
      },
      onError: () => {
        toast({ title: "Error sending message", variant: "destructive" });
      }
    });
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const facilities = [
    { icon: <Monitor size={32} />, title: "Computer Lab", desc: "State-of-the-art computer lab with 1-to-1 PC ratio." },
    { icon: <Wifi size={32} />, title: "High-Speed Internet", desc: "Seamless connectivity for research and practicals." },
    { icon: <Printer size={32} />, title: "Printing Services", desc: "On-campus printing and scanning facilities." },
    { icon: <Laptop size={32} />, title: "Tech Support", desc: "Dedicated support for software and hardware needs." },
    { icon: <GraduationCap size={32} />, title: "Affordable Fees", desc: "Quality education that fits your budget." },
    { icon: <Clock size={32} />, title: "Flexible Batches", desc: "Morning to evening batches to suit your schedule." }
  ];

  const defaultCourses = [
    { title: "Basic Computer Course", desc: "Learn computer fundamentals, MS Paint, WordPad, and internet basics.", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop" },
    { title: "MS Word/Excel/PowerPoint", desc: "Master the complete Microsoft Office suite for professional office work.", img: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=600&h=400&fit=crop" },
    { title: "Typing Classes (Hindi & English)", desc: "Improve typing speed and accuracy for data entry and clerical jobs.", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=400&fit=crop" },
    { title: "CCC Preparation", desc: "Comprehensive coaching for NIELIT Course on Computer Concepts.", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop" },
    { title: "Internet & Email Training", desc: "Effective web browsing, emailing, and basic online safety.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.886-.59-.45-1.02-.1-1.14-.298-.065-.114-.065-.183-.166-.381-.099-.198-.05-.298.05-.396.098-.098.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.198.836.316 1.12.405.472.148.902.127 1.242.077.38-.056 1.17-.478 1.335-.94.165-.463.165-.86.115-.94-.05-.08-.182-.124-.38-.223z"/>
        </svg>
      </a>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=900&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-white"
          >
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              Welcome to <br className="hidden md:block" />
              <span className="text-secondary">Star Computer's Academy</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Empowering students in Sarsaundi with practical, job-oriented computer education. Build your digital future with us today.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded bg-secondary hover:bg-secondary/90 text-white px-8 h-14 text-base font-semibold" onClick={() => window.scrollTo({top: document.getElementById('courses')?.offsetTop || 0, behavior: 'smooth'})}>
                Explore Courses
              </Button>
              <Button size="lg" variant="outline" className="rounded border-2 border-white text-white hover:bg-white hover:text-primary px-8 h-14 text-base font-semibold" onClick={() => window.scrollTo({top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth'})}>
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-secondary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-1">500+</h3>
              <p className="text-sm font-medium uppercase tracking-wider text-blue-100">Students Taught</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-1">5+</h3>
              <p className="text-sm font-medium uppercase tracking-wider text-blue-100">Professional Courses</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-1">3+</h3>
              <p className="text-sm font-medium uppercase tracking-wider text-blue-100">Years Excellence</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-1">100%</h3>
              <p className="text-sm font-medium uppercase tracking-wider text-blue-100">Practical Focus</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">About Our Academy</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded"></div>
          </div>
          <div className="max-w-3xl mx-auto text-center text-slate-600 text-lg leading-relaxed">
            <p className="mb-6">
              Star Computer's Academy is the premier IT training institute located in Sarsaundi, Uttar Pradesh. We are dedicated to bridging the digital divide by providing high-quality, accessible computer education to students, job-seekers, and professionals.
            </p>
            <p>
              Our curriculum is designed to meet industry standards, ensuring that every student who walks through our doors leaves with practical skills that translate directly into career opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* FACILITIES / FEATURES */}
      <section id="facilities" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Our Facilities</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {facility.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{facility.title}</h3>
                <p className="text-slate-600">{facility.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Featured Courses</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded"></div>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Choose from our range of industry-oriented courses designed to build your skills from the ground up.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingCourses ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-100 rounded-lg h-[400px] w-full" />
              ))
            ) : courses.length > 0 ? (
              courses.map((course, i) => (
                <motion.div 
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                    <div className="h-48 overflow-hidden bg-slate-100">
                      {/* Using fallback images since API might not have them */}
                      <img src={defaultCourses[i % defaultCourses.length].img} alt={course.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-bold text-primary">{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between pt-0">
                      <p className="text-slate-600 mb-6 line-clamp-3">
                        {course.description}
                      </p>
                      <div className="flex justify-between items-center mb-6 text-sm font-semibold text-slate-700 bg-slate-50 p-3 rounded">
                        <span>Duration: {course.duration}</span>
                        <span className="text-secondary">Fee: ₹{course.fee}</span>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded font-semibold" onClick={() => { document.querySelector('nav button:contains("Enroll Now")')?.dispatchEvent(new MouseEvent('click', { bubbles: true })) }}>
                        Enroll Now <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              defaultCourses.map((c, i) => (
                <Card key={i} className="h-full rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                  <div className="h-48 overflow-hidden bg-slate-100">
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-primary">{c.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between pt-0">
                    <p className="text-slate-600 mb-6">{c.desc}</p>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded font-semibold" onClick={() => { document.querySelector('nav button:contains("Enroll Now")')?.dispatchEvent(new MouseEvent('click', { bubbles: true })) }}>
                      Enroll Now <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* DIRECTOR'S MESSAGE */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="shrink-0">
                <img 
                  src="https://ui-avatars.com/api/?name=Director&background=2563eb&color=fff&size=200" 
                  alt="Director" 
                  className="w-40 h-40 rounded-full border-4 border-white/30 shadow-xl"
                />
              </div>
              <div>
                <Quote size={40} className="text-secondary/50 mb-4" />
                <h3 className="text-2xl font-display font-bold mb-2">Director's Message</h3>
                <p className="text-lg text-blue-50 leading-relaxed mb-6 italic">
                  "Education is the most powerful weapon which you can use to change the world. At Star Computer's Academy, our mission is to empower the youth of Sarsaundi with cutting-edge digital skills. We are committed to providing quality education that not only builds knowledge but also creates successful careers."
                </p>
                <div>
                  <h4 className="font-bold text-xl">Director Name</h4>
                  <p className="text-secondary font-medium">Founder & Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Our Expert Team</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { role: "Head of Institute", name: "Institute Head" },
              { role: "Senior Trainer", name: "Senior Staff" },
              { role: "Computer Instructor", name: "Instructor" }
            ].map((staff, i) => (
              <div key={i} className="bg-white p-6 rounded-lg text-center shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                <img 
                  src={`https://ui-avatars.com/api/?name=${staff.name.replace(' ', '+')}&background=1a4fa0&color=fff&size=200`}
                  alt={staff.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-50"
                />
                <h4 className="text-xl font-bold text-slate-800">{staff.name}</h4>
                <p className="text-secondary font-medium mb-3">{staff.role}</p>
                <p className="text-slate-500 text-sm">Dedicated to student success and practical learning methodologies.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Student Reviews</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingTestimonials ? (
              <div className="col-span-full animate-pulse bg-slate-100 rounded-lg h-32" />
            ) : testimonials.length > 0 ? (
              testimonials.map((t, i) => (
                <div key={t.id} className="bg-slate-50 p-6 rounded-lg border-l-4 border-secondary shadow-sm">
                  <p className="text-slate-600 mb-4 italic">"{t.review}"</p>
                  <h5 className="font-bold text-slate-800">{t.studentName}</h5>
                  <p className="text-sm text-primary">{t.course}</p>
                </div>
              ))
            ) : (
              [
                { n: "Rahul Kumar", c: "CCC Preparation", r: "The practical approach to teaching here is amazing. I cleared my CCC exam easily!" },
                { n: "Priya Singh", c: "MS Office & Typing", r: "Got a data entry job right after completing my course. The typing techniques were very helpful." },
                { n: "Amit Verma", c: "Basic Computer Course", r: "Great environment for beginners. Instructors are patient and knowledgeable." }
              ].map((t, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-lg border-l-4 border-secondary shadow-sm">
                  <p className="text-slate-600 mb-4 italic">"{t.r}"</p>
                  <h5 className="font-bold text-slate-800">{t.n}</h5>
                  <p className="text-sm text-primary">{t.c}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Contact Us</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8 md:p-12 bg-primary text-white">
              <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-secondary shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg">Location</h4>
                    <p className="text-blue-100">X323+PRJ, Sarsaundi<br/>Uttar Pradesh, 225001<br/>India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="text-secondary shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <p className="text-blue-100">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-secondary shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <p className="text-blue-100">starcomputeracademy@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 h-64 rounded-lg overflow-hidden w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113942.86873199859!2d80.85233155!3d26.81855685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399e03d36b81561f%3A0x6e9f1a0e0d6b8!2sSarsaundi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Academy Location"
                ></iframe>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit(onContactSubmit)} className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Your Name</label>
                  <Input {...register("name")} className={`bg-slate-50 border-slate-200 ${errors.name ? 'border-red-500' : ''}`} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Phone Number</label>
                  <Input type="tel" {...register("phone")} className={`bg-slate-50 border-slate-200 ${errors.phone ? 'border-red-500' : ''}`} />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Email Address</label>
                  <Input type="email" {...register("email")} className="bg-slate-50 border-slate-200" />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Message</label>
                  <Textarea {...register("message")} rows={4} className={`bg-slate-50 border-slate-200 ${errors.message ? 'border-red-500' : ''}`} />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                </div>
                
                <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold" disabled={createContactMutation.isPending}>
                  {createContactMutation.isPending ? "Sending..." : "Submit Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
