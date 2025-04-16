'use client'

import HeroSection from "@/components/major/homepage/HeroSection";
import IntroCollection from "@/components/major/homepage/IntroCollection";
import IntroAtemu from "@/components/major/homepage/IntroAtemu";
import CardShow from "@/components/major/homepage/CardShow";
import Gameplay from "@/components/major/homepage/Gameplay";
import Partnership from "@/components/major/homepage/Partnership";




export default function Home() {
  return (
    <main className="bg-[#000] w-screen h-full">
      <HeroSection />
      <IntroCollection />
      <IntroAtemu />
      <CardShow />
      <Gameplay />
      <Partnership />
    </main>
  );
}
