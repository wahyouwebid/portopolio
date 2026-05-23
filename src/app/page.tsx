import HeroSection from '@/components/sections/HeroSection';
import TechStackSection from '@/components/sections/TechStackSection';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import StatsCounter from '@/components/sections/StatsCounter';
import Testimonials from '@/components/sections/Testimonials';
import LatestBlog from '@/components/sections/LatestBlog';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsCounter />
      <TechStackSection />
      <FeaturedProjects />
      <ExperienceTimeline />
      <Testimonials />
      <LatestBlog />
    </>
  );
}
