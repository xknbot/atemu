'use client'

import React, { useState, useEffect } from 'react';
import HeroSection from "@/components/major/homepage/HeroSection";
import IntroCollection from "@/components/major/homepage/IntroCollection";
import CardShow from "@/components/major/homepage/CardShow";
import Gameplay from "@/components/major/homepage/Gameplay";
import Partnership from "@/components/major/homepage/Partnership";
import StayUpdated from "@/components/major/homepage/StayUpdated";
import LoadingOverlay from "@/components/ui/LoadingOverlay";



// On the page where IntroAtemu is used (e.g., pages/index.tsx)
import dynamic from 'next/dynamic';

// Dynamically import IntroAtemu
const IntroAtemu = dynamic(() => import('@/components/major/homepage/IntroAtemu'), {
  // Optional: Add a loading component while IntroAtemu is loading
  loading: () => <p>Loading...</p>,
  // Optional: Disable SSR if it relies heavily on browser APIs not available server-side
  // ssr: false
});

export default function Home() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);


  useEffect(() => {
    // Track resources loading
    const resourcesTotal = performance.getEntriesByType('resource').length;
    let resourcesLoaded = 0;
    
    // Create observer to track loading progress
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      resourcesLoaded += entries.length;
      
      // Calculate and update progress
      const progress = Math.min(
        (resourcesLoaded / (resourcesTotal + entries.length)) * 100, 
        99 // Cap at 99% until fully loaded
      );
      setLoadingProgress(progress);
    });
    
    // Start observing resource load events
    observer.observe({ entryTypes: ['resource'] });
    
    // Set up a timer for minimum loading time and final completion
    const minLoadingTime = 1000; // 1.5 seconds minimum loading time
    const timer = setTimeout(() => {
      setLoadingProgress(100);
      setTimeout(() => setIsPageLoading(false), 500); // Give time for 100% to show
      observer.disconnect();
    }, minLoadingTime);
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
  
  return (
    <main className="bg-[#000] w-screen h-full">
      <LoadingOverlay isLoading={isPageLoading} progress={loadingProgress} />
      <HeroSection />
      <IntroCollection />
      <IntroAtemu />
      <CardShow />
      <Gameplay />
      <Partnership />
      <StayUpdated/>
    </main>
  );
}
