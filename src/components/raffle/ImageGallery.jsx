import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
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
    <div className="space-y-4">
      {/* Main Image Display - Fixed Size */}
      <div className="relative bg-gradient-to-br from-[#0a0f1c] to-[#131A2B] rounded-2xl border border-white/5 overflow-hidden h-[500px]">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedIndex}
              src={images[selectedIndex]}
              alt={`Product image ${selectedIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-full max-h-full object-contain drop-shadow-2xl"
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm rounded-full w-12 h-12"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm rounded-full w-12 h-12"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`
                relative w-20 h-20 flex-shrink-0 rounded-xl border-2 transition-all overflow-hidden
                ${selectedIndex === index 
                  ? 'border-purple-400 ring-2 ring-purple-400/30 scale-105' 
                  : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
                }
              `}
            >
              <img
                src={image}
                alt={`View ${index + 1}`}
                className="w-full h-full object-contain bg-[#0a0f1c]"
              />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}