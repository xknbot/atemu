'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react';
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence} from 'framer-motion';
import Button from '@/components/ui/Button';

export default function IntroCollection() {
  // 1. Create a ref for the section element
  const sectionRef = useRef<HTMLDivElement>(null);

  // 2. Track scroll progress relative to the sectionRef element
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Thêm hook để kiểm tra kích thước màn hình
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Thêm useEffect để kiểm tra cả hai kích thước màn hình
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Kiểm tra ban đầu
    checkScreenSize();
    
    // Thêm event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // All transform hooks must be at the top level

  // --- Image Animation ---
  const imageScrollEnd = 0.3;

  // --- Glow Animation ---
  const glowScrollStart = imageScrollEnd;
  const glowScrollEnd = glowScrollStart + 0.1;

  // 1. Glow Opacity: Fade in from 0 to 1 during the defined range *after* image animates
  const glowOpacity = useTransform(
    scrollYProgress,
    [glowScrollStart, glowScrollEnd],
    [0, 0.5],
    { clamp: true }
  );


  // Fix hydration mismatch by using client-side only rendering for the rotating cards
  const [isMounted, setIsMounted] = useState(false);
  const [animationReady, setAnimationReady] = useState(false);
  
  // Preload images để tránh lag khi hiển thị
  useEffect(() => {
    // Preload tất cả hình ảnh
    const cardImages = [
      '/Caster.webp',
      '/Dragon.webp',
      '/Hell Born.webp',
      '/Legend.webp',
      '/Warrior.webp',
      '/backcard.avif'
    ];
    
    const preloadImages = cardImages.map(src => {
      const img = new window.Image();
      img.src = src;
      return img.decode().catch(() => {});
    });
    
    // Khi tất cả hình ảnh đã được preload, bắt đầu animation
    Promise.all(preloadImages).then(() => {
      setIsMounted(true);
      // Thêm một chút delay để đảm bảo DOM đã render
      setTimeout(() => {
        setAnimationReady(true);
      }, 0);
    });
  }, []);

  // --- Classes circular animation ---
  const radius = 120;

  // Static initial positions for server rendering
  const staticCardPositions = useMemo(() => {
    const cards = [
      { src: '/Caster.webp', alt: 'caster' },
      { src: '/Dragon.webp', alt: 'dragon' },
      { src: '/Hell Born.webp', alt: 'hellborn' },
      { src: '/Legend.webp', alt: 'legend' },
      { src: '/Warrior.webp', alt: 'warrior' }
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
        zIndex: 10, // Fixed zIndex for all cards initially
        priority: true
      };
    });
  }, [radius]);
  
  // Client-side animation state
  const [rotation, setRotation] = useState(0);
  
  // Sử dụng requestAnimationFrame thay vì setInterval để animation mượt hơn
  useEffect(() => {
    if (!animationReady) return;
    
    let animationId: number;
    let lastTime = 0;
    const rotationSpeed = 0.2; // Giảm tốc độ quay để giảm tải CPU
    const updateInterval = 60; // Cập nhật mỗi ~30ms thay vì ~16ms
    
    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const delta = time - lastTime;
      

      if (delta > updateInterval) {
        setRotation(prev => (prev + rotationSpeed * (delta / 16)) % 360); // Điều chỉnh tốc độ theo delta thực tế
        lastTime = time;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [animationReady]);
  
  // Dynamic positions calculated on client side only
  const cardPositions = useMemo(() => {
    if (!isMounted) return staticCardPositions;
    
    const cards = [
      { src: '/Caster.webp', alt: 'caster' },
      { src: '/Dragon.webp', alt: 'dragon' },
      { src: '/Hell Born.webp', alt: 'hellborn' },
      { src: '/Legend.webp', alt: 'legend' },
      { src: '/Warrior.webp', alt: 'warrior' }
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
        zIndex: Math.round(Math.sin(angle) * 10) + 10,
      };
    });
  }, [rotation, radius, isMounted, staticCardPositions]);

  // Thay đổi cardImages để render khác nhau dựa trên kích thước màn hình
  const cardImages = useMemo(() => (
    <div className={`relative ${isDesktop ? 'flex flex-col justify-center items-start' : 'flex justify-center items-center'} h-[340px] w-full bottom-[0px]`}>
      {/* Center button - hiển thị ở cả hai chế độ */}
      <motion.div 
        className={`${isDesktop ? 'self-center mt-auto' : 'absolute'} z-20 flex justify-center items-center`}
        whileHover={isMobile ? {} : { scale: 1.1 }}
        whileTap={isMobile ? {} : { scale: 0.95 }}
      >
        <Button variant='third' size='small'>
          COLLECT TODAY
        </Button>
      </motion.div>
      
      {isDesktop ? (
        // Desktop layout - flex column với justify-between và items-start
        <div className="flex flex-col justify-between items-start w-full gap-6">
          {cardPositions.map((card, index) => (
            <motion.div
              key={index}
              className="transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Image 
                src={card.src} 
                width={150} 
                height={170} 
                alt={card.alt}
                className="transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        // Mobile layout - giữ nguyên circular animation
        <>
          {cardPositions.map((card, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{ x: card.x, y: card.y, zIndex: card.zIndex }}
              animate={{ 
                x: card.x, 
                y: card.y, 
                zIndex: card.zIndex,
                transition: { duration: 0.1, ease: "easeInOut" }
              }}
            >
              <Image 
                src={card.src} 
                width={150} 
                height={170} 
                alt={card.alt}
                className="transition-all duration-300"
                style={{
                  scale: (card.zIndex - 8) / 10 * 0.3 + 0.7, // Scale based on z-index
                  transform: 'translateZ(0)', // Hardware acceleration
                }}
              />
            </motion.div>
          ))}
        </>
      )}
    </div>
  ), [cardPositions, isDesktop, isMobile]);

  // return UI
  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[2000px] bg-[#000] overflow-hidden" 
      style={{ perspective: '1000px' }}
    >
      <div className="absolute w-full bg-[#000] h-full blur-[100px] z-1"></div>

      {/* Scroll Down Arrow */}
      {/* <AnimatePresence>
        <motion.div 
          className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center text-[#E8B77C] text-[80px] sm:text-[80px]"
          style={{ opacity: arrowOpacity }}
          initial="initial"
          animate="animate"
          variants={arrowVariants}
        >
          &dArr;
        </motion.div>
      </AnimatePresence> */}

      {/* Content Container */}
      <div className="relative w-full h-full flex flex-col-reverse justify-center items-center z-10 gap-20 md:gap-60">
        <div className='flex flex-col items-center gap-15 max-w-full w-full'>
          <motion.p
            className="text-[25px] text-center tracking-wide font-deswash bg-gradient-to-r from-[#E8B77C] to-[#E9312B] text-transparent bg-clip-text"
          >
            OWN THE LEGENDS <br/> ATEMU OG MINT
          </motion.p>
          
          {/* Wrapper cho văn bản và nền riêng biệt của nó */}
          <div className="relative w-full max-w-full h-auto"> {/* Sử dụng max-w-md (hoặc kích thước mong muốn) cho container */}
            {/* Phần tử nền */}
            <motion.div
              className="absolute inset-0 z-0 max-w-full" // inset-0 để lấp đầy parent, z-0 để nằm dưới text, rounded-md để bo góc nền
              style={{
                backgroundImage: "url('/theme_6.webp')",
                backgroundSize: 'cover', // 'contain' để ảnh vừa vặn, 'cover' để che phủ hoàn toàn
                backgroundPosition: '10% 50%',
                backgroundRepeat: 'no-repeat',
                boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,0.5)', // Lớp phủ mờ
              }}
              // Bạn có thể thêm props của motion ở đây nếu muốn nền có hiệu ứng riêng
              // initial={{ opacity: 0 }}
              // whileInView={{ opacity: 1 }}
              // viewport={{ once: true }}
              // transition={{ duration: 0.5, delay: 0.1 }} // Tùy chọn delay
            />
            {/* Phần tử văn bản */}
            <motion.p
              className='relative z-10 font-fe text-[16px] text-center tracking-wide leading-[22px] p-6 max-w-md mx-auto rounded-md' // z-10 để nằm trên nền, p-6 để có padding, loại bỏ h-[50%] và max-w-full nếu không cần thiết
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                color: '#FFFFFF', // Màu chữ
              }}
            >
              A finite collection, never to be seen again.
              Inside awaits immense power: 50 cards from 5 legendary realms: Egypt, Greece, Japan, Viking, and Hellborn.
              Seek only 1% chance for god-tier legends, boasting incredible strength and unique skills.
              Each card is a unique NFT. Own it, collect it, trade it.
            </motion.p>

            {cardImages}

          </div>

        </div>

        {/* Animated Image Wrapper */}
        <div>
          <motion.div
            initial={{ rotateY: 360 }}
            whileInView={{ rotateY: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "100px 0px" }}
            transition={{
              rotateY: { duration: 1, ease: "easeOut" },
            }}
            className="md:mt-0"
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)', // Hardware acceleration
            }}
          >
            <Image
              src="/backcard.avif"
              width={300}
              height={483}
              alt="backcard"
              className='relative z-10 mt-100'
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