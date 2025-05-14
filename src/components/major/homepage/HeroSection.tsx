'use client'

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'; // Thêm useCallback

import Image, { StaticImageData } from 'next/image';
import Button from '@/components/ui/Button';
import TextLogo from '@/components/ui/AtemuTextLogo';

import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import styles from '@/styles/HeroSection.module.css';

import { motion } from 'framer-motion';


// Import hero images statically
import HeroImage from '../../../../public/Greece.webp';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Define the data for each slide
interface HeroSlideData {
  id: number;
  type: 'image' | 'video';
  src: string | StaticImageData;
  altText?: string;
}

  export default function HeroSection() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [realIndex, setRealIndex] = useState(0);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const autoplayPaused = useRef(false);


  // State để buộc re-render khi trạng thái video thay đổi
  const [videoStateNonce, setVideoStateNonce] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false); 
  const [isMobile, setIsMobile] = useState(false);
  const [controlsExpanded, setControlsExpanded] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);

// useEffect to handle sound on wwhen on viewport visibility 
useEffect(() => {
  if (!sectionRef.current) return;
  
  const sectionElement = sectionRef.current;
  
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      setIsInViewport(entry.isIntersecting);
      
      // Mute/unmute all videos based on viewport visibility
      Object.values(videoRefs.current).forEach(video => {
        if (video) {
          // Only change mute state if user hasn't explicitly set it
          if (!entry.isIntersecting) {
            // Store current mute state before forcing mute
            video.dataset.previousMuteState = video.muted ? 'true' : 'false';
            video.muted = true;
          } else if (video.dataset.previousMuteState === 'false') {
            // Restore previous unmuted state only if it was unmuted before
            video.muted = false;
          }
        }
      });
    },
    { threshold: 0.2 } // Trigger when at least 20% of the section is visible
  );
  
  observer.observe(sectionElement);
  
  return () => {
    observer.unobserve(sectionElement);
  };
}, []);


  // Add this useEffect to detect screen size
useEffect(() => {
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 1024);
  };
  
  // Initial check
  checkScreenSize();
  
  // Add event listener for resize
  window.addEventListener('resize', checkScreenSize);
  
  // Cleanup
  return () => window.removeEventListener('resize', checkScreenSize);
}, []);


  // Memoize slide data to prevent recreation on each render
  const slidesData: HeroSlideData[] = useMemo(() => [
    // {
    //   id: 1,
    //   type: 'video',
    //   src: '/Hell Born.mp4',
    //   altText: 'Hell Born video slide' 
    // },
    {
      id: 1,
      type: 'image',
      src: '/HellbornGOD.webp',
      altText: 'Hell Born video slide' 
    },
    {
    id: 2,
    type: 'image',
    src: HeroImage,
    altText: 'Hero background 1' 
    },
    {
      id: 3,
      type: 'image',
      src: '/J1.png',
      altText: 'Hell Born video slide' 
    },
    {
      id: 4,
      type: 'image',
      src: '/E2.webp',
      altText: 'Hell Born video slide' 
    },
    // Add other slides here
  ], []);

  // Callback để cập nhật nonce, buộc re-render
  const forceVideoStateUpdate = useCallback(() => {
    setVideoStateNonce(prev => prev + 1);
  }, []);

  // Optimize effect to run only when necessary
  useEffect(() => {
    // Ensure swiper instance and slide data exist for the current index
    if (!swiperInstance || !slidesData[realIndex]) return;

    // This will run before handling the current slide
    Object.entries(videoRefs.current).forEach(([indexStr, vidElement]) => {
      const index = parseInt(indexStr, 10);
      if (vidElement && index !== realIndex) {
        // Pause and mute any video that isn't the current slide
        if (!vidElement.paused) {
          vidElement.pause();
        }
        vidElement.muted = true;
        vidElement.currentTime = 0; // Reset to beginning
      }
    });

    

    const currentSlideData = slidesData[realIndex];
    const videoElement = videoRefs.current[realIndex];

    // --- Cleanup function: Runs when realIndex changes or component unmounts ---
    const cleanupVideos = () => {
      Object.entries(videoRefs.current).forEach(([indexStr, vidElement]) => {
        const index = parseInt(indexStr, 10);
        if (vidElement) {
          // Always remove listeners added by this effect instance to prevent duplicates
          vidElement.removeEventListener('play', forceVideoStateUpdate);
          vidElement.removeEventListener('pause', forceVideoStateUpdate);
          vidElement.removeEventListener('volumechange', forceVideoStateUpdate);
          vidElement.removeEventListener('ended', handleVideoEnded);


          // Pause the video ONLY if it's NOT the currently active slide (realIndex)
          // and if it's actually playing. This prevents pausing the video we might be about to play.
          if (index !== realIndex && !vidElement.paused) {
            vidElement.pause();
            // console.log(`Cleanup: Paused video index ${index} (current is ${realIndex})`);
          }
        }
      });
    };

    // New function to handle when a video ends
    const handleVideoEnded = () => {
      // When video ends, restart Swiper autoplay and move to next slide
      if (swiperInstance && autoplayPaused.current) {
        swiperInstance.autoplay?.start();
        autoplayPaused.current = false;

        // Optional: Move to next slide after a short delay
        setTimeout(() => {
          swiperInstance.slideNext ();
        }, 500);
      }
      forceVideoStateUpdate();
    };

    // --- Handle the CURRENT active slide ---
    if (currentSlideData.type === 'video' && videoElement) {
      // Stop Swiper's autoplay when a video slide is active
      if (swiperInstance.autoplay?.running) {
        // console.log(`Stopping Swiper autoplay for video slide ${realIndex}`);
        swiperInstance.autoplay.stop();
        autoplayPaused.current = true;
      }

      // --- Setup video playback and event listeners for the active video ---
      // Ensure previous listeners are removed before adding new ones (belt-and-suspenders with cleanup)
      videoElement.removeEventListener('play', forceVideoStateUpdate);
      videoElement.removeEventListener('pause', forceVideoStateUpdate);
      videoElement.removeEventListener('volumechange', forceVideoStateUpdate);
      videoElement.removeEventListener('ended', handleVideoEnded);


      // Add listeners for slide transition and UI updates
      videoElement.addEventListener('play', forceVideoStateUpdate);
      videoElement.addEventListener('pause', forceVideoStateUpdate);
      videoElement.addEventListener('volumechange', forceVideoStateUpdate);
      videoElement.addEventListener('ended', handleVideoEnded);


      // --- Core Logic: Reset and Play Every Time ---
      videoElement.currentTime = 0;

      // Use a promise with timeout to handle autoplay failures
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Video autoplay failed:', error);
          // If autoplay fails (e.g., browser restriction), ensure the UI reflects the paused state.
          forceVideoStateUpdate();
        });
      } else {
        // Fallback for browsers that don't return a promise, update UI just in case
        forceVideoStateUpdate();
      }
      // Ensure UI reflects the initial state (playing or attempting to play)
      forceVideoStateUpdate();

    } else if (currentSlideData.type === 'image') {
      // If the new slide is an image and Swiper autoplay was paused by a previous video slide, restart it.
      if (autoplayPaused.current) {
        // console.log(`Restarting Swiper autoplay for image slide ${realIndex}`);
        swiperInstance.autoplay?.start();
        autoplayPaused.current = false;
      }
    }

    return cleanupVideos;
  }, [realIndex, swiperInstance, slidesData, forceVideoStateUpdate]);

  // Memoize static content to prevent unnecessary re-renders
  const staticContent = useMemo(() => (
    <div className="h-full flex flex-col items-center justify-center relative z-10 pointer-events-auto">
      <TextLogo
        src="/ATEMU-TEXT.png"
        width={300}
        height={111}
        alt="atemutextlogo"
        className=" w-100 max-w-100 h-auto mt-25 mb-10 md:mb-10 lg:mb-2"
      />

      
    </div>
  ), []);

  // return UI
  return (
    <section
      ref={sectionRef}
      className='relative h-[1000px] w-full overflow-hidden lg:bg-linear-to-b lg:from-[#371D0B] lg:from-1% lg:to-[#131417] lg:to-80%'>

      <div className={`${styles.customPagination} absolute top-10 left-0 right-0 z-30`}></div>

      {/* Thêm key vào Swiper để đảm bảo re-render khi slidesData thay đổi (mặc dù ở đây nó được memoize) */}
      <Swiper
        key={slidesData.length}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
        modules={[Autoplay, EffectFade, Pagination]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false, // Giữ false để video không dừng autoplay khi bấm nút control
          pauseOnMouseEnter: false, // Don't pause on mouse enter to make behavior consistent

        }}
        pagination={{ 
          dynamicBullets: true,
          clickable: true,
          horizontalClass: styles.paginationHorizontal,
          el: `.${styles.customPagination}`,
        }}
        
        // navigation={true} // Có thể bỏ nếu không dùng nút prev/next của Swiper
        effect="fade"
        fadeEffect={{ crossFade: true }}
        touchEventsTarget="container" // Changed from "wrapper" to "container" for better touch detection
        grabCursor={true}
        touchRatio={1.5} // Increased for more responsive swipes
        touchAngle={45}
        longSwipes={true}
        longSwipesRatio={0.3} // Reduced to make swiping easier
        threshold={5} // Keep low threshold for better responsiveness
        resistance={true} // Add resistance for better feel
        resistanceRatio={0.85} // Add some resistance at edges
        followFinger={true} // Ensures slide follows finger movement
        preventInteractionOnTransition={false} // Allow interaction during transitions
        allowTouchMove={true} // Explicitly enable touch moves
        simulateTouch={true}  // Ensure touch simulation is enabled
        passiveListeners={true} // Use passive listeners for better performance
        className="h-full w-full mySwiper"
      >
        {slidesData.map((slide, index) => {
          // Lấy trạng thái video hiện tại cho slide này (nếu là slide video)
          // Sử dụng videoStateNonce để đảm bảo đọc giá trị mới nhất sau khi state thay đổi
          const currentVideoElement = videoRefs.current[index];
          const isVideoPaused = currentVideoElement?.paused ?? true;
          const isVideoMuted = currentVideoElement?.muted ?? false;

          return (
            <SwiperSlide key={slide.id} className="relative">
              {slide.type === 'image' ? (
                <Image
                  src={slide.src} 
                  alt={slide.altText || `Hero background ${slide.id}`}
                  priority={index === realIndex} // Ưu tiên tải slide hiện tại
                  loading={index === realIndex ? "eager" : "lazy"}
                  fill // Sử dụng fill thay cho width/height cố định để ảnh tự điều chỉnh
                  sizes="100vw"
                  quality={100}
                  style={{ objectFit: 'cover', objectPosition: 'center' }} // width/height 100% không cần thiết với fill
                  className="absolute inset-0 z-0" // Bỏ top-0
                />
              ) : (
                <div 
                    className="relative h-full w-full"
                    onMouseEnter={() => {
                      // Chỉ đặt trạng thái hover nếu đây là slide đang active
                      if (index === realIndex) {
                        setIsVideoHovered(true);
                      }
                    }}
                    // Khi chuột rời khỏi khu vực này
                    onMouseLeave={() => {
                      setIsVideoHovered(false);
                    }}
                >
                  <video
                    ref={(el) => { videoRefs.current[index] = el; }}
                    src={slide.src as string}
                    playsInline
                    preload="metadata" // Giữ metadata để lấy thông tin nhanh
                    muted={true} // Start muted to help with autoplay policies. User/Observer can unmute.
                    loop={false} // Không loop, để sự kiện 'ended' hoạt động
                    className="absolute inset-0 z-0 object-cover w-full h-full lg:object-contain lg:object-top pointer-events-none"
                    // onClick={() => { /* Ngăn click vào video tự play/pause */ }}
                    ></video>

                    {/* --- START: Inset Shadow Overlays --- */}
                  {/* Top Inset Shadow Overlay */}
                  <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-black/10 to-transparent z-10 pointer-events-none" aria-hidden="true"></div>

                  {/* Bottom Inset Shadow Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none" aria-hidden="true"></div>
                  {/* --- END: Inset Shadow Overlays --- */}

                  {/* Custom video controls - chỉ hiển thị khi slide này active */}
                  {realIndex === index && (isMobile || isVideoHovered) &&(
                    <div className="absolute top-2.5 right-6 z-50 flex flex-col items-center gap-3 pointer-events-auto transition-opacity duration-300 opacity-100">
                      {/* Play/Pause Button */}
                      <button
                        className="w-8 h-8 rounded-full bg-transparent border border-[#E8B77C] flex items-center justify-center hover:bg-white/10 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
                          // setControlsExpanded(true);
                          const video = videoRefs.current[index];
                          if (video) {
                            if (video.paused) {
                              video.play().catch(err => console.error("Play error:", err));
                            } else {
                              video.pause();
                            }
                            // Không cần force update ở đây vì listener 'play'/'pause' sẽ làm việc đó
                          }
                        }}
                        aria-label={isVideoPaused ? "Play video" : "Pause video"}
                      >
                        {isVideoPaused ? (
                          // Play Icon
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          // Pause Icon
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>

                      {controlsExpanded && (
                        <>
                          {/* Sound On/Off Button */}
                          <button
                            className="w-8 h-8 rounded-full bg-transparent border border-[#E8B77C] flex items-center justify-center hover:bg-white/10 transition-colors animate-fade-in"
                            onClick={(e) => {
                              e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
                              const video = videoRefs.current[index];
                              if (video) {
                                video.muted = !video.muted;
                                // Không cần force update ở đây vì listener 'volumechange' sẽ làm việc đó
                              }
                            }}
                            aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                          >
                            {isVideoMuted ? (
                              // Sound Off Icon
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                              </svg>
                            ) : (
                              // Sound On Icon
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06z" />
                              </svg>
                            )}
                          </button>
                          <button
                            className="w-8 h-8 rounded-full bg-transparent border border-[#E8B77C] flex items-center justify-center hover:bg-white/10 transition-colors animate-fade-in"
                            onClick={(e) => {
                              e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
                              if (swiperInstance) {
                                swiperInstance.slideNext();
                              }
                            }}
                            aria-label="Skip video"
                          >
                            {/* Skip Forward Icon (Example using Heroicons) */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                              <path d="M19.5 18a.75.75 0 0 0 .75-.75V6.75a.75.75 0 0 0-1.5 0v10.5a.75.75 0 0 0 .75.75Z" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
              {/* Lớp phủ mờ và nội dung tĩnh không cần thiết trong từng slide nếu đã có ở ngoài */}
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              {/* <div className="relative z-20 h-full flex flex-col justify-center items-center px-4 text-center"></div> */}
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Di chuyển nội dung tĩnh ra ngoài Swiper để nó luôn hiển thị */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
        {/* Lớp phủ nhẹ để tăng độ tương phản cho text */}
        <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none"></div>
        {/* Render nội dung tĩnh đã được memoize */}
        <div className="pointer-events-none">
          {staticContent}
        </div>
      </div>
    </section>
  );
}
