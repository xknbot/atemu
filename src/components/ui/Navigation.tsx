

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import classNames from 'classnames'; 


interface NavLink {
  href: string;
  label: string;
}

interface NavigationProps {
  links: NavLink[];
}

const Navigation: React.FC<NavigationProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Optional: Prevent body scroll when the mobile menu is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow; // Store original value
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow; // Restore original
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = originalOverflow; // Restore on unmount/close
    };
  }, [isOpen]);

  // Classes for the mobile menu overlay container
  const mobileMenuClasses = classNames(
    'fixed',        // Use fixed positioning to cover the viewport
    'top-0',        // Align to top
    'right-0',      // Start position off-screen to the right
    'w-screen',     // Full viewport width (use w-screen for full viewport)
    'h-screen',     // Full viewport height (use h-screen for full viewport)
    'bg-[#131417]',     // Black background
    'text-white',   // White text color
    'z-100',         // High z-index to appear on top of other content
    'transform',    // Enable transformations
    'transition-transform', // Apply transition effect to the transform property
    'duration-300', // Set transition duration (adjust as needed)
    'ease-in-out',  // Set transition timing function
    'lg:hidden',    // Hide this mobile menu on large screens
    {
      'translate-x-0': isOpen,      // If open, translate to x=0 (slide in to view)
      'translate-x-full': !isOpen,  // If closed, translate fully to the right (off-screen)
    }
  );

  return (
    <> 

      {/* Hamburger Icon Button (Visible below lg screens) */}

      <button
          onClick={toggleMenu}
          className="text-[#131417] relative z-60 " // Ensure button is clickable, higher z-index than menu
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
      >
          {/* Only show the hamburger icon here. The close icon is inside the menu. */}
          {/* Conditionally rendering icon here might cause layout shift, better to have close inside */}
          <GiHamburgerMenu className="w-6 h-6" />
      </button>


      {/* Mobile Navigation Menu Overlay (Handles its own visibility via mobileMenuClasses) */}
      <nav
        className={mobileMenuClasses}
        id="mobile-menu"
        aria-hidden={!isOpen} // Hide from screen readers when closed
      >
         {/* Inner container for layout and padding */}
         <div className="flex flex-col items-end justify-center h-full relative p-7">
            {/* Close Button (Inside the menu) */}
            <button
                onClick={toggleMenu}
                className="absolute top-5 right-7 text-white" // Position top-right (adjust padding if needed)
                aria-label="Close menu"
            >
                <IoClose className="w-8 h-8" /> {/* Larger close icon */}
            </button>

            {/* Navigation Links Container */}
            <div className="flex flex-col items-end gap-6 mt-8"> {/* Vertical layout with spacing, add margin-top */}
                {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-white hover:text-gray-300 block py-2 text-[26px] font-deswash" // Style links
                    onClick={toggleMenu} // Close menu when a link is clicked
                >
                    {link.label}
                </Link>
                ))}
            </div>
         </div>
      </nav>


    </>
  );
};

export default Navigation;

