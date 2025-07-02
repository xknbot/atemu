import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";

// Define the card data
const gameplayCards = [
  {
    id: 1,
    title: "OUTSMART YOUR RIVALS AND WIN",
    description:
      "The goal is simple: outmaneuver your opponents and leave them with nothing. Every decision counts as you deploy your cards, anticipate their moves, and relentlessly work to deplete their hand. Only the sharpest minds and most cunning tacticians will prevail in this thrilling race to zero!",
    image: "/JinnCovenant.png", // Replace with your actual image path
    buttonText: "READY TO WIN?", // Thêm nội dung button cho card 1
  },
  {
    id: 2,
    title: "SOLO, TEAM, ADVENTURE",
    description:
      "Mastering three epic modes: Unleash intricate scenarios and uncovering hidden lore with Adventurer. Sharpen your tactical mind in Solo Play against cunning AI. Step into the Multiplay arena to forge alliances or challenge rivals in thrilling contests of wit and skill. Start now!",
    image: "/J5.png", // Replace with your actual image path
    buttonText: "MASTER THE GAME", // Thêm nội dung button cho card 3
  },
  {
    id: 3,
    title: "PLAY SMART. EARN. REPEAT",
    description:
      "Stake your $STRK, pay a little fee. Play with skill, conquer your enemies, triumph in this battle of minds. Claim the total locked bounty, fuel your growing fortune. Unlock more ways to earn on Atemu.",
    image: "/CardsMockup.png", // Replace with your actual image path
    buttonText: "START EARNING NOW", // Thêm nội dung button cho card 2
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
    setActiveIndex(
      (current) => (current - 1 + gameplayCards.length) % gameplayCards.length,
    );
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

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
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
    <motion.section
      className="bg-[#131417] w-full relative overflow-hidden mt-40"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Thêm ảnh nền với mix-blend-mode */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/marble_bg.webp" // Thay đổi đường dẫn ảnh theo nhu cầu của bạn
          alt="Background texture"
          fill
          className="object-cover opacity-9 mix-blend-overlay"
          priority
        />
      </div>

      <p className="text-[25px] text-center bg-gradient-to-r from-[#E8B77C] to-[#E9312B] text-transparent bg-clip-text tracking-wide py-20 font-deswash">
        CONQUER THE REALMS
      </p>
      <div className="mx-auto flex justify-center items-center py-2">
        <svg
          width="400"
          height="10"
          viewBox="0 0 100 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Đường ngang bên trái */}
          <line
            x1="-200"
            y1="5"
            x2="20"
            y2="5"
            stroke="#E8B77C"
            strokeWidth="1"
          />

          {/* Hình tứ giác ở giữa */}
          <polygon
            points="50,8 53,5 50,2 47,5"
            fill="#E8B77C"
            stroke="#E8B77C"
            strokeWidth="3"
          />

          {/* Đường ngang bên phải */}
          <line
            x1="78"
            y1="5"
            x2="300"
            y2="5"
            stroke="#E8B77C"
            strokeWidth="1"
          />
        </svg>
      </div>
      <motion.p
        className="font-fe text-[16px] text-center text-[#faf0fa] tracking-wide leading-[20px] px-10 py-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Enter the universe of Monsters, Spell and Trap cards; accelerate
        strategic thinking, flexibility tactics and win the match against your
        opponents.
      </motion.p>
      <div className="mx-auto w-[3%] h-[1px] bg-[#E8b77c] "></div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-full mx-auto py-20 overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#E8B77C]/3 hover:bg-[#E8B77C]/40 rounded-full p-5 transition-colors"
          aria-label="Previous card"
        >
          <Image src={"/arrow-left.png"} width={42} height={42} alt="arrowleft" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#E8B77C]/3 hover:bg-[#E8B77C]/40 rounded-full p-5 transition-colors"
          aria-label="Next card"
        >
          <Image src={"/arrow-right.png"} width={42} height={42} alt="arrowright" />
        </button>

        {/* Cards Container */}
        <div className="flex justify-center items-center h-[520px] px-4">
          <AnimatePresence mode="wait">
            {gameplayCards.map((card, index) => {
              // Calculate position: -1 = left, 0 = center, 1 = right
              const position =
                (index - activeIndex + gameplayCards.length) %
                gameplayCards.length;
              const normalizedPosition =
                position > 1 ? position - gameplayCards.length : position;

              return (
                <motion.div
                  key={card.id}
                  className={`absolute h-[520px] w-[310px] rounded-xs border border-[#E8B77C] overflow-x-hidden drop-shadow-xl
                                              ${normalizedPosition === 0 ? "z-20" : "z-10"}
                                              cursor-grab active:cursor-grabbing`}
                  initial={{
                    x: normalizedPosition * 330,
                    scale: normalizedPosition === 0 ? 1 : 0.85,
                    opacity: normalizedPosition === 0 ? 1 : 0.7,
                  }}
                  animate={{
                    x: normalizedPosition * 330,
                    scale: normalizedPosition === 0 ? 1 : 0.85,
                    opacity: normalizedPosition === 0 ? 1 : 0.7,
                  }}
                  transition={{
                    duration: isDragging ? 0 : 0.5,
                    ease: "easeInOut",
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
                        draggable={false} // Prevent image dragging
                      />
                    </div>

                    {/* Card Text */}
                    <div className="p-3 flex flex-col justify-center items-center text-center h-1/2">
                      <h3 className="text-[#E8B77C] text-[18px] font-deswash mb-2 tracking-tight">
                        {card.title}
                      </h3>
                      <p className="text-[15px] text-[#FAF0FA] font-fe tracking-wide leading-[18px]">
                        {card.description}
                      </p>
                    </div>

                    <Button
                      variant="third"
                      size="large"
                      className="!rounded-none h-[30%]"
                    >
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
                index === activeIndex
                  ? "bg-[#E8B77C]"
                  : "border border-[#E8B77C] hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Gameplay;
