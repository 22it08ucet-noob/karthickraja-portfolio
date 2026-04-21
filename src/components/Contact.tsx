import { motion, AnimatePresence } from 'motion/react';
import { Mail, Instagram, Twitter, Linkedin, ArrowUpRight, MessageCircle, Github } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const workImages = [
  'https://plain-apac-prod-public.komododecks.com/202604/21/4FRwjWZ2xyc8wKfOcuuv/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202604/21/jxQhSusThlagT9qhoE2E/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202604/21/BcWitrtcQJaFnSzLQuRs/image.jpg'
];

export default function Contact() {
  const currentYear = new Date().getFullYear();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % workImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer id="contact" className="pt-32 pb-12 px-6 bg-[#030303] relative overflow-hidden text-white">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
          <div>
            <h2 className="text-6xl md:text-8xl font-black mb-12 leading-tight tracking-tighter">
              Let's build <br />
              <span className="text-gradient">something <br /> great.</span>
            </h2>
            <p className="text-white/40 text-xl max-w-md leading-relaxed font-light mb-12">
              Based in Tamil Nadu, India. Working globally. High-performance apps, stunning designs, and growth marketing.
            </p>

            <div className="flex flex-col gap-8">
              <a
                href="https://wa.me/918610861188"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-8 py-5 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl text-[#25D366] font-bold group hover:bg-[#25D366]/20 transition-all active:scale-95 w-fit"
              >
                <MessageCircle size={24} />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-widest opacity-60">WhatsApp Me</div>
                  <div className="text-lg">+91 86108 61188</div>
                </div>
                <ArrowUpRight size={24} className="ml-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <div className="flex gap-4">
                <a
                  href="mailto:kkarthickraja2318@gmail.com"
                  className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-brand/50 transition-all hover:-translate-y-1 group"
                  title="Email Me"
                >
                  <Mail size={24} className="group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://github.com/22it08ucet-noob"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-brand/50 transition-all hover:-translate-y-1 group"
                  title="GitHub Profile"
                >
                  <Github size={24} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Automatic Cinematic Slideshow */}
          <div className="relative aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden border border-white/5 group/slide shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <img 
                  src={workImages[currentSlide]} 
                  alt={`Work experience ${currentSlide + 1}`}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover/slide:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60" />
              </motion.div>
            </AnimatePresence>
            
            {/* UI Indicators */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-center items-center z-20">
               <div className="flex gap-2">
                 {workImages.map((_, i) => (
                   <div 
                    key={i} 
                    className={`h-1 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-8 bg-brand' : 'w-2 bg-white/20'}`}
                   />
                 ))}
               </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-2xl font-black tracking-tighter uppercase">
            KRK<span className="text-brand">.</span>
          </div>
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold text-center">
            © {currentYear} KARTHICK RAJA K · Developer · Designer · Marketer
          </p>
          <div className="flex gap-10">
            <a href="#" className="text-white/20 text-[10px] hover:text-white transition-colors uppercase tracking-widest font-bold">Tamil Nadu, India</a>
            <a href="#" className="text-white/20 text-[10px] hover:text-white transition-colors uppercase tracking-widest font-bold">Every pixel has a purpose</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
