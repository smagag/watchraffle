import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ImageGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) return null;

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex gap-4">
      {/* Thumbnail Column */}
      <div className="flex flex-col gap-3 w-20">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`
              relative aspect-square rounded-lg border-2 transition-all overflow-hidden
              ${selectedIndex === index 
                ? 'border-purple-400 ring-2 ring-purple-400/20' 
                : 'border-white/10 hover:border-white/20'
              }
            `}
          >
            <img
              src={image}
              alt={`View ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image Display */}
      <div className="flex-1 relative bg-gradient-to-br from-[#1a2235] to-[#131A2B] rounded-2xl border border-white/5 overflow-hidden">
        <div className="aspect-square flex items-center justify-center p-8 relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedIndex}
              src={images[selectedIndex]}
              alt={`Product image ${selectedIndex + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-full object-contain"
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm rounded-full w-10 h-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm rounded-full w-10 h-10"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}