import { Skill, Experience, Testimonial, Stat } from '@/types';

export const skills: Skill[] = [
  { name: 'Flutter', level: 96, category: 'mobile' },
  { name: 'Dart', level: 94, category: 'language' },
  { name: 'Kotlin', level: 88, category: 'language' },
  { name: 'Swift / SwiftUI', level: 76, category: 'language' },
  { name: 'Android Development', level: 90, category: 'mobile' },
  { name: 'iOS Development', level: 74, category: 'mobile' },
  { name: 'React Native', level: 70, category: 'mobile' },
  { name: 'TypeScript', level: 78, category: 'language' },
  { name: 'Node.js', level: 72, category: 'language' },
  { name: 'Firebase', level: 88, category: 'tool' },
  { name: 'Supabase', level: 80, category: 'tool' },
  { name: 'Git / GitHub', level: 92, category: 'tool' },
  { name: 'REST API', level: 90, category: 'tool' },
  { name: 'GraphQL', level: 68, category: 'tool' },
  { name: 'UI/UX Design', level: 82, category: 'other' },
];

export const techStack = [
  { name: 'Flutter', icon: '🐦', color: '#54C5F8' },
  { name: 'Dart', icon: '🎯', color: '#00B4AB' },
  { name: 'Kotlin', icon: '🟣', color: '#7F52FF' },
  { name: 'Swift', icon: '🍎', color: '#FA7343' },
  { name: 'Android', icon: '🤖', color: '#3DDC84' },
  { name: 'iOS', icon: '📱', color: '#007AFF' },
  { name: 'Firebase', icon: '🔥', color: '#FFCA28' },
  { name: 'TypeScript', icon: '💙', color: '#3178C6' },
  { name: 'Node.js', icon: '🟢', color: '#68A063' },
  { name: 'Supabase', icon: '⚡', color: '#3ECF8E' },
  { name: 'Git', icon: '🔀', color: '#F05032' },
  { name: 'Figma', icon: '🎨', color: '#A259FF' },
];

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'TechVenture Labs',
    position: 'Senior Mobile Engineer',
    startDate: '2022-07',
    current: true,
    description:
      'Leading mobile development for 3 flagship products. Architected a scalable Flutter monorepo shared across 5 apps. Implemented CI/CD pipelines reducing deployment time by 60%. Mentoring junior developers and conducting code reviews.',
    technologies: ['Flutter', 'Dart', 'Kotlin', 'Firebase', 'GitHub Actions', 'Fastlane'],
  },
  {
    id: '2',
    company: 'Gojek (Contract)',
    position: 'Flutter Developer',
    startDate: '2021-03',
    endDate: '2022-06',
    current: false,
    description:
      'Contributed to the GoFood feature in the Gojek super app. Improved app startup time by 40% through lazy loading and code splitting. Built reusable UI component library used by 8 squads. Worked in an agile team of 20+ engineers.',
    technologies: ['Flutter', 'BLoC', 'REST API', 'GraphQL', 'Firebase'],
  },
  {
    id: '3',
    company: 'Freelance',
    position: 'Mobile App Developer',
    startDate: '2019-01',
    endDate: '2021-02',
    current: false,
    description:
      'Developed 15+ mobile applications for various clients across fintech, retail, and healthcare sectors. Successfully delivered projects on-time with high client satisfaction scores.',
    technologies: ['Flutter', 'Kotlin', 'Swift', 'Firebase', 'REST API'],
  },
  {
    id: '4',
    company: 'PT Digital Solusi',
    position: 'Android Developer (Junior)',
    startDate: '2018-06',
    endDate: '2018-12',
    current: false,
    description:
      'Started my professional career building native Android applications. Learned production-grade coding practices, agile methodology, and collaborative development.',
    technologies: ['Java', 'Kotlin', 'Android SDK', 'SQLite', 'Retrofit'],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmad Farhan',
    position: 'CTO',
    company: 'TechVenture Labs',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    content:
      "Ujang is one of the best mobile engineers I've worked with. His Flutter expertise is exceptional, and he consistently delivers high-quality, well-architected code. He's also a fantastic team player and mentor.",
    rating: 5,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    position: 'Product Manager',
    company: 'Gojek',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    content:
      "Working with Ujang was a pleasure. He always brought creative solutions to complex problems and delivered features ahead of schedule. His attention to UI/UX details made our app significantly better.",
    rating: 5,
  },
  {
    id: '3',
    name: 'Budi Santoso',
    position: 'CEO',
    company: 'RetailTech Indonesia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    content:
      "Ujang built our POS mobile app from scratch and it has been running flawlessly for 2 years. He understood our business needs perfectly and translated them into a beautiful, intuitive application.",
    rating: 5,
  },
  {
    id: '4',
    name: 'Lisa Andriani',
    position: 'Lead Designer',
    company: 'FinPay App',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    content:
      "As a designer, I appreciate developers who truly care about implementing designs faithfully. Ujang is pixel-perfect and proactively suggests improvements. The collaboration was seamless.",
    rating: 5,
  },
];

export const stats: Stat[] = [
  { label: 'Apps Shipped', value: 30, suffix: '+' },
  { label: 'Years Experience', value: 6, suffix: '+' },
  { label: 'Happy Clients', value: 50, suffix: '+' },
  { label: 'GitHub Stars', value: 1200, suffix: '+' },
];
