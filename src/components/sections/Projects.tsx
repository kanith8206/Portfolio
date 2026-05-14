import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Sparkles, Filter } from 'lucide-react';

const projects = [
  {
    title: "Smart Rescue Coordination Platform",
    category: "Full Stack",
    description: "A real-time platform for emergency services using AI to optimize rescue routes and coordinate teams.",
    image: "https://picsum.photos/seed/rescue/800/600",
    tech: ["React 19", "Node.js", "Express", "Socket.io", "MongoDB", "Mapbox", "Gemini AI"],
    github: "#",
    live: "#",
    featured: true
  },
  {
    title: "Paz AI Anxiety Assistant",
    category: "AI/ML",
    description: "An AI-powered mental health chatbot providing support through NLP and empathetic response generation.",
    image: "https://picsum.photos/seed/mental/800/600",
    tech: ["React", "TypeScript", "Firebase", "Gemini AI", "Recharts", "Kotlin"],
    github: "#",
    live: "#",
    featured: false
  },
  {
    title: "AI Mental Health Assistant (RAG)",
    category: "AI/ML",
    description: "Advanced semantic search chatbot using Retrieval Augmented Generation for accurate clinical info.",
    image: "https://picsum.photos/seed/rag/800/600",
    tech: ["FastAPI", "Vector DB", "OpenAI", "Python"],
    github: "#",
    live: "#",
    featured: false
  }
];

const categories = ["All", "AI/ML", "Full Stack", "ML"];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Innovation <span className="text-primary italic font-serif">Portfolio</span></h2>
            <p className="text-muted-foreground text-lg">
              Check out some of my most impactful work, ranging from AI infrastructure to intuitive web applications.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat)}
                className="rounded-full px-4"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="group h-full bg-white/5 backdrop-blur-xl border-white/10 hover:border-blue-400/50 transition-all duration-500 overflow-hidden shadow-2xl rounded-[2rem]">
                  <div className="relative aspect-video overflow-hidden p-2">
                    <div className="w-full h-full rounded-2xl overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <div className="flex gap-4">
                          <Button size="sm" className="rounded-xl bg-white text-black hover:bg-slate-200">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                          </Button>
                          <Button size="sm" variant="secondary" className="rounded-xl glass-panel border-white/10 text-white">
                            <Github className="mr-2 h-4 w-4" /> Code
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="p-8 pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">{project.category}</span>
                      {project.featured && <Sparkles className="h-4 w-4 text-purple-400" />}
                    </div>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">{project.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-8 pt-4">
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1 bg-white/5 text-[10px] rounded-lg border border-white/5 text-slate-300 uppercase tracking-wider">
                          {t}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-12 text-center md:hidden">
            <Button variant="outline" className="w-full rounded-xl" asChild>
              <a href="#">
                View All Projects 
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
        </div>
      </div>
    </section>
  );
}
