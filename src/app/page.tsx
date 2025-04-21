'use client'

import HeroSection from "@/components/major/homepage/HeroSection";
import IntroCollection from "@/components/major/homepage/IntroCollection";
import CardShow from "@/components/major/homepage/CardShow";
import Gameplay from "@/components/major/homepage/Gameplay";
import Partnership from "@/components/major/homepage/Partnership";
import StayUpdated from "@/components/major/homepage/StayUpdated";



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
  return (
    <main className="bg-[#000] w-screen h-full">
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
