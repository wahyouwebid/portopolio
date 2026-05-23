'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experiences } from '@/data/about';
import { formatDateShort } from '@/lib/utils';
import { Briefcase } from 'lucide-react';

export default function ExperienceTimeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
            Career
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
            Experience Timeline
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-indigo-500/20 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-6"
              >
                {/* Dot */}
                <div className="relative flex-shrink-0 w-12 h-12 rounded-2xl glass border border-white/[0.1] flex items-center justify-center z-10">
                  <Briefcase className="w-5 h-5 text-indigo-400" />
                  {exp.current && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0a0f]" />
                  )}
                </div>

                {/* Content */}
                <div className="glass rounded-2xl p-5 flex-1 mb-2">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-white font-bold text-base">{exp.position}</h3>
                      <p className="text-indigo-400 text-sm font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-xs">
                        {formatDateShort(exp.startDate)} –{' '}
                        {exp.current ? (
                          <span className="text-emerald-400 font-medium">Present</span>
                        ) : (
                          exp.endDate && formatDateShort(exp.endDate)
                        )}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
