'use client'

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Button from '@/components/ui/Button';

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
    src: '/champ png/egypt-god-5.png', 
    alt: 'Character 1',
    mobile: { 
      top: '0%', left: '50%', translateX: '50%', translateY: '0%', 
      rotate: 0, zIndex: 5, width: 150, height: 200 
    },
    desktop: { 
      top: '0%', left: '50%', translateX: '40%', translateY: '-50%', 
      rotate: 0, zIndex: 5, width: 200, height: 250 
    },
    priority: true
  },
  { 
    id: 2, 
    src: '/champ png/greek-creep-1.png', 
    alt: 'Character 2',
    mobile: { 
      top: '0%', left: '50%', translateX: '-45%', translateY: '30%', 
      rotate: 0, zIndex: 7, width: 100, height: 150 
    },
    desktop: { 
      top: '0%', left: '50%', translateX: '-60%', translateY: '-35%', 
      rotate: 0, zIndex: 7, width: 150, height: 200 
    },
    priority: true
  },
  { 
    id: 3, 
    src: '/champ png/greek-creep-4.png', 
    alt: 'Character 3',
    mobile: { 
      top: '0%', left: '50%', translateX: '-160%', translateY: '20%', 
      rotate: 0, zIndex: 6, width: 120, height: 150 
    },
    desktop: { 
      top: '0%', left: '50%', translateX: '-120%', translateY: '-50%', 
      rotate: 0, zIndex: 5, width: 150, height: 200 
    },
    priority: true
  },
  { 
    id: 4, 
    src: '/champ png/greek-god-1.png', 
    alt: 'Character 4',
    mobile: { 
      top: '0%', left: '50%', translateX: '-110%', translateY: '20%', 
      rotate: 0, zIndex: 8, width: 110, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-130%', translateY: '-50%', 
      rotate: 0, zIndex: 5, width: 150, height: 200 
    },
    priority: true
  },
  { 
    id: 5, 
    src: '/champ png/greek-god-3.png', 
    alt: 'Character 5',
    mobile: { 
      top: '0%', left: '50%', translateX: '-28%', translateY: '20%', 
      rotate: 0, zIndex: 6, flipX: true, width: 100, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-40%', translateY: '-40%', 
      rotate: 0, zIndex: 4, flipX: true, width: 150, height: 200 
    },
    priority: true
  },
  { 
    id: 6, 
    src: '/champ png/greek-legend-2.png', 
    alt: 'Character 6',
    mobile: { 
      top: '0%', left: '50%', translateX: '-85%', translateY: '18%', 
      rotate: 0, zIndex: 7, width: 110, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-100%', translateY: '-40%', 
      rotate: 0, zIndex: 7, width: 150, height: 200 
    },
    priority: false
  },
  { 
    id: 7, 
    src: '/champ png/hell-god-3.png', 
    alt: 'Character 7',
    mobile: { 
      top: '0%', left: '50%', translateX: '-95%', translateY: '-5%', 
      rotate: 0, zIndex: 5, width: 180, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-110%', translateY: '-50%', 
      rotate: 0, zIndex: 5, width: 150, height: 200 
    },
    priority: false
  },
  { 
    id: 8, 
    src: '/champ png/japan-creep-2.png', 
    alt: 'Character 8',
    mobile: { 
      top: '0%', left: '50%', translateX: '-210%', translateY: '60%', 
      rotate: 0, zIndex: 8, width: 80, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-110%', translateY: '-50%', 
      rotate: 0, zIndex: 5, width: 150, height: 200 
    },
    priority: false
  },
  { 
    id: 9, 
    src: '/champ png/japan-creep-4.png', 
    alt: 'Character 9',
    mobile: { 
      top: '0%', left: '50%', translateX: '0%', translateY: '-30%', 
      rotate: 0, zIndex: 3, width: 100, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '20%', translateY: '-100%', 
      rotate: 0, zIndex: 3, width: 150, height: 200 
    },
    priority: false
  },
  { 
    id: 10, 
    src: '/champ png/viking-creep-4.png', 
    alt: 'Character 10',
    mobile: { 
      top: '0%', left: '50%', translateX: '-20%', translateY: '20%', 
      rotate: 0, zIndex: 6, flipX: true, width: 200, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-20%', translateY: '-35%', 
      rotate: 0, zIndex: 5, flipX: true, width: 250, height: 200 
    },
    priority: false
  },
  { 
    id: 11, 
    src: '/champ png/viking-creep-5.png', 
    alt: 'Character 11',
    mobile: { 
      top: '0%', left: '50%', translateX: '50%', translateY: '0%', 
      rotate: 0, zIndex: 8, flipX: true, width: 200, height: 150 
    },
    desktop: { 
      top: '0%', left: '50%', translateX: '50%', translateY: '-40%', 
      rotate: 0, zIndex: 6, flipX: true, width: 350, height: 200 
    },
    priority: false
  },
  { 
    id: 12, 
    src: '/champ png/viking-god-2.png', 
    alt: 'Character 12',
    mobile: { 
      top: '0%', left: '50%', translateX: '-170%', translateY: '30%', 
      rotate: 0, zIndex: 9, width: 180, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '-110%', translateY: '-50%', 
      rotate: 0, zIndex: 5, width: 200, height: 200 
    },
    priority: false
  },
  { 
    id: 13, 
    src: '/champ png/viking-god-3.png', 
    alt: 'Character 13',
    mobile: { 
      top: '0%', left: '50%', translateX: '40%', translateY: '5%', 
      rotate: 0, zIndex: 7, width: 120, height: 150 
    },
    desktop: { 
      top: '45%', left: '50%', translateX: '35%', translateY: '-40%', 
      rotate: 0, zIndex: 5, width: 150, height: 200 
    },
    priority: false
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
    setIsDesktop(window.innerWidth >= 768);
    
    // Debounced resize listener
    const handleResize = debouncedResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [debouncedResize]);

  return isDesktop;
}

// Title text - no longer split into words since we don't need animation
const titleText = "The Genesis of Atemu";
const introText = "Before the battles, before the realms, there was the spark: a legendary birth shrouded in celestial wonder and untold power, a tale waiting to be told...";

export default function IntroAtemu() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isDesktop = useScreenSize();
    
    // Track scroll progress with smoother options
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
    });
  
    // Create a smoothed version of scrollYProgress
    const smoothScrollYProgress = useSpring(scrollYProgress, { 
      damping: 15, 
      stiffness: 100 
    });

    // --- Character Images Animation ---
    // Simplified animation values for better performance
    const characterScale = useTransform(
      smoothScrollYProgress, 
      [0.1, 0.4], // Shorter animation range
      [2, 1]       // Less extreme scale change (2x instead of 3x)
    );
    
    const characterOpacity = useTransform(
      smoothScrollYProgress, 
      [0.1, 0.35], 
      [0, 1]
    );

    // Memoize the title component - now static without animation
    const titleComponent = useMemo(() => (
        <div className="text-[20px] text-center text-[#faf0fa] tracking-wide px-1 mt-30 -mb-15">
            {titleText}
        </div>
    ), []);
  
    const introComponent = useMemo(() => (
        <div className="font-fe text-[16px] text-left text-[#E8B77C] tracking-wide px-1 mt-20 mb-6 leading-5 ">
            {introText}
        </div>
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
          <motion.div 
              className="relative flex flex-nowrap justify-center items-center w-full max-w-full mt-10"
              style={{
                  opacity: characterOpacity,
              }}
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
                              scale: characterScale,
                              scaleX: styles.flipX ? -1 : 1,
                              transformOrigin: 'center',
                              willChange: 'transform, opacity',
                              // Add hardware acceleration
                              transform: 'translateZ(0)',
                          }}
                      >
                          <Image
                              width={styles.width}
                              height={styles.height}
                              src={char.src}
                              alt={char.alt}
                              loading={char.priority ? "eager" : "lazy"}
                              priority={char.priority}
                              style={{
                                  // Add hardware acceleration for images
                                  transform: 'translateZ(0)',
                              }}
                          />
                      </motion.div>
                  );
            })}
          </motion.div>
        );}, [isDesktop, characterOpacity, characterScale]);

    return (
        <section 
          ref={sectionRef} 
          className="w-full relative h-[1200px] overflow-hidden"
          style={{ 
              // Add hardware acceleration to the entire section
              transform: 'translateZ(0)',
              // Add will-change hint for the browser
              willChange: 'transform'
          }}
        >
          {/* Background Image Section */}
          <div className="absolute inset-0 flex justify-center bg-[url(/bg-1.avif)] w-full h-full bg-cover bg-center bg-no-repeat z-0">
            {/* Top inset shadow overlay */}
            <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-black to-transparent opacity-100"></div>
          </div>

          {/* Content Container - Positioned above background */}
          <div className="relative z-10 h-full flex flex-col items-center justify-start gap-20 pt-20 px-4">
            <div>
              {titleComponent}
            </div>
            <div className="w-full max-w-full flex flex-col">
                {introComponent}
                <Button size='small' className='self-center' variant='third'>
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