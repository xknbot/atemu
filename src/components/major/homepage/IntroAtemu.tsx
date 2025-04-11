'use client'

import React, { useRef, useEffect, useState } from 'react';
import Image from "next/image";
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';

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
}

// Define the character image data

// Define the character image data with both mobile and desktop positions
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
];

// Custom hook to detect screen size
function useScreenSize() {
  // Default to mobile layout
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Function to check if screen is desktop size
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // 768px is standard md breakpoint in Tailwind
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isDesktop;
}


export default function IntroAtemu() {
    const sectionRef = useRef<HTMLDivElement>(null);
    // Create animation controls for the title
    const titleControls = useAnimation();
    const isDesktop = useScreenSize();

    // Track scroll progress relative to the section
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"]
    });

    // --- Text Animation ---
    // Define a threshold for when to trigger the text animation
    const textAnimationTrigger = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

    // --- Character Images Animation ---
    const characterScale = useTransform(scrollYProgress, [0.1, 0.45], [3, 1]);
    const characterOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

    // Use effect to start the title animation when scrolled to the right position
    useEffect(() => {
        const unsubscribe = textAnimationTrigger.onChange(value => {
            // When the scroll progress reaches the threshold (value >= 1), start the animation
            if (value >= 0.7) {
                titleControls.start("visible");
            } else {
                // Optional: reset animation when scrolling back up
                titleControls.start("hidden");
            }
        });
        
        // Cleanup subscription
        return () => unsubscribe();
    }, [textAnimationTrigger, titleControls]);

    // Split the title into words for word-by-word animation
    const titleWords = "The Genesis of Atemu".split(" ");

    // Animation variants for the container and words
    const titleContainer = {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.3, delayChildren: 0.3 * i }
      })
    };

    const titleWord = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5
        }
      }
    };

    return (
        <div ref={sectionRef} className="w-full relative h-[938px] overflow-hidden">
            {/* Background Image Section */}
            <section className="absolute inset-0 flex justify-center bg-[url(/bg-1.png)] w-full h-full bg-cover bg-center bg-no-repeat z-0">
            </section>

            {/* Content Container - Positioned above background */}
            <div className="relative z-10 h-full flex flex-col items-center justify-start pt-20 px-4">

                {/* Animated Text - Word by word */}
                <motion.div 
                    className="text-[30px] text-center text-[#E8B77C] px-1 mt-30 -mb-15 md:text-[36px] md:mb-20 flex flex-wrap justify-center gap-2"
                    variants={titleContainer}
                    initial="hidden"
                    animate={titleControls} // Use animation controls instead of "visible"
                >
                    {titleWords.map((word, index) => (
                        <motion.span
                            key={index}
                            variants={titleWord}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Animated Character Images Container */}
                <motion.div className="relative flex flex-nowrap justify-center items-center mt-60 w-full max-w-4xl md:gap-8"
                    style={{
                        opacity: characterOpacity,
                    }}>
                    {characterImages.map((char) => {
                        const styles = isDesktop ? char.desktop : char.mobile;

                        return (
                            <motion.div key={char.id} className="absolute flex-shrink-0"
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
                                }}>
                                <Image
                                    width={styles.width}
                                    height={styles.height}
                                    src={char.src}
                                    alt={char.alt}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div> 
    );
}