'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RxDiscordLogo } from "react-icons/rx";
import { LiaTelegramPlane } from "react-icons/lia";
import Logo from './AtemuLogo';
import Image from 'next/image';
import { TfiSearch } from "react-icons/tfi";


interface NavItem { 
    label: string;
    href: string;
    subItems?: NavItem[];
}

interface HamburgerMenuProps { 
    navItems?: NavItem[];
    className?: string;
}

const defaultNavItems: NavItem[] = [
    { label: 'For Beginner', href: '#forbeginner' },
    {
        label: 'Events', href: '#events',
        subItems: [
            { label: 'Upcoming Events', href: '#upcomingevents' },
            { label: 'Past Events', href: '#pastevents' },
        ],
    },
    { label: 'News', href: '#news' },
    { label: 'Card List', href: '#cardlist' },
    { label: 'Store', href: '#store'}
];

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
    navItems = defaultNavItems,
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
    const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

    // Set up GSAP timelines
    const menuTl = useRef(gsap.timeline({ paused : true}));

    // Toggle menu

    const toggleMenu = () => {
        // setIsOpen((prev) => !prev);
        setIsOpen((prev) => {
            if (!prev) { // If opening the menu
                setOpenAccordionIndex(null); // reset accordion state when menu opens
            }
            return !prev;
        });
    };
    // Toggle accordion
    const handleAccordionToggle = (index: number) => {
        setOpenAccordionIndex(openAccordionIndex === index ? null : index);
    }

    // initial GSAP setup
    useEffect(() => {
        // Reset timeline
        menuTl.current.clear();

        // Create a new timeline for menu animations
        menuTl.current
            .to(
                overlayRef.current, {
                autoAlpha: 1,
                duration: 0.3,
                ease: 'power2.inOut'
            })
            .to(
                navRef.current, {
                x: 0,
                duration: 0.4,
                ease: 'power2.out'

            }, "-=0.1")
            .fromTo(
                menuItemsRef.current.filter(item => item !== null), // filter out null items
                { x: -20, autoAlpha: 0 },
                {
                    x: 0,
                    autoAlpha: 1,
                    stagger: 0.1,
                    duration: 0.3,
                    ease: 'power2.out'
                }, "-=0.2"
            );
        // Set initial states
        gsap.set(overlayRef.current, { autoAlpha: 0 });
        gsap.set(navRef.current, { x: "-100%" });
        gsap.set(menuItemsRef.current.filter(item => item !== null), { autoAlpha: 0 });
        
        return () => {
            menuTl.current.kill();
        }
    }, [navItems]);

    // Play/reverse animation when menu state changes
    useEffect(() => {
        if (isOpen) {
            menuTl.current.play();
            document.body.style.overflow = 'hidden';
        } else {
            menuTl.current.reverse().then(() => {
                setOpenAccordionIndex(null); // Reset accordion state when menu closed
            });
            document.body.style.overflow = '';
        }

    }, [isOpen]);

    // Close menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // if (navRef.current && !navRef.current.contains(event.target as Node)
            // && event.target !== overlayRef.current) {
            //     setIsOpen(false);
            // }
            if (isOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

            
    }, [isOpen]);

    return (
        <div className={`relative ${className}`} ref={menuRef}>
            {/* Hamburger Button */}
            <button
                className='lg:hidden p-2 focus:outline-none'
                onClick={toggleMenu}
                aria-label='Toggle navigation menu'
                aria-expanded={isOpen}
            >
                <div className='w-8 h-6 flex flex-col justify-between'>
                    <span className={`h-1 w-full bg-white border-t border-[#E8B77C] rounded-[1px] transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`
                    }></span>
                    <span className={`h-1 w-full bg-white border-t border-[#E8B77C] rounded-[1px] transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`
                    }></span>
                    <span className={`h-1 w-full bg-white border-t border-[#E8B77C] rounded-[1px] transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`
                    }></span>
                </div>
            </button>

            {/* Mobile Navigation Menu Overlay */}
            <div
                ref={overlayRef}
                className={`fixed inset-0 z-40 transform transition-transform duration-300 lg:hidden opacity-0 invisible ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                style={{ visibility: 'hidden' }}
            >
                <nav
                    ref={navRef}
                    className='fixed top-0 left-0 h-screen w-screen max-w-screen bg-gradient-to-b shadow-lg z-50 bg-[#131417]'
                >
                    {/* Close Button and Search Bar */}
                    <div className='flex justify-between items-center p-8'>
                        <button
                            onClick={toggleMenu}
                            className='text-[#faf0fa]'
                            aria-label = "Close menu"
                        >
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M6 18L18 6M6 6l12 12'/> 
                            </svg>
                        </button>

                        <div className='h-12 w-12'>
                        </div>

                        <div className=" bg-[#e8b77c]/9 rounded py-2 px-4">
                            <form action="/action_page.php" className='flex items-center justify-between'>
                                <input type="text" placeholder="Search.." name="search" className='font-incon text-[25px] border-none'/>
                                <button type="submit">
                                    <TfiSearch className='w-8 h-8'/>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className='flex justify-center items-center my-10'>
                        <Logo src="/ATEMU-TEXT.png" alt="Atemu Logo" width={70} height={141} className={`w-45 h-auto transition-all duration-1000 opacity-0 ${isOpen ? "opacity-100" : ""}` } />
                    </div>


                    {/* Navigation links */}
                    <div className='p-10'>
                        <ul className='flex flex-col space-y-2'>
                            {navItems.map((item, index) => (
                                <li
                                    key={item.label + index}
                                    ref={el => menuItemsRef.current[index] = el}
                                >
                                    {/* <Link
                                        href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                                        className='text-[25px] text-[#faf0fa] font-incon'
                                        onClick = {toggleMenu}
                                    >
                                        {item}
                                    </Link> */}

                                    
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='absolute bottom-10 w-full px-4'>
                        <div className='border-t border-[#e8b77c]/20 pt-6 mt-6'>
                            <div className='flex justify-center items-center gap-5 md:gap-10'>
                                <div className='bg-[#131417] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center'>
                                    <Link href={'/'} aria-label='Facebook'>
                                        <TiSocialFacebookCircular className='text-[30px]'/>
                                    </Link>
                                </div>
                                <div className='bg-[#131417] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center'>
                                    <Link href={'/'} aria-label='Instagram' >
                                        <FaInstagram className='text-[30px]'/>
                                    </Link>
                                </div>
                                <div className='bg-[#131417] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center'>
                                    <Link href={'/'} aria-label='Twitter'>
                                        <FaXTwitter className='text-[30px]'/>
                                    </Link>
                                </div>
                                <div className='bg-[#131417] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center'>
                                    <Link href={'/'} aria-label='Discord'>
                                        <RxDiscordLogo className='text-[30px]'/>
                                    </Link>
                                </div>
                                <div className='bg-[#131417] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center'>
                                    <Link href={'/'} aria-label='Telegram'>
                                        <LiaTelegramPlane className='text-[30px]'/>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </nav>

            </div>

            {/* Desktop Menu */}
            <nav className='hidden lg:block'>
                <ul className='flex space-x-8'>
                    {navItems.map((item, index) => (
                        <li key={index}>
                          
                        </li>
                    ))}

                </ul>

            </nav>
        </div>
    )
}

export default HamburgerMenu;