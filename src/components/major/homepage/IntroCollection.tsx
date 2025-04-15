'use client'

import React, { useRef, useMemo } from 'react';
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';

export default function IntroCollection() {
  // 1. Create a ref for the section element
  const sectionRef = useRef<HTMLDivElement>(null);

  // 2. Track scroll progress relative to the sectionRef element
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end center"]
  });

  // 3. Create a smoothed version of scrollYProgress
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 30
  });

  // All transform hooks must be at the top level

  // --- Image Animation ---
  const imageScrollStart = 0.1;
  const imageScrollEnd = 0.4;

  // 1. Opacity: Fade in from 0 to 1 during the defined range
  const imageOpacity = useTransform(
    smoothScrollYProgress,
    [imageScrollStart, imageScrollEnd * 1],
    [0, 1]
  );

  // 2. Translate Y: Move from bottom (+500px) to top (0px)
  const imageY = useTransform(
    smoothScrollYProgress,
    [imageScrollStart, imageScrollEnd],
    [500, 0]
  );

  // 3. Rotate Y (3D): Rotate from 180deg to 0deg
  const imageRotateY = useTransform(
    smoothScrollYProgress,
    [imageScrollStart, imageScrollEnd],
    [180, 0]
  );

  // --- Glow Animation ---
  const glowScrollStart = imageScrollEnd - 0.05;
  const glowScrollEnd = glowScrollStart + 0.02;

  // 1. Glow Opacity: Fade in from 0 to 1 during the defined range *after* image animates
  const glowOpacity = useTransform(
    smoothScrollYProgress,
    [glowScrollStart, glowScrollEnd],
    [0, 0.5],
    { clamp: true }
  );

  // --- Scroll Arrow Animation ---
  const arrowOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.2],
    [1, 0]
  );

  // Animation variants for the bouncing arrow - defined outside render for stability
  const arrowVariants = useMemo(() => ({
    initial: { y: -10 },
    animate: {
      y: 10,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1,
        ease: "easeInOut"
      }
    }
  }), []);

  // Memoize the card images to prevent unnecessary re-renders
  const cardImages = useMemo(() => (
    <div className='flex justify-center items-center '>
      <Image src='/Caster.png' width={150} height={170} alt='caster' />
      <Image src='/Dragon.png' width={150} height={170} alt='dragon'/>
      <Image src='/Hell Born.png' width={150} height={170} alt='hellborn'/>
      <Image src='/Legend.png' width={150} height={170} alt='legend'/>
      <Image src='/Warrior.png' width={150} height={170} alt='warrior'/>
    </div>
  ), []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[1700px] bg-[#000] overflow-hidden" 
      style={{ perspective: '1000px' }}
    >
      <div className="absolute w-full bg-[#000] h-full blur-[100px] z-1"></div>

      {/* Scroll Down Arrow */}
      <AnimatePresence>
        <motion.div 
          className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center text-[#E8B77C] text-[40px]"
          style={{ opacity: arrowOpacity }}
          initial="initial"
          animate="animate"
          variants={arrowVariants}
        >
          &dArr;
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative w-full h-full flex flex-col-reverse justify-center items-center px-4 z-10 gap-20 md:flex-row md:gap-60">
        <div className='flex flex-col items-center gap-20 px-4'>
          <motion.p
            className="text-[26px] text-center text-[#E9312B] tracking-wide md:text-[36px]"
          >
            ATEMU OG MINT <br/> GET READY. IT&#39;S COMING.
          </motion.p>
          
          <motion.p className='font-fe text-[15px] text-center tracking-wider leading-[18px]'>
            A finite collection, never to be seen again.
            Inside awaits immense power: fifty cards from five legendary realms: Egypt, Greece, Japan, Viking, and Hellborn.
            Seek the god-tier, five ultra-rare characters (a mere 1% chance), one from each realm, boasting incredible strength and unique skills.
            Each card is a unique NFT. Own it, collect it, trade it.
          </motion.p>

          {cardImages}
        </div>

        {/* Animated Image Wrapper */}
        <div>
          <motion.div
            className="md:mt-0"
            style={{
              opacity: imageOpacity,
              y: imageY,
              rotateY: imageRotateY,
              willChange: 'transform, opacity',
            }}
          >
            <Image
              src="/backcard.png"
              width={300}
              height={483}
              alt="backcard"
              className='relative z-10 mt-100'
              priority
            />
            {/* Yellow Glow Element */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[10%] bg-[#E8B77C] blur-[30px] z-0"
              style={{
                opacity: glowOpacity,
                willChange: 'opacity',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}