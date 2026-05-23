'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Eye, Search, X } from 'lucide-react';
import { projects as initialProjects } from '@/data/projects';
import { Project } from '@/types';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

const emptyForm: Omit<Project, 'id'> = {
  slug: '',
  title: '',
  description: '',
  longDescription: '',
  thumbnail: '',
  techStack: [],
  category: 'flutter',
  githubUrl: '',
  liveUrl: '',
  createdAt: new Date().toISOString().split('T')[0],
  featured: false,
  status: 'draft',
};

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, 'id'>>(emptyForm);
  const [techInput, setTechInput] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setTechInput('');
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ ...p });
    setTechInput('');
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (editing) {
      setItems((prev) => prev.map((p) => p.id === editing.id ? { ...form, id: editing.id } : p));
      toast.success('Project updated');
    } else {
      const newProject: Project = { ...form, id: Date.now().toString() };
      setItems((prev) => [newProject, ...prev]);
      toast.success('Project created');
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
    toast.success('Project deleted');
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.techStack.includes(t)) {
      setForm({ ...form, techStack: [...form.techStack, t] });
      setTechInput('');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-slate-500 text-sm mt-1">{items.length} total projects</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 transition-all"
        />
        {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"><X className="w-4 h-4" /></button>}
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06] text-left">
              <th className="px-5 py-3.5 text-slate-500 text-xs font-medium uppercase tracking-wide">Project</th>
              <th className="px-5 py-3.5 text-slate-500 text-xs font-medium uppercase tracking-wide hidden md:table-cell">Category</th>
              <th className="px-5 py-3.5 text-slate-500 text-xs font-medium uppercase tracking-wide hidden lg:table-cell">Date</th>
              <th className="px-5 py-3.5 text-slate-500 text-xs font-medium uppercase tracking-wide">Status</th>
              <th className="px-5 py-3.5 text-slate-500 text-xs font-medium uppercase tracking-wide text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={p.thumbnail} alt={p.title} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium truncate max-w-[180px]">{p.title}</p>
                      <p className="text-slate-500 text-xs">{p.techStack.slice(0, 2).join(', ')}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-slate-400 text-sm capitalize">{p.category}</span>
                </td>
                <td className="px-5 py-4 text-slate-500 text-sm hidden lg:table-cell">{formatDate(p.createdAt)}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 justify-end">
                    <a href={`/projects`} target="_blank" className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all" aria-label="Preview">
                      <Eye className="w-4 h-4" />
                    </a>
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all" aria-label="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all" aria-label="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">No projects found.</div>
        )}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowForm(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl glass rounded-2xl border border-white/[0.1] overflow-hidden max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                <h2 className="text-white font-bold">{editing ? 'Edit Project' : 'New Project'}</h2>
                <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg glass text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
              </div>
              <div className="overflow-y-auto flex-1 p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Title *</label>
                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-indigo-500/60" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Project['category'] })} className="w-full px-3 py-2.5 rounded-xl bg-[#16161f] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-indigo-500/60">
                      <option value="flutter">Flutter</option>
                      <option value="android">Android</option>
                      <option value="ios">iOS</option>
                      <option value="mobile">Mobile</option>
                      <option value="web">Web</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Status</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'published' | 'draft' })} className="w-full px-3 py-2.5 rounded-xl bg-[#16161f] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-indigo-500/60">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Thumbnail URL</label>
                    <input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} placeholder="https://images.unsplash.com/..." className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-indigo-500/60 placeholder-slate-600" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Description</label>
                    <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-indigo-500/60 resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">GitHub URL</label>
                    <input value={form.githubUrl || ''} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-indigo-500/60" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Live URL</label>
                    <input value={form.liveUrl || ''} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-indigo-500/60" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Tech Stack</label>
                    <div className="flex gap-2 mb-2">
                      <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())} placeholder="Add tech..." className="flex-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-indigo-500/60 placeholder-slate-600" />
                      <button type="button" onClick={addTech} className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm">Add</button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {form.techStack.map((t) => (
                        <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          {t}
                          <button onClick={() => setForm({ ...form, techStack: form.techStack.filter((x) => x !== t) })}><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-indigo-500" />
                    <label htmlFor="featured" className="text-sm text-slate-300">Featured project</label>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-white/[0.06] flex justify-end gap-3">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl glass border border-white/[0.08] text-white text-sm hover:bg-white/[0.08] transition-all">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all">Save Project</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteId(null)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative glass rounded-2xl p-8 max-w-sm w-full border border-white/[0.1] text-center">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-white font-bold mb-2">Delete Project?</h3>
              <p className="text-slate-400 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-xl glass border border-white/[0.08] text-white text-sm">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-medium">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
