import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import classNames from 'classnames';
import { createPortal } from 'react-dom';

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
  const menuRef = useRef<HTMLDivElement>(null);

  // Mount effect for portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Toggle menu state
  const toggleMenu = () => setIsOpen(!isOpen);

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
    'fixed inset-0 bg-black bg-opacity-50 flex justify-between items-center',
    'z-[200] lg:hidden transition-opacity duration-300',
    {
      'opacity-100 pointer-events-auto': isOpen,
      'opacity-0 pointer-events-none': !isOpen,
    }
  );

  const menuContentClasses = classNames(
    'bg-[#131417] text-white p-7 rounded-lg w-[100%] h-screen max-h-screen',
    'relative transition-transform duration-300 my-auto',
    {
      'scale-100': isOpen,
      'scale-95': !isOpen,
    }
  );
  
  return (
    <> 
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="text-[#E8B77C] relative z-50"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <GiHamburgerMenu className="w-6 h-6" />
      </button>

      {/* Modal Portal */}
      {mounted && createPortal(
        <div
          className={mobileMenuClasses}
          id="mobile-menu"
          aria-hidden={!isOpen}
        >
          <div ref={menuRef} className={menuContentClasses}>
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className="absolute top-3 right-3 text-[#faf0fa]"
              aria-label="Close menu"
            >
              <IoClose className="w-8 h-8" />
            </button>

            {/* Navigation Links */}
            <div className="flex flex-col items-center justify-center gap-6 mt-36">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#faf0fa] lg:hover:text-[#E8B77C] block py-2 text-[26px] font-deswash"
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