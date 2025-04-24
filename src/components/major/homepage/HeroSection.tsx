'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react';

import Image, { StaticImageData } from 'next/image';
import Button from '@/components/ui/Button';
import TextLogo from '@/components/ui/AtemuTextLogo';

import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import { motion } from 'framer-motion';


// Import hero images statically 
import HeroImage from '../../../../public/Greece.webp';

import 'swiper/css';
import 'swiper/css/autoplay';   
import 'swiper/css/effect-fade';

// Define the data for each slide
interface HeroSlideData {
  id: number;
  type: 'image' | 'video';
  src: string | StaticImageData;
  altText?: string;
}

export default function HeroSection() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [realIndex, setRealIndex] = useState(0);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const autoplayPaused = useRef(false);

  // Memoize slide data to prevent recreation on each render
  const slidesData: HeroSlideData[] = useMemo(() => [
    {
    id: 1,
    type: 'image',
    src: HeroImage,
    },
    {
      id: 2,
      type: 'video',
      src: '/Hell Born.mp4'
    },
    {
      id: 3,
      type: 'video',
      src: '/OG collection.mp4',
    },
    // Add other slides here
  ], []);

  // Memoize the video end handler
  const handleVideoEnd = useMemo(() => {
    return () => {
      console.log('Video ended, sliding next');
      if (swiperInstance) {
        swiperInstance.slideNext();
        
        // Only start autoplay if the next slide is not a video
        if (slidesData[(realIndex + 1) % slidesData.length]?.type !== 'video') {
          swiperInstance.autoplay?.start();
        }
      }
    };
  }, [swiperInstance, realIndex, slidesData]);

  // Optimize effect to run only when necessary
  useEffect(() => {
    if (!swiperInstance) return;

    const currentSlideData = slidesData[realIndex];
    const videoElement = videoRefs.current[realIndex];

    // Clean up function to handle all video elements
    const cleanupVideos = () => {
      Object.values(videoRefs.current).forEach(vidElement => {
        if (vidElement) {
          vidElement.removeEventListener('ended', handleVideoEnd);
          vidElement.pause();
        }
      });
    };

    // Handle current slide based on type
    if (currentSlideData.type === 'video' && videoElement) {
      // Stop autoplay for video slides
      swiperInstance.autoplay?.stop();
      autoplayPaused.current = true;

      // Set up video playback
      videoElement.removeEventListener('ended', handleVideoEnd);
      videoElement.addEventListener('ended', handleVideoEnd);
      videoElement.currentTime = 0;
      
      // Use a promise with timeout to handle autoplay failures
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Video autoplay failed:', error);
          setTimeout(handleVideoEnd, 100);
        });
      }
    } else if (autoplayPaused.current) {
      // Restart autoplay for image slides if it was paused
      swiperInstance.autoplay?.start();
      autoplayPaused.current = false;
    }

    // Pause other videos
    Object.entries(videoRefs.current).forEach(([indexStr, vidElement]) => {
      const index = parseInt(indexStr, 10);
      if (index !== realIndex && vidElement && !vidElement.paused) {
        vidElement.pause();
        vidElement.removeEventListener('ended', handleVideoEnd);
      }
    });

    return cleanupVideos;
  }, [realIndex, swiperInstance, slidesData, handleVideoEnd]);

  // Memoize static content to prevent unnecessary re-renders
  const staticContent = useMemo(() => (
    <div className="h-full flex flex-col items-center justify-center relative z-10 pointer-events-auto">
      <TextLogo
        src="/ATEMU-TEXT.png"
        width={300}
        height={111}
        alt="atemutextlogo"
        className="mb-15 md:mb-10"
      />
      <motion.p
        className="text-[20px] tracking-wide md:text-xl text-white mt-5 mb-5 max-w-xl"
      >
        The First Fully On-Chain Card Game on Starknet
      </motion.p>
      <motion.p
        className="text-[16px] font-fe text-[#faf0fa] max-w-3xl tracking-wide leading-6 mb-45"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 4  }}
      >
        Step into the battle of five legendary realms. Collect NFT cards and conquer! Join now!
      </motion.p>
      <Button variant="secondary">
        JOIN THE BETA
      </Button>
    </div>
  ), []);

  // return UI
  return (
    <div className='relative h-[1000px] w-full overflow-hidden'>
      <Swiper
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
        modules={[Autoplay, EffectFade]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="h-full w-full"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
            {slide.type === 'image' ? (
            <Image
              src={HeroImage}
              alt={slide.altText || `Hero background ${slide.id}`}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="100vw"
              quality={80}
              width={1600}
              height={900}
              style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
              className="absolute top-0 inset-0 z-0"
            />
            ) : (
          <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={slide.src as string}
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 z-0 h-full w-full object-cover"
              ></video>
            )}
            <div className="absolute inset-0 bg-black/0 z-10"></div>
            <div className="relative z-20 h-full flex flex-col justify-center items-center px-4 text-center">
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 z-20 flex flex-col items-center px-4 text-center pointer-events-none">
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        {staticContent}
      </div>
    </div>
  );
}