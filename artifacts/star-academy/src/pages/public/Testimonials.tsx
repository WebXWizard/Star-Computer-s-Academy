import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useListTestimonials } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { asArray } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const avatarColors = ['0f6b6b', 'e07d2c', '2d6a8a', '8a2d6a', '6a8a2d', '2d8a6a'];

export default function Testimonials() {
  const { data: testimonialsData = [], isLoading } = useListTestimonials();
  const testimonials = asArray(testimonialsData);

  const activeTestimonials = testimonials.filter(t => t.isActive);

  return (
    <div className="min-h-screen" style={{fontFamily:'Inter,sans-serif'}}>
      <Navbar />

      {/* Header */}
      <section className="star-animated-hero pt-36 pb-14" style={{ background: 'linear-gradient(135deg, hsl(180,76%,15%) 0%, hsl(180,76%,23%) 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'hsl(28,90%,70%)' }}>Testimonials</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              What Our Students Say
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-lg max-w-2xl mx-auto">
              Real stories from real students who transformed their careers with our courses.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="star-moving-band bg-secondary py-6">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-4 text-center text-white">
          <div>
            <div className="text-3xl font-extrabold">500+</div>
            <div className="text-sm font-medium text-white/80 mt-0.5">Students Trained</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold">4.9★</div>
            <div className="text-sm font-medium text-white/80 mt-0.5">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold">95%</div>
            <div className="text-sm font-medium text-white/80 mt-0.5">Recommend Us</div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-16 text-muted-foreground">Loading testimonials...</div>
          ) : activeTestimonials.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No testimonials yet.</div>
          ) : (
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTestimonials.map((t, idx) => (
                <motion.div key={t.id} variants={fadeUp}>
                  <div className="bg-white rounded-xl border border-border shadow-sm p-6 h-full flex flex-col relative overflow-hidden">
                    <Quote size={36} className="absolute top-4 right-4 text-primary/10" />
                    <div className="flex mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className={i < t.rating ? 'text-secondary fill-secondary' : 'text-muted-foreground'} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground italic leading-relaxed flex-1 mb-4">"{t.review}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.studentName)}&background=${avatarColors[idx % avatarColors.length]}&color=fff&size=80&bold=true`}
                        alt={t.studentName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-sm text-foreground">{t.studentName}</p>
                        <p className="text-xs text-primary font-medium">{t.course}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-foreground mb-3">Join Our Growing Family</h2>
          <p className="text-muted-foreground mb-7">Be the next success story. Enroll today and start your digital journey.</p>
          <Link href="/courses">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8">
              Browse Courses
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
