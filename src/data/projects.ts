import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'banking-mobile-app',
    title: 'BankEase – Mobile Banking App',
    description:
      'A secure, feature-rich mobile banking application with real-time transactions, biometric authentication, and AI-powered spending insights.',
    longDescription: `BankEase is a full-featured mobile banking application built with Flutter. It provides users with a seamless banking experience including real-time balance updates, peer-to-peer transfers, bill payments, and AI-powered financial insights.\n\nThe app features biometric authentication (fingerprint & face ID), end-to-end encrypted transactions, QR code payments, and a beautiful dashboard with spending analytics.\n\nBuilt following Clean Architecture principles with BLoC state management, the app is highly scalable and maintainable. Integrated with a Node.js microservices backend and PostgreSQL database.`,
    thumbnail:
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
      'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80',
    ],
    techStack: ['Flutter', 'Dart', 'BLoC', 'Node.js', 'PostgreSQL', 'Firebase'],
    category: 'flutter',
    githubUrl: 'https://github.com/ujangwahyu',
    liveUrl: '#',
    createdAt: '2024-01-15',
    featured: true,
    status: 'published',
  },
  {
    id: '2',
    slug: 'ecommerce-flutter-app',
    title: 'ShopNow – E-Commerce Flutter App',
    description:
      'A modern e-commerce app with product catalog, cart management, Stripe payment integration, and real-time order tracking.',
    longDescription: `ShopNow is a comprehensive e-commerce mobile application built with Flutter. Features include product browsing with advanced filters, wishlist, cart management, multiple payment gateways, and real-time order tracking.\n\nThe app implements a microservices architecture with separate services for products, orders, payments, and notifications. It supports both iOS and Android platforms with pixel-perfect UI.`,
    thumbnail:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    techStack: ['Flutter', 'Dart', 'Provider', 'Firebase', 'Stripe', 'REST API'],
    category: 'flutter',
    githubUrl: 'https://github.com/ujangwahyu',
    liveUrl: '#',
    createdAt: '2023-11-20',
    featured: true,
    status: 'published',
  },
  {
    id: '3',
    slug: 'pos-application',
    title: 'POS Pro – Point of Sale System',
    description:
      'A powerful POS application for small to medium businesses with inventory management, sales reporting, and multi-device sync.',
    longDescription: `POS Pro is a robust point-of-sale application built natively for Android using Kotlin. It handles product catalog management, barcode scanning, sales processing, inventory tracking, and generates detailed business reports.\n\nFeatures include offline mode with local SQLite database, cloud sync when connected, employee management, shift reports, and customer loyalty programs.`,
    thumbnail:
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80',
    techStack: ['Kotlin', 'Android', 'Room DB', 'MVVM', 'Retrofit', 'SQLite'],
    category: 'android',
    githubUrl: 'https://github.com/ujangwahyu',
    createdAt: '2023-08-10',
    featured: true,
    status: 'published',
  },
  {
    id: '4',
    slug: 'ai-chat-mobile-app',
    title: 'AiTalk – AI Chat Mobile App',
    description:
      'An intelligent AI-powered chat application integrating GPT-4 with voice input, image recognition, and contextual conversation history.',
    longDescription: `AiTalk is an AI-powered mobile chat application that integrates OpenAI GPT-4 for intelligent conversations. Features voice-to-text input, image analysis, conversation history, multiple AI personas, and offline fallback responses.\n\nBuilt with Flutter for cross-platform support, it features a beautiful chat UI with smooth animations, markdown rendering for AI responses, and a subscription model with Stripe integration.`,
    thumbnail:
      'https://images.unsplash.com/photo-1676277791608-ac54525aa94d?w=800&q=80',
    techStack: ['Flutter', 'Dart', 'OpenAI API', 'Firebase', 'GetX', 'Stripe'],
    category: 'flutter',
    githubUrl: 'https://github.com/ujangwahyu',
    liveUrl: '#',
    createdAt: '2024-03-01',
    featured: true,
    status: 'published',
  },
  {
    id: '5',
    slug: 'food-delivery-app',
    title: 'Makan – Food Delivery App',
    description:
      'A Gojek/Grab-inspired food delivery app with real-time driver tracking, restaurant discovery, and smart recommendation engine.',
    longDescription: `Makan is a full-featured food delivery application inspired by popular delivery platforms. It features restaurant discovery with location-based search, real-time GPS tracking, smart recommendation engine using ML, and seamless payment integration.\n\nBuilt with Flutter for the customer app and Kotlin for the driver app. The backend is powered by Node.js with Socket.io for real-time communication.`,
    thumbnail:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    techStack: ['Flutter', 'Kotlin', 'Node.js', 'Socket.io', 'Google Maps', 'Firebase'],
    category: 'flutter',
    githubUrl: 'https://github.com/ujangwahyu',
    createdAt: '2023-06-15',
    featured: false,
    status: 'published',
  },
  {
    id: '6',
    slug: 'fitness-tracker-ios',
    title: 'FitPulse – iOS Fitness Tracker',
    description:
      'A native iOS fitness tracking app with HealthKit integration, workout planning, nutrition tracking, and social challenges.',
    longDescription: `FitPulse is a native iOS fitness application built with Swift and SwiftUI. It integrates deeply with Apple HealthKit for comprehensive health data tracking, provides AI-powered workout recommendations, and features social challenges with friends.\n\nThe app features beautiful animations, Apple Watch companion app, Siri Shortcuts integration, and widget support for iOS 16+.`,
    thumbnail:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    techStack: ['Swift', 'SwiftUI', 'HealthKit', 'CoreData', 'CloudKit', 'WatchKit'],
    category: 'ios',
    githubUrl: 'https://github.com/ujangwahyu',
    createdAt: '2024-02-20',
    featured: false,
    status: 'published',
  },
];
