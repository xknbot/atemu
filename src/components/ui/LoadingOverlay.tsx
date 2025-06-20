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
          {/* Progress Bar */}
          {/* <div className="w-64 h-1 bg-[#E8B77C]/20 rounded-full mb-4 overflow-hidden">
            <motion.div 
              className="h-full bg-[#E8B77C] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: '0 0 8px rgba(232, 183, 124, 0.7)',
                background: 'linear-gradient(90deg, #E8B77C, #E8B77C 95%, rgba(232, 183, 124, 0.8))',
                clipPath: `polygon(
                  0% 0%, 
                  ${100 + lightningJitter}% 15%, 
                  ${100 + lightningJitter}% 30%, 
                  ${100 + lightningJitter}% 45%, 
                  ${100 + lightningJitter}% 60%, 
                  ${100 + lightningJitter}% 75%, 
                  ${100 + lightningJitter}% 100%, 
                  0% 100%
                )`
              }}
            />
          </div> */}

            
          
          {/* Loading Text with Lightning Fill Effect */}
          <div className="relative mt-6 mb-2 flex justify-center">
            {/* Base Text */}
            <p className="text-3xl text-[#E8B77C] opacity-30">ATEMU</p>
            
            {/* Lightning Fill Container with Mask */}
            <div 
              className="absolute inset-0 overflow-hidden" 
              style={{ 
                width: `${progress}%`,
                clipPath: `polygon(
                  0% 0%, 
                  ${100 + lightningJitter}% 15%, 
                  ${100 + lightningJitter}% 30%, 
                  ${100 + lightningJitter}% 45%, 
                  ${100 + lightningJitter}% 60%, 
                  ${100 + lightningJitter}% 75%, 
                  ${100 + lightningJitter}% 100%, 
                  0% 100%
                )`
              }}
            >
              {/* Filled Text with Glow */}
              <motion.p 
                className="text-3xl text-[#E8B77C]"
                animate={{ 
                  textShadow: [
                    '0 0 3px rgba(232, 183, 124, 0.7)',
                    '0 0 10px rgba(232, 183, 124, 0.9)',
                    '0 0 3px rgba(232, 183, 124, 0.7)'
                  ]
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

          {/* Lightning Bolt Progress Bar */}
          <div className="w-64 h-6 relative hidden">
            {/* Lightning Flash Effect */}
            <svg width="100%" height="100%" viewBox="0 0 256 24" className="absolute inset-0">
              <defs>
                {/* <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E8B77C" />
                  <stop offset="100%" stopColor="#FFC876" />
                </linearGradient> */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                {/* <mask id="progressMask">
                  <rect x="0" y="0" width={`${progress}%`} height="24" fill="white" />
                </mask> */}
              </defs>
              
              {/* Progress Indicator (subtle line) */}
              <rect 
                x="0" 
                y="11" 
                width="100%" 
                height="2" 
                fill="rgba(232, 183, 124, 0.15)" 
                rx="1"
              />
              
              {/* Progress Fill */}
              <rect 
                x="0" 
                y="11" 
                width={`${progress}%`} 
                height="2" 
                fill="rgba(232, 183, 124, 0.4)" 
                rx="1"
              />
              
              {/* Lightning Flashes */}
              {/* <g mask="url(#progressMask)">
                <motion.path 
                  d="M0,12 L30,4 L60,16 L90,8 L120,18 L150,6 L180,14 L210,4 L240,12 L256,8" 
                  fill="none" 
                  stroke="url(#lightningGradient)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  animate={{
                    opacity: [0, 1, 0],
                    pathLength: [0, 1, 0],
                    pathOffset: [0, 0.2, 0.4]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: 0,
                    repeatType: "loop",
                    times: [0, 0.2, 1]
                  }}
                />
                
                <motion.path 
                  // d="M0,12 L30,4 L60,16 L90,8 L120,18 L150,6 L180,14 L210,4 L240,12 L256,8" 
                  d={`M0,12 L30,4 L60,16 L90,8 L120,18 L150,6 L180,14 L210,4 L${progress * 2.56},12`}
                  fill="none" 
                  stroke="#FFC876" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  animate={{
                    opacity: [0, 1, 0],
                    pathLength: [0, 1],
                    pathOffset: [ 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: 0,
                    repeatType: "loop",
                    delay: 1,
                    times: [0, 0.2, 1]
                  }}
                />
              </g> */}
              
              {/* Progress Endpoint Glow */}
              <AnimatePresence>
                {progress < 100 && (
                  <motion.circle
                    cx={`${progress}%`}
                    cy="12"
                    r="4"
                    fill="#FFC876"
                    filter="url(#glow)"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [0.8, 1, 0.8]
                    }}
                    exit={{ 
                      opacity: 0,
                      scale: 0,
                      transition: { duration: 0.1 }
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </AnimatePresence>
            </svg>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
};
 
export default LoadingOverlay;