
'use client'

import React, { useRef } from 'react';
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';




export default function IntroCollection() {

  // 1. Create a ref for the section element
  const sectionRef = useRef<HTMLDivElement>(null);

  // 2. Track scroll progress relative to the sectionRef element
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Adjust offset:
    // "start end": Animation starts when the top of the section hits the bottom of the viewport
    // "end start": Animation ends when the bottom of the section hits the top of the viewport
    // This means the animation occurs as the section scrolls *through* the viewport.
    offset: ["start end", "end center"]
    // You could also try other offsets like:
    // offset: ["start end", "center center"] // Animation completes when section center hits viewport center
    // offset: ["start end", "end end"] // Animation completes when section bottom hits viewport bottom
  });

  // 3. Map scrollYProgress (0 to 1) to brightness (1 down to 0)
  // As the section scrolls through the viewport (based on offset), brightness goes from 100% to 0%
  const brightnessValue = useTransform(
    scrollYProgress,
    [1, 0], // Input range (scroll progress 0 to 1)
    [1, 0]  // Output range (brightness value 1 down to 0)
  );

  // 4. Create a motion style object for the filter property
  // Framer Motion needs `motionValue` derived styles applied directly
  // const brightnessStyle = useTransform(brightnessValue, (b) => `brightness(${b})`);

  // Define the red glow using CSS drop-shadow syntax within Tailwind's arbitrary values
  // Adjust the pixel values (e.g., 0px 0px 8px) to control the glow size and blur
  // const redGlowClass = '[filter:drop-shadow(0px_0px_12px_rgba(233,49,43,1))]';

  // const staticDropShadow = 'drop-shadow(2px 2px 12px rgba(232, 183, 124, 0.3))'; 

  // 2. Combine dynamic brightness and static drop-shadow using useTransform
  const combinedFilterStyle = useTransform(brightnessValue, (b) => {
    // Construct the full filter string: brightness first, then drop-shadow
    return `brightness(${b})`;
  });

  // --- Image Animation ---
  // Define the scroll progress range for the image animation (e.g., 20% to 60%)
  const imageScrollStart = 0.1;
  const imageScrollEnd = 0.4;

  // 1. Opacity: Fade in from 0 to 1 during the defined range
  const imageOpacity = useTransform(
    scrollYProgress,
    [imageScrollStart, imageScrollEnd * 1.25], // Fade in relatively quickly
    [0, 1]
  );

  // 2. Translate Y: Move from bottom (+500px) to top (0px)
  const imageY = useTransform(
    scrollYProgress,
    [imageScrollStart, imageScrollEnd],
    [500, 0] // Start 500px below, end at original position
  );

  // 3. Rotate Y (3D): Rotate from 180deg to 0deg
  const imageRotateY = useTransform(
    scrollYProgress,
    [imageScrollStart, imageScrollEnd],
    [180, 0] // Start rotated, end facing forward
  );

  // --- Glow Animation ---
  // Start the glow fade-in slightly after the image animation ends
  const glowScrollStart = imageScrollEnd - 0.05; // e.g., start at 0.55
  const glowScrollEnd = glowScrollStart + 0.02; // e.g., end at 0.70

  // 1. Glow Opacity: Fade in from 0 to 1 during the defined range *after* image animates
  const glowOpacity = useTransform(
    scrollYProgress,
    [glowScrollStart, glowScrollEnd], // Range: e.g., 0.55 to 0.70
    [0, 0.5], // Output: Opacity 0 to 1
    { clamp: true } // Prevent opacity going beyond 0 or 1
  );

  // --- Scroll Arrow Animation ---
  // Hide the arrow when user has scrolled a bit
  const arrowOpacity = useTransform(
    scrollYProgress,
    [0, 0.2], // Hide arrow after 10% scroll
    [1, 0]
  );

  // Animation variants for the bouncing arrow
  const arrowVariants = {
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
  };


  return (
    <section ref={sectionRef} className="relative w-full h-[1200px] bg-[#000] overflow-hidden" style={{ perspective: '1000px' }}>
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

      {/* Content Container - Needs to be relative and higher z-index */}
      {/* Ensure h-full so scroll tracking works correctly */}
      <div className="relative w-full h-full flex flex-col-reverse justify-center items-center px-4 z-10 gap-25 md:flex-row md:gap-60 "> {/* Adjusted gap, added padding */}

        {/* 5. Wrap the text paragraph with motion.p and apply the style */}
        <div className='flex flex-col items-center gap-20 px-4'>
          <motion.p
            className={`text-[29px] text-center text-[#E9312B] md:text-[36px]`}
            style={{
              filter: combinedFilterStyle, // Apply the brightness filter dynamically
              // Add will-change for performance hint (optional but good practice)
              willChange: 'filter',
            }}
          >
            ATEMU OG MINT <br/> GET READY. IT'S COMING.
          </motion.p>
          

          <motion.p className='font-fe text-[15px] text-center tracking-wider leading-[18px]'>
            A finite collection, never to be seen again.
            Inside awaits immense power: fifty cards from five legendary realms: Egypt, Greece, Japan, Viking, and Hellborn.
            Seek the god-tier, five ultra-rare characters (a mere 1% chance), one from each realm, boasting incredible strength and unique skills.
            Each card is a unique NFT. Own it, collect it, trade it.
          </motion.p>

          <div className='flex justify-center items-center'>
            <Image src='/Caster.png' width={150} height={170} alt='caster' />
            <Image src='/Dragon.png' width={150} height={170} alt='dragon'/>
            <Image src='/Hell Born.png' width={150} height={170} alt='hellborn'/>
            <Image src='/Legend.png' width={150} height={170} alt='legend'/>
            <Image src='/Warrior.png' width={150} height={170} alt='warrior'/>
            
          </div>
        </div>

        {/* Animated Image Wrapper */}
        <div>
          <motion.div
            className="md:mt-0" // Keep original spacing adjustments
            style={{
              opacity: imageOpacity,
              y: imageY, // Apply translateY
              rotateY: imageRotateY, // Apply rotateY
              // Optional: Add backface-visibility if needed, though often handled well
              // backfaceVisibility: 'hidden',
              willChange: 'transform, opacity', // Performance hint
            }}
          >
            <Image
              src="/backcard.png"
              width={300}
              height={483}
              alt="backcard"
              className='relative z-10'
              // No className needed here unless for specific non-transform styling
            />
            {/* 2. Yellow Glow Element */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[10%] bg-[#E8B77C] blur-[30px] z-0 " // Positioned below, centered, oval, blurred
              style={{
                opacity: glowOpacity, // Apply dynamic opacity
                willChange: 'opacity',
              }}
            />
          </motion.div>
        </div>
      </div>
          
    </section>
  );
}