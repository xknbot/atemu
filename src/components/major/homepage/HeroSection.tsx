'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import TextLogo from '@/components/ui/AtemuTextLogo';

import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/autoplay';   
import 'swiper/css/effect-fade';

// 2. Define the data for each slide
interface HeroSlideData {
  id: number;
  type: 'image' | 'video';
  src: string;
  altText?: string;

}


export default function HeroSection() {
  // 4. State and Refs for controlling Swiper and Video
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  // const [activeIndex, setActiveIndex] = useState(0);
  // Use realIndex for tracking the logical slide position
  const [realIndex, setRealIndex] = useState(0);
  // const videoRef = useRef<HTMLVideoElement>(null);
  // Keep refs for potentially multiple video elements if Swiper duplicates
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const autoplayPaused = useRef(false);

  // Memoize slide data to prevent recreation on each render
  const slidesData: HeroSlideData[] = useMemo(() => [
    {
    id: 1,
    type: 'image',
    src: '/Greece.png',
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
    <div className="flex flex-col items-center relative z-10 pointer-events-auto">
      <TextLogo
        src="/ATEMU-TEXT.png"
        width={300}
        height={111}
        alt="atemutextlogo"
        className="mt-30 mb-8 md:mb-10"
      />
      <p className="text-[29px] md:text-xl text-white mt-5 mb-5 max-w-xl">
        The First Fully On-Chain Card Game on Starknet
      </p>
      <p className="text-[15px] md:text-base font-fe text-gray-200 mb-10 max-w-3xl tracking-wide">
        WHERE STRATEGY MEETS LEGENDS AND YOUR CARDS FUEL BATTLES
      </p>
      <Button variant='secondary' className="">
        PLAY NOW
      </Button>
    </div>
  ), []);

  return (
    // 3. Use Swiper component as the main container
    <div className='relative h-[980px] w-full'>
      <Swiper
        // Pass Swiper instance to state
        onSwiper={setSwiperInstance}
        // Update active index state on change
        onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
        modules={[Autoplay, EffectFade]} // Include desired modules
        slidesPerView={1} // Show one slide at a time
        spaceBetween={0} // No space between slides
        loop={true} // Enable continuous looping
        autoplay={{
          delay: 5000, // Time in ms between slides
          disableOnInteraction: false, // Autoplay continues even after user interaction
        }}
        pagination={{ clickable: true }} // Add clickable pagination dots
        navigation={true} // Add navigation arrows (prev/next)
        effect="fade" // Use fade transition between slides
        fadeEffect={{ crossFade: true }} // Smoother fade transition
        className="h-full w-full" // Set height and width for the swiper container
      >
        {/* 4. Map over slide data to create SwiperSlides */}
        {slidesData.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
            {slide.type === 'image' ? (
            <Image
              src={slide.src}
              alt={slide.altText || `Hero background ${slide.id}`}
              layout="fill" // Fill the slide container
              objectFit="cover" // Cover the area, might crop
              objectPosition="center" // Center the image
              priority={index === 1} // Prioritize loading the first slide's image
              className="absolute inset-0 z-0" // Position behind content
            />
            ) : ( 
          <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={slide.src}
                muted // MUTED is crucial for autoplay to work reliably in most browsers
                playsInline // Important for iOS Safari
                preload="auto"
                className="absolute inset-0 z-0 h-full w-full object-cover" // Style like the image
              ></video>
            )}
            {/* Optional: Add a semi-transparent overlay for text readability */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            {/* Content container - positioned relative to the slide */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center px-4 text-center">
              {/* Use justify-center to vertically center content, or adjust mt/mb */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 2. Static Content Overlay - Positioned absolutely over the Swiper */}
      {/* This div sits on top of the Swiper component */}
      <div className="absolute inset-0 z-20 flex flex-col items-center px-4 text-center pointer-events-none">
        {/* Optional: Add a general overlay for text readability across all slides */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        {staticContent}
      </div>
    </div>
  );
}