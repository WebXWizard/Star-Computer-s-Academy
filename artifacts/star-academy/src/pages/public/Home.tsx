import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, MonitorPlay, GraduationCap, Award, Briefcase, MapPin, Phone, Mail, MessageSquareText, Star, BookOpen, Quote } from 'lucide-react';
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

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
      >
        <MessageSquareText size={28} />
        <span className="absolute right-full mr-4 bg-white text-foreground px-3 py-1.5 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Chat with us!
        </span>
      </a>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-abstract.png`} 
            alt="Background" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/90 to-white/60 dark:from-background dark:to-background/80" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Admissions Open for 2024
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-display font-extrabold text-foreground leading-[1.1] mb-6 tracking-tight">
                Master Digital Skills & Become <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Job Ready</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
                Join Star Computer's Academy in Sarsaundi. Practical, hands-on computer education designed for beginners, students, and professionals aiming for career success.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full px-8 text-base h-14 shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-1 transition-all" onClick={() => window.scrollTo({top: document.getElementById('courses')?.offsetTop || 0, behavior: 'smooth'})}>
                  Explore Courses
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-14 bg-white/50 backdrop-blur-sm border-2 hover:bg-white transition-all" onClick={() => window.scrollTo({top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth'})}>
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl -rotate-3 scale-105" />
              {/* landing page hero computer lab student learning */}
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop" 
                alt="Students learning computer skills" 
                className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full border border-white/20"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-card p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="font-bold text-foreground">100% Practical</p>
                  <p className="text-xs text-muted-foreground">Hands-on Training</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-white dark:bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-50 dark:bg-blue-950/30 rounded-3xl rotate-3" />
              {/* instructor teaching computer class */}
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=1000&fit=crop" 
                alt="Instructor teaching" 
                className="relative rounded-2xl shadow-lg w-full h-[500px] object-cover"
              />
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="text-primary font-bold tracking-wider uppercase text-sm mb-2">About Us</motion.h2>
              <motion.h3 variants={fadeUp} className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Empowering Sarsaundi with Digital Excellence</motion.h3>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At <strong className="text-foreground">Star Computer's Academy</strong>, we believe that digital literacy is the foundation of a successful career in the 21st century. Located in the heart of Sarsaundi, we provide high-quality, practical computer education accessible to everyone.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Whether you are a beginner taking your first steps, a student preparing for competitive exams like CCC, or a job seeker needing MS Office and Typing skills, our curriculum is tailored to make you confident and job-ready.
              </motion.p>
              
              <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-6">
                {[
                  { title: "Expert Faculty", desc: "Learn from industry professionals" },
                  { title: "Modern Lab", desc: "1-to-1 computer ratio" },
                  { title: "Certification", desc: "Valuable course certificates" },
                  { title: "Career Focus", desc: "Resume & interview prep" }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex gap-3">
                    <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Why Choose Us</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">The Star Academy Advantage</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Award size={32} />, title: "Experienced Instructor", desc: "Learn from passionate teachers with years of industry and academic experience." },
              { icon: <MonitorPlay size={32} />, title: "Practical Training", desc: "Theory is good, but practice is better. 80% of our classes are hands-on on the keyboard." },
              { icon: <Briefcase size={32} />, title: "Affordable Fees", desc: "Quality education shouldn't be a luxury. We offer competitive pricing and flexible installments." },
              { icon: <GraduationCap size={32} />, title: "Job-Oriented", desc: "Syllabus designed based on current market requirements to help you secure employment fast." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="h-16 w-16 bg-blue-50 dark:bg-blue-900/30 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section id="courses" className="py-24 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Our Programs</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground">Featured Courses</h3>
            </div>
            <Button variant="outline" className="shrink-0 rounded-full" onClick={() => window.scrollTo({top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth'})}>
              Request Syllabus
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingCourses ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-100 rounded-2xl h-[300px] w-full" />
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
                  <Card className="h-full hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col overflow-hidden group">
                    <div className="h-2 bg-gradient-to-r from-primary to-blue-400 w-0 group-hover:w-full transition-all duration-500" />
                    <CardHeader>
                      <div className="mb-4 text-primary bg-blue-50 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center rounded-lg">
                        <BookOpen size={24} />
                      </div>
                      <CardTitle className="text-xl font-display">{course.title}</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground font-medium">
                        <span className="flex items-center gap-1"><MonitorPlay size={14} /> {course.duration}</span>
                        <span className="flex items-center gap-1 text-primary"><Award size={14} /> ₹{course.fee}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                        {course.description}
                      </p>
                      <Button className="w-full bg-slate-100 text-foreground hover:bg-primary hover:text-white" variant="ghost" onClick={() => { document.querySelector('nav button:contains("Enroll Now")')?.dispatchEvent(new MouseEvent('click', { bubbles: true })) }}>
                        Enroll in Course
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              // Fallback content if API is empty
              [
                { title: "Basic Computer Course (BCC)", desc: "Perfect for beginners. Learn computer fundamentals, operating systems, and basic internet usage.", dur: "3 Months", fee: "1500" },
                { title: "MS Word, Excel, PowerPoint", desc: "Master the Microsoft Office Suite. Essential skills for every modern job profile and administrative roles.", dur: "2 Months", fee: "1200" },
                { title: "Typing Classes (Hindi & English)", desc: "Increase your typing speed and accuracy. Crucial for data entry and government clerical jobs.", dur: "1-3 Months", fee: "500/mo" },
                { title: "CCC Preparation", desc: "Dedicated coaching for the NIELIT Course on Computer Concepts (CCC) exam with mock tests.", dur: "3 Months", fee: "2000" },
                { title: "Internet & Email Training", desc: "Learn to navigate the web safely, use search engines effectively, and manage professional email communication.", dur: "1 Month", fee: "800" }
              ].map((c, i) => (
                <Card key={i} className="h-full hover:shadow-xl transition-all duration-300 flex flex-col group">
                  <div className="h-2 bg-primary w-0 group-hover:w-full transition-all duration-300" />
                  <CardHeader>
                    <CardTitle className="text-xl font-display">{c.title}</CardTitle>
                    <div className="flex gap-4 mt-2 text-sm font-medium text-slate-500">
                      <span>🕒 {c.dur}</span>
                      <span className="text-primary">💰 ₹{c.fee}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{c.desc}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Student Success</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-16">What Our Students Say</h3>
          
          <div className="flex flex-wrap justify-center gap-8">
            {loadingTestimonials ? (
              <div className="animate-pulse bg-slate-200 rounded-2xl h-64 w-full max-w-md mx-auto" />
            ) : testimonials.length > 0 ? (
              testimonials.map((t, i) => (
                <motion.div 
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-card p-8 rounded-3xl shadow-sm border border-border max-w-md text-left relative"
                >
                  <Quote className="absolute top-6 right-8 text-slate-100 dark:text-slate-800" size={60} />
                  <div className="flex gap-1 text-amber-400 mb-6 relative z-10">
                    {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                  </div>
                  <p className="text-lg text-foreground mb-8 relative z-10 leading-relaxed italic">"{t.review}"</p>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner">
                      {t.studentName.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-foreground">{t.studentName}</h5>
                      <p className="text-sm text-muted-foreground">{t.course}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Fallback
              [
                { n: "Rahul Kumar", c: "CCC Preparation", r: "The practical approach to teaching here is amazing. I cleared my CCC exam on the first attempt with a good grade!" },
                { n: "Priya Singh", c: "MS Office & Typing", r: "Got a data entry job right after completing my course. The typing speed techniques taught were extremely helpful." },
                { n: "Amit Verma", c: "Basic Computer Course", r: "I didn't know anything about computers before joining. The instructors are very patient and explain everything clearly." }
              ].map((t, i) => (
                <div key={i} className="bg-white dark:bg-card p-8 rounded-3xl shadow-sm border border-border max-w-md text-left relative">
                  <Quote className="absolute top-6 right-8 text-slate-100" size={60} />
                  <div className="flex gap-1 text-amber-400 mb-6">
                    {Array(5).fill(0).map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
                  </div>
                  <p className="text-lg text-foreground mb-8 relative z-10">"{t.r}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {t.n.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-foreground">{t.n}</h5>
                      <p className="text-sm text-muted-foreground">{t.c}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            <div>
              <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Get in Touch</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">We'd Love to Hear From You</h3>
              <p className="text-muted-foreground mb-10 text-lg">
                Have questions about our courses or admissions? Drop us a message or visit our academy in Sarsaundi.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-5 items-start">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1 text-foreground">Our Location</h4>
                    <p className="text-muted-foreground">X323+PRJ, Sarsaundi<br/>Uttar Pradesh, 225001<br/>India</p>
                  </div>
                </div>
                
                <div className="flex gap-5 items-start">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1 text-foreground">Call Us</h4>
                    <p className="text-muted-foreground">+91 98765 43210<br/>Mon-Sat: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1 text-foreground">Email Us</h4>
                    <p className="text-muted-foreground">info@staracademy.in</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-border">
              <h4 className="font-display font-bold text-2xl mb-6 text-foreground">Send a Message</h4>
              <form onSubmit={handleSubmit(onContactSubmit)} className="space-y-5">
                <div>
                  <Input placeholder="Your Full Name *" {...register("name")} className={`bg-white h-12 ${errors.name ? 'border-destructive' : ''}`} />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Input placeholder="Phone Number *" type="tel" {...register("phone")} className={`bg-white h-12 ${errors.phone ? 'border-destructive' : ''}`} />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <Input placeholder="Email Address" type="email" {...register("email")} className="bg-white h-12" />
                </div>
                <div>
                  <Textarea placeholder="How can we help you? *" {...register("message")} rows={4} className={`bg-white ${errors.message ? 'border-destructive' : ''}`} />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                </div>
                <Button size="lg" className="w-full h-14 text-base rounded-xl shadow-lg" disabled={createContactMutation.isPending}>
                  {createContactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

          </div>

          <div className="mt-16 rounded-3xl overflow-hidden shadow-lg h-[400px] bg-slate-200">
            {/* Embed Map for Sarsaundi */}
            <iframe 
              src="https://maps.google.com/maps?q=Sarsaundi%2C%20Uttar%20Pradesh%20225001&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
