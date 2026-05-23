import Link from 'next/link';
import { Mail, Code2, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/SocialIcons';

const footerLinks = {
  Pages: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  Tech: [
    { label: 'Flutter', href: '/projects?category=flutter' },
    { label: 'Android / Kotlin', href: '/projects?category=android' },
    { label: 'iOS / Swift', href: '/projects?category=ios' },
  ],
};

const socials = [
  { icon: GithubIcon, href: 'https://github.com/ujangwahyu', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/in/ujangwahyu', label: 'LinkedIn' },
  { icon: TwitterIcon, href: 'https://twitter.com/ujangwahyu', label: 'Twitter' },
  { icon: Mail, href: 'mailto:ujang@example.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">
                UW<span className="text-indigo-400">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Mobile Engineer crafting beautiful, performant applications with Flutter, Kotlin, and Swift.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-slate-400 text-sm hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            © 2024 Ujang Wahyu. Built with{' '}
            <Heart className="w-3.5 h-3.5 text-red-400 inline" /> and Next.js
          </p>
          <Link
            href="/admin"
            className="text-slate-600 text-xs hover:text-slate-400 transition-colors"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
