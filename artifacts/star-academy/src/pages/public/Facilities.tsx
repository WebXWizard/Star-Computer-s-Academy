import { motion } from 'framer-motion';
import { Monitor, Wifi, Printer, Shield, Clock, Coffee, BookOpen, Headphones } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const facilities = [
  {
    icon: Monitor,
    title: 'Modern Computer Lab',
    desc: 'State-of-the-art computer lab with modern PCs, a 1-to-1 student-to-computer ratio, and all necessary software pre-installed. Every workstation is maintained and updated regularly.',
    features: ['Latest hardware & software', '1:1 student-to-PC ratio', 'Licensed MS Office suite', 'Regular maintenance'],
  },
  {
    icon: Wifi,
    title: 'High-Speed Internet',
    desc: 'Access fast, reliable broadband internet throughout the campus. Students can research, practice online skills, and use cloud-based tools without interruption.',
    features: ['Dedicated broadband connection', 'Consistent speeds for all students', 'Safe, filtered browsing', 'Available during all class hours'],
  },
  {
    icon: Printer,
    title: 'Printing Services',
    desc: 'On-campus printing and scanning services available at affordable rates. Students can print assignments, certificates, and practice materials.',
    features: ['Black & white and color printing', 'Scanning and photocopying', 'A4 and A3 formats', 'Affordable rates'],
  },
  {
    icon: Headphones,
    title: 'Tech Support',
    desc: 'Dedicated on-site technical support to help students resolve any hardware or software issues immediately, so no time is wasted during learning.',
    features: ['On-call technical expert', 'Hardware troubleshooting', 'Software installation help', 'Quick resolution turnaround'],
  },
  {
    icon: Clock,
    title: 'Flexible Batch Timings',
    desc: 'We offer morning and evening batches so students, working professionals, and homemakers can all find a time that fits their schedule.',
    features: ['Morning batch: 7 AM – 10 AM', 'Afternoon batch: 11 AM – 2 PM', 'Evening batch: 4 PM – 7 PM', 'Weekend batches available'],
  },
  {
    icon: Shield,
    title: 'Safe Environment',
    desc: 'Our premises are designed to be a safe and welcoming space for all learners. CCTV monitoring ensures the security of students and equipment.',
    features: ['CCTV monitoring 24/7', 'Safe and clean campus', 'Welcoming to all genders', 'Strict code of conduct'],
  },
  {
    icon: BookOpen,
    title: 'Study Material',
    desc: 'Comprehensive printed and digital study material is provided with every course. Notes are available in both Hindi and English for easy understanding.',
    features: ['Printed notes provided', 'Digital PDF materials', 'Available in Hindi & English', 'Practice exercises included'],
  },
  {
    icon: Coffee,
    title: 'Comfortable Environment',
    desc: 'A clean, comfortable, and distraction-free learning environment with proper seating, ventilation, and lighting for optimal concentration.',
    features: ['Proper ventilation & lighting', 'Comfortable seating', 'Clean & hygienic premises', 'Distraction-free atmosphere'],
  },
];

export default function Facilities() {
  return (
    <div className="min-h-screen" style={{fontFamily:'Inter,sans-serif'}}>
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-14" style={{ background: 'linear-gradient(135deg, hsl(180,76%,15%) 0%, hsl(180,76%,23%) 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'hsl(28,90%,70%)' }}>Our Facilities</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              World-Class Learning Environment
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-lg max-w-2xl mx-auto">
              Everything you need to learn effectively — modern equipment, fast internet, and a supportive environment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities.map((facility) => {
              const Icon = facility.icon;
              return (
                <motion.div key={facility.title} variants={fadeUp}>
                  <div className="bg-white rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/30 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={22} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-extrabold text-foreground text-lg mb-2">{facility.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{facility.desc}</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {facility.features.map((f) => (
                            <div key={f} className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                              <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Lab Gallery */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-foreground mb-2">Inside Our Academy</h2>
              <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  src: `${import.meta.env.BASE_URL}images/facilities/lab-computers.jpeg`,
                  alt: 'Modern computer lab with individual workstations'
                },
                {
                  src: `${import.meta.env.BASE_URL}images/facilities/classroom-seating.jpeg`,
                  alt: 'Classroom seating area for theory sessions'
                },
                {
                  src: `${import.meta.env.BASE_URL}images/facilities/academy-interior.jpeg`,
                  alt: 'Academy interior and front office area'
                },
              ].map((photo, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <div className="rounded-xl overflow-hidden border border-border shadow-sm aspect-[4/3]">
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ background: 'linear-gradient(135deg, hsl(180,76%,18%) 0%, hsl(180,76%,26%) 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">Experience It Yourself</h2>
          <p className="text-white/80 mb-7">Visit our academy and see our facilities in person. We'd love to show you around!</p>
          <Link href="/contact">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold px-8">
              Schedule a Visit
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
