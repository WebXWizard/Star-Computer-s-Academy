import { motion } from 'framer-motion';
import { Users, Target, Eye, Heart, CheckCircle, Award, BookOpen, Laptop } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

export default function About() {


  const highlights = [
    'Expert instructor with years of industry experience',
    'Small batch sizes for personalized attention',
    'Modern computer lab with high-speed internet',
    'Flexible timings — morning and evening batches',
    'Placement assistance after course completion',
    'Certificate on successful course completion',
    'Course material provided in Hindi & English',
    'Affordable fee with no hidden charges',
  ];

  const team = [
    {
      name: 'Miss. Anjali Gautam',
      role: 'Director - Star Computer\'s Academy',
      img: 'https://ui-avatars.com/api/?name=Director&background=0f6b6b&color=fff&size=200&bold=true',
      quote: 'Education is the most powerful weapon which you can use to change the world. At Star Computer\'s Academy, our mission is to empower the youth of Sarsaundi with cutting-edge digital skills.',
    },
    {
      name: 'Mr. Shahe Alam',
      role: 'Head Instructor',
      img: 'https://ui-avatars.com/api/?name=Suraj+Yadav&background=e07d2c&color=fff&size=200&bold=true',
      quote: 'Our mission is to empower individuals with essential digital skills and advanced technical knowledge, shaping the future of technology learners.',
    },
    {
      name: 'Priya Sharma',
      role: 'Senior Trainer',
      img: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=0f6b6b&color=fff&size=200&bold=true',
      quote: 'Teaching computers to beginners is a rewarding experience. Seeing students gain confidence in using technology makes every class worthwhile.',
    },
  ];

  return (
    <div className="min-h-screen" style={{fontFamily:'Inter,sans-serif'}}>
      <Navbar />

      {/* Page Header */}
      <section className="pt-36 pb-14" style={{ background: 'linear-gradient(135deg, hsl(180,76%,15%) 0%, hsl(180,76%,23%) 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'hsl(28,90%,70%)' }}>About Us</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Our Story & Mission
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-lg max-w-2xl mx-auto">
              Empowering the youth of Sarsaundi with practical digital skills since our founding.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-foreground mb-5">
                Who We Are
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-base leading-relaxed mb-4">
                <strong className="text-foreground">Star Computer's Academy</strong> is a premier computer training institute located in Sarsaundi, Uttar Pradesh. Founded with a vision to bridge the digital divide, we have been providing quality, affordable computer education to students, job seekers, and working professionals.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground text-base leading-relaxed mb-4">
                Our institute offers a range of courses from basic computer skills to advanced office applications, typing, and government exam preparation (CCC). We focus on practical, hands-on training that directly translates into real-world skills.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground text-base leading-relaxed mb-6">
                Located conveniently at X323+PRJ, Sarsaundi, we serve students from across the district who are committed to building their digital future.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href="/courses">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                    View Our Courses
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Users, label: '500+ Students', sub: 'Successfully trained' },
                { icon: BookOpen, label: '5+ Courses', sub: 'Industry-relevant programs' },
                { icon: Award, label: 'Certified', sub: 'On course completion' },
                { icon: Laptop, label: 'Modern Lab', sub: 'High-speed internet' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.label} variants={fadeUp}>
                    <div className="bg-white rounded-xl border border-border p-5 shadow-sm text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Icon size={22} className="text-primary" />
                      </div>
                      <div className="font-extrabold text-lg text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

     

      {/* Highlights */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-foreground mb-2">Why Choose Us?</h2>
              <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((h) => (
                <motion.div key={h} variants={fadeUp} className="flex items-start gap-3 bg-white rounded-xl border border-border p-4 shadow-sm">
                  <CheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{h}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-foreground mb-2">Our Team</h2>
              <div className="w-16 h-1 bg-secondary mx-auto rounded-full mb-3" />
              <p className="text-muted-foreground text-sm max-w-lg mx-auto">Dedicated professionals committed to your learning success</p>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member) => (
                <motion.div key={member.name} variants={fadeUp}>
                  <div className="bg-white rounded-xl border border-border p-6 shadow-sm text-center h-full flex flex-col">
                    <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                    <h3 className="font-extrabold text-foreground text-base">{member.name}</h3>
                    <p className="text-sm font-semibold text-secondary mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground italic flex-1">"{member.quote}"</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
