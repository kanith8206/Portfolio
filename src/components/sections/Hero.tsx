import { jsPDF } from 'jspdf';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const titles = [
  "AI Engineer",
  "Full Stack Developer",
  "Machine Learning Enthusiast",
  "Creative Problem Solver"
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDownloadResume = () => {
    const doc = new jsPDF();
    
    // Set font
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("M. KISHORE KANITKAN", 105, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Karur, Tamil Nadu | +91 90434 75672 | kanith770@gmail.com", 105, 30, { align: "center" });
    doc.text("LinkedIn: https://www.linkedin.com/in/m-kishore-172790348/", 105, 35, { align: "center" });
    
    doc.setLineWidth(0.5);
    doc.line(20, 40, 190, 40);
    
    // Career Objective
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("CAREER OBJECTIVE", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const objective = "Motivated and tech-driven 3rd-year B.Tech student in Computer Science and Business Systems, passionate about Artificial Intelligence, Machine Learning, and Full-Stack Development. Eager to apply technical and analytical skills in real-world projects and contribute to innovative solutions in data-driven decision-making and AI-powered applications.";
    const splitObjective = doc.splitTextToSize(objective, 170);
    doc.text(splitObjective, 20, 60);

    // Technical Skills
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("TECHNICAL SKILLS", 20, 85);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("• Areas of Interest: Artificial Intelligence, Data Science, Full Stack Development", 20, 95);
    doc.text("• Core Competencies: Machine Learning, Big Data Analytics, AI Concepts, Generative AI", 20, 100);
    doc.text("• Programming Languages: C, Python, Java", 20, 105);
    doc.text("• Tools & Platforms: IBM Data Science Tools, GitHub, VS Code, TensorFlow, OpenCV, NLP", 20, 110);
    doc.text("• Web Development: Angular (Infosys Springboard)", 20, 115);

    // Education
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("EDUCATION", 20, 130);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("B.TECH - COMPUTER SCIENCE AND BUSINESS SYSTEMS (CSBS)", 20, 140);
    doc.setFont("helvetica", "normal");
    doc.text("V.S.B College of Engineering, Tamil Nadu", 20, 145);
    doc.text("Expected Graduation: 2027", 20, 150);

    // Projects
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("ACADEMIC PROJECTS", 20, 165);
    
    doc.setFont("helvetica", "bold");
    doc.text("Smart Rescue Coordination Platform", 20, 175);
    doc.setFont("helvetica", "normal");
    doc.text("Tech Stack: TypeScript, React 19, Node.js, Express, MongoDB, Socket.io, Tailwind CSS 4, Gemini AI", 25, 180);
    
    doc.setFont("helvetica", "bold");
    doc.text("Paz AI Anxiety Assistant", 20, 190);
    doc.setFont("helvetica", "normal");
    doc.text("Tech Stack: React, TypeScript, Firebase, Gemini AI, Tailwind CSS, Recharts", 25, 195);

    // Certifications
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("CERTIFICATIONS", 20, 210);
    doc.setFont("helvetica", "normal");
    doc.text("• Stack Developer in Java — Coursera", 20, 220);
    doc.text("• Generative AI in HR — Coursera", 20, 225);
    doc.text("• Big Data Analytics — NASSCOM", 20, 230);

    doc.save('Kishore_Kanitkan_Resume.pdf');
  };

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 50 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        if (displayText === currentTitle) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-16">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl"
        >
          {/* Abstract SVG Background */}
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-blue-400 font-mono text-xs md:text-sm mb-6 tracking-[0.3em] uppercase flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            SYSTEMS.INIT() // STATUS: ACTIVE
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[1.1] tracking-tight">
            <span className="text-gradient">Hi, I'm</span> <br />
            <span className="text-white">Kishore Kanitkan</span>
          </h1>
          
          <div className="text-2xl md:text-3xl text-slate-400 font-light mb-10 max-w-2xl leading-relaxed">
            AI Engineer & Full Stack Developer building <br />
            <span className="text-purple-400 font-medium italic underline decoration-purple-500/30">intelligent autonomous</span> solutions.
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-slate-200 font-bold rounded-2xl px-10 h-14 text-lg"
              onClick={handleDownloadResume}
            >
              Download Resume
            </Button>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="lg" className="glass-panel border-white/10 text-white hover:bg-white/10 font-bold rounded-2xl px-10 h-14 text-lg" asChild>
                <a href="https://github.com/kanith8206" target="_blank">
                  View GitHub
                </a>
              </Button>
              <Button variant="outline" size="icon" className="glass-panel border-white/10 text-white hover:bg-white/10 rounded-2xl h-14 w-14" asChild>
                <a href="https://www.linkedin.com/in/m-kishore-172790348/" target="_blank">
                  <Linkedin className="h-6 w-6" />
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-8 text-slate-500 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              BASED IN TAMIL NADU
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              AVAILABLE FOR HIRE
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
