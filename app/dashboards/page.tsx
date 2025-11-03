'use client';

import React from 'react';
import Header from '@/components/Header';
import CarouselSection from '@/components/CarouselSection';
import Footer from '@/components/Footer';
import { latestDashboards } from '@/data/dashboards';

export default function DashboardsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <CarouselSection
          title="Dashboard Terbaru"
          items={latestDashboards}
          autoPlay={false}
        />
      </main>
      <Footer />
    </div>
  );
}

