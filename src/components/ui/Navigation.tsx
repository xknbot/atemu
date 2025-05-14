import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import AtemuTextLogo from '@/components/ui/AtemuTextLogo'; // Import the Text Logo component


interface NavLink {
  href: string;
  label: string;
}

interface NavigationProps {
  links: NavLink[];
}

const Navigation: React.FC<NavigationProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [modalKey, setModalKey] = useState(0); // New state to force re-render
  const menuRef = useRef<HTMLDivElement>(null);

  // Mount effect for portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Toggle menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) { // Only increment key when opening the modal
      setModalKey(prevKey => prevKey + 1);
    }
  };

  // Handle outside clicks
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle body scroll lock
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = isOpen ? 'hidden' : originalOverflow;
    return () => { document.body.style.overflow = originalOverflow; };
  }, [isOpen]);

  // Menu classes
  const mobileMenuClasses = classNames(
    'fixed inset-0 bg-black bg-opacity-50',
    'z-[200] lg:hidden transition-opacity duration-300',
    {
      'opacity-100 pointer-events-auto': isOpen,
      'opacity-0 pointer-events-none': !isOpen,
    }
  );

  const menuContentClasses = classNames(
    'bg-[#131417] text-white p-7 w-full h-screen',
    'transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
    'absolute bottom-0', // Start from bottom
    {
      'translate-y-0': isOpen,
      'translate-y-full': !isOpen,
    }
  );
  
  return (
    <> 
      {/* Hamburger Button */}
      <div
        onClick={toggleMenu}
        className="group relative z-50 w-15 h-[54px] cursor-pointer flex flex-col justify-between rounded-[10px] p-3"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevent space from scrolling page
            toggleMenu();
          }
        }}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className={
              "w-full h-1 bg-gradient-to-r from-[#fff] to-[#fff] " + // Fixed gradient syntax
              "[clip-path:polygon(0_0,_20%_100%,_40%_0,_60%_100%,_80%_0,_100%_100%)] " +
              "transition-all duration-1000 group-hover:bg-gradient-to-r  group-hover:from-[#E8B77C] group-hover:to-[#E9312b] group-focus:bg-gradient-to-r group-focus:from-[#e8b77c] group-focus:to-[#E9312b]" // Moved hover to parent group
            }
          />
        ))}
      </div>

      {/* Modal Portal */}
      {mounted && createPortal(
        <div
          className={mobileMenuClasses}
          id="mobile-menu"
          aria-hidden={!isOpen}
          key={modalKey} // Add key to force re-render
        >
          <div ref={menuRef} className={menuContentClasses}>
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className="absolute top-3 right-3 text-[#faf0fa] transition-opacity duration-300 opacity-0 animate-fade-in"
              style={{ animationDelay: '500ms' }}
              aria-label="Close menu"
            >
              <IoClose className="w-8 h-8" />
            </button>

            {/* Navigation Links */}
            <div className="flex flex-col items-center justify-center gap-6 mt-36">
              {/* ATEMU Text Logo */}
              <AtemuTextLogo
                 src="/ATEMU-TEXT.png" // Use the correct path to your logo
                 width={200} // Adjust size as needed
                 height={74} // Adjust size as needed based on aspect ratio
                 alt="ATEMU Text Logo"
                 className="w-auto h-auto mb-6 // Added margin bottom
                   opacity-0 translate-y-[-20px] transition-all duration-500 ease-out
                   animate-fade-in-up [--animation-delay:1000ms]"
              />
              
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={classNames(
                    "block py-2 text-[26px] font-deswash opacity-0 translate-y-[-20px] transition-all duration-500 ease-out animate-fade-in-up",
                    {
                      "text-[#E8B77C] underline": index === 0, // Apply yellow and underline to the first link
                      "text-[#faf0fa] lg:hover:text-[#E8B77C]": index !== 0, // Apply original styles to other links
                    }
                  )}
                  style={{ animationDelay: `${index * 100 + 600}ms` }}
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Navigation;