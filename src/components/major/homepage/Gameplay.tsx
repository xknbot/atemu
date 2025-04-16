
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';


// Define the card data
const gameplayCards = [
  {
    id: 1,
    title: "OUTSMART RIVALS TO EMPTY THEIR DECK FIRST",
    description: "The goal is simple: outmaneuver your opponents and leave them with nothing. Every decision counts as you deploy your cards, anticipate their moves, and relentlessly work to deplete their hand. Only the sharpest minds and most cunning tacticians will prevail in this thrilling race to zero!",
        image: "/JinnCovenant.png", // Replace with your actual image path
    buttonText: "READY TO WIN?" // Thêm nội dung button cho card 1
  },
  {
    id: 2,
    title: "SOLO, TEAM, ADVENTURE",
    description: "Mastering three epic modes: Unleash intricate scenarios and uncovering hidden lore with Adventurer. Sharpen your tactical mind in Solo Play against cunning AI. Step into the Multiplay arena to forge alliances or challenge rivals in thrilling contests of wit and skill. Start now!",
    image: "/J5.png", // Replace with your actual image path
    buttonText: "MASTER THE GAME" // Thêm nội dung button cho card 3
    },
  {
    id: 3,
    title: "PLAY SMART. EARN. REPEAT",
    description: "Stake your $STRK, pay a little fee. Play with skill, conquer your enemies, triumph in this battle of minds. Claim the total locked bounty, fuel your growing fortune. Unlock more ways to earn on Atemu.",
      image: "/CardsMockup.png", // Replace with your actual image path
    buttonText: "START EARNING NOW" // Thêm nội dung button cho card 2
  },
];

const Gameplay: React.FC = () => {

    // State to track the active card index
    const [activeIndex, setActiveIndex] = useState(0);
    // State to control auto-rotation
    const [autoPlay, setAutoPlay] = useState(true);

    // State to track if we're currently dragging
    const [isDragging, setIsDragging] = useState(false);

    // Auto-rotate cards every 5 seconds
    useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoPlay) {
        interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % gameplayCards.length);
        }, 5000);
    }
    
    return () => clearInterval(interval);
    }, [autoPlay]);

    // Handle manual navigation
    const handleNext = () => {
        setAutoPlay(false); // Pause auto-rotation when user interacts
        setActiveIndex((current) => (current + 1) % gameplayCards.length);
    };

    const handlePrev = () => {
        setAutoPlay(false); // Pause auto-rotation when user interacts
        setActiveIndex((current) => (current - 1 + gameplayCards.length) % gameplayCards.length);
    };

    // Resume auto-play after user inactivity
    useEffect(() => {
        if (!autoPlay) {
            const timeout = setTimeout(() => {
                setAutoPlay(true);
            }, 2000); // Resume auto-play after 10 seconds of inactivity
            
            return () => clearTimeout(timeout);
        }
    }, [autoPlay, activeIndex]);

    // Handle drag gestures
    const handleDragStart = () => {
        setIsDragging(true);
        setAutoPlay(false); // Pause auto-rotation when user starts dragging
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setIsDragging(false);
        
        // Determine swipe direction based on velocity and offset
        const swipeThreshold = 50; // Minimum distance to trigger a swipe
        
        if (info.offset.x < -swipeThreshold) {
            // Swiped left - go to next card
            handleNext();
        } else if (info.offset.x > swipeThreshold) {
            // Swiped right - go to previous card
            handlePrev();
        }
        

    };

    return (
        <section className='bg-[#444656] w-full max-w-full'>
            <p className="text-[20px] text-center text-[#faf0fa] tracking-wide py-20">Conquer the realms</p>
            <div className='mx-auto w-[15%] h-[1px] bg-[#E8b77c] '></div>
            <p className="font-fe text-[16px] text-center text-[#E8B77C] tracking-wide leading-[20px] px-10 py-10">Enter the universe of Monsters, Spell and Trap cards; accelerate strategic thinking, flexibility tactics
                and win the match against your opponents.</p>
            <div className='mx-auto w-[15%] h-[1px] bg-[#E8b77c] '></div>
            
            
            {/* Carousel Container */}
            <div className="relative w-full max-w-full mx-auto py-20 overflow-hidden">
                {/* Navigation Arrows */}
                <button 
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#E8B77C]/20 hover:bg-[#E8B77C]/40 rounded-full p-3 transition-colors"
                    aria-label="Previous card"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                
                <button 
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#E8B77C]/20 hover:bg-[#E8B77C]/40 rounded-full p-3 transition-colors"
                    aria-label="Next card"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
                
                {/* Cards Container */}
                <div className="flex justify-center items-center h-[520px] px-4">
                    <AnimatePresence mode="wait">
                        {gameplayCards.map((card, index) => {
                            // Calculate position: -1 = left, 0 = center, 1 = right
                            const position = ((index - activeIndex) + gameplayCards.length) % gameplayCards.length;
                            const normalizedPosition = position > 1 ? position - gameplayCards.length : position;
                            
                            return (
                                <motion.div
                                    key={card.id}
                                    className={`absolute h-[520px] w-[310px] rounded-xs border border-[#E8B77C] overflow-x-hidden drop-shadow-xl
                                              ${normalizedPosition === 0 ? 'z-20' : 'z-10'}
                                              cursor-grab active:cursor-grabbing`}
                                    initial={{ 
                                        x: normalizedPosition * 330, 
                                        scale: normalizedPosition === 0 ? 1 : 0.85,
                                        opacity: normalizedPosition === 0 ? 1 : 0.7
                                    }}
                                    animate={{ 
                                        x: normalizedPosition * 330, 
                                        scale: normalizedPosition === 0 ? 1 : 0.85,
                                        opacity: normalizedPosition === 0 ? 1 : 0.7
                                    }}
                                    transition={{ 
                                        duration: isDragging ? 0 : 0.5, 
                                        ease: "easeInOut" 
                                    }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.1}
                                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                    whileTap={{ cursor: "grabbing" }}
                                >
                                    {/* Card Content */}
                                    <div className="relative h-full w-full bg-linear-to-t from-[#131417] from-20% to-[#444656] to-60% flex flex-col">
                                        {/* Card Image */}
                                        <div className="relative h-3/4 w-full">
                                            <Image
                                                src={card.image}
                                                alt={card.title}
                                                fill
                                                className="object-cover"
                                                priority={normalizedPosition === 0}
                                                draggable={false} // Prevent image dragging
                                            />
                                        </div>
                                        
                                        {/* Card Text */}
                                        <div className="p-4 flex flex-col justify-center items-center text-center h-1/2">
                                            <h3 className="text-[#E8B77C] text-[18px] font-deswash mb-2 tracking-tight">{card.title}</h3>
                                            <p className="text-[15px] text-[#FAF0FA] font-fe tracking-wide leading-[18px]">{card.description}</p>
                                        </div>

                                        <Button className='!rounded-none'>
                                            {card.buttonText}
                                        </Button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
                
                {/* Indicator Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {gameplayCards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setAutoPlay(false);
                                setActiveIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                index === activeIndex ? 'bg-[#E8B77C]' : 'border border-[#E8B77C] hover:bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gameplay;