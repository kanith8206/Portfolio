import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-border bg-background relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="text-center md:text-left">
            <a href="#" className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4 block">
              KK.
            </a>
            <p className="text-muted-foreground max-w-xs">
              Building intelligent solutions for the modern world. Passionate about AI, ML, and scalable tech.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a href="https://github.com/kanith8206" target="_blank" className="p-3 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/m-kishore-172790348/" target="_blank" className="p-3 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:kanith770@gmail.com" className="p-3 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <Button 
            variant="outline" 
            size="icon" 
            onClick={scrollToTop}
            className="rounded-full h-12 w-12 border-primary/20 hover:border-primary transition-all duration-300 group"
          >
            <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>

        <div className="pt-8 border-t border-border/50 text-center flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-medium">
          <p>© {new Date().getFullYear()} Kishore Kanitkan. All rights reserved.</p>
          <p className="flex items-center">
            Designed & Built with <span className="text-red-500 mx-1">❤</span> in Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
