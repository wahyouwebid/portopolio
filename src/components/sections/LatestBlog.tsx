'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

export default function LatestBlog() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const latest = blogPosts.filter((p) => p.published).slice(0, 3);

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16"
        >
          <div>
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
              Blog
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
              Latest Articles
            </h2>
            <p className="mt-3 text-slate-400 max-w-md">
              Insights, tutorials, and thoughts on mobile engineering.
            </p>
          </div>
          <Link
            href="/blog"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            All articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block glass rounded-2xl overflow-hidden card-hover h-full"
              >
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white font-semibold text-base mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-slate-600 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime} min read
                    </span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
