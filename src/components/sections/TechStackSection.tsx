'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { techStack } from '@/data/about';

export default function TechStackSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
            Tech Stack
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
            Tools of the Trade
          </h2>
          <p className="mt-3 text-slate-400 max-w-md mx-auto">
            Technologies I use daily to build high-quality mobile applications
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="glass rounded-2xl p-4 flex flex-col items-center gap-2.5 cursor-default group"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="text-xs text-slate-400 group-hover:text-slate-200 font-medium text-center transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
