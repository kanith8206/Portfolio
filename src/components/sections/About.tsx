import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Code, Cpu, Sparkles } from 'lucide-react';

const stats = [
  { icon: Brain, label: 'ML Focus', value: 'Generative AI' },
  { icon: Code, label: 'Full Stack', value: 'React + Node' },
  { icon: Cpu, label: 'Optimization', value: 'FastAPI' },
  { icon: Sparkles, label: 'Vision', value: 'OpenCV' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Decoding Complexity, <br />
              <span className="text-primary italic font-serif">Engineering Innovation</span>
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm <span className="text-foreground font-semibold">Kishore Kanitkan</span>, a 3rd-year B.Tech CSBS student with a laser focus on the intersection of Artificial Intelligence and robust Full-Stack development.
              </p>
              <p>
                My journey is driven by a passion for building systems that don't just solve problems but redefine possibilities. Whether it's crafting high-performance AI chatbots or architecting rescue coordination platforms, I thrive at the edge of tech.
              </p>
              <p>
                Based in Tamil Nadu, I'm constantly exploring new frontiers in Generative AI, RAG architectures, and data-driven decision systems. I believe in the power of "AI for Good" and strive to implement ethical, efficient solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-12">
              {stats.map((stat, i) => (
                <div key={i} className="glass-panel p-4 rounded-2xl flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{stat.label}</p>
                    <p className="font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl relative group border border-white/10 p-4 bg-white/5 backdrop-blur-xl">
              <img
                src="https://picsum.photos/seed/kishore/800/800"
                alt="Portrait"
                className="w-full h-full object-cover rounded-[2.5rem] transform group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Abstract Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
