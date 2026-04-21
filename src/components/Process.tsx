import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import { Target, PenTool, Terminal, Rocket } from 'lucide-react';

const steps = [
  { 
    num: '01', 
    title: 'Strategy', 
    desc: 'Deep diving into core objectives and user psychology to build a bulletproof blueprint.',
    icon: Target,
    color: '#6366f1'
  },
  { 
    num: '02', 
    title: 'Precision Design', 
    desc: 'Crafting high-end visual systems where every pixel is a deliberate innovation.',
    icon: PenTool,
    color: '#10b981'
  },
  { 
    num: '03', 
    title: 'Advanced Engineering', 
    desc: 'Architecting high-performance logic using the latest tech stack for absolute scalability.',
    icon: Terminal,
    color: '#f59e0b'
  },
  { 
    num: '04', 
    title: 'Global Delivery', 
    desc: 'Rigorous optimization and deployment through high-availability infrastructure.',
    icon: Rocket,
    color: '#ec4899'
  }
];

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scrollPath = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="process" ref={containerRef} className="py-40 px-6 relative overflow-hidden bg-black/80">
      {/* Background Kinetic Stream */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/[0.03] hidden lg:block" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col mb-32 items-center text-center">
            <span className="text-brand font-black tracking-[1em] uppercase text-[10px] mb-6 block opacity-40">Systematic Flow</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">Project<br /><span className="text-gradient">Lifecycle</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative group/step"
            >
              {/* Step Connection Line (Horizontal for Desktop) */}
              {idx < steps.length - 1 && (
                <div className="absolute top-12 left-full w-full h-[1px] bg-white/[0.05] hidden lg:block z-0">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: '100%' }}
                     viewport={{ once: true }}
                     className="h-full bg-brand"
                     transition={{ duration: 1.5, delay: idx * 0.3 }}
                   />
                </div>
              )}

              <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[3rem] h-full relative z-10 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden group-hover/step:-translate-y-2">
                {/* Background Number Bloom */}
                <div className="absolute -top-10 -right-10 text-[10rem] font-black text-white/[0.02] pointer-events-none group-hover/step:text-white/[0.05] transition-colors leading-none">
                   {step.num}
                </div>

                <div className="flex flex-col justify-between h-full relative z-10">
                   <div>
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-500 relative">
                         <div className="absolute inset-0 bg-white/5 rounded-2xl group-hover/step:rotate-12 transition-transform" />
                         <step.icon size={28} className="text-white group-hover/step:text-brand transition-colors" />
                      </div>
                      <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter group-hover/step:translate-x-2 transition-transform">{step.title}</h3>
                      <p className="text-white/40 font-light leading-relaxed text-sm">{step.desc}</p>
                   </div>
                   
                   <div className="mt-12 flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-black group-hover/step:border-brand/40 group-hover/step:text-brand transition-all">
                        {step.num}
                      </div>
                      <div className="h-[1px] flex-grow bg-white/10" />
                   </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-brand opacity-0 group-hover/step:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Scroll-linked Bottom Decorative Line */}
      <motion.div 
        style={{ scaleX: scrollPath }}
        className="absolute bottom-0 left-0 w-full h-1 bg-brand origin-left opacity-20"
      />
    </section>
  );
}
