'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react';
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useAnimation} from 'framer-motion';
import Button from '@/components/ui/Button';


export default function IntroCollection() {
  // 1. Create a ref for the section element
  const sectionRef = useRef<HTMLDivElement>(null);

  // 2. Track scroll progress relative to the sectionRef element
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // 3. Create a smoothed version of scrollYProgress
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 30
  });

  // All transform hooks must be at the top level

  // --- Image Animation ---
  const imageScrollEnd = 0.3;

  // --- Glow Animation ---
  const glowScrollStart = imageScrollEnd 
  const glowScrollEnd = glowScrollStart 

  // 1. Glow Opacity: Fade in from 0 to 1 during the defined range *after* image animates
  const glowOpacity = useTransform(
    smoothScrollYProgress,
    [glowScrollStart, glowScrollEnd],
    [0, 0.5],
    { clamp: true }
  );


  // Arrow Animation
  // --- Scroll Arrow Animation ---
  const arrowOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.3],
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

  // --- Card Rotation and Translation ---
  // Add this new transform
  const cardRotateY = useTransform(
    smoothScrollYProgress,
    [0, 0.2],
    [180, 0],
    { clamp: true }
  );

  const cardTranslateY = useTransform(
    smoothScrollYProgress,
    [0, 0.1],
    [300, 0],
    { clamp: true }
  );

  // --- Classes circular animation ---
  const radius = 130;
  // Fix hydration mismatch by using client-side only rendering for the rotating cards
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);



  // Static initial positions for server rendering
  const staticCardPositions = useMemo(() => {
    const cards = [
      { src: '/Caster.png', alt: 'caster' },
      { src: '/Dragon.png', alt: 'dragon' },
      { src: '/Hell Born.png', alt: 'hellborn' },
      { src: '/Legend.png', alt: 'legend' },
      { src: '/Warrior.png', alt: 'warrior' }
    ];
    
    return cards.map((card, index) => {
      // Use fixed positions for server rendering
      const angle = (index * (360 / 5)) * (Math.PI / 180);
      const x = Math.round(Math.cos(angle) * radius);
      const y = Math.round(Math.sin(angle) * radius);
      
      return {
        ...card,
        x,
        y,
        zIndex: 10 // Fixed zIndex for all cards initially
      };
    });
  }, [radius]);
  
  // Client-side animation state
  const [rotation, setRotation] = useState(0);
  
  // Only run rotation animation on client side
  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, [isMounted]);
  
  // Dynamic positions calculated on client side only
  const cardPositions = useMemo(() => {
    if (!isMounted) return staticCardPositions;
    
    const cards = [
      { src: '/Caster.png', alt: 'caster' },
      { src: '/Dragon.png', alt: 'dragon' },
      { src: '/Hell Born.png', alt: 'hellborn' },
      { src: '/Legend.png', alt: 'legend' },
      { src: '/Warrior.png', alt: 'warrior' }
    ];
    
    return cards.map((card, index) => {
      const angle = (index * (360 / cards.length) + rotation) * (Math.PI / 180);
      // Round values to avoid precision differences
      const x = Math.round(Math.cos(angle) * radius);
      const y = Math.round(Math.sin(angle) * radius);
      
      return {
        ...card,
        x,
        y,
        zIndex: Math.round(Math.sin(angle) * 10) + 10
      };
    });
  }, [rotation, radius, isMounted, staticCardPositions]);

  // Replace the static cardImages with the animated version
  const cardImages = useMemo(() => (
    <div className='relative flex justify-center items-center h-[340px] w-[340px]'>
      {/* Center button */}
      <motion.div 
        className="absolute z-20 flex justify-center items-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button variant='third' size='small'>
          COLLECT TODAY
        </Button>
      </motion.div>
      
      {cardPositions.map((card, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            x: card.x,
            y: card.y,
            zIndex: card.zIndex,
          }}
        >
          <Image 
            src={card.src} 
            width={150} 
            height={170} 
            alt={card.alt}
            className="transition-all duration-300"
            style={{
              scale: (card.zIndex - 10) / 10 * 0.3 + 0.7, // Scale based on z-index
            }}
          />
        </motion.div>
      ))}
    </div>
  ), [cardPositions]);


  // return UI
  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[2000px] bg-[#000] overflow-hidden" 
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
            className="text-[20px] text-center text-[#E8B77C] tracking-wide"
          >
            Own the Legends <br/> Atemu OG Mint
          </motion.p>
          
          <motion.p className='font-fe text-[16px] text-center tracking-wide leading-[22px]'>
            A finite collection, never to be seen again.
            Inside awaits immense power: 50 cards from 5 legendary realms: Egypt, Greece, Japan, Viking, and Hellborn.
            Seek only 1% chance for god-tier legends, boasting incredible strength and unique skills.
            Each card is a unique NFT. Own it, collect it, trade it.
          </motion.p>

          {cardImages}
        </div>

        {/* Animated Image Wrapper */}
        <div>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            transition={{ duration: 0.}}
            className="md:mt-0"
            style={{
              willChange: 'transform, opacity',
              rotateY: cardRotateY,
              y: cardTranslateY,
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