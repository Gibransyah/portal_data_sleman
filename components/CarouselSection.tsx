'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LatestDashboard } from '@/types';

interface CarouselSectionProps {
  title?: string;
  items: LatestDashboard[];
  autoPlay?: boolean;
  interval?: number;
}

export default function CarouselSection({
  title = 'Dashboard Terbaru',
  items,
  autoPlay = false,
  interval = 5000,
}: CarouselSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }
  }, [isAutoPlaying, interval]);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">{title}</h2>
        
        <div className="relative">
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`w-full flex-shrink-0 ${
                    item.bgColor || 'bg-white'
                  }`}
                >
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Left Side - Image */}
                    <div className="flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>

                    {/* Right Side - Content */}
                    <div className="flex flex-col justify-center space-y-6">
                      {/* Logos */}
                      {(item.logo1 || item.logo2) && (
                        <div className="flex gap-4">
                          {item.logo1 && (
                            <span className="text-sm font-bold text-primary-600">
                              {item.logo1}
                            </span>
                          )}
                          {item.logo2 && (
                            <span className="text-sm font-bold text-green-600">
                              {item.logo2}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-4xl font-bold text-gray-800">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-lg">
                        {item.description}
                      </p>

                      {/* Button */}
                      {item.buttonText && (
                        <button
                          onClick={() => window.location.href = item.buttonLink || '#'}
                          className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-800 transition-colors w-fit"
                        >
                          {item.buttonText}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-primary-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

