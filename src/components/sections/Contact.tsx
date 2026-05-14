import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully! (Demo)');
    }, 1500);
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Let's <span className="text-primary italic font-serif">Connect</span></h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-lg">
              Have a question or want to work together? I'm always open to new opportunities and collaborations.
            </p>

            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email', value: 'kanith770@gmail.com', href: 'mailto:kanith770@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 90434 75672', href: 'tel:+919043475672' },
                { icon: MapPin, label: 'Location', value: 'Karur, Tamil Nadu, India', href: '#' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center space-x-6 group"
                >
                  <div className="p-4 rounded-2xl bg-muted/50 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">{item.label}</p>
                    <p className="text-xl font-semibold group-hover:text-primary transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-16">
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold mb-6">Social Profiles</p>
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: 'https://github.com/kanith8206' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/m-kishore-172790348/' },
                  { icon: Instagram, href: '#' },
                ].map((social, i) => (
                  <Button 
                    key={i} 
                    variant="ghost" 
                    size="icon" 
                    className="h-12 w-12 rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    asChild
                  >
                    <a href={social.href} target="_blank">
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-border/50 bg-muted/20 backdrop-blur-sm p-8 rounded-3xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                    <Input placeholder="John Doe" className="h-12 rounded-xl" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                    <Input type="email" placeholder="john@example.com" className="h-12 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
                  <Input placeholder="Inquiry about project" className="h-12 rounded-xl" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                  <Textarea placeholder="Hi किशोर, I'd like to discuss..." className="min-h-[150px] rounded-xl" required />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 rounded-xl text-lg font-bold group bg-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Transmitting...'
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
