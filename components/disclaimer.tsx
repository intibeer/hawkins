"use client"

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Disclaimer() {
  const [isVisible, setIsVisible] = useState(true);
  
  // Check if the disclaimer has been dismissed before
  useEffect(() => {
    const disclaimerDismissed = localStorage.getItem('disclaimerDismissed');
    if (disclaimerDismissed) {
      setIsVisible(false);
    }
  }, []);
  
  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('disclaimerDismissed', 'true');
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#fff8e1] shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 relative">
        <div className="flex items-start">
          <div className="flex-1 pr-8">
            <p className="poppins-regular text-sm text-[#5d4037]">
              <span className="poppins-semibold">Disclaimer:</span> This consciousness scale is based on Dr. David R. Hawkins' work and is provided for educational and self-reflection purposes only. It is not a scientific or clinical assessment and should not be considered medical or psychological advice.
            </p>
          </div>
          <button 
            onClick={handleDismiss}
            className="absolute right-4 top-3 text-[#5d4037] hover:text-[#9c6644] transition-colors"
            aria-label="Dismiss disclaimer"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
} 