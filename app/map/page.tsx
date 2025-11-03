"use client";

import Header from '@/components/Header';
import MapVisualization from '@/components/MapVisualization';
import Footer from '@/components/Footer';
import { highlightCards, mapData } from '@/data/dashboards';

export default function MapPage() {
  const handleMapSelect = (id: string) => {
    console.log('Selected map:', id);
    // Handle map selection
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <MapVisualization
          highlightCards={highlightCards}
          mapData={mapData}
          onMapSelect={handleMapSelect}
        />
      </main>
      <Footer />
    </div>
  );
}


