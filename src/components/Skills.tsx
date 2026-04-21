import { motion } from 'motion/react';
import { Globe, Smartphone, Search } from 'lucide-react';

export default function Skills() {
  const skills = [
    { name: 'HTML5 / CSS3', percentage: 95, icon: '🌐' },
    { name: 'JavaScript / React', percentage: 90, icon: '⚛️' },
    { name: 'App Dev (Java/Kotlin)', percentage: 85, icon: '📱' },
    { name: 'Digital Marketing / SEO', percentage: 80, icon: '📈' },
    { name: 'Creative UI Design', percentage: 95, icon: '🎨' },
    { name: 'Backend Engineering', percentage: 75, icon: '⚙️' }
  ];

  return (
    <section id="skills" className="py-40 px-6 relative overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col mb-24 items-center text-center">
            <span className="text-brand font-black tracking-[0.8em] uppercase text-[10px] mb-6 block opacity-60">Engineered Expertise</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] mb-8 uppercase">Technical<br /><span className="text-gradient">Arsenal</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 group">
          {/* Main Hero Skill Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 lg:row-span-2 p-12 bg-white/[0.03] border border-white/5 rounded-[3rem] relative overflow-hidden group/card"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent translate-y-[-100%] group-hover/card:translate-y-[1000%] transition-transform duration-[3s] ease-linear repeat-infinite opacity-50" />
            
            <div className="flex flex-col h-full justify-between relative z-10">
              <div>
                <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center mb-8 border border-brand/20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full font-black text-[10px] flex items-center justify-center" />
                  </motion.div>
                  <Globe className="absolute text-brand" size={24} />
                </div>
                <h3 className="text-4xl font-black mb-4 uppercase tracking-tighter">Frontend Architecture</h3>
                <p className="text-white/40 font-light leading-relaxed mb-8">Crafting high-performance, pixel-perfect interfaces that prioritize user experience and speed.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {['Vite', 'React', 'Motion', 'Tailwind'].map((tech) => (
                   <div key={tech} className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-brand hover:border-brand/40 transition-all cursor-default text-center">
                     {tech}
                   </div>
                ))}
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand/5 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>

          {/* Individual Skill Cards */}
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] transition-all group/item overflow-hidden relative"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="text-2xl">{skill.icon}</span>
                <span className="text-[10px] font-black tracking-widest text-brand/60 uppercase">{skill.percentage}%</span>
              </div>
              <h4 className="text-lg font-black mb-4 uppercase tracking-tight leading-tight">{skill.name}</h4>
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'circOut', delay: 0.5 }}
                  className="h-full bg-brand shadow-[0_0_10px_#6366f1]"
                />
              </div>

              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/5 to-transparent h-20 -translate-y-full group-hover/item:translate-y-[400%] transition-transform duration-[2s] pointer-events-none" />
            </motion.div>
          ))}

          {/* Specialty Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 p-10 bg-gradient-to-br from-brand/10 to-transparent border border-brand/20 rounded-[2.5rem] relative group/spec overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-8">
              <div className="text-5xl opacity-80 group-hover/spec:scale-110 transition-transform"><Smartphone size={48} className="text-brand" /></div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-widest mb-2">Modern Engineering</h3>
                <p className="text-xs text-white/50 font-light">Cross-platform development and digital marketing strategies designed for exponential growth.</p>
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/20 blur-[50px] rounded-full animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
