import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, ExternalLink, Github, Monitor, Globe } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';

const projects = [
  {
    id: 'eco',
    title: 'ECOSERVE – Sustainable Packaging',
    description: 'A modern website for an eco-friendly packaging company in India, promoting sustainable solutions.',
    tags: ['Web', 'Sustainability'],
    image: 'https://plain-apac-prod-public.komododecks.com/202604/21/gawkPqhte8ahKP7Bo9YA/image.png',
    link: 'https://22it08ucet-noob.github.io/ecoserve-india/',
    fullDesc: 'ECOSERVE is a state-of-the-art platform designed to showcase sustainable packaging alternatives. The project focuses on high-end visual storytelling to convert traditional businesses into eco-conscious adopters. Built with a focus on load speeds and accessibility.'
  },
  {
    id: 'tasty',
    title: 'TastyMeals',
    description: 'A complete food delivery mobile app with smooth UI, restaurant listings, and seamless ordering experience.',
    tags: ['Mobile App', 'UI/UX'],
    image: 'https://plain-apac-prod-public.komododecks.com/202604/21/ytLLJMQRGSpSn9YeELWB/image.png',
    link: 'https://22it08ucet-noob.github.io/tastymeals/',
    fullDesc: 'TastyMeals redefines the food delivery experience in Madurai. Featuring a minimalist UI that highlights food photography, the app ensures a 3-tap ordering process. Integrated with real-time tracking and a secure payment ecosystem.'
  },
  {
    id: 'sparkwave',
    title: 'SparkWave Digital Agency',
    description: 'Full-scale digital agency website covering marketing, SEO, and brand strategy.',
    tags: ['Digital Agency', 'Marketing'],
    image: 'https://plain-apac-prod-public.komododecks.com/202604/21/vZJoPANSK0J2bpdEXNB8/image.png',
    link: 'https://22it08ucet-noob.github.io/sparkwave-website/',
    fullDesc: 'SparkWave is a digital powerhouse identity. It showcases a portfolio of successful SEO campaigns and brand overhauls. The site uses advanced CSS techniques to create a liquid-motion feel as users explore services.'
  },
  {
    id: 'gearup',
    title: 'GearUp — Bike & Car Service',
    description: 'Tamil Nadu\'s premium vehicle service booking platform with real-time tracking dashboard.',
    tags: ['Web App', 'Firebase'],
    image: 'https://plain-apac-prod-public.komododecks.com/202604/21/Cb72vvEUZCw6HX4pS9dp/image.png',
    link: 'https://22it08ucet-noob.github.io/gearup-service/',
    fullDesc: 'GearUp bridges the gap between vehicle owners and quality service centers. It features an automated slot booking system, service history tracking, and a real-time status dashboard for premium customers.'
  },
  {
    id: 'petlove',
    title: 'PetLove & Care — Madurai',
    description: 'Madurai\'s trusted pet care platform — find vets and book appointments.',
    tags: ['Web App', 'Madurai'],
    image: 'https://plain-apac-prod-public.komododecks.com/202604/21/DYB0U6299weNNFGDeC8j/image.png',
    link: 'https://22it08ucet-noob.github.io/petlove-care-madurai/',
    fullDesc: 'PetLove & Care is a community-driven platform for pet owners in Madurai. It allows users to find the nearest certified veterinarians, book emergency appointments, and access a curated database of pet nutritious foods.'
  },
  {
    id: 'erp',
    title: 'SparkWave ERP',
    description: 'A comprehensive ERP system built for streamlining business operations and tracking performance.',
    tags: ['ERP', 'Business'],
    image: 'https://plain-apac-prod-public.komododecks.com/202604/21/w5upHCNDTGGHw5AvfyVU/image.png',
    link: 'https://22it08ucet-noob.github.io/SparkWaveERP/',
    fullDesc: 'A high-performance Enterprise Resource Planning system. It features modules for inventory management, employee performance tracking, and real-time financial reporting with interactive data visualizations.'
  },
  {
    id: 'quiz',
    title: 'Quiz Rush — Interactive Quiz App',
    description: 'Fast-paced interactive quiz app with real-time scoring and leaderboard experience.',
    tags: ['Web App', 'Gamification'],
    image: 'https://plain-apac-prod-public.komododecks.com/202604/21/wlSya5nuvPQTmjAPiIpV/image.png',
    link: 'https://22it08ucet-noob.github.io/quiz-rush-app/',
    fullDesc: 'Quiz Rush uses gamification to enhance learning. Features include lightning-round challenges, category-based leaderboards, and a global ranking system. Optimized for mobile and low-latency interactions.'
  },
  {
    id: 'insight',
    title: 'InsightSheets',
    description: 'AI-powered Excel sheet analyzer for deep data insights and visualization.',
    tags: ['AI', 'Data Science'],
    image: 'https://plain-apac-prod-public.komododecks.com/202604/21/iJPdWejAcaPjuHk42Pd4/image.png',
    link: 'https://insightsheets.onrender.com/',
    fullDesc: 'Leverages Gemini AI to process complex Excel sheets. It automatically generates summaries, identifies trends, and produces interactive charts based on natural language queries.'
  },
  {
    id: 'holo',
    title: 'Karthick Holography',
    description: 'Real-time hand gesture holographic experience built with MediaPipe and Three.js.',
    tags: ['AI', 'WebGL'],
    image: 'https://plain-apac-prod-public.komododecks.com/202604/21/3SJ38quPfCj6XbfdqRym/image.png',
    link: 'https://22it08ucet-noob.github.io/Karthick-Holography/',
    fullDesc: 'An experimental WebGL project. Uses MediaPipe Face & Hand tracking to create an interactive 3D holographic projection that responds to real-time physical gestures via the webcam.'
  },
  {
    id: 'aptitude',
    title: 'Ultra AptitudeHub',
    description: 'Real-time aptitude training platform with cloud backend and admin portal.',
    tags: ['Education', 'Web App'],
    image: 'https://plain-apac-prod-public.komododecks.com/202604/21/mibl6EeXZp2nWwvKksYP/image.png',
    link: 'https://22it08ucet-noob.github.io/ultra-aptitudehub/',
    fullDesc: 'A full-stack educational platform. It features a robust test-taking engine, time-based aptitude challenges, and an admin portal for mentors to track student progress and accuracy.'
  },
  {
    id: 'facemesh',
    title: 'Face Mesh Tracking',
    description: 'Real-time 468-point facial landmark tracking built with MediaPipe and WebGL.',
    tags: ['AI', 'Tracking'],
    image: 'https://plain-apac-prod-public.komododecks.com/202604/21/LmXVnZyTL0HvpgxhwBJL/image.png',
    link: 'https://22it08ucet-noob.github.io/karthick-face-mesh/',
    fullDesc: 'A demonstration of high-density biometric tracking. Visualizes 468 landmarks on the human face in real-time, enabling virtual try-on and expression-based animations.'
  },
  {
    id: 'hirelens',
    title: 'HireLens AI',
    description: 'AI-powered resume analyzer with ATS score and skill gap detection.',
    tags: ['Gemini AI', 'Resume'],
    image: 'https://plain-apac-prod-public.komododecks.com/202604/21/KZQ6lExEUJmdGpeJWVwm/image.png',
    link: 'https://hirelens-ai-ukf3.onrender.com',
    fullDesc: 'HireLens AI helps candidates optimize their resumes for ATS systems. It provides deep skill-gap analysis, keyword suggestions, and personalized advice based on target job descriptions.'
  }
];

interface ProjectCardProps {
  project: any;
  idx: number;
  onSelect: (p: any) => void;
  key?: React.Key;
}

function ProjectCard({ project, idx, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    const flareX = (e.clientX - rect.left);
    const flareY = (e.clientY - rect.top);
    cardRef.current.style.setProperty('--mouse-x', `${flareX}px`);
    cardRef.current.style.setProperty('--mouse-y', `${flareY}px`);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      layoutId={`card-${project.id}`}
      onClick={() => onSelect(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group/card relative flex flex-col bg-[#080808] border border-white/5 rounded-[3rem] overflow-hidden hover:border-brand/40 transition-all duration-700 h-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 pointer-events-none transition-opacity duration-700 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(99,102,241,0.2)_0%,transparent_60%)] z-10" 
        style={{ transform: 'translateZ(100px)' }} 
      />

      <div className="aspect-[16/10] overflow-hidden bg-[#111] p-0 relative">
        <motion.img
          layoutId={`image-${project.id}`}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover/card:scale-110 transition-all duration-1000 grayscale-[0.5] group-hover/card:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-8 left-8 flex items-baseline gap-2 z-20">
           <span className="text-4xl font-black text-white/10 group-hover/card:text-brand transition-colors duration-500 italic">0{idx + 1}</span>
           <div className="h-[1px] w-8 bg-white/10 group-hover/card:w-16 transition-all duration-700" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
        
        <div className="absolute bottom-8 left-8 right-8 flex gap-3 z-20">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-[7px] font-black uppercase tracking-[0.2em] text-white/40 px-3 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-10 flex-1 flex flex-col relative z-20" style={{ transform: 'translateZ(30px)' }}>
        <motion.h3 
          layoutId={`title-${project.id}`}
          className="text-3xl md:text-4xl font-black mb-4 group-hover/card:text-white transition-colors tracking-tighter leading-[0.9] uppercase italic drop-shadow-2xl"
        >
          {project.title}
        </motion.h3>
        <p className="text-white/30 mb-10 flex-1 font-light leading-relaxed text-sm max-w-sm line-clamp-2">{project.description}</p>
        
        <div className="flex items-center gap-6 mt-auto">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand">Explore_Internal</span>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/card:border-brand/40 group-hover/card:bg-brand/10 transition-all">
             <ArrowUpRight size={16} className="text-brand" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Performance Optimization: Memoize the ProjectCard to prevent unnecessary re-renders during scroll
const MemoizedProjectCard = React.memo(ProjectCard);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden bg-[#030303]">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-24">
          <span className="text-brand font-black tracking-[0.5em] uppercase text-[12px] mb-6 block">The Curated Works</span>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-4 uppercase">Selected<br /><span className="text-gradient">Projects</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {projects.map((project, idx) => (
             <MemoizedProjectCard key={project.id} project={project} idx={idx} onSelect={setSelectedProject} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-3xl z-[100] cursor-zoom-out"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-12 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedProject.id}`}
                className="w-full max-w-6xl h-auto max-h-[90vh] md:aspect-[16/9] bg-[#080808] border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden pointer-events-auto flex flex-col md:flex-row relative shadow-2xl"
              >
                <div className="w-full md:w-3/5 h-[250px] md:h-full relative overflow-hidden bg-black shrink-0">
                  <motion.img
                    layoutId={`image-${selectedProject.id}`}
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                <div className="w-full md:w-2/5 p-6 md:p-16 flex flex-col h-full bg-[#080808] border-t md:border-t-0 md:border-l border-white/5 overflow-y-auto">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-brand/40 transition-all group z-50"
                  >
                    <X size={18} className="group-hover:rotate-90 transition-transform" />
                  </button>

                  <div className="flex gap-2 mb-8">
                     {selectedProject.tags.map((tag: string) => (
                       <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-brand border border-brand/20 px-3 py-1 rounded-full">
                         {tag}
                       </span>
                     ))}
                  </div>

                  <motion.h2 
                    layoutId={`title-${selectedProject.id}`}
                    className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter leading-none italic"
                  >
                    {selectedProject.title}
                  </motion.h2>

                  <p className="text-white/40 text-sm leading-relaxed mb-12 font-light">{selectedProject.fullDesc}</p>
                  
                  <div className="mt-auto flex flex-wrap gap-4">
                     <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(99,102,241,0.3)] shadow-brand/20"
                     >
                       Launch Console <ExternalLink size={14} />
                     </a>
                     <div className="flex gap-2">
                        <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-brand transition-all">
                           <Github size={18} />
                        </div>
                        <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-brand transition-all">
                           <Monitor size={18} />
                        </div>
                     </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
