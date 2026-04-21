import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(20px)' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[10px] font-black tracking-[1em] uppercase text-brand/60 mb-8 ml-2"
          >
            Adapting to Digital Excellence
          </motion.div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-[0.8] overflow-hidden">
            <div className="overflow-hidden">
              {"KARTHICK".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  variants={{
                    initial: { y: "100%" },
                    animate: { y: 0 }
                  }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: [0.33, 1, 0.68, 1] }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className="overflow-hidden">
              {"RAJA K.".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  variants={{
                    initial: { y: "100%" },
                    animate: { y: 0 }
                  }}
                  transition={{ duration: 0.8, delay: 0.2 + (i * 0.05), ease: [0.33, 1, 0.68, 1] }}
                  className="inline-block text-brand"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
          </h1>
        </motion.div>

        {/* Cinematic Progress */}
        <div className="relative w-64 md:w-96 h-[2px] bg-white/5 rounded-full overflow-hidden mx-auto">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
            className="absolute inset-0 bg-brand shadow-[0_0_15px_#6366f1]"
          />
        </div>
        
        <div className="mt-6 flex justify-between items-center w-64 md:w-96 mx-auto">
           <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Initialization</span>
           <span className="text-sm font-black text-brand mono tracking-tight">{count}%</span>
        </div>
      </div>

      <motion.div 
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.02] rounded-full pointer-events-none" 
      />
    </motion.div>
  );
}
