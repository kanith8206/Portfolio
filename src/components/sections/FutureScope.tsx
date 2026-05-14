import { motion } from 'framer-motion';
import { 
  Brain, 
  Cpu, 
  BarChart3, 
  Zap, 
  Database, 
  Network, 
  Rocket, 
  ArrowRight,
  Sparkles,
  Globe,
  ChevronRight
} from 'lucide-react';
import { Button as UIButton } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const focusAreas = [
  { icon: Brain, title: "Artificial Intelligence", description: "Advanced neural architectures and generative systems." },
  { icon: BarChart3, title: "Business Analytics", description: "Data-driven insights for strategic decision making." },
  { icon: Network, title: "Machine Learning", description: "Predictive modeling and autonomous learning algorithms." },
  { icon: Zap, title: "Intelligent Automation", description: "Streamlining workflows with AI-powered agents." },
  { icon: Database, title: "SaaS Solutions", description: "Scalable cloud-native intelligent applications." },
  { icon: Cpu, title: "Predictive Systems", description: "Forecasting trends through deep pattern recognition." }
];

const roadmap = [
  { year: "Phase 1", goal: "Research & Development", status: "Ongoing" },
  { year: "Phase 2", goal: "Core AI Engine MVP", status: "Upcoming" },
  { year: "Phase 3", goal: "Sinérgia Platform Launch", status: "Vision" },
  { year: "Phase 4", goal: "Global Business Ecosystem", status: "Future" }
];

const FutureScope = () => {
  return (
    <section id="future" className="py-24 relative overflow-hidden bg-black">
      {/* Futuristic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" /> Future Scope
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-400 bg-clip-text text-transparent italic">
              Building the next generation of intelligent business systems
            </h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              Transforming businesses through synergy between AI, analytics, and innovation. 
              Paving the way for a more connected and intelligent industrial future.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Sinergia Startup Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <Card className="relative bg-black/60 border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h4 className="text-5xl font-bold mb-2 tracking-tighter flex items-center gap-3">
                      <span className="text-white">Sinérgia</span>
                      <span className="text-3xl">🇪🇸</span>
                    </h4>
                    <p className="text-blue-400 font-mono text-sm uppercase tracking-tighter">“Intelligence Through Synergy”</p>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                    AI Startup Vision
                  </div>
                </div>

                <div className="mb-10">
                  <p className="text-slate-300 text-lg leading-relaxed mb-6 font-light">
                    Sinergia is a future-focused AI startup vision aimed at transforming businesses using 
                    connected intelligence, smart analytics, and scalable technology solutions. 
                    The goal is to create intelligent systems that improve decision-making, 
                    automation, and digital transformation for modern enterprises.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {focusAreas.map((area, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors">
                        <area.icon className="h-4 w-4 text-blue-400" />
                        <span className="text-xs font-medium text-slate-300">{area.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-6 border-t border-white/5">
                  <UIButton size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                    Explore Vision
                  </UIButton>
                  <UIButton variant="outline" size="lg" className="border-white/10 text-white hover:bg-white/5 rounded-full px-8">
                    Coming Soon
                  </UIButton>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Roadmap / Goals Section */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h5 className="text-2xl font-bold text-white flex items-center gap-3">
                <Rocket className="h-6 w-6 text-purple-400" /> Roadmap to Synergy
              </h5>
              
              <div className="space-y-4">
                {roadmap.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold group-hover:rotate-12 transition-transform">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h6 className="font-bold text-white tracking-tight">{item.year}</h6>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                          item.status === 'Ongoing' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                          item.status === 'Upcoming' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mt-0.5">{item.goal}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Globe className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    "Intelligence is not just about computing power, it's about the synergy between data, businesses, and people."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureScope;
