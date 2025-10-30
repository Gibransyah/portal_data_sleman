'use client';

import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import InsightHighlights from '@/components/InsightHighlights';
import AboutSection from '@/components/AboutSection';
import TrendMiniChart from '@/components/TrendMiniChart';
import DatasetPopuler from '@/components/DatasetPopuler';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategorySection />
      <InsightHighlights />
      <AboutSection />
      <TrendMiniChart />
      <DatasetPopuler />
    </main>
  );
}
