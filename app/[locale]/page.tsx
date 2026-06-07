import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import About from '@/components/About';
import VisionMission from '@/components/VisionMission';
import Story from '@/components/Story';
import Values from '@/components/Values';
import Villa from '@/components/Villa';
import Management from '@/components/Management';
import Investment from '@/components/Investment';
import Projects from '@/components/Projects';
import LifestyleStrip from '@/components/LifestyleStrip';
import Egypt from '@/components/Egypt';
import Choosing from '@/components/Choosing';
import Sustainability from '@/components/Sustainability';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <VisionMission />
      <Story />
      <Values />
      <Villa />
      <Management />
      <Investment />
      <Projects />
      <LifestyleStrip />
      <Egypt />
      <Choosing />
      <Sustainability />
      <Partners />
      <Footer />
    </main>
  );
}
