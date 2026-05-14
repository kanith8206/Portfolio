import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Brain, Code, Database, Layout, Server, Settings } from 'lucide-react';

const skillCategories = [
  {
    id: 'languages',
    label: 'Languages',
    icon: Code,
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C', 'SQL']
  },
  {
    id: 'web',
    label: 'Web Dev',
    icon: Layout,
    skills: ['React', 'Next.js', 'Angular', 'Tailwind CSS', 'Framer Motion']
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Express', 'FastAPI', 'Socket.io']
  },
  {
    id: 'ai-ml',
    label: 'AI & ML',
    icon: Brain,
    skills: ['Machine Learning', 'Generative AI', 'RAG', 'TensorFlow', 'OpenCV', 'NLP']
  },
  {
    id: 'tools',
    label: 'Tools & DB',
    icon: Database,
    skills: ['Git', 'Docker', 'MongoDB', 'PostgreSQL', 'Firebase', 'Vector DB']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical <span className="text-primary italic font-serif underline decoration-blue-500/30">Arsenal</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive set of tools and technologies I use to turn ambitious ideas into reality.
          </p>
        </div>

        <Tabs defaultValue="languages" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto p-1 gap-1 mb-8 bg-muted/50 rounded-xl">
            {skillCategories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="py-3 px-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <cat.icon className="h-4 w-4 mr-2 hidden sm:block" />
                <span className="text-xs sm:text-sm font-semibold">{cat.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              >
                {cat.skills.map((skill) => (
                  <motion.div key={skill} variants={itemVariants}>
                    <div className="group relative p-6 rounded-[2rem] glass-panel border-white/5 hover:border-blue-400/30 transition-all duration-300 hover:bg-white/10 overflow-hidden text-center">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      <span className="font-bold text-slate-300 group-hover:text-white transition-colors uppercase tracking-widest text-[10px] sm:text-xs">{skill}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
