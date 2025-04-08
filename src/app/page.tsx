'use client'

import HeroSection from "@/components/major/homepage/HeroSection";
import IntroCollection from "@/components/major/homepage/IntroCollection";
import IntroAtemu from "@/components/major/homepage/IntroAtemu";
import AtemuInfo from "@/components/major/homepage/AtemuInfo";




export default function Home() {
  return (
    <main>
      <HeroSection />
      <IntroCollection />
      <IntroAtemu />
      <AtemuInfo />
    </main>
  );
}
