'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useVirtualizer } from "@tanstack/react-virtual";

// Define the card data
const nftCards = [
  { id: 1, src: "/nftcards/Abaddon.webp", alt: "NFT Card 1" },
  { id: 2, src: "/nftcards/Achilles.webp", alt: "NFT Card 2" },
  { id: 3, src: "/nftcards/Akhir.webp", alt: "NFT Card 3" },
  { id: 4, src: "/nftcards/Amaterasu.webp", alt: "NFT Card 4" },
  { id: 5, src: "/nftcards/Anmit.webp", alt: "NFT Card 5" },
  { id: 6, src: "/nftcards/Apolo.webp", alt: "NFT Card 6" },
  { id: 7, src: "/nftcards/Asmodeus.webp", alt: "NFT Card 7" },
  { id: 8, src: "/nftcards/Athena.webp", alt: "NFT Card 8" },
  { id: 9, src: "/nftcards/Barbatos.webp", alt: "NFT Card 9" },
  { id: 10, src: "/nftcards/Bastet.webp", alt: "NFT Card 10" },
  { id: 11, src: "/nftcards/Belial.webp", alt: "NFT Card 11" },
  { id: 12, src: "/nftcards/Blodulf.webp", alt: "NFT Card 12" },
  { id: 13, src: "/nftcards/Creep1.webp", alt: "NFT Card 13" },
  { id: 14, src: "/nftcards/Creep2.webp", alt: "NFT Card 14" },
  { id: 15, src: "/nftcards/Creep4.webp", alt: "NFT Card 15" },
  { id: 16, src: "/nftcards/Creep5.webp", alt: "NFT Card 16" },
  { id: 17, src: "/nftcards/Dantalion.webp", alt: "NFT Card 17" },
  { id: 18, src: "/nftcards/Gremory.webp", alt: "NFT Card 18" },
  { id: 19, src: "/nftcards/hellCreep2.webp", alt: "NFT Card 19" },
  { id: 20, src: "/nftcards/hellCreep3.webp", alt: "NFT Card 20" },
  { id: 21, src: "/nftcards/hellOG4.webp", alt: "NFT Card 21" },
  { id: 22, src: "/nftcards/Hercules.webp", alt: "NFT Card 22" },
  { id: 23, src: "/nftcards/Horus.webp", alt: "NFT Card 23" },
  { id: 24, src: "/nftcards/Imhotep.webp", alt: "NFT Card 24" },
  { id: 25, src: "/nftcards/Izanami.webp", alt: "NFT Card 25" },
  { id: 26, src: "/nftcards/Jinn.webp", alt: "NFT Card 26" },
  { id: 27, src: "/nftcards/Kasa Obake.webp", alt: "NFT Card 27" },
  { id: 28, src: "/nftcards/Magni.webp", alt: "NFT Card 28" },
  { id: 29, src: "/nftcards/Medusa.webp", alt: "NFT Card 29" },
  { id: 30, src: "/nftcards/Minotaur.webp", alt: "NFT Card 30" },
  { id: 31, src: "/nftcards/Mokumokuren.webp", alt: "NFT Card 31" },
  { id: 32, src: "/nftcards/Nefru.webp", alt: "NFT Card 32" },
  { id: 33, src: "/nftcards/Nephthys.webp", alt: "NFT Card 33" },
  { id: 34, src: "/nftcards/Nidhogg.webp", alt: "NFT Card 34" },
  { id: 35, src: "/nftcards/Nidrmal.webp", alt: "NFT Card 35" },
  { id: 36, src: "/nftcards/Odin.webp", alt: "NFT Card 36" },
  { id: 37, src: "/nftcards/Penthesilea.webp", alt: "NFT Card 37" },
  { id: 38, src: "/nftcards/Phobosyn.webp", alt: "NFT Card 38" },
  { id: 39, src: "/nftcards/Raijin.webp", alt: "NFT Card 39" },
  { id: 40, src: "/nftcards/Sebek.webp", alt: "NFT Card 40" },
  { id: 41, src: "/nftcards/shintoCreep3.webp", alt: "NFT Card 41" },
  { id: 42, src: "/nftcards/shintoCreep5.webp", alt: "NFT Card 42" },
  { id: 43, src: "/nftcards/Skog.webp", alt: "NFT Card 43" },
  { id: 44, src: "/nftcards/Susanoo.webp", alt: "NFT Card 44" },
  { id: 45, src: "/nftcards/Tengu.webp", alt: "NFT Card 45" },
  { id: 46, src: "/nftcards/Tsukoyomi.webp", alt: "NFT Card 46" },
  { id: 47, src: "/nftcards/Tyr.webp", alt: "NFT Card 47" },
  { id: 48, src: "/nftcards/vikingCreep3.webp", alt: "NFT Card 48" },
  { id: 49, src: "/nftcards/vikingCreep4.webp", alt: "NFT Card 49" },
  { id: 50, src: "/nftcards/Zeus.webp", alt: "NFT Card 50" },
];


// Optimized shuffling functions
function shuffleArrayForColumn1<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function shuffleArrayForColumn2<T>(array: T[]): T[] {
  const newArray = [...array];
  newArray.reverse();
  for (let i = newArray.length - 3; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Define a type for our card data
type CardType = typeof nftCards[0];

export default function CardShow() {
  // Refs for scrolling containers
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);

  // Animation frame refs
  const animationFrameRef1 = useRef<number | null>(null);
  const animationFrameRef2 = useRef<number | null>(null);

  // Scroll position refs (không cần state)
  const scrollPos1Ref = useRef(0);
  const scrollPos2Ref = useRef(0);

  // State for shuffled card arrays
  const [column1Cards, setColumn1Cards] = useState<typeof nftCards>([]);
  const [column2Cards, setColumn2Cards] = useState<typeof nftCards>([]);

  // State to track if animation is paused
  const [isPaused, setIsPaused] = useState(false);

  // State for the selected card to show in modal
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  // Create virtual lists
  const CARD_HEIGHT = 300; // Height of each card + margins
  const OVERSCAN = 5;     // Number of additional items to render

  // Create duplicate arrays for seamless scrolling - memoized
  const createSeamlessArray = useCallback((cards: typeof nftCards) => {
    // Calculate how many cards we need to fill the container
    const minCardsNeeded = 15; // Adjust based on your card height and container height
    let result = [...cards];
    while (result.length < minCardsNeeded) {
      result = [...result, ...cards];
    }
    return [...result, ...result];
  }, []);

  // Memoize seamless arrays to avoid recreating them on every render
  const seamlessColumn1Cards = useMemo(() =>
    column1Cards.length > 0 ? createSeamlessArray(column1Cards) : [],
    [column1Cards, createSeamlessArray]
  );

  const seamlessColumn2Cards = useMemo(() =>
    column2Cards.length > 0 ? createSeamlessArray(column2Cards) : [],
    [column2Cards, createSeamlessArray]
  );

  // Create virtualized lists with memoized seamless arrays
  const column1Virtualizer = useVirtualizer({
    count: seamlessColumn1Cards.length,
    getScrollElement: () => column1Ref.current,
    estimateSize: () => CARD_HEIGHT,
    overscan: OVERSCAN,
  });

  const column2Virtualizer = useVirtualizer({
    count: seamlessColumn2Cards.length,
    getScrollElement: () => column2Ref.current,
    estimateSize: () => CARD_HEIGHT,
    overscan: OVERSCAN,
  });

  // Initialize card arrays
  useEffect(() => {
    // Create two different random orders
    setColumn1Cards(shuffleArrayForColumn1(nftCards));
    setColumn2Cards(shuffleArrayForColumn2(nftCards));
  }, []);

  // Optimized animation handlers using refs instead of state
  const animateColumn1 = useCallback(() => {
    if (isPaused || !column1Ref.current) return;

    // Increment position for scrolling animation using ref
    const totalHeight = column1Cards.length * CARD_HEIGHT;
    scrollPos1Ref.current = (scrollPos1Ref.current + 0.15) % totalHeight;

    // Apply scroll position directly
    if (column1Ref.current) {
      column1Ref.current.scrollTop = scrollPos1Ref.current;
    }

    animationFrameRef1.current = requestAnimationFrame(animateColumn1);
  }, [isPaused, column1Cards.length]);

  const animateColumn2 = useCallback(() => {
    if (isPaused || !column2Ref.current) return;

    // Increment position for reverse scrolling animation using ref
    const totalHeight = column2Cards.length * CARD_HEIGHT;
    scrollPos2Ref.current = (scrollPos2Ref.current + 0.15) % totalHeight;

    // Apply scroll position (reversed direction)
    if (column2Ref.current) {
      column2Ref.current.scrollTop = totalHeight - scrollPos2Ref.current;
    }

    animationFrameRef2.current = requestAnimationFrame(animateColumn2);
  }, [isPaused, column2Cards.length]);

  // Start animations
  useEffect(() => {
    if (column1Cards.length > 0 && column2Cards.length > 0) {
      animationFrameRef1.current = requestAnimationFrame(animateColumn1);
      animationFrameRef2.current = requestAnimationFrame(animateColumn2);
    }

    return () => {
      if (animationFrameRef1.current) cancelAnimationFrame(animationFrameRef1.current);
      if (animationFrameRef2.current) cancelAnimationFrame(animationFrameRef2.current);
    };
  }, [column1Cards, column2Cards, animateColumn1, animateColumn2]);

  // Function to handle touch start - pause animation
  const handleTouchStart = useCallback(() => {
    setIsPaused(true);
  }, []);

  // Function to handle touch end - resume animation
  const handleTouchEnd = useCallback(() => {
    // Add a small delay before resuming animation to allow for tapping
    setTimeout(() => {
      setIsPaused(false);
    }, 0);
  }, []);

  // Function to handle card click/hover
  const handleCardSelect = useCallback((card: CardType) => {
    setSelectedCard(card);
    // Pause animations when a card is selected
    setIsPaused(true);
  }, []);

  // Function to close the modal
  const handleCloseModal = useCallback(() => {
    setSelectedCard(null);
    // Resume animations when modal is closed
    setTimeout(() => {
      setIsPaused(false);
    }, 0);
  }, []);

  // Get card data for virtualized rendering - optimized to use memoized arrays
  const getCardData = useCallback((index: number, seamlessArray: typeof nftCards) => {
    return seamlessArray[index % seamlessArray.length];
  }, []);

  return (
    <section className="relative h-[900px] w-full overflow-hidden">
      {/* Background with inset shadow */}
      <div className="absolute w-full h-[300px]">
        {/* Main background image */}
        <div className="absolute inset-0 bg-[url(/NFT-banner.avif)] w-full h-full bg-cover bg-center bg-no-repeat"></div>

        {/* Top inset shadow overlay */}
        <div className="absolute inset-x-0 top-0 h-[70px] bg-gradient-to-b from-black to-transparent opacity-100"></div>

        {/* Bottom inset shadow overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-black to-transparent opacity-100"></div>
      </div>

      <div className="relative flex flex-col justify-center items-center w-full h-[400px] gap-3">
        <p className="text-[25px] text-center tracking-wide mt-19 text-[#E8B77C] font-deswash">EXPERIENCE NEXT-GEN CARD GAMING</p>
        <p className="text-[16px] text-center font-fe tracking-wide">Build, trade, and battle with your NFT deck</p>
        <Button variant="third" size="small">
          EXPLORE
        </Button>
      </div>

      {/* NFT Cards Scrolling Columns */}
      <div className="relative w-full bg-[#000] flex justify-center">
        {/* Two columns side by side */}
        <div className="relative flex h-[400px] overflow-hidden">
          {/* Top blur edge */}
          <div className="absolute top-0 left-0 right-0 h-[25px] bg-gradient-to-b from-[#000] to-transparent z-10 backdrop-blur-xs"></div>

          {/* Bottom blur edge */}
          <div className="absolute bottom-0 left-0 right-0 h-[25px] bg-gradient-to-t from-[#000] to-transparent z-10 backdrop-blur-xs"></div>

          {/* First column - Top to Bottom */}
          <div
            className="relative h-full overflow-hidden w-[200px]"
            onMouseEnter={handleTouchStart}
            onMouseLeave={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={column1Ref}
              className="h-full overflow-auto"
              style={{
                willChange: 'transform',
                overscrollBehavior: 'none',
              }}
            >
              {seamlessColumn1Cards.length > 0 ? (
                <div
                  style={{
                    height: `${column1Virtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  {column1Virtualizer.getVirtualItems().map((virtualItem) => {
                    const card = getCardData(virtualItem.index, seamlessColumn1Cards);
                    return (
                      <div
                        key={`col1-${card.id}-${virtualItem.index}`}
                        className="mx-auto my-5 transform transition-transform duration-300 cursor-pointer absolute top-0 left-0 right-0"
                        style={{
                          height: `${virtualItem.size}px`,
                          transform: `translateY(${virtualItem.start}px)`,
                        }}
                        onClick={() => handleCardSelect(card)}
                      >
                        <Image
                          src={card.src}
                          alt={card.alt}
                          width={180}
                          height={250}
                          loading="lazy"
                          decoding="async"
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex justify-center items-center h-full w-[180px]">
                  <p>Loading cards...</p>
                </div>
              )}
            </div>
          </div>

          {/* Second column - Bottom to Top */}
          <div
            className="relative h-full overflow-hidden w-[200px]"
            onMouseEnter={handleTouchStart}
            onMouseLeave={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={column2Ref}
              className="h-full overflow-auto"
              style={{
                willChange: 'transform',
                overscrollBehavior: 'none',
              }}
            >
              {seamlessColumn2Cards.length > 0 ? (
                <div
                  style={{
                    height: `${column2Virtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  {column2Virtualizer.getVirtualItems().map((virtualItem) => {
                    const card = getCardData(virtualItem.index, seamlessColumn2Cards);
                    return (
                      <div
                        key={`col2-${card.id}-${virtualItem.index}`}
                        className="mx-auto my-5 transform transition-transform duration-300 cursor-pointer absolute top-0 left-0 right-0"
                        style={{
                          height: `${virtualItem.size}px`,
                          transform: `translateY(${virtualItem.start}px)`,
                        }}
                        onClick={() => handleCardSelect(card)}
                      >
                        <Image
                          src={card.src}
                          alt={card.alt}
                          width={180}
                          height={250}
                          loading="lazy"
                          decoding="async"
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex justify-center items-center h-full w-[180px]">
                  <p className="font-incon">Loading cards...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for displaying selected card */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Blurred backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />

            {/* Card container */}
            <motion.div
              className="relative z-10 max-w-md w-full mx-4"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close button */}
              <button
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 text-white text-3xl z-20"
                onClick={handleCloseModal}
                aria-label="Close card view"
              >
                &times;
              </button>

              {/* Card image */}
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={selectedCard.src}
                  alt={selectedCard.alt}
                  fill
                  className="object-contain rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}