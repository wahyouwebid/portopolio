'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Clock, Calendar, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

const allCategories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function BlogPageClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return blogPosts
      .filter((p) => p.published)
      .filter((p) => activeCategory === 'All' || p.category === activeCategory)
      .filter(
        (p) =>
          !search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      );
  }, [search, activeCategory]);

  const featured = blogPosts.filter((p) => p.published && p.featured)[0];

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Blog</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-black text-white">
              Thoughts & <span className="gradient-text">Tutorials</span>
            </h1>
            <p className="mt-4 text-slate-400 max-w-lg mx-auto">
              Deep dives, tutorials, and opinions on mobile engineering, Flutter, Kotlin, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Link href={`/blog/${featured.slug}`} className="group block glass rounded-3xl overflow-hidden card-hover">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto min-h-[280px]">
                    <Image
                      src={featured.thumbnail}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0f] hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent lg:hidden" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      ★ Featured
                    </span>
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 self-start mb-4">
                      {featured.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-slate-400 leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.readingTime} min read</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(featured.createdAt)}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-indigo-400 font-medium text-sm group-hover:gap-3 transition-all">
                      Read article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filter & Search */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2 flex-wrap">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'glass text-slate-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block glass rounded-2xl overflow-hidden card-hover h-full">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-white font-semibold mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-md text-xs bg-white/[0.04] border border-white/[0.06] text-slate-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 text-xs">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime} min</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-slate-500">No articles found.</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-4 text-indigo-400 text-sm">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
