'use client'

import React, { useCallback } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/AtemuLogo';
import Navigation from '@/components/ui/Navigation';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import HamburgerMenu from '../ui/HamburgerMenu';




const Header: React.FC = () => {
    // const myNavLinks = [
    // { href: '/', label: 'Home' },
    // { href: '/howtoplay', label: 'How to Play' },
    // { href: '/cards', label: 'Cards' },
    // { href: '/marketplace', label: 'Marketplace' },
    // { href: '/community', label: 'Community' },
    // { href: '/supportnnews', label: 'Support & News' },
    
    // ];

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    
    return (


        <header className='sticky top-0 z-50 w-full'>

            {/* row 2: Header */}
            <div className='relative flex items-center w-full h-20 bg-[#131417]/90 backdrop-blur-md px-7 z-0 border-b-1 border-[#E8B77C]/60'>
                <div className="absolute inset-0 w-full h-full z-10">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 
                                    bg-gradient-to-t from-[#E9312B]/20 via-[#1886F1]/20 to-transparent 
                                    rounded-full blur-2xl mix-blend-soft-light glow-animation" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 
                                    bg-radial-gradient(circle_at_center, #1886F1/20 0%, transparent 70%) 
                                    blur-xl mix-blend-soft-light glow-animation" />
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
                                value: 400,
                                density: {
                                    enable: true,
                                    value_area: 1000
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
                                value: { min: 0.1, max: 1 },
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
                                speed: { min: 0.5, max: 0.7 },
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
                <div className='relative flex items-center justify-start gap-3 z-50 ml-auto'>
                    <div className='lg:hidden mt-1'>
                        <HamburgerMenu className='' />
                    </div>

                </div>
                
  
                {/* Centered Logo */}
                <div className='z-30 absolute left-1/2 -translate-x-1/2 translate-y-4.5'>
                    <Link href={'/'}>
                    <Logo src="/ATEMU-TEXT.png" alt="Atemu Logo" width={70} height={141} className='w-45 h-auto'/>
                    </Link>
                </div>

                {/* Right-aligned Navigation */}
                
                <div className="flex-1"></div>
            </div>

        </header>


    );
};

export default Header;