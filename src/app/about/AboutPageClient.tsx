'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import {
  Download,
  MapPin,
  Mail,
  Smartphone,
  Code2,
  Layers,
  Zap,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/SocialIcons';
import { skills, experiences } from '@/data/about';
import { formatDateShort } from '@/lib/utils';

const highlights = [
  {
    icon: Smartphone,
    title: 'Mobile First',
    desc: 'Specialized in building native & cross-platform mobile apps that feel truly native.',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    desc: 'Writing maintainable, testable, and scalable code following SOLID principles.',
  },
  {
    icon: Layers,
    title: 'Architecture Expert',
    desc: 'Proficient in Clean Architecture, BLoC, MVVM, and microservices patterns.',
  },
  {
    icon: Zap,
    title: 'Performance Driven',
    desc: 'Obsessed with app performance — smooth 60fps UI, fast startup, low memory usage.',
  },
];

const tools = [
  'Android Studio', 'Xcode', 'VS Code', 'Figma', 'Postman',
  'GitHub', 'Jira', 'Slack', 'Firebase Console', 'Supabase',
  'Docker', 'Fastlane', 'TestFlight', 'Play Console', 'Linear',
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-slate-300 font-medium">{name}</span>
        <span className="text-indigo-400 font-semibold">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
        />
      </div>
    </div>
  );
}

export default function AboutPageClient() {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });

  const mobileSkills = skills.filter((s) => s.category === 'mobile' || s.category === 'language');
  const toolSkills = skills.filter((s) => s.category === 'tool');

  return (
    <div className="min-h-screen pt-24">
      {/* Hero / Profile */}
      <section ref={heroRef} className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
                About Me
              </span>
              <h1 className="mt-3 text-4xl sm:text-5xl font-black text-white leading-tight">
                Crafting Mobile <br />
                <span className="gradient-text">Experiences</span>
              </h1>
              <div className="mt-6 space-y-4 text-slate-400 leading-relaxed">
                <p>
                  Hi! I&apos;m <strong className="text-white">Ujang Wahyu</strong>, a passionate Mobile
                  Engineer with over <strong className="text-indigo-300">6 years</strong> of experience
                  building high-quality mobile applications for iOS and Android.
                </p>
                <p>
                  My primary expertise is in <strong className="text-white">Flutter</strong> — I love
                  the power of building beautiful, performant cross-platform apps from a single codebase.
                  I&apos;m also deeply proficient in <strong className="text-white">native Android with Kotlin</strong> and
                  have shipped multiple <strong className="text-white">iOS apps with Swift & SwiftUI</strong>.
                </p>
                <p>
                  I&apos;m UI/UX minded and care deeply about pixel-perfect implementation, smooth 60fps
                  animations, and intuitive user interactions. I&apos;ve built everything from fintech apps
                  handling millions in transactions to consumer apps with 100K+ users.
                </p>
              </div>

              {/* Meta info */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  Jakarta, Indonesia
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  ujang@example.com
                </span>
              </div>

              {/* Social */}
              <div className="mt-5 flex gap-3">
                {[
                  { icon: GithubIcon, href: 'https://github.com/ujangwahyu', label: 'GitHub' },
                  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2.5 rounded-xl glass text-slate-400 hover:text-white hover:bg-indigo-500/10 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Download CV */}
              <div className="mt-8">
                <a
                  href="/cv-ujang-wahyu.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/25"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </div>
            </motion.div>

            {/* Avatar / Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl bg-indigo-500/20 blur-3xl scale-110" />
                {/* Image card */}
                <div className="relative glass rounded-3xl p-2 border border-white/[0.1]">
                  <div className="relative w-72 h-80 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=90"
                      alt="Ujang Wahyu"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3 border border-white/[0.1]">
                  <p className="text-white font-bold text-lg leading-none">6+</p>
                  <p className="text-slate-400 text-xs mt-0.5">Years Exp.</p>
                </div>
                <div className="absolute -top-4 -left-4 glass rounded-2xl px-4 py-3 border border-white/[0.1]">
                  <p className="text-white font-bold text-lg leading-none">30+</p>
                  <p className="text-slate-400 text-xs mt-0.5">Apps Built</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Skills</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">Technical Proficiency</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                Mobile & Languages
              </h3>
              <div className="space-y-4">
                {mobileSkills.map((s, i) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.05} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Tools & Platforms
              </h3>
              <div className="space-y-4">
                {toolSkills.map((s, i) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.05} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-bold text-white">Tools I Use Daily</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-2 glass rounded-xl text-slate-300 text-sm border border-white/[0.06] hover:border-indigo-500/30 hover:text-indigo-300 transition-all cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Career</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">Journey So Far</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-indigo-500/20 to-transparent" />
            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex gap-6"
                >
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-2xl glass border border-white/[0.1] flex items-center justify-center z-10">
                    <Code2 className="w-5 h-5 text-indigo-400" />
                    {exp.current && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0a0f]" />
                    )}
                  </div>
                  <div className="glass rounded-2xl p-5 flex-1">
                    <div className="flex flex-wrap justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-white font-bold">{exp.position}</h3>
                        <p className="text-indigo-400 text-sm font-medium">{exp.company}</p>
                      </div>
                      <span className="text-slate-500 text-xs">
                        {formatDateShort(exp.startDate)} –{' '}
                        {exp.current ? (
                          <span className="text-emerald-400 font-medium">Present</span>
                        ) : (
                          exp.endDate && formatDateShort(exp.endDate)
                        )}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {t}
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

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 border border-white/[0.08]"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="text-slate-400 mb-8">
              Looking for a dedicated Mobile Engineer to join your team or project?
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:shadow-xl hover:shadow-indigo-500/30"
              >
                Get in Touch
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/[0.1] text-white font-semibold text-sm hover:bg-white/[0.08] transition-all"
              >
                View Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
