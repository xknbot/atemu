'use client'

import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import TextLogo from '@/components/ui/AtemuTextLogo';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/autoplay';   
import 'swiper/css/effect-fade';


export default function HeroSection() {
  return (
    <section className="bg-[url('/Greece.png')] bg-center bg-no-repeat bg-cover h-[980px] w-full">
      <div className="flex flex-col items-center px-2">
        <TextLogo src="/ATEMU-TEXT.png" width={300} height={111} alt="atemutextlogo" className="mt-45"/>
        <p className="text-[10px] font-space text-center mt-10">The First Fully On-Chain Card Game on Starknet</p>
        <p className="text-[10px] font-space text-center mt-5">Where Strategy Meets Legends and Your Cards fuel Battles</p>
        
      </div>
      <div className="flex justify-center mt-55">
        <Button className="">
            Play now
        </Button>
      </div>
    </section>
  );
}