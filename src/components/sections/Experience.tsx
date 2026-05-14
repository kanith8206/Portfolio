import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';

const education = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    major: "Computer Science and Business Systems (CSBS)",
    school: "V.S.B College of Engineering, Tamil Nadu",
    period: "2023 - 2027 (Expected)",
    description: "Focusing on AI, Machine Learning, Data Science, and Full Stack Development. Maintaining a strong academic record with specialization in business systems.",
    current: true
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Journey & <span className="text-primary italic font-serif">Background</span></h2>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-5 md:gap-8">
                <div className="md:col-span-1 hidden md:flex flex-col items-end pt-2">
                  <span className="text-sm font-bold text-primary uppercase tracking-widest">{edu.period}</span>
                </div>
                
                <div className="md:col-span-4 relative">
                  {/* Timeline Line */}
                  <div className="absolute -left-10 md:-left-4 top-0 bottom-0 w-px bg-border" />
                  <div className="absolute -left-12 md:-left-6 top-2 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)] border-4 border-background" />
                  
                  <Card className="hover:border-primary/50 transition-all duration-300 bg-muted/20 border-border/50">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                        <h3 className="text-2xl font-bold text-foreground flex items-center">
                          <GraduationCap className="mr-2 h-6 w-6 text-primary" />
                          {edu.degree}
                        </h3>
                        {edu.current && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                            Current
                          </span>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-lg font-semibold text-primary/80">{edu.major}</p>
                        <p className="text-muted-foreground flex items-center mt-1">
                          <Briefcase className="mr-2 h-4 w-4" /> {edu.school}
                        </p>
                        <p className="text-xs text-muted-foreground flex md:hidden items-center mt-1">
                          <Calendar className="mr-2 h-4 w-4" /> {edu.period}
                        </p>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {edu.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="text-center pt-8">
            <p className="text-muted-foreground italic">
              Actively seeking internship opportunities in AI Engineering and Full Stack roles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
