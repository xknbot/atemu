// src/components/ui/LoadingOverlay.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingOverlayProps {
  isLoading: boolean;
  progress?: number;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, progress = 0 }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [lightningJitter, setLightningJitter] = useState(0);
  
  // Simulate loading progress
  useEffect(() => {
    if (!isLoading) return;
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress > 120) progress = 120;
      setLoadingProgress(Math.floor(progress));
      
      if (progress === 120) clearInterval(interval);
    }, 200);
    
    return () => clearInterval(interval);
  }, [isLoading]);
  
  // Lightning jitter effect
  useEffect(() => {
    if (!isLoading) return;
    
    const jitterInterval = setInterval(() => {
      setLightningJitter(Math.random() * 6 - 3); // Random value between -3 and 3
    }, 100);
    
    return () => clearInterval(jitterInterval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-overlay"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          
          {/* Loading Text with Lightning Fill Effect */}
          <div className="relative mt-6 mb-2">
            {/* Base Text */}
            <p className="text-3xl text-[#E8B77C] opacity-30">ATEMU</p>
            
            {/* Lightning Fill Container with Mask */}
            <div 
              className="absolute top-0 left-0 overflow-hidden" 
              style={{ 
                width: `${progress}%`,
                clipPath: `polygon(
                  0% 0%, 
                  ${100 + lightningJitter}% 0%, 
                  ${100 + lightningJitter}% 15%, 
                  ${100 + lightningJitter }% 30%, 
                  ${100 + lightningJitter}% 45%, 
                  ${100 + lightningJitter }% 60%, 
                  ${100 + lightningJitter}% 75%, 
                  ${100 + lightningJitter}% 100%, 
                  0% 100%
                )`
              }}
            >
              {/* Filled Text with Glow */}
              <motion.p 
                className="text-3xl text-[#E8B77C] relative"
                animate={{ 
                  textShadow: [
                    '0 0 3px rgba(232, 183, 124, 0.7)',
                    '0 0 10px rgba(232, 183, 124, 0.9)',
                    '0 0 3px rgba(232, 183, 124, 0.7)'
                  ],
                  scale: [1, 1, 1]
                }}
                transition={{ 
                  duration: 0.3, 
                  repeat: Infinity,
                  repeatType: 'reverse' 
                }}
              >
                ATEMU
              </motion.p>
              
              {/* Lightning Edge Effect */}
              <div 
                className="absolute top-0 right-0 h-full w-5" 
                style={{ 
                  background: 'linear-gradient(90deg, transparent, rgba(232, 183, 124, 0.5), #E8B77C)',
                  filter: 'blur(3px)'
                }}
              />
            </div>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
};
 
export default LoadingOverlay;