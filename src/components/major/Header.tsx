'use client'

import React, { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';
import Logo from '@/components/ui/AtemuLogo';
import Navigation from '@/components/ui/Navigation';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";



const Header: React.FC = () => {
    const myNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/cards', label: 'Cards' },
    { href: '/lore', label: 'Lore' },
    { href: '/gameplay', label: 'Gameplay' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/community', label: 'Community' },
    
    ];

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    
    return (


        <header className='sticky top-0 z-50 w-full'>

            {/* row 1: Partner */}
            <div className=' flex justify-center items-center gap-3 w-full bg-gradient-to-b from-[#131417] from-10% to-[#444656] to-100% px-10 py-1'>
                <p className='text-[16px] font-incon'>POWERED BY</p>
                <Image src='/STARKNET-LOGO.avif' width={99} height={34} alt='starknetlogo'/>
            </div>

            {/* row 2: Header */}
            <div className=' relative flex justify-between items-center w-full h-15 bg-[#131417]/90 backdrop-blur-md px-7 z-40'>
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    className="absolute top-0 left-0 w-full h-full"
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
                <div className='z-20'>
                    <Link href={'/'}>
                        <Logo src="/LOGO.avif" alt="Atemu Logo" width={70} height={141} />
                    </Link>
                </div>
                <div className='relative flex items-center justify-center gap-3 z-20'>
                    <Button className="mx-auto">
                        PLAY FREE
                    </Button>
                    <div className='lg:hidden mt-1'>
                        <Navigation links={myNavLinks} />
                    </div>
        
                </div>
            </div>

        </header>


    );
};

export default Header;