'use client'

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/AtemuLogo';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import Navigation from '../ui/NavigationMenu/Navigation';





const Header: React.FC = () => {

    const navItems = [
    {
        label: "Play",
        href: "#forbeginner",
            subItems: [
            {
                label: "Cards Database",
                href: "#cardsdatabase",
                subItems: [
                { label: "Card Packs", href: "#cardpacks" },
                { label: "Egypt", href: "#egypt" },
                { label: "Greece", href: "#greece" },
                { label: "Hellborn", href: "#hellborn" },
                { label: "Shinto", href: "#shinto" },
                { label: "Viking", href: "#viking" },
                ],
            },
            {
                label: "Getting Started",
                href: "#foradvanced",
                subItems: [
                { label: "FAQ", href: "#faq" },
                { label: "Keyword Glossary", href: "#glossary" },
                { label: "Rules", href: "#rules" },
                ],
            },
            ],
    },
    {
        label: "Store",
        href: "#store",
            subItems: [
            { label: "Flex Marketplace", href: "#flexmarketplace" },
            { label: "Transactions History", href: "#transactionshistory" },
            ],
    },
    {
        label: "News",
        href: "#news",
        subItems: [
            { label: "Latest News", href: "#latestnews" },
            { label: "Announcements", href: "#announcements" },
            { label: "Lore", href: "#lore" },
        ],
    },
    {
        label: "Events",
        href: "#events",
        subItems: [
            { label: "Coming soon", href: "#comingsoon" },
            
        ],
    },
    ];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


    const middleIndex = Math.ceil(navItems.length / 2);
    const leftNavItems = navItems.slice(0, middleIndex);
    const rightNavItems = navItems.slice(middleIndex);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    
    return (


        <header className='sticky top-0 z-50 w-full'>

            {/* row: Header */}
            <div className='relative flex items-center justify-around w-full h-20 bg-[#131417]/90 backdrop-blur-md px-7 z-0'>
                <div className="absolute inset-0 w-full h-full z-10">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-8xl h-32 
                                    bg-gradient-to-t from-[#E9312B]/20 via-[#1886F1]/20 to-transparent 
                                    rounded-full blur-2xl mix-blend-soft-light glow-animation" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 
                                    bg-radial-gradient(circle_at_center, #1886F1/20 0%, transparent 70%) 
                                    blur-md mix-blend-soft-light glow-animation" />
                </div>
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    className="absolute top-0 left-0 w-full h-full z-20"
                    options={{
                        background: {
                            color: "transparent"
                        },
                        particles: {
                            number: {
                                value: 300,
                                density: {
                                    enable: true,
                                    value_area: 900
                                }
                            },
                            color: {
                                value: ['#E8B77C', '#1886F1 ', '#E9312B', '#790762', '#FAF0FA']
                            },
                            shape: {
                                type: 'circle',
                            },
                            opacity: {
                                value: { min: 0.1, max: 1 },
                                animation: {
                                    enable: true,
                                    speed: 1.5,
                                    sync: false
                                }
                            },
                            size: {
                                value: { min: 0.1, max: 1.5 },
                                animation: {
                                    enable: true,
                                    speed: 2,
                                    size_min: 0.1,
                                    sync: false
                                }
                            },
                            links: {
                                enable: false
                            },
                            move: {
                                enable: true,
                                speed: { min: 0.1, max: 0.5 },
                                direction: 'none',
                                random: true,
                                straight: false,
                                outModes: {
                                    default: 'out'
                                }
                            },
                            glow: {
                                enable: true,
                                frequency: 1,
                                color: {
                                    value: ["#E8B77C", "#1886F1", "#E9312B", "#790762", "#FAF0FA"],
                                    animation: {
                                        enable: true,
                                        speed: 1,
                                        sync: false
                                    }
                                }
                            },
                            
                            },
                        interactivity: {
                            events: {
                                onHover: {
                                    enable: true,
                                    mode: 'repulse'
                                },
                                onClick: {
                                    enable: false
                                },
                                resize: true
                            },
                            modes: {
                                repulse: {
                                    distance: 50,
                                    duration: 0.4
                                }
                            }
                        },
                        detectRetina: true
                    }}
                />
                {/* Mobile Navigation Menu */}
                <div className='lg:hidden z-30'>
                    <Navigation
                        navItems={navItems}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                        indexOffset={0}
                    />
                </div>

                {/* Left-aligned Navigation */}
                <div className='hidden lg:flex z-31'>
                    <Navigation
                        navItems={leftNavItems}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                        indexOffset={0}
                    />

                </div>
                
  
                {/* Centered Logo */}
                <div className='z-25 self-end'>
                    <Link href={'/'}>
                        <Logo src="/ATEMU-TEXT.png" alt="Atemu Logo" width={70} height={141} className='w-45 h-auto'/>
                    </Link>
                </div>

                {/* Right-aligned Navigation */}
                
                <div className="hidden lg:flex z-31">
                    <Navigation
                        navItems={rightNavItems}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                        indexOffset={leftNavItems.length}
                    />
                </div>

                <div className='lg:hidden w-12'>

                </div>

                
            </div>

        </header>


    );
};

export default Header;