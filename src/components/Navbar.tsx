import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface MagneticProps {
  children: React.ReactNode;
  key?: any;
}

function Magnetic({ children }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Works', href: '#projects' },
    { name: 'Expertise', href: '#skills' },
    { name: 'Mechanism', href: '#process' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between ${isScrolled ? 'bg-black/40 backdrop-blur-2xl border border-white/5 py-4 px-8 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : ''} transition-all`}>
        <Magnetic>
          <a href="#" className="text-2xl font-black tracking-tighter group flex items-center gap-1 uppercase">
            KRK<span className="text-brand group-hover:animate-ping">.</span>
          </a>
        </Magnetic>

        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <a 
                href={link.href} 
                className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            </Magnetic>
          ))}
          <Magnetic>
            <a 
              href="#contact" 
              className="px-8 py-3 bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-full hover:bg-brand hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95"
            >
              Collaborate
            </a>
          </Magnetic>
        </div>

        <button 
          className="md:hidden w-12 h-12 flex items-center justify-center bg-white/5 rounded-full border border-white/10"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={20} />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-black p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-black uppercase">KRK<span className="text-brand">.</span></span>
              <button 
                className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-5xl font-black uppercase tracking-tighter hover:text-brand transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact"
                className="mt-8 flex items-center gap-4 text-brand font-black uppercase text-xs tracking-widest underline underline-offset-8"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start a Conversation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
