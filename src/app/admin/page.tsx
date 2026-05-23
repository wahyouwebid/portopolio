'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FolderKanban, BookOpen, UserCircle, TrendingUp, Eye, Users, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog';

const cards = [
  {
    label: 'Total Projects',
    value: projects.length,
    icon: FolderKanban,
    href: '/admin/projects',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
  {
    label: 'Blog Posts',
    value: blogPosts.filter((p) => p.published).length,
    icon: BookOpen,
    href: '/admin/blog',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    label: 'Page Views',
    value: '4.2K',
    icon: Eye,
    href: '#',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    label: 'Visitors',
    value: '1.8K',
    icon: Users,
    href: '#',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
];

const recentProjects = projects.slice(0, 4);
const recentPosts = blogPosts.filter((p) => p.published).slice(0, 4);

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back, Ujang! Here&apos;s what&apos;s happening.</p>
      </motion.div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Link href={card.href} className="block glass rounded-2xl p-5 hover:bg-white/[0.06] transition-all group">
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-2xl font-black text-white">{card.value}</p>
              <p className="text-slate-500 text-xs mt-1 flex items-center gap-1">
                {card.label}
                {card.href !== '#' && <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6 mb-8"
      >
        <h2 className="text-white font-semibold text-sm mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '+ New Project', href: '/admin/projects?new=1', color: 'bg-indigo-600 hover:bg-indigo-500 text-white' },
            { label: '+ New Post', href: '/admin/blog?new=1', color: 'bg-violet-600 hover:bg-violet-500 text-white' },
            { label: 'Edit Profile', href: '/admin/profile', color: 'glass border border-white/[0.08] text-white hover:bg-white/[0.08]' },
          ].map(({ label, href, color }) => (
            <Link key={label} href={href} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${color}`}>
              {label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-sm">Recent Projects</h2>
            <Link href="/admin/projects" className="text-indigo-400 text-xs hover:text-indigo-300">View all</Link>
          </div>
          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                  <FolderKanban className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">{p.title}</p>
                  <p className="text-slate-500 text-xs">{p.category}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-sm">Recent Blog Posts</h2>
            <Link href="/admin/blog" className="text-indigo-400 text-xs hover:text-indigo-300">View all</Link>
          </div>
          <div className="space-y-3">
            {recentPosts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4 text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">{p.title}</p>
                  <p className="text-slate-500 text-xs">{p.readingTime} min read • {p.category}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  {p.published ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
