import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Monitor, BookOpen, Award, Users, Clock, ChevronRight, Star, Target, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useListCourses, useListTestimonials } from '@workspace/api-client-react';
import { asArray } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const courseImages: Record<string, string> = {
  'Basic Computer Course': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=220&fit=crop',
  'MS Word, Excel & PowerPoint': 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=220&fit=crop',
  'Typing Classes (Hindi & English)': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=220&fit=crop',
  'CCC Preparation': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=220&fit=crop',
  'Internet & Email Training': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=220&fit=crop',
};

export default function Home() {
  const { data: coursesData = [] } = useListCourses();
  const { data: testimonialsData = [] } = useListTestimonials();
  const courses = asArray(coursesData);
  const testimonials = asArray(testimonialsData);

    const values = [
    { icon: Target, title: 'Practical Learning', desc: 'Every course is designed with hands-on exercises so students learn by doing, not just listening.' },
    { icon: Heart, title: 'Affordable Education', desc: 'We believe quality computer education should be accessible to everyone, regardless of background.' },
    { icon: Eye, title: 'Job-Oriented Focus', desc: 'Our curriculum is aligned with market demands so students are ready for employment from day one.' },
    { icon: Award, title: 'Certified Trainers', desc: 'Our instructors are experienced professionals who bring real-world knowledge to every class.' },
  ];
 
  const quickLinks = [
    { label: 'About Us', href: '/about', icon: Users, desc: 'Learn about our academy & mission' },
    { label: 'Our Courses', href: '/courses', icon: BookOpen, desc: 'Explore all computer courses' },
    { label: 'Our Facilities', href: '/facilities', icon: Monitor, desc: 'State-of-the-art lab & services' },
    { label: 'Testimonials', href: '/testimonials', icon: Award, desc: 'See what students say' },
    { label: 'Contact Us', href: '/contact', icon: Clock, desc: 'Get in touch with us today' },
  ];

  return (
    <div className="min-h-screen" style={{fontFamily:'Inter,sans-serif'}}>
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0b0f2e 0%, #1a237e 45%, #283593 75%, #1565c0 100%)',
          paddingTop: '120px'
        }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #e65100, transparent)' }} />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #1565c0, transparent)' }} />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-5 border-2 border-orange-400" />
        </div>
        {/* Background overlay image */}
        <div
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&h=900&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span
              variants={fadeUp}
              className="inline-block border text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
              style={{ color: '#ffcc80', borderColor: '#ff980080', background: '#ff980015' }}
            >
              ✦ Admissions Open 2026-27
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
              Welcome to<br />
              <span style={{ color: '#ff9800' }}>Star Computer's Academy</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto font-medium" style={{ color: 'rgba(255,255,255,0.78)' }}>
              Learn Computer Skills & Become Job Ready — Practical, affordable training for beginners, students & job seekers in Sarsaundi, UP.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg" className="font-bold px-8 py-3 rounded-md shadow-lg text-base text-white" style={{ background: '#e65100' }}>
                  Explore Courses <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="font-bold px-8 py-3 rounded-md text-base text-white border-white/40 bg-white/10 hover:bg-white/20">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-secondary py-6">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
          {[
            { number: '500+', label: 'Students Taught' },
            { number: '5+', label: 'Courses Available' },
            { number: '3+', label: 'Years of Excellence' },
            { number: '100%', label: 'Practical Training' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold">{stat.number}</div>
              <div className="text-sm font-medium text-white/80 uppercase tracking-wider mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-foreground mb-2">Explore Our Academy</h2>
              <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.href} variants={fadeUp}>
                    <Link href={item.href} className="block group">
                      <div className="bg-white rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon size={20} className="text-primary" />
                          </div>
                          <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">{item.label}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                        <span className="text-sm font-semibold text-secondary flex items-center gap-1 group-hover:gap-2 transition-all">
                          Learn more <ChevronRight size={15} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Preview */}
      {courses.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-foreground mb-2">Featured Courses</h2>
                <div className="w-16 h-1 bg-secondary mx-auto rounded-full mb-3" />
                <p className="text-muted-foreground max-w-xl mx-auto text-sm">Industry-relevant courses designed to build real skills</p>
              </motion.div>
              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {courses.slice(0, 3).map((course) => (
                  <motion.div key={course.id} variants={fadeUp}>
                    <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
                      <div className="h-44 overflow-hidden">
                        <img
                          src={courseImages[course.title] || `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=220&fit=crop`}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-foreground mb-1 text-base">{course.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                        <div className="flex items-center justify-between text-xs font-semibold mb-3">
                          <span className="text-primary">⏱ {course.duration}</span>
                          <span className="text-secondary">{course.fee}</span>
                        </div>
                        <Link href="/courses">
                          <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-semibold">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} className="text-center mt-8">
                <Link href="/courses">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 font-semibold">
                    View All Courses <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials Preview */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-foreground mb-2">Student Reviews</h2>
                <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
              </motion.div>
              <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {testimonials.slice(0, 3).map((t) => (
                  <motion.div key={t.id} variants={fadeUp}>
                    <div className="bg-white rounded-xl border border-border p-5 shadow-sm h-full flex flex-col">
                      <div className="flex mb-2">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={14} className="text-secondary fill-secondary" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground italic flex-1 line-clamp-4">"{t.review}"</p>
                      <div className="mt-4 pt-3 border-t border-border">
                        <p className="font-bold text-sm text-foreground">{t.studentName}</p>
                        <p className="text-xs text-primary font-medium">{t.course}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} className="text-center mt-8">
                <Link href="/testimonials">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 font-semibold">
                    Read All Reviews <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}


       {/* Our Values */}
            <section className="py-16 bg-muted/30">
              <div className="max-w-6xl mx-auto px-4">
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
                  <motion.div variants={fadeUp} className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-foreground mb-2">Our Core Values</h2>
                    <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
                  </motion.div>
                  <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {values.map((v) => {
                      const Icon = v.icon;
                      return (
                        <motion.div key={v.title} variants={fadeUp}>
                          <div className="bg-white rounded-xl border border-border p-6 shadow-sm h-full">
                            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                              <Icon size={22} className="text-primary" />
                            </div>
                            <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              </div>
            </section>

      {/* CTA Banner */}
      <section className="py-14" style={{ background: 'linear-gradient(135deg, hsl(180,76%,18%) 0%, hsl(180,76%,26%) 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">Ready to Start Your Digital Journey?</h2>
          <p className="text-white/80 mb-7 text-base">Join hundreds of students who transformed their careers with Star Computer's Academy.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold px-8">
                Browse Courses
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/40 font-bold px-8">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/917275540378"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        style={{ background: '#25D366' }}
        title="Chat on WhatsApp"
      >
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <Footer />
    </div>
  );
}
