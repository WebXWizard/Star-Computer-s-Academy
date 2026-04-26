import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateContact } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
  message: z.string().min(10, "Please write a descriptive message")
});
type ContactForm = z.infer<typeof contactSchema>;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

export default function Contact() {
  const createContactMutation = useCreateContact();
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactForm) => {
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

  const contactItems = [
    {
      icon: MapPin,
      title: 'Our Address',
      lines: ['X323+PRJ, Sarsaundi', 'Uttar Pradesh 225001', 'India'],
    },
    {
      icon: Phone,
      title: 'Phone Number',
      lines: ['+91 72755 40378'],
      href: 'tel:+917275540378',
    },
    {
      icon: Mail,
      title: 'Email Address',
      lines: ['staracademydu78@gmail.com'],
      href: 'mailto:staracademydu78@gmail.com',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      lines: ['Mon – Sat: 7:00 AM – 7:00 PM', 'Sunday: Closed'],
    },
  ];

  return (
    <div className="min-h-screen" style={{fontFamily:'Inter,sans-serif'}}>
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-14" style={{ background: 'linear-gradient(135deg, hsl(180,76%,15%) 0%, hsl(180,76%,23%) 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'hsl(28,90%,70%)' }}>Contact Us</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Get In Touch
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-lg max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us through any of the channels below.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-14 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={fadeUp}>
                  <div className="bg-white rounded-xl border border-border p-5 shadow-sm text-center h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground text-sm mb-2">{item.title}</h3>
                    {item.lines.map((line, i) =>
                      item.href && i === 0 ? (
                        <a key={i} href={item.href} className="block text-sm text-primary font-semibold hover:underline">{line}</a>
                      ) : (
                        <p key={i} className="text-sm text-muted-foreground">{line}</p>
                      )
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <a
              href="https://wa.me/917275540378"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ background: '#25D366' }}
            >
              <MessageCircle size={22} />
              Chat with Us on WhatsApp
            </a>
          </motion.div>

          {/* Contact Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <div className="bg-white rounded-xl border border-border shadow-sm p-7">
                <h2 className="text-2xl font-extrabold text-foreground mb-1">Send Us a Message</h2>
                <p className="text-sm text-muted-foreground mb-5">We'll reply within 24 hours.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">Full Name *</label>
                    <Input placeholder="Your full name" {...register("name")} className={errors.name ? "border-destructive" : ""} />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">Phone Number *</label>
                    <Input placeholder="+91 XXXXX XXXXX" type="tel" {...register("phone")} className={errors.phone ? "border-destructive" : ""} />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">Email Address (Optional)</label>
                    <Input placeholder="your@email.com" type="email" {...register("email")} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">Message *</label>
                    <Textarea placeholder="How can we help you?" {...register("message")} rows={4} className={errors.message ? "border-destructive" : ""} />
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold" disabled={createContactMutation.isPending}>
                    {createContactMutation.isPending ? "Sending..." : (
                      <span className="flex items-center gap-2"><Send size={15} /> Send Message</span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="flex flex-col gap-4">
              <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden flex-1" style={{ minHeight: '360px' }}>
                <iframe
                  title="Star Computer's Academy Location"
                  src="https://maps.google.com/maps?q=X323%2BPRJ%2C%20Sarsaundi%2C%20Uttar%20Pradesh%20225001%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '360px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="bg-primary/10 rounded-xl border border-primary/20 p-4">
                <p className="text-xs font-semibold text-primary mb-1">📍 Find Us</p>
                <p className="text-sm text-foreground font-medium">X323+PRJ, Sarsaundi, Uttar Pradesh 225001</p>
                <a
                  href="https://maps.google.com/?q=X323%2BPRJ%2C+Sarsaundi%2C+Uttar+Pradesh+225001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-secondary font-semibold mt-2 block hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
