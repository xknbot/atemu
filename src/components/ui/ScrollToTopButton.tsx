// src/components/ui/ScrollToTopButton.tsx
'use client'; // Cần thiết vì component này sử dụng hooks (useState, useEffect)

import React, { useState, useEffect } from 'react';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Hàm kiểm tra vị trí cuộn và cập nhật state isVisible
  const toggleVisibility = () => {
    // Hiện nút khi cuộn xuống hơn 300px (bạn có thể thay đổi giá trị này)
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Hàm xử lý cuộn lên đầu trang mượt mà
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Tạo hiệu ứng cuộn mượt
    });
  };

  // Thêm và xóa event listener khi component mount và unmount
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup function để xóa listener khi component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); // Mảng dependency rỗng đảm bảo effect chỉ chạy 1 lần khi mount

  return (
    <>
      {isVisible && ( // Chỉ hiển thị nút khi isVisible là true
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-[#131417] text-[#E8B77C] shadow-md border border-[#E8B77C] lg:hover:bg-gray-800 focus:outline-none lg:focus:ring-1 lg:focus:ring-offset-1 lg:focus:ring-[#E8B77C] lg:transition-opacity lg:duration-300 lg:  ease-in-out"
          aria-label="Scroll to top" // Thêm aria-label cho accessibility
        >
          {/* Icon Up Arrow Outline (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5} // Độ dày của đường viền icon
            stroke="currentColor" // Màu trắng (kế thừa từ text-white)
            className="w-6 h-6" // Kích thước icon
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" // Đường dẫn của icon mũi tên lên
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
