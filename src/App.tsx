import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Process from './components/Process';
import Contact from './components/Contact';
import SplashScreen from './components/SplashScreen';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Lenis from 'lenis';

const AUDIO_CLICK = 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3';

export default function App() {
  const [loading, setLoading] = useState(true);
  
  // Interactive Background Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const bgTranslateX = useTransform(springX, [-1000, 1000], [-30, 30]);
  const bgTranslateY = useTransform(springY, [-1000, 1000], [-30, 30]);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const playClick = () => {
      const audio = new Audio(AUDIO_CLICK);
      audio.volume = 0.1;
      audio.play().catch(() => {});
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('click', playClick);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('click', playClick);
      window.removeEventListener('mousemove', handleMouseMove);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-brand selection:text-white bg-[#030303] text-white overflow-x-hidden">
      {/* Interactive Cinematic Background Layer */}
      <motion.div 
        style={{ x: bgTranslateX, y: bgTranslateY }}
        className="fixed inset-[-100px] pointer-events-none z-0"
      >
        {/* Noise Grid Overlay - Simplified for mobile */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay hidden md:block">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-50">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
        
        {/* Subtle Ambient Glows - Optimized size for mobile */}
        <div className="absolute top-1/4 left-1/4 w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-brand/5 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[70vw] md:w-[40vw] h-[70vw] md:h-[40vw] bg-cyan-500/5 blur-[80px] md:blur-[120px] rounded-full" />
      </motion.div>

      <AnimatePresence>
        {loading && (
          <SplashScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1 }}
        >
          <Navbar />
          <main className="relative z-10">
            <Hero />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Projects />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Skills />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Process />
            </motion.div>
          </main>

          <Contact />
        </motion.div>
      )}
    </div>
  );
}

