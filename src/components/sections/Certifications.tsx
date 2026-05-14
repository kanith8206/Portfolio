import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Award, CheckCircle } from 'lucide-react';

const certifications = [
  {
    title: "Stack Developer in Java",
    issuer: "Coursera",
    date: "2024",
    link: "#"
  },
  {
    title: "Generative AI in HR: Impact and Application of Gen AI HR Tools",
    issuer: "Coursera",
    date: "2024",
    link: "#"
  },
  {
    title: "Big Data Analytics",
    issuer: "NASSCOM",
    date: "2024",
    link: "#"
  },
  {
    title: "Web Development",
    issuer: "Infosys Springboard",
    date: "2023",
    link: "#"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Professional <span className="text-primary italic font-serif">Certifications</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Validation of expertise through globally recognized platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm group hover:border-primary/40 transition-all duration-300 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Award className="h-12 w-12 text-primary" />
                </div>
                
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-6">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                    {cert.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-sm font-semibold text-muted-foreground">{cert.issuer}</span>
                    <span className="text-xs font-mono text-muted-foreground/60">{cert.date}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
