
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Make sure framer-motion is imported

// Define the card data
const nftCards = [
  { id: 1, src: "/nftcards/Abaddon.png", alt: "NFT Card 1" },
  { id: 2, src: "/nftcards/Achilles.png", alt: "NFT Card 2" },
  { id: 3, src: "/nftcards/Akhir.png", alt: "NFT Card 3" },
  { id: 4, src: "/nftcards/Amaterasu.png", alt: "NFT Card 4" },
  { id: 5, src: "/nftcards/Anmit.png", alt: "NFT Card 5" },
  { id: 6, src: "/nftcards/Apolo.png", alt: "NFT Card 6" },
  { id: 7, src: "/nftcards/Asmodeus.png", alt: "NFT Card 7" },
    { id: 8, src: "/nftcards/Athena.png", alt: "NFT Card 8" },
    { id: 9, src: "/nftcards/Barbatos.png", alt: "NFT Card 9" },
    { id: 10, src: "/nftcards/Bastet.png", alt: "NFT Card 10" },
    { id: 11, src: "/nftcards/Belial.png", alt: "NFT Card 11" },
    { id: 12, src: "/nftcards/Blodulf.png", alt: "NFT Card 12" },
    { id: 13, src: "/nftcards/Creep1.png", alt: "NFT Card 13" },
    { id: 14, src: "/nftcards/Creep2.png", alt: "NFT Card 14" },
    { id: 15, src: "/nftcards/Creep4.png", alt: "NFT Card 15" },
    { id: 16, src: "/nftcards/Creep5.png", alt: "NFT Card 16" },
    { id: 17, src: "/nftcards/Dantalion.png", alt: "NFT Card 17" },
    { id: 18, src: "/nftcards/Gremory.png", alt: "NFT Card 18" },
    { id: 19, src: "/nftcards/hellCreep2.png", alt: "NFT Card 19" },
    { id: 20, src: "/nftcards/hellCreep3.png", alt: "NFT Card 20" },
    { id: 21, src: "/nftcards/hellOG4.png", alt: "NFT Card 21" },
    { id: 22, src: "/nftcards/Hercules.png", alt: "NFT Card 22" },
    { id: 23, src: "/nftcards/Horus.png", alt: "NFT Card 23" },
    { id: 24, src: "/nftcards/Imhotep.png", alt: "NFT Card 24" },
    { id: 25, src: "/nftcards/Izanami.png", alt: "NFT Card 25" },
    { id: 26, src: "/nftcards/Jinn.png", alt: "NFT Card 26" },
    { id: 27, src: "/nftcards/Kasa Obake.png", alt: "NFT Card 27" },
    { id: 28, src: "/nftcards/Magni.png", alt: "NFT Card 28" },
    { id: 29, src: "/nftcards/Medusa.png", alt: "NFT Card 29" },
    { id: 30, src: "/nftcards/Minotaur.png", alt: "NFT Card 30" },
    { id: 31, src: "/nftcards/Mokumokuren.png", alt: "NFT Card 31" },
    { id: 32, src: "/nftcards/Nefru.png", alt: "NFT Card 32" },
    { id: 33, src: "/nftcards/Nephthys.png", alt: "NFT Card 33" },
    { id: 34, src: "/nftcards/Nidhogg.png", alt: "NFT Card 34" },
    { id: 35, src: "/nftcards/Nidrmal.png", alt: "NFT Card 35" },
    { id: 36, src: "/nftcards/Odin.png", alt: "NFT Card 36" },
    { id: 37, src: "/nftcards/Penthesilea.png", alt: "NFT Card 37" },
    { id: 38, src: "/nftcards/Phobosyn.png", alt: "NFT Card 38" },
    { id: 39, src: "/nftcards/Raijin.png", alt: "NFT Card 39" },
    { id: 40, src: "/nftcards/Sebek.png", alt: "NFT Card 40" },
    { id: 41, src: "/nftcards/shintoCreep3.png", alt: "NFT Card 41" },
    { id: 42, src: "/nftcards/shintoCreep5.png", alt: "NFT Card 42" },
    { id: 43, src: "/nftcards/Skog.png", alt: "NFT Card 43" },
    { id: 44, src: "/nftcards/Susanoo.png", alt: "NFT Card 44" },
    { id: 45, src: "/nftcards/Tengu.png", alt: "NFT Card 45" },
    { id: 46, src: "/nftcards/Tsukoyomi.png", alt: "NFT Card 46" },
    { id: 47, src: "/nftcards/Tyr.png", alt: "NFT Card 47" },
    { id: 48, src: "/nftcards/vikingCreep3.png", alt: "NFT Card 48" },
    { id: 49, src: "/nftcards/vikingCreep4.png", alt: "NFT Card 49" },
    { id: 50, src: "/nftcards/Zeus.png", alt: "NFT Card 50" },
    
];

// Fisher-Yates (Knuth) shuffle algorithm
// function shuffleArray<T>(array: T[]): T[] {
//   const newArray = [...array];
//   for (let i = newArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
//   }
//   return newArray;
// }

// Create two different shuffling strategies
function shuffleArrayForColumn1<T>(array: T[]): T[] {
  const newArray = [...array];
  // Fisher-Yates (Knuth) shuffle algorithm
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function shuffleArrayForColumn2<T>(array: T[]): T[] {
  const newArray = [...array];
  // Different shuffling strategy - reverse the array first, then shuffle
  // This ensures a different order than column 1
  newArray.reverse();
  
  // Then apply Fisher-Yates shuffle
  for (let i = newArray.length - 3; i > 0; i--) {
    // Use a different random seed pattern
    const j = Math.floor(Math.random() * i);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  
  return newArray;
}


// Define a type for our card data
type CardType = typeof nftCards[0];

export default function CardShow() {
    // Create refs for the scrolling containers
    const column1Ref = useRef<HTMLDivElement>(null);
    const column2Ref = useRef<HTMLDivElement>(null);

    // Create state for shuffled card arrays
    const [column1Cards, setColumn1Cards] = useState<typeof nftCards>([]);
    const [column2Cards, setColumn2Cards] = useState<typeof nftCards>([]);
    
    // State to track if animation is paused
    const [isPaused, setIsPaused] = useState(false);

    // State for the selected card to show in modal
    const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
    
    // Shuffle cards on component mount
    useEffect(() => {
        // Create two different random orders
        setColumn1Cards(shuffleArrayForColumn1(nftCards));
        setColumn2Cards(shuffleArrayForColumn2(nftCards));
    }, []);

    // Function to handle touch start - pause animation
    const handleTouchStart = () => {
        setIsPaused(true);
        if (column1Ref.current) {
        column1Ref.current.classList.add('animation-paused');
        }
        if (column2Ref.current) {
        column2Ref.current.classList.add('animation-paused');
        }
    };

    // Function to handle touch end - resume animation
    const handleTouchEnd = () => {
        // Add a small delay before resuming animation to allow for tapping
        setTimeout(() => {
        setIsPaused(false);
        if (column1Ref.current) {
            column1Ref.current.classList.remove('animation-paused');
        }
        if (column2Ref.current) {
            column2Ref.current.classList.remove('animation-paused');
        }
        }, 0); // 1.5 second delay to give time to view the card
    };
    
    // Function to ensure exact duplication for seamless looping
    const createSeamlessArray = (cards: typeof nftCards) => {
    // Calculate how many cards we need to fill the container
    // We'll use a fixed number that's enough to fill the container
    const minCardsNeeded = 15; // Adjust based on your card height and container height
    
    // If we have fewer cards than needed, duplicate the array multiple times
    let result = [...cards];
    while (result.length < minCardsNeeded) {
        result = [...result, ...cards];
    }
    
    // Return the exact same array twice for perfect looping
    return [...result, ...result];
    };

    // Function to handle card click/hover
    const handleCardSelect = (card: CardType) => {
        setSelectedCard(card);
        // Pause animations when a card is selected
        handleTouchStart();
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedCard(null);
        // Resume animations when modal is closed
        handleTouchEnd();
    };

  return (
    <section className="relative h-[900px] w-full overflow-hidden">
        {/* Background with inset shadow */}
        <div className="absolute w-full h-[300px]">
            {/* Main background image */}
            <div className="absolute inset-0 bg-[url(/NFT-banner.png)] w-full h-full bg-cover bg-center bg-no-repeat">
            </div>
            
            {/* Top inset shadow overlay */}
            <div className="absolute inset-x-0 top-0 h-[70px] bg-gradient-to-b from-black to-transparent opacity-100"></div>
            
            {/* Bottom inset shadow overlay */}
            <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-black to-transparent opacity-100"></div>
        </div>

        <div className="relative flex flex-col justify-center items-center w-full h-[400px] gap-3">
            <p className="text-[20px] text-center">Experience next-gen card gaming</p>
            <p className="text-[15px] text-center font-fe">BUILD YOUR ULTIMATE NFT DECK</p>
            <Button>
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
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div 
                        ref={column1Ref}
                        className="flex flex-col animate-scrollTopToBottom"
                        style={{
                            height: "max-content", // Allow container to expand based on content
                            willChange: 'transform',
                        }}
                    >
                    {/* Use shuffled cards for column 1 */}
                    {column1Cards.length > 0 ? (
                        createSeamlessArray(column1Cards).map((card, index) => (
                        <div 
                            key={`col1-${card.id}-${index}`} 
                            className="mx-auto my-2 transform transition-transform duration-300 cursor-pointer"
                            onClick={() => handleCardSelect(card)}
                        >
                        <Image 
                            src={card.src} 
                            alt={card.alt}
                            width={180}
                            height={250}
                            className="rounded-lg shadow-lg"
                            loading={index < 10 ? "eager" : "lazy"}
                        />
                        </div>
                        ))
                    ) : (
                        // Loading placeholder or fallback
                        <div className="flex justify-center items-center h-full w-[180px]">
                        <p>Loading cards...</p>
                        </div>
                    )}
                    </div>
                </div>
                
                {/* Second column - Bottom to Top */}
                <div 
                    className="relative h-full overflow-hidden w-[200px]"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div 
                        ref={column2Ref}
                        className="flex flex-col animate-scrollBottomToTop"
                        style={{
                            height: "max-content", // Allow container to expand based on content
                            willChange: 'transform',
                        }}
                    >
                    {/* Use shuffled cards for column 2 */}
                    {column2Cards.length > 0 ? (
                        createSeamlessArray(column2Cards).map((card, index) => (
                        <div 
                            key={`col2-${card.id}-${index}`} 
                            className="mx-auto my-2 transform transition-transform duration-300 cursor-pointer"
                            onClick={() => handleCardSelect(card)}
                        >
                            <Image 
                                src={card.src} 
                                alt={card.alt}
                                width={180}
                                height={250}
                                className="rounded-lg shadow-lg"
                                loading={index < 10 ? "eager" : "lazy"} // Load first few images eagerly
                            />
                        </div>
                        ))
                    ) : (
                        // Loading placeholder or fallback
                        <div className="flex justify-center items-center h-full w-[180px]">
                        <p>Loading cards...</p>
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
                                priority
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </section>
  );
}