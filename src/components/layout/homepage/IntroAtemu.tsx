'use client'

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import Image from "next/image";
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button/Button';



// Define interfaces for clarity
interface CharacterStyleProps {
  top: string;
  left: string;
  translateX: string;
  translateY: string;
  rotate: number;
  zIndex: number;
  width: number;
  height: number;
  flipX?: boolean;
}

interface CharacterData {
  id: number;
  src: string;
  alt: string;
  mobile: CharacterStyleProps; // Styles for mobile
  desktop: CharacterStyleProps; // Styles for desktop (and larger)
  priority: boolean; // Whether this image should be prioritized
}

// Define the character image data with both mobile and desktop positions
// Move this outside the component to prevent recreation on each render
const characterImages: CharacterData[] = [
  { 
    id: 1, 
    src: '/3(introatemu).webp', 
    alt: 'Character 1',
    mobile: { 
      top: '0%', left: '50%', translateX: '-210%', translateY: '-45%', 
      rotate: 0, zIndex: 1, width: 80, height: 150 , flipX: true
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-225%', translateY: '-50%', 
      rotate: 0, zIndex: 1, width: 70, height: 200 , flipX: true
    },
    priority: true
  },

  { 
    id: 2, 
    src: '/3(introatemu).webp', 
    alt: 'Character 2',
    mobile: { 
      top: '0%', left: '50%', translateX: '95%', translateY: '-45%', 
      rotate: 0, zIndex: 2, width: 80, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '110%', translateY: '-50%', 
      rotate: 0, zIndex: 2, width: 70, height: 200 , 
    },
    priority: true
  },
  
  
].map((char, index) => ({
  ...char,
  priority: index < 5 // Set priority true for first 5 characters
}));

// Custom hook to detect screen size with debounce
function useScreenSize() {
  const [isDesktop, setIsDesktop] = useState(false);

  // Debounced resize handler
  const debouncedResize = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsDesktop(window.innerWidth >= 768);
      }, 100); // 100ms debounce
    };
  }, []);

  useEffect(() => {
    // Initial check
    setIsDesktop(window.innerWidth >= 1024);
    
    // Debounced resize listener
    const handleResize = debouncedResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [debouncedResize]);

  return isDesktop;
}


const titleText = "THE GENESIS OF ATEMU";
const introText = "Before the battles, before the realms, there was the spark: a legendary birth shrouded in celestial wonder and untold power, a tale waiting to be told...";

export default function IntroAtemu() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isDesktop = useScreenSize();
  const [hasSeenAnimation, setHasSeenAnimation] = useState(true); // Default to true to prevent flash


  // Add this useEffect to check localStorage when component mounts
useEffect(() => {
  // Check if running in browser
  if (typeof window !== 'undefined') {
    const hasVisited = localStorage.getItem('hasSeenOGAnimation');
    setHasSeenAnimation(!!hasVisited);
    
    // If this is first visit, set the flag for future visits
    if (!hasVisited) {
      localStorage.setItem('hasSeenOGAnimation', 'true');
    }
  }
}, []);

  
  // Add scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Arrow Animation
  const arrowOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [2, 0]
  );

  // Animation variants for the bouncing arrow
  const arrowVariants = useMemo(() => ({
    initial: { y: -10 },
    animate: {
      y: 10,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1,
        ease: "easeInOut" as const,
      }
    }
  }), []);
  

    // --- Character Images ---

    // Memoize the title component - now static without animation
    const titleComponent = useMemo(() => (
        <div className="max-w-lg text-[25px] text-center bg-gradient-to-r from-[#E8B77C] to-[#E9312B] text-transparent bg-clip-text tracking-wide px-1 mt-30 -mb-15 lg:mb-1 font-deswash">
            {titleText}
        </div>
    ), []);
  
    const introComponent = useMemo(() => (
      <motion.div
        className="font-fe text-[16px] text-center text-[#faf0fa] tracking-wide px-1 mt-20 mb-6 lg:mt-0 leading-5" initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        {introText}
      </motion.div>
    ), []);
  
    // Memoize character images with progressive loading
    const characterImagesComponent = useMemo(() => {
        // Sort characters by priority to render important ones first
        const sortedCharacters = [...characterImages].sort((a, b) => {
            if (a.priority && !b.priority) return -1;
            if (!a.priority && b.priority) return 1;
            return 0;
        });

        return (
          <div 
              className="relative flex flex-nowrap justify-center items-center w-full max-w-full mt-10"
          >
            {sortedCharacters.map((char) => {
                const styles = isDesktop ? char.desktop : char.mobile;

                  return (
                      <motion.div 
                          key={char.id} 
                          className="absolute flex-shrink-0"
                          style={{
                              top: styles.top,
                              left: styles.left,
                              translateX: styles.translateX,
                              translateY: styles.translateY,
                              rotate: styles.rotate,
                              zIndex: styles.zIndex,
                              scaleX: styles.flipX ? -1 : 1,
                              filter: 'drop-shadow(1px 1px 4px rgba(232, 50, 0, 0.4))'
                          }}

                      >
                          <Image
                              width={styles.width}
                              height={styles.height}
                              src={char.src}
                              alt={char.alt}
                              sizes={`(max-width: 1024px) ${styles.width * 0.8}px, 
                                ${styles.width}px`}
                          />
                      </motion.div>
                  );
            })}
          </div>
        );}, [isDesktop]);

    return (
        <section 
          ref={sectionRef} 
          className="w-full relative h-[1100px] overflow-hidden z-0"
          style={{ 
              transform: 'translateZ(0)',
              willChange: 'transform'
          }}
      >
        {/* <motion.div className='absolute z-10 bottom-0 text-[25px] text-center w-full flex flex-col items-center justify-center'>
          <motion.span 
            className="block text-[#E8B77C]"
            initial={{ opacity: hasSeenAnimation ? 1 : 0, y: hasSeenAnimation ? 0 : -50 }}
            animate={{ 
              opacity: 1,
              y: 0
            }}
            transition={{ 
              duration: hasSeenAnimation ? 0 : 1.5,
              ease: "easeOut"
            }}
          >
            OG
          </motion.span>
          

            <motion.span 
              className="block text-[#E8B77C]"
              initial={{ opacity: hasSeenAnimation ? 1 : 0, y: hasSeenAnimation ? 0 : 50 }}
              animate={{ 
                opacity: 1,
                y: 0
              }}
              transition={{ 
                duration: hasSeenAnimation ? 0 : 1.5,
                delay: hasSeenAnimation ? 0 : 0.3, // Slight delay for second word
                ease: "easeOut"
              }}
            >
              COLLECTION
            </motion.span>
        </motion.div> */}

        
          {/* Add the arrow component */}
          <motion.div 
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center text-[#E8B77C] text-[80px] sm:text-[80px]"
            style={{ opacity: arrowOpacity }}
            initial="initial"
            animate="animate"
            variants={arrowVariants}
          >
            &dArr;
          </motion.div>
        
          {/* Background Image Section */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/bg-1.avif" 
              alt="Background"
              fill 
              style={{ objectFit: 'cover' }} 
              sizes="100vw"
              quality={100}
            />
            {/* Top inset shadow overlay */}
            <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-black to-transparent opacity-100 z-10"></div>
          </div>

          {/* Content Container - Positioned above background */}
          <div className="relative z-10 h-full flex flex-col items-center justify-start gap-20 pt-20 px-4">
            <div>
              {titleComponent}
            </div>
            <div className="w-full max-w-lg flex flex-col">
                {introComponent}
                <Button size='small' className='' variant='third'>
                  DISCOVER THE LORE
                </Button>
            </div>
            <div className='w-full max-w-full'>
              {characterImagesComponent}
            </div>
          </div>
        </section> 
      );
}