'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Eye, Search, X } from 'lucide-react';
import { blogPosts as initialPosts } from '@/data/blog';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

const emptyForm: Omit<BlogPost, 'id'> = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  thumbnail: '',
  category: 'flutter',
  tags: [],
  readingTime: 5,
  createdAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0],
  published: false,
  featured: false,
  author: { name: 'Ujang Wahyu', avatar: '', bio: '' },
};

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogPost[]>(initialPosts);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Omit<BlogPost, 'id'>>(emptyForm);
  const [tagInput, setTagInput] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(
    (p) => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.category.includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setTagInput('');
    setShowForm(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({ ...p });
    setTagInput('');
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (editing) {
      setItems((prev) => prev.map((p) => p.id === editing.id ? { ...form, slug, id: editing.id, updatedAt: new Date().toISOString().split('T')[0] } : p));
      toast.success('Post updated');
    } else {
      const newPost: BlogPost = { ...form, slug, id: Date.now().toString(), updatedAt: new Date().toISOString().split('T')[0] };
      setItems((prev) => [newPost, ...prev]);
      toast.success('Post created');
    }
    setShowForm(false);
  };

  const togglePublish = (id: string) => {
    setItems((prev) => prev.map((p) => p.id === id ? { ...p, published: !p.published } : p));
    toast.success('Status updated');
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
    toast.success('Post deleted');
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm({ ...form, tags: [...form.tags, t] });
      setTagInput('');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-slate-500 text-sm mt-1">{items.length} posts • {items.filter((p) => p.published).length} published</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/60 transition-all" />
        {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"><X className="w-4 h-4" /></button>}
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06] text-left">
              <th className="px-5 py-3.5 text-slate-500 text-xs font-medium uppercase tracking-wide">Post</th>
              <th className="px-5 py-3.5 text-slate-500 text-xs font-medium uppercase tracking-wide hidden md:table-cell">Category</th>
              <th className="px-5 py-3.5 text-slate-500 text-xs font-medium uppercase tracking-wide hidden lg:table-cell">Date</th>
              <th className="px-5 py-3.5 text-slate-500 text-xs font-medium uppercase tracking-wide">Published</th>
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
                      <p className="text-white text-sm font-medium truncate max-w-[200px]">{p.title}</p>
                      <p className="text-slate-500 text-xs">{p.readingTime} min read</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-slate-400 text-sm capitalize">{p.category}</span>
                </td>
                <td className="px-5 py-4 text-slate-500 text-sm hidden lg:table-cell">{formatDate(p.createdAt)}</td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => togglePublish(p.id)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${p.published ? 'bg-emerald-500' : 'bg-white/[0.1]'}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${p.published ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </button>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 justify-end">
                    <a href={`/blog/${p.slug}`} target="_blank" className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all"><Eye className="w-4 h-4" /></a>
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-16 text-slate-500">No posts found.</div>}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowForm(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl glass rounded-2xl border border-white/[0.1] max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                <h2 className="text-white font-bold">{editing ? 'Edit Post' : 'New Post'}</h2>
                <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg glass text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
              </div>
              <div className="overflow-y-auto flex-1 p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Title *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-violet-500/60" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Category</label>
                    <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-violet-500/60" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Reading Time (min)</label>
                    <input type="number" min={1} value={form.readingTime} onChange={(e) => setForm({ ...form, readingTime: parseInt(e.target.value) || 5 })} className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-violet-500/60" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Thumbnail URL</label>
                  <input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} placeholder="https://images.unsplash.com/..." className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-violet-500/60 placeholder-slate-600" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Excerpt</label>
                  <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-violet-500/60 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Content (Markdown)</label>
                  <textarea rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-violet-500/60 resize-none font-mono" placeholder="# Heading&#10;&#10;Write your content here..." />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Add tag..." className="flex-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-violet-500/60 placeholder-slate-600" />
                    <button type="button" onClick={addTag} className="px-3 py-2 rounded-xl bg-violet-600 text-white text-sm">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {form.tags.map((t) => (
                      <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs bg-violet-500/10 text-violet-300 border border-violet-500/20">
                        {t}
                        <button onClick={() => setForm({ ...form, tags: form.tags.filter((x) => x !== t) })}><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm text-slate-300">
                    <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-violet-500" />
                    Published
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-300">
                    <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-violet-500" />
                    Featured
                  </label>
                </div>
              </div>
              <div className="p-6 border-t border-white/[0.06] flex justify-end gap-3">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl glass border border-white/[0.08] text-white text-sm hover:bg-white/[0.08] transition-all">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all">Save Post</button>
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
              <h3 className="text-white font-bold mb-2">Delete Post?</h3>
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
