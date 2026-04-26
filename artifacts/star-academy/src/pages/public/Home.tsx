import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Headphones,
  Mail,
  Monitor,
  Phone,
  Printer,
  Shield,
  Star,
  Users,
  Wifi,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useListCourses, useListTestimonials } from '@workspace/api-client-react';
import { asArray } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const courseImages: Record<string, string> = {
  'Entry Level | Basic Courses for Beginners':
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=360&fit=crop',
  'Programming Courses for Absolute Beginners':
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=360&fit=crop',
  'Web Development Courses':
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=360&fit=crop',
  'NIELIT Offered Courses':
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=360&fit=crop',
  'Digital Marketing & Graphic Design Courses':
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=360&fit=crop',
  'Skill India Certification Courses':
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=360&fit=crop',
};

const facilities = [
  {
    icon: Monitor,
    title: 'Computer Lab',
    subtitle: 'Modern equipment',
    desc: 'A well-equipped lab with updated systems, practical software, and comfortable seating for focused learning.',
  },
  {
    icon: Wifi,
    title: 'High-Speed Internet',
    subtitle: 'Fast access',
    desc: 'Reliable internet access for browsing, research, online forms, projects, and digital practice sessions.',
  },
  {
    icon: Printer,
    title: 'Printing Services',
    subtitle: 'Useful support',
    desc: 'Printing and scanning support for assignments, forms, notes, resumes, and student documents.',
  },
  {
    icon: Headphones,
    title: 'Tech Support',
    subtitle: 'On-site assistance',
    desc: 'Friendly help for software, hardware, practice tasks, and common computer problems during training.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    subtitle: 'Personal attention',
    desc: 'Focused batches help every student ask questions, practice confidently, and improve step by step.',
  },
  {
    icon: Shield,
    title: 'Safe Environment',
    subtitle: 'Secure campus',
    desc: 'A clean, disciplined, and welcoming learning space for students, beginners, and job seekers.',
  },
];

const featuredCourseCopy: Record<string, { title: string; desc: string }> = {
  'Programming Courses for Absolute Beginners': {
    title: 'Master Computer Programming',
    desc: 'Learn programming fundamentals through Python, JavaScript, logic building, and beginner-friendly projects.',
  },
  'Web Development Courses': {
    title: 'Build Modern Websites',
    desc: 'Practice HTML, CSS, JavaScript, React, and backend basics while creating responsive web projects.',
  },
  'Entry Level | Basic Courses for Beginners': {
    title: 'Start with Computer Basics',
    desc: 'Build confidence in office tools, typing, internet use, digital forms, and everyday computer skills.',
  },
};

const teamMessages = [
  {
    name: 'Mr. Shahe Alam',
    role: 'Head Instructor',
    img: `${import.meta.env.BASE_URL}images/team/HOI.jpeg`,
    quote:
      'Our mission is to make technical learning simple, practical, and useful for students who want real skills.',
  },
  {
    name: 'Priya Sharma',
    role: 'Senior Trainer',
    img: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=e07d2c&color=fff&size=220&bold=true',
    quote:
      'When a beginner becomes confident with computers, that progress is the best reward for a teacher.',
  },
  {
    name: 'Support Team',
    role: 'Student Guidance',
    img: 'https://ui-avatars.com/api/?name=Star+Academy&background=0f6b6b&color=fff&size=220&bold=true',
    quote:
      'We guide students with course selection, practice support, and a friendly learning environment.',
  },
];

export default function Home() {
  const { data: coursesData = [] } = useListCourses();
  const { data: testimonialsData = [] } = useListTestimonials();
  const courses = asArray(coursesData);
  const testimonials = asArray(testimonialsData);
  const certifiedCourses = courses.length > 0 ? courses.slice(0, 3) : [];

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Inter,sans-serif' }}>
      <Navbar />

      <section
        className="star-animated-hero relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4"
        style={{
          background:
            'linear-gradient(135deg, rgba(6,40,55,0.94), rgba(15,107,107,0.9)), url("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1800&h=1000&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          paddingTop: '120px',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative z-10 max-w-5xl mx-auto text-center text-white"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-sm sm:text-base font-semibold text-secondary"
          >
            "Har Skill Par Nayi Shuruaat"
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5"
          >
            Welcome to Star
            <br />
            <span className="text-secondary">Computer's Academy.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-white/82 leading-relaxed mb-8"
          >
            A practical computer training institute for computer literacy,
            programming, web development, digital skills, certification courses,
            and career-ready IT learning.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold px-8">
                Register Now <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 bg-white/10 text-white hover:bg-white/20 font-bold px-8"
              >
                Browse Courses
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="star-moving-band bg-secondary py-6">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
          {[
            { number: '500+', label: 'Students Trained' },
            { number: '6+', label: 'Certified Courses' },
            { number: '3+', label: 'Years Experience' },
            { number: '100%', label: 'Practical Training' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold">{stat.number}</div>
              <div className="text-sm font-medium text-white/85 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-foreground mb-3">
                Our Facilities and Features
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore the features and student support available at our computer centre.
              </p>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {facilities.map((facility) => {
                const Icon = facility.icon;
                return (
                  <motion.div key={facility.title} variants={fadeUp}>
                    <div className="bg-white rounded-xl border border-border p-6 shadow-sm h-full">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon size={24} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-extrabold text-foreground">{facility.title}</h3>
                      <p className="text-sm font-bold text-secondary mt-1">{facility.subtitle}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                        {facility.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-foreground mb-3">
                Explore Our Certified Courses
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose a practical course path and start building job-ready digital skills.
              </p>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifiedCourses.map((course) => {
                const copy = featuredCourseCopy[course.title] || {
                  title: course.title,
                  desc: course.description,
                };

                return (
                  <motion.div key={course.id} variants={fadeUp}>
                    <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm h-full flex flex-col group">
                      <div className="h-52 overflow-hidden">
                        <img
                          src={
                            courseImages[course.title] ||
                            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=360&fit=crop'
                          }
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-extrabold text-foreground leading-snug mb-3">
                          {copy.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                          {copy.desc}
                        </p>
                        <Link href="/courses">
                          <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                            Browse More <ArrowRight size={15} className="ml-1.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-center"
          >
            <motion.div variants={fadeUp}>
              <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
                <img
                  src={`${import.meta.env.BASE_URL}images/team/Director.jpeg`}
                  alt="Director of Star Computer's Academy"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <p className="text-secondary font-bold mb-2">Director's Speaks</p>
              <h2 className="text-3xl font-extrabold text-foreground mb-5">
                A Message from Our Director
              </h2>
              <blockquote className="text-muted-foreground text-base leading-relaxed border-l-4 border-secondary pl-5 mb-5">
                At Star Computer's Academy, our goal is to make technology
                education accessible, practical, and confidence-building. We
                prepare students with computer fundamentals, digital tools, and
                modern IT skills so they can move forward in study, work, and
                daily life.
              </blockquote>
              <div>
                <p className="font-extrabold text-foreground">Miss. Anjali Gautam</p>
                <p className="text-sm text-primary font-semibold">
                  Director - Star Computer's Academy
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-foreground mb-3">
                Message from the Team of Our Institute
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our team works together to guide every learner with patience and practical support.
              </p>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMessages.map((member) => (
                <motion.div key={member.name} variants={fadeUp}>
                  <div className="bg-white rounded-xl border border-border p-6 shadow-sm h-full text-center">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover object-top mx-auto mb-4 border-4 border-primary/10"
                    />
                    <p className="text-sm text-muted-foreground italic leading-relaxed mb-4">
                      "{member.quote}"
                    </p>
                    <p className="font-extrabold text-foreground">{member.name}</p>
                    <p className="text-xs text-primary font-bold mt-1">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-foreground mb-3">
                Our Happy Students Say About Us
              </h2>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(testimonials.length > 0 ? testimonials.slice(0, 3) : []).map((t) => (
                <motion.div key={t.id} variants={fadeUp}>
                  <div className="bg-white rounded-xl border border-border p-6 shadow-sm h-full flex flex-col">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={15} className="text-secondary fill-secondary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground italic leading-relaxed flex-1">
                      "{t.review}"
                    </p>
                    <div className="pt-4 mt-4 border-t border-border">
                      <p className="font-extrabold text-foreground">{t.studentName}</p>
                      <p className="text-xs text-primary font-bold mt-1">{t.course}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="star-animated-hero py-14" style={{ background: 'linear-gradient(135deg, hsl(180,76%,18%) 0%, hsl(180,76%,26%) 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-3">Ready to Start Your Digital Journey?</h2>
          <p className="text-white/80 mb-7">
            Contact us today and choose the right course for your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+917275540378">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold px-8">
                <Phone size={17} className="mr-2" /> Call Now
              </Button>
            </a>
            <a href="mailto:staracademydu78@gmail.com">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/40 font-bold px-8">
                <Mail size={17} className="mr-2" /> Send Query
              </Button>
            </a>
          </div>
        </div>
      </section>

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
