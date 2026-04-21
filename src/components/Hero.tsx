import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Smartphone, Linkedin, Github } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const fullText = "KARTHICK RAJA K";
  const imageRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D image tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const mouseY = (e.clientY - rect.top) / rect.height;
    
    x.set(mouseX - 0.5);
    y.set(mouseY - 0.5);

    // Set local CSS variables for the torch effect
    imageRef.current.style.setProperty('--mouse-x', `${mouseX * 100}%`);
    imageRef.current.style.setProperty('--mouse-y', `${mouseY * 100}%`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-40 pb-20 overflow-hidden bg-black">
      {/* Cinematic Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] z-10" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center z-10">
        <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center py-12 opacity-20 h-[600px]">
           <div className="flex flex-col items-center gap-4">
             <div className="h-20 w-[1px] bg-white" />
             <div className="writing-mode-vertical-rl rotate-180 uppercase tracking-[1em] text-[8px] font-black">EST. 2026</div>
           </div>
           <div className="h-20 w-[1px] bg-white" />
        </div>

        <div className="lg:col-span-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-12"
          >
             <div className="h-[2px] w-20 bg-brand" />
             <span className="text-[12px] font-black tracking-[0.6em] uppercase text-brand tracking-widest leading-none">Global Digital Artisan</span>
          </motion.div>

          <h1 className="text-6xl md:text-[8vw] font-black mb-16 leading-[0.85] tracking-tighter uppercase relative group/title">
            <span className="block text-white opacity-20 text-[0.4em] mb-4">I AM</span>
            <span className="relative inline-block">
               <span className="text-gradient block group-hover/title:opacity-0 transition-opacity duration-100">
                  {typedText.slice(0, 8)}
                  <br />
                  {typedText.slice(8)}
               </span>
               
               {/* Glitch Layers (God Level) */}
               <span className="absolute inset-0 text-brand mix-blend-screen opacity-0 group-hover/title:opacity-100 transition-opacity pointer-events-none">
                  <motion.span 
                    animate={{ x: [-2, 2, -1], y: [1, -1, 0.5] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className="absolute inset-0"
                  >
                    {typedText.slice(0, 8)}
                    <br />
                    {typedText.slice(8)}
                  </motion.span>
                  <motion.span 
                    animate={{ x: [2, -2, 1], y: [-1, 1, -0.5] }}
                    transition={{ duration: 0.15, repeat: Infinity }}
                    className="absolute inset-0 text-cyan-400 opacity-50"
                  >
                    {typedText.slice(0, 8)}
                    <br />
                    {typedText.slice(8)}
                  </motion.span>
               </span>
            </span>
            <span className="text-brand/50 animate-pulse">_</span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-12 items-center"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Based in</span>
              <span className="text-xl font-light italic">Tamil Nadu, India</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Crafting</span>
              <span className="text-xl font-light italic">Future Tech</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 flex gap-10 items-center"
          >
            <Magnetic strength={0.2}>
              <a
                href="#projects"
                className="relative group h-20 w-80 overflow-hidden rounded-full border border-white/10 flex items-center justify-center transition-all hover:border-brand/40"
              >
                <div className="absolute inset-0 bg-brand translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
                <span className="relative z-10 font-black uppercase tracking-[0.5em] text-[10px]">Initiate Reveal</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative group">
          <motion.div
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(30px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ 
              rotateX, 
              rotateY, 
              transformStyle: 'preserve-3d',
              perspective: 1000 
            }}
            className="relative perspective-1000"
          >
            {/* Inner Depth Layer: Cyber Grid Blur */}
            <div className="absolute inset-[-40px] bg-brand/5 blur-[60px] rounded-full mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            {/* Ghost Frame 1 (Outer Magnetic) */}
            <motion.div 
              style={{ 
                x: useTransform(x, [-0.5, 0.5], [-20, 20]),
                y: useTransform(y, [-0.5, 0.5], [-20, 20]),
                transformStyle: 'preserve-3d',
                transform: 'translateZ(20px)'
              }}
              className="absolute inset-[-10px] border border-white/5 rounded-[4.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            />

            {/* Ghost Frame 2 (Inner Magnetic) */}
            <motion.div 
              style={{ 
                x: useTransform(x, [-0.5, 0.5], [15, -15]),
                y: useTransform(y, [-0.5, 0.5], [15, -15]),
                transformStyle: 'preserve-3d',
                transform: 'translateZ(70px)'
              }}
              className="absolute inset-[10px] border border-brand/20 rounded-[3.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            />

            {/* God Level Image Container with Depth Offset */}
            <div 
              className="relative aspect-[3.5/5] rounded-[4rem] overflow-hidden bg-white/5 border border-white/10 p-4 backdrop-blur-xl group-hover:border-brand/40 transition-all duration-700 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              style={{ transform: 'translateZ(50px)' }}
            >
              <img 
                src="https://plain-apac-prod-public.komododecks.com/202604/20/bC3is0MbWGJ0rTGYWgWX/image.jpg" 
                alt="KARTHICK RAJA K" 
                className="w-full h-full object-cover rounded-[3rem] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 grayscale-[0.9]"
                referrerPolicy="no-referrer"
              />
              
              {/* Dynamic Lens Flare (Magnetic) */}
              <motion.div 
                style={{ 
                  x: useTransform(x, [-0.5, 0.5], [-50, 50]),
                  y: useTransform(y, [-0.5, 0.5], [-50, 50])
                }}
                className="absolute inset-0 bg-gradient-to-tr from-brand/20 via-transparent to-white/10 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"
              />

              {/* Dynamic Scanning Laser */}
              <motion.div 
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_#6366f1]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              
              {/* HUD / Cyber Overlay Details (High Density) */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex justify-between items-start">
                    <div className="text-[8px] font-black tracking-widest text-brand/60 uppercase leading-relaxed font-mono">
                        SCANNING_V4<br />
                        LATENCY: 0.04ms<br />
                        UID: KRK.26
                    </div>
                    <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center">
                       <div className="w-1 h-1 bg-brand rounded-full animate-ping" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                     <div className="h-[1px] w-full bg-gradient-to-r from-brand/40 to-transparent" />
                     <div className="flex justify-between text-[6px] font-black tracking-widest text-white/40 uppercase">
                        <span>Buffer_Stable</span>
                        <span>0%...100%</span>
                     </div>
                  </div>
              </div>
            </div>

            {/* Corner Indicators (Interactive Lock-on) */}
            {[ 
              { pos: 'top-2 left-2', border: 'border-t-2 border-l-2' },
              { pos: 'top-2 right-2', border: 'border-t-2 border-r-2' },
              { pos: 'bottom-2 left-2', border: 'border-b-2 border-l-2' },
              { pos: 'bottom-2 right-2', border: 'border-b-2 border-r-2' }
            ].map((corner, i) => (
              <motion.div
                key={i}
                style={{ 
                  x: useTransform(x, [-0.5, 0.5], [i % 2 === 0 ? -10 : 10, i % 2 === 0 ? 10 : -10]),
                  y: useTransform(y, [-0.5, 0.5], [i < 2 ? -10 : 10, i < 2 ? 10 : -10])
                }}
                className={`absolute ${corner.pos} w-10 h-10 ${corner.border} border-white/20 rounded-sm z-40 pointer-events-none group-hover:border-brand/60 transition-colors bg-white/5 backdrop-blur-sm`}
              />
            ))}

            {/* Floating Detail Cards (Advanced Magnetic Parallax) */}
            <motion.div
              style={{ 
                x: useTransform(x, [-0.5, 0.5], [20, -20]),
                y: useTransform(y, [-0.5, 0.5], [20, -20]),
                transformStyle: 'preserve-3d',
                transform: 'translateZ(200px)'
              }}
              animate={{ rotate: [12, 14, 12] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-16 -right-16 z-50 bg-white text-black p-12 rounded-[3rem] shadow-[0_30px_70px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform"
            >
               <div className="absolute top-4 left-4 w-2 h-2 bg-brand rounded-full animate-pulse" />
               <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-40">Identity_Core</div>
               <div className="text-xl font-black whitespace-nowrap tracking-tight leading-none">KARTHICK R.</div>
            </motion.div>

            <motion.div
              style={{ 
                x: useTransform(x, [-0.5, 0.5], [-30, 30]),
                y: useTransform(y, [-0.5, 0.5], [-30, 30]),
                transformStyle: 'preserve-3d',
                transform: 'translateZ(250px)'
              }}
              animate={{ rotate: [-8, -6, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-16 -left-16 z-50 bg-brand p-12 rounded-[3rem] shadow-[0_30px_70px_rgba(99,102,241,0.4)] border border-white/20 group-hover:scale-105 transition-transform"
            >
               <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-white/50">Specialization</div>
               <div className="text-xl font-black text-white whitespace-nowrap tracking-tight leading-none uppercase">Full-Stack<br />Architect</div>
            </motion.div>

            {/* Orbiting Tech Rings */}
            <div className="absolute inset-[-100px] border border-white/[0.04] rounded-full animate-[spin_40s_linear_infinite] opacity-40 pointer-events-none ring-offset-4" />
            <div className="absolute inset-[-150px] border border-brand/5 rounded-full animate-[spin_60s_linear_infinite_reverse] opacity-20 pointer-events-none ring-1" />
            
            {/* Immersive Particle Drifters (Parallax) */}
            {[1, 2, 3, 4, 5, 6].map((p) => (
              <motion.div
                key={p}
                animate={{ 
                  y: [0, -150, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{ duration: 8 + p, repeat: Infinity, delay: p * 1.5 }}
                className="absolute w-1.5 h-1.5 bg-brand/60 rounded-full blur-[2px] pointer-events-none z-50"
                style={{ 
                  left: `${15 * p}%`,
                  top: `${20 * p}%`,
                  x: useTransform(x, [-0.5, 0.5], [p * 15, p * -15]),
                  y: useTransform(y, [-0.5, 0.5], [p * 15, p * -15])
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
