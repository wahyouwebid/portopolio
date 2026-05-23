'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search, ExternalLink, X, Calendar, Tag } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { projects } from '@/data/projects';
import { Project, ProjectCategory } from '@/types';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { formatDate } from '@/lib/utils';

const categories: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Flutter', value: 'flutter' },
  { label: 'Android', value: 'android' },
  { label: 'iOS', value: 'ios' },
  { label: 'Mobile', value: 'mobile' },
];

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl overflow-hidden card-hover group cursor-pointer"
      onClick={() => onOpen(project)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-black/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="primary">{project.category}</Badge>
          {project.featured && <Badge variant="accent">Featured</Badge>}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-base mb-2 group-hover:text-indigo-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4">{project.description}</p>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-400"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-500">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-600 text-xs">
            <Calendar className="w-3 h-3" />
            {formatDate(project.createdAt)}
          </span>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg glass text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg glass text-slate-400 hover:text-white transition-colors"
                aria-label="Live"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  if (!project) return null;
  return (
    <Modal isOpen={!!project} onClose={onClose} size="xl">
      <div className="max-h-[85vh] overflow-y-auto">
        {/* Hero image */}
        <div className="relative h-56 sm:h-72">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16161f] via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-6 flex gap-2">
            <Badge variant="primary">{project.category}</Badge>
            {project.featured && <Badge variant="accent">Featured</Badge>}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-slate-400 text-sm mb-5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(project.createdAt)}
          </p>

          <div className="prose-dark mb-6">
            {(project.longDescription || project.description)
              .split('\n\n')
              .map((para, i) => (
                <p key={i} className="mb-4 text-slate-300 leading-relaxed">
                  {para}
                </p>
              ))}
          </div>

          {/* Tech stack */}
          <div className="mb-6">
            <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-400" /> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-sm bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/[0.08] text-white text-sm font-medium hover:bg-white/[0.08] transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                View Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default function ProjectsPageClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    return projects
      .filter((p) => p.status === 'published')
      .filter((p) => activeCategory === 'all' || p.category === activeCategory)
      .filter(
        (p) =>
          !search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      );
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
              Portfolio
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-black text-white">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="mt-4 text-slate-400 max-w-lg mx-auto">
              A collection of mobile applications I&apos;ve built — from fintech to e-commerce, each
              crafted with precision and care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat.value
                      ? 'bg-indigo-600 text-white'
                      : 'glass text-slate-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <p className="text-slate-600 text-sm mt-4">
            Showing <span className="text-slate-400">{filtered.length}</span> projects
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={setSelectedProject}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p className="text-slate-500 text-lg">No projects found.</p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory('all'); }}
                  className="mt-4 text-indigo-400 text-sm hover:text-indigo-300"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
