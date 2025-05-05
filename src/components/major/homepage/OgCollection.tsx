'use client'; // Cần thiết vì sử dụng hooks

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';


// Imports cho Particles
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

// Imports cho Framer Motion
import { motion, useScroll, useTransform } from "framer-motion";


export default function OgCollection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false); // State mới để theo dõi visibility
  const sectionRef = useRef<HTMLElement>(null); // Ref cho section
  const [isControlsVisible, setIsControlsVisible] = useState(true); // State quản lý hiển thị nút
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref lưu timeout ID

  // --- Framer Motion Hooks ---
  const { scrollYProgress } = useScroll({
    target: sectionRef, // Theo dõi scroll dựa trên section này
    offset: ["start end", "end end"] // Bắt đầu khi đầu section chạm cuối viewport, kết thúc khi cuối section chạm đầu viewport
  });

  // Ánh xạ scrollYProgress (0-1) sang translateY và opacity
  // Bắt đầu animation khi scrollYProgress đạt 0.5
  const textY = useTransform(scrollYProgress, [0.2, 0.5], ["-200px", "-210px"]); // Từ dưới lên
  const textOpacity = useTransform(scrollYProgress, [0.2, 1], [0, 2]); 

   // Hàm khởi tạo Particles
  const particlesInit = useCallback(async (engine: Engine) => {
      await loadSlim(engine);
  }, []);

  // Callback để xử lý play/pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      if (video.paused || video.ended) {
        video.play().catch(err => console.error("Play error:", err));
      } else {
        video.pause();
      }
    }
  }, []); // Không có dependencies, vì chỉ dùng ref

  // Hàm ẩn nút điều khiển
  const hideControls = useCallback(() => {
    setIsControlsVisible(false);
    // if (controlsTimeoutRef.current) {
    //   clearTimeout(controlsTimeoutRef.current); // Xóa timeout nếu có khi ẩn trực tiếp
    // }
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current); // Luôn xóa timeout khi ẩn
  }, []);

  // Hàm hiển thị nút và đặt lại bộ đếm thời gian
  const showControlsAndResetTimer = useCallback(() => {
    setIsControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(hideControls, 2000); // Đặt timeout 3 giây để ẩn
  }, [hideControls]); // Phụ thuộc vào hideControls

   // Effect để quản lý Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting); // Cập nhật state khi visibility thay đổi
        if (entry.isIntersecting) {
          // Khi component vào view, hiển thị controls và bắt đầu timer ẩn
          showControlsAndResetTimer();
        } else {
          // Khi component ra khỏi view, ẩn controls ngay lập tức và xóa timer
          hideControls();
        }
      },
      { threshold: 0.5 } // Kích hoạt khi 50% component hiển thị
    );

    const currentSection = sectionRef.current;
    if (currentSection) observer.observe(currentSection);

    return () => { // Cleanup function
      if (currentSection) observer.unobserve(currentSection);
    };
  }, [showControlsAndResetTimer, hideControls]); 

  // Effect chỉ để cleanup timeout khi component unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []); // Chạy 1 lần khi mount để đăng ký cleanup

  return (
    <section
      ref={sectionRef} // Gắn ref vào section
      className="relative w-full h-[750px] bg-black overflow-hidden"
    >
      {/* Black background */}
      <div className="absolute inset-0 bg-black z-0"></div>

      <div className='absolute inset-0 flex justify-center items-start z-4'>
        <Image src="/toriigate.webp" alt="torrigate" width={300} height={300} />
      </div>

      <motion.div
        className="absolute inset-0 flex justify-center items-center z-6" // z-index thấp hơn Particles (z-5)
        style={{
          // Áp dụng transform và opacity từ Framer Motion
          y: textY,
          opacity: textOpacity,
        }}
      >
        {/* <p className="max-w-2xl text-[25px] text-white text-center px-4 font-deswash tracking-wide">
          Strategic Mastery Forges Living Legends...
        </p> */}
         <div className="flex flex-col items-center">
          <p className="text-[25px] text-white text-center font-deswash tracking-wide">Strategic</p>
          <p className="text-[25px] text-white text-center font-deswash tracking-wide">Mastery</p>
          <p className="text-[25px] text-white text-center font-deswash tracking-wide">Forges</p>
          <p className="text-[25px] text-white text-center font-deswash tracking-wide">Living</p>
          <p className="text-[25px] text-white text-center font-deswash tracking-wide">Legends</p>
        </div>
      </motion.div>

      {isInView && ( // Chỉ render Particles khi isInView là true
        <Particles
            id="tsparticles-og" // Đặt ID khác với header để tránh xung đột nếu cả hai cùng hiển thị
            init={particlesInit}
            className="absolute top-0 left-0 w-full h-full z-1" // z-index thấp hơn video (z-10)
            options={{
                // Bạn có thể sao chép và tùy chỉnh options từ Header.tsx
                // Ví dụ đơn giản:
                background: {
                    color: "transparent" // Nền trong suốt
                },
                particles: {
                    number: {
                        value: 50, // Giảm số lượng hạt so với header
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ['#E8B77C', '#FAF0FA', '#E9312B', '#1886F1'] // Có thể dùng màu khác
                    },
                    shape: {
                        type: 'circle',
                    },
                    opacity: {
                        value: { min: 0.1, max: 1 }, // Giảm độ mờ tối đa
                        animation: {
                            enable: true,
                            speed: 1,
                            sync: false
                        }
                    },
                    size: {
                        value: { min: 1, max: 2 }, // Kích thước hạt nhỏ hơn
                    },
                    links: {
                        enable: true, // Có thể bật liên kết nếu muốn
                        distance: 50,
                        color: "#E8B77C", // Màu liên kết
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: { min: 0.2, max: 0.3 }, // Tốc độ chậm hơn
                        direction: 'none',
                        random: false,
                        straight: false,
                        outModes: {
                            default: 'out'
                        }
                    }
                },
                interactivity: {
                    events: {
                        onHover: { enable: false }, // Tắt tương tác hover để không ảnh hưởng video
                        onClick: { enable: false },
                    },
                },
                detectRetina: true
            }}
        />
      )}



      <div
        className="relative z-10 w-full h-full flex justify-center items-center group mt-15"
          
        onMouseLeave={() => {
          if (window.innerWidth >= 0) {
            hideControls();
          }
        }}
      >
        {/* Thẻ video HTML5 */}
        <video
          ref={videoRef} // Thêm ref
          src="/OG collection.mp4" 
          poster="/V2.webp"
          className="w-[90%] h-auto max-w-full shadow-lg cursor-pointer " // Áp dụng w-[90%], giữ tỷ lệ, bo góc, thêm bóng đổ
          // controls // Hiển thị nút điều khiển mặc định
          playsInline // Cho phép phát inline trên mobile
          muted={!isInView} // Tắt tiếng (quan trọng nếu muốn autoplay) - có thể bỏ nếu không cần autoplay
          loop // Bỏ comment nếu muốn video lặp lại
          preload="metadata" // Chỉ tải metadata ban đầu
           // Cập nhật state isPlaying khi video tự play/pause
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          // onClick={() => videoRef.current?.play()}
          onClick={() => {
            togglePlay(); // Gọi hàm togglePlay để play/pause
            showControlsAndResetTimer(); // Hiển thị lại controls và reset timer khi click
          }}
          onMouseMove={showControlsAndResetTimer}
          onTouchStart={() => {
            showControlsAndResetTimer();
          }}
        >
          {/* Fallback text nếu trình duyệt không hỗ trợ video */}
          Your browser does not support the video tag.
        </video>

        <Image src="/video_frame.png" alt='videoframe' width={1920} height={1080} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-auto max-w-full pointer-events-none z-15'/>

         {/* Nút Play/Pause tùy chỉnh */}
        <div className={`
            absolute inset-0 flex items-center justify-center z-20
            rounded-lg pointer-events-none
            ${isControlsVisible ? 'opacity-100' : 'opacity-0'} // Điều khiển opacity dựa trên state
          `}>
          <button
            onClick={(e) => {
               e.stopPropagation(); // Ngăn click lan ra video (nếu video cũng có onClick)
              togglePlay(); // Gọi hàm togglePlay
              showControlsAndResetTimer();
            }}
            className="p-3 rounded-full bg-[#131417] text-[#faf0fa] hover:bg-[#E8B77C] hover:text-[#131417] transition-colors pointer-events-auto"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              // Biểu tượng Pause (Ví dụ SVG)
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25z" clipRule="evenodd" />
              </svg>
            ) : (
              // Biểu tượng Play (Ví dụ SVG)
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}