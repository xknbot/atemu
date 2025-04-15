'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';
import Logo from '@/components/ui/AtemuLogo';
import Navigation from '@/components/ui/Navigation';


const Header: React.FC = () => {
    const myNavLinks = [
    { href: '/', label: 'Cards' },
    { href: '/gameplay', label: 'Gameplay' },
    { href: '/marketplace', label: 'Marketplace' },
    ];
    
    return (
        <>
            

            <header className='sticky top-0 z-40 w-full h-25 flex flex-col '>
                {/* row 1: Partner */}
                <div className='flex justify-center items-center gap-1 w-full h-12 bg-linear-to-b from-[#131417] from-10% to-[#444656] to-100% px-10'>
                    <p className='text-[15px]'>POWERED BY</p>
                    <Image src='/STARKNET-LOGO.png' width={99} height={34} alt='starknetlogo'/>    
                </div>

                {/* row 2: Header */}
                <div className='relative flex items-center w-full h-13'>
                    <div className='absolute w-full h-13 bg-[#faf0fa] z-0'>
                    </div>

                    <div className='relative z-10 flex items-center justify-between w-full h-13 px-4'>
                        <div className='flex-shrink-0'>
                            <Link href={'/'}>
                                <Logo src="/LOGO.png" alt="Atemu Logo" width={75} height={141} />
                            </Link>
                        </div>
                    
                        {/* Center: Desktop Navigation (Visible lg and up) */}
                        <nav className="hidden md:flex items-center gap-7 mr-auto ml-10"> {/* Show only on lg+ */}
                            {myNavLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-white hover:text-gray-300 font-deswash text-sm" // Example styling
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    
                        <div className='flex items-center justify-end w-full gap-3 lg:w-auto'>
                            <Button className="mx-auto">
                                PLAY NOW
                            </Button>
                            <div className='md:hidden mt-1'>
                                <Navigation links={myNavLinks} />
                            </div>
                        </div>
                    </div>
                </div>
            </header> 
        </>
    );
};

export default Header;