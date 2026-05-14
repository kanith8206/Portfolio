/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import ScrollProgress from '@/components/ScrollProgress';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import AIChat from '@/components/AIChat';
import { TooltipProvider } from '@/components/ui/tooltip';
import BackgroundLines from '@/components/BackgroundLines';

// Lazy load sections for better performance
const About = lazy(() => import('@/components/sections/About'));
const Skills = lazy(() => import('@/components/sections/Skills'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const Experience = lazy(() => import('@/components/sections/Experience'));
const FutureScope = lazy(() => import('@/components/sections/FutureScope'));
const Certifications = lazy(() => import('@/components/sections/Certifications'));
const Contact = lazy(() => import('@/components/sections/Contact'));

export default function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
        <BackgroundLines />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        
        <main>
          <Hero />
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
            <About />
            <Skills />
            <Projects />
            <Experience />
            <FutureScope />
            <Certifications />
            <Contact />
          </Suspense>
        </main>

        <Footer />
        <AIChat />
      </div>
    </TooltipProvider>
  );
}

