import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'best-flutter-architecture-2024',
    title: 'Best Flutter Architecture Patterns in 2024',
    excerpt:
      'A deep dive into modern Flutter architecture patterns — Clean Architecture, BLoC, MVVM, and how to choose the right one for your project.',
    content: `# Best Flutter Architecture Patterns in 2024

When building Flutter applications, choosing the right architecture is crucial for long-term maintainability and scalability. In this article, I'll walk you through the most popular patterns and when to use each one.

## Why Architecture Matters

As your Flutter app grows, having a clear structure prevents spaghetti code and makes it easy to onboard new developers. Good architecture also makes testing significantly easier.

## 1. Clean Architecture

Clean Architecture, popularized by Robert C. Martin ("Uncle Bob"), separates your app into three main layers:

- **Presentation Layer** – UI components, widgets, state management
- **Domain Layer** – Business logic, entities, use cases
- **Data Layer** – Repositories, data sources, models

\`\`\`dart
// Domain Layer - Entity
class User {
  final String id;
  final String name;
  final String email;
  
  const User({required this.id, required this.name, required this.email});
}

// Domain Layer - Repository Interface
abstract class UserRepository {
  Future<Either<Failure, User>> getUser(String id);
}

// Data Layer - Repository Implementation
class UserRepositoryImpl implements UserRepository {
  final UserRemoteDataSource remoteDataSource;
  
  UserRepositoryImpl(this.remoteDataSource);
  
  @override
  Future<Either<Failure, User>> getUser(String id) async {
    try {
      final userModel = await remoteDataSource.getUser(id);
      return Right(userModel.toEntity());
    } catch (e) {
      return Left(ServerFailure());
    }
  }
}
\`\`\`

## 2. BLoC Pattern

BLoC (Business Logic Component) is arguably the most popular state management solution in Flutter. It provides a clean separation between UI and business logic.

\`\`\`dart
// Event
abstract class AuthEvent {}
class LoginRequested extends AuthEvent {
  final String email;
  final String password;
  LoginRequested({required this.email, required this.password});
}

// State
abstract class AuthState {}
class AuthInitial extends AuthState {}
class AuthLoading extends AuthState {}
class AuthSuccess extends AuthState {
  final User user;
  AuthSuccess(this.user);
}
class AuthFailure extends AuthState {
  final String message;
  AuthFailure(this.message);
}

// BLoC
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthRepository repository;
  
  AuthBloc(this.repository) : super(AuthInitial()) {
    on<LoginRequested>(_onLoginRequested);
  }
  
  Future<void> _onLoginRequested(
    LoginRequested event, 
    Emitter<AuthState> emit,
  ) async {
    emit(AuthLoading());
    final result = await repository.login(event.email, event.password);
    result.fold(
      (failure) => emit(AuthFailure(failure.message)),
      (user) => emit(AuthSuccess(user)),
    );
  }
}
\`\`\`

## 3. MVVM with Provider/Riverpod

MVVM (Model-View-ViewModel) is excellent for simpler apps or teams coming from Android development.

## Which One Should You Choose?

| Scenario | Recommended Architecture |
|----------|--------------------------|
| Small app (<10 screens) | MVVM + Provider |
| Medium app | BLoC + Clean Architecture |
| Large enterprise app | Clean Architecture + BLoC |
| Team from Android | MVVM + GetX |

## Conclusion

There's no one-size-fits-all solution. Evaluate your team's experience, app complexity, and long-term maintenance requirements before choosing. The most important thing is to be consistent.

Happy coding! 🚀`,
    thumbnail:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    category: 'Flutter',
    tags: ['Flutter', 'Architecture', 'BLoC', 'Clean Architecture', 'Mobile'],
    readingTime: 8,
    createdAt: '2024-04-10',
    updatedAt: '2024-04-10',
    published: true,
    featured: true,
    author: {
      name: 'Ujang Wahyu',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      bio: 'Mobile Engineer focused on Flutter & Kotlin',
    },
  },
  {
    id: '2',
    slug: 'kotlin-vs-flutter-2024',
    title: 'Kotlin vs Flutter: Which to Choose in 2024?',
    excerpt:
      'A comprehensive comparison between Kotlin (native Android) and Flutter for mobile development. Performance, DX, ecosystem, and real-world insights.',
    content: `# Kotlin vs Flutter: Which to Choose in 2024?

This is one of the most common questions I get from developers looking to enter mobile development. Having built apps with both technologies extensively, I'll give you an honest comparison.

## Kotlin (Native Android)

Kotlin is a modern, statically-typed programming language that runs on the JVM. It's Google's preferred language for Android development.

### Pros
- Deep OS integration and access to all Android APIs
- Best performance for CPU/GPU intensive apps
- Excellent IDE support with Android Studio
- Material Design components out of the box
- Strong type safety

### Cons
- Android-only (though Kotlin Multiplatform is maturing)
- Longer development time for cross-platform needs
- UI building can be verbose (though Jetpack Compose has improved this)

## Flutter

Flutter is Google's UI toolkit for building natively compiled applications from a single codebase.

### Pros
- Single codebase for iOS, Android, Web, Desktop
- Fast development with hot reload
- Beautiful, consistent UI across platforms
- Growing ecosystem
- Dart is easy to learn

### Cons
- Larger app size
- Some platform-specific features require plugins
- Less native look on iOS

## Performance Comparison

\`\`\`
Native Kotlin: ~60fps guaranteed, direct hardware access
Flutter:       ~60fps for most use cases, slight overhead
\`\`\`

## My Recommendation

**Choose Kotlin if:**
- Building Android-only enterprise apps
- Deep hardware/OS integration needed
- Maximum performance critical (games, AR)

**Choose Flutter if:**
- Building for multiple platforms
- Startup/MVP with limited resources
- Consistent UI across iOS & Android important

In most cases, **Flutter is the better choice** for 2024 due to its productivity and cross-platform capabilities.`,
    thumbnail:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
    category: 'Mobile',
    tags: ['Kotlin', 'Flutter', 'Android', 'Mobile Development', 'Comparison'],
    readingTime: 6,
    createdAt: '2024-03-22',
    updatedAt: '2024-03-22',
    published: true,
    featured: true,
    author: {
      name: 'Ujang Wahyu',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      bio: 'Mobile Engineer focused on Flutter & Kotlin',
    },
  },
  {
    id: '3',
    slug: 'state-management-flutter-2024',
    title: 'Modern State Management in Flutter: 2024 Guide',
    excerpt:
      'Comparing BLoC, Riverpod, GetX, and Provider — which state management solution should you pick for your Flutter project?',
    content: `# Modern State Management in Flutter: 2024 Guide

State management is one of the most debated topics in Flutter. Let's break down each major solution.

## The Big Four

1. **BLoC / Cubit** — Most popular for large apps
2. **Riverpod** — Modern, compile-safe approach
3. **GetX** — All-in-one solution (routing + state + DI)
4. **Provider** — Simple, widget tree based

## BLoC Pattern

BLoC is the most structured approach and works great for complex business logic.

## Riverpod

Riverpod solves many of Provider's shortcomings with compile-time safety.

\`\`\`dart
final userProvider = FutureProvider.family<User, String>((ref, userId) async {
  final repository = ref.watch(userRepositoryProvider);
  return repository.getUser(userId);
});
\`\`\`

## My 2024 Recommendation

- **Small apps**: Riverpod or Provider
- **Medium-Large apps**: BLoC + Clean Architecture
- **Rapid prototyping**: GetX

Riverpod is quickly becoming the go-to choice for many Flutter developers in 2024.`,
    thumbnail:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    category: 'Flutter',
    tags: ['Flutter', 'State Management', 'BLoC', 'Riverpod', 'GetX'],
    readingTime: 7,
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15',
    published: true,
    featured: false,
    author: {
      name: 'Ujang Wahyu',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      bio: 'Mobile Engineer focused on Flutter & Kotlin',
    },
  },
  {
    id: '4',
    slug: 'optimizing-mobile-performance',
    title: 'Optimizing Flutter App Performance: A Practical Guide',
    excerpt:
      'Learn how to profile, identify bottlenecks, and optimize your Flutter app for 60fps smooth performance in production.',
    content: `# Optimizing Flutter App Performance: A Practical Guide

Performance is critical for user retention. Here are proven techniques I've used in production Flutter apps.

## Profiling First

Never optimize without profiling. Use Flutter DevTools to identify jank.

\`\`\`dart
// Use const constructors wherever possible
const MyWidget({super.key}); // ✅ 
MyWidget({Key? key}) : super(key: key); // ❌ (if no state)
\`\`\`

## Key Optimization Techniques

### 1. Use const constructors
### 2. Lazy loading with ListView.builder
### 3. Minimize rebuilds with selective state updates
### 4. Image caching with cached_network_image
### 5. Avoid opacity animations — use AnimatedOpacity instead

## Conclusion

Start with profiling, fix the biggest bottlenecks first, and always test on real devices.`,
    thumbnail:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    category: 'Performance',
    tags: ['Flutter', 'Performance', 'Optimization', 'Mobile', 'DevTools'],
    readingTime: 9,
    createdAt: '2024-01-28',
    updatedAt: '2024-01-28',
    published: true,
    featured: false,
    author: {
      name: 'Ujang Wahyu',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      bio: 'Mobile Engineer focused on Flutter & Kotlin',
    },
  },
];
