import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { Divide as Hamburger } from 'hamburger-react'


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

  // Close menu only (for navigation links)
  const closeMenu = () => {
    setIsOpen(false);
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
    'fixed inset-0 bg-[#131417] bg-opacity-50',
    'z-49 lg:hidden transition-opacity duration-300',
    {
      'opacity-100 pointer-events-auto': isOpen,
      'opacity-0 pointer-events-none': !isOpen,
    }
  );

  const menuContentClasses = classNames(
    'bg-transparent text-white p-7 w-full h-screen',
    'transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
    'will-change-transform',
    'absolute bottom-0',
    {
      'translate-y-0 opacity-100 visible': isOpen,
      'translate-y-full opacity-0 invisible': !isOpen,
    }
  );
  
  return (
    <> 
      {/* Hamburger Button */}


      {/* Modal Portal */}
      {mounted && createPortal(
        <div
          className={mobileMenuClasses}
          id="mobile-menu"
          aria-hidden={!isOpen} 
          key={modalKey} // Add key to force re-render on open
        >
          <div ref={menuRef} className={menuContentClasses}>

            {/* Navigation Links */}
            <div className="flex flex-col items-start justify-center mt-50">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={classNames(
                    "block text-[30px] font-deswash transition-all duration-500 ease-out border-b py-6 px-3 w-full",
                    {
                      "opacity-100 translate-y-0": isOpen,
                      "opacity-0 translate-y-[-20px]": !isOpen
                    },
                    {
                      "text-[#E8B77C]": index === 0, // Apply yellow and underline to the first link
                      "text-[#faf0fa] lg:hover:text-[#E8B77C]": index !== 0, // Apply original styles to other links
                    }
                  )}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 100 + 100}ms` : `${(links.length - index) * 50}ms`
                  }}
                  onClick={closeMenu}
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