'use client';

import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { MapData, HighlightCard } from '@/types';

interface MapVisualizationProps {
  title?: string;
  highlightCards: HighlightCard[];
  mapData: MapData[];
  selectedMapId?: string;
  onMapSelect?: (id: string) => void;
}

export default function MapVisualization({
  title = 'Visualisasi Peta',
  highlightCards,
  mapData,
  selectedMapId,
  onMapSelect,
}: MapVisualizationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedData, setSelectedData] = useState(selectedMapId || mapData[0]?.id);

  const handleMapSelect = (id: string) => {
    setSelectedData(id);
    if (onMapSelect) {
      onMapSelect(id);
    }
  };

  const filteredMapData = mapData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedDataItem = mapData.find((item) => item.id === selectedData);

  return (
    <section className="py-16 px-6 bg-white min-h-screen">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Cari"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Data List */}
            <div className="bg-gray-50 rounded-lg p-4 max-h-[600px] overflow-y-auto">
              {filteredMapData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMapSelect(item.id)}
                  className={`w-full text-left p-4 rounded-lg mb-2 transition-colors ${
                    selectedData === item.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-white hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{item.title}</div>
                  <div className={`text-sm mt-1 ${
                    selectedData === item.id
                      ? 'text-white/80'
                      : 'text-gray-500'
                  }`}>
                    {item.year}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Map */}
          <div>
            {/* Map Title */}
            {selectedDataItem && (
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {selectedDataItem.title} - Tahun {selectedDataItem.year}
              </h3>
            )}

            {/* Map Container */}
            <div className="bg-gray-100 rounded-lg relative h-[600px] overflow-hidden">
              {/* Placeholder Map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-32 h-32 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-500 mt-4">Map Visualization</p>
                  <p className="text-sm text-gray-400 mt-2">Interactive map will be displayed here</p>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <button className="bg-white p-2 rounded shadow-md hover:bg-gray-50 transition-colors">
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </button>
                <button className="bg-white p-2 rounded shadow-md hover:bg-gray-50 transition-colors">
                  <ZoomOut className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Fullscreen Button */}
              <button className="absolute bottom-4 right-4 bg-white p-2 rounded shadow-md hover:bg-gray-50 transition-colors">
                <Maximize className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Legend */}
            {selectedDataItem && (
              <div className="mt-6">
                <h4 className="font-bold text-gray-800 mb-3">Keterangan</h4>
                <div className="grid grid-cols-6 gap-2">
                  <div className="text-center">
                    <div className="bg-blue-50 w-full h-8 rounded mb-2"></div>
                    <p className="text-xs text-gray-600">0 - 0</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-200 w-full h-8 rounded mb-2"></div>
                    <p className="text-xs text-gray-600">39.422 - 131.794</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-300 w-full h-8 rounded mb-2"></div>
                    <p className="text-xs text-gray-600">131.795 - 222.786</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-400 w-full h-8 rounded mb-2"></div>
                    <p className="text-xs text-gray-600">222.787 - 289.020</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-500 w-full h-8 rounded mb-2"></div>
                    <p className="text-xs text-gray-600">289.021 - 383.998</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-600 w-full h-8 rounded mb-2"></div>
                    <p className="text-xs text-gray-600">383.999 - 570.943</p>
                  </div>
                </div>
              </div>
            )}

            {/* Source Data */}
            {selectedDataItem && (
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Sumber Data:</span>{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700">
                    Dataset {selectedDataItem.title} - Tahun {selectedDataItem.year}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

