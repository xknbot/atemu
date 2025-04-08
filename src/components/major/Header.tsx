'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';
import Logo from '@/components/ui/AtemuLogo';
import Navigation from '@/components/ui/Navigation';


const Header: React.FC = () => {
    const myNavLinks = [
    { href: '/', label: 'CARDS' },
    { href: '/gameplay', label: 'GAMEPLAY' },
    { href: '/marketplace', label: 'MARKETPLACE' },
    ];
    
    return (
        <>
            {/* row 1: Partner */}
            <div className='flex justify-center items-center gap-3 w-full h-[62px]'>
                <p className='text-[12px]'>POWERED BY</p>
                <Image src='/STARKNET-LOGO.png' width={149} height={34} alt='starknetlogo'/>    
            </div>

            {/* row 2: Header */}
            <header className='sticky top-10 z-40 flex justify-between items-center w-full h-20'>
                <div className='absolute inset-0 w-full h-full bg-[url(/main-page.png)] bg-cover bg-no-repeat bg-[position:0%_10%] md:bg-[position:0%_13%] z-0 blur-[5px]'></div>
                    <div className='relative z-10 flex items-center w-full px-7'>
                        <div className='flex-shrink-0'>
                            <Link href={'/'}>
                                <Logo src="/LOGO.png" alt="Atemu Logo" width={100} height={141} />
                            </Link>
                        </div>
                    
                        {/* Center: Desktop Navigation (Visible lg and up) */}
                        <nav className="hidden md:flex items-center gap-7 mr-auto ml-10"> {/* Show only on lg+ */}
                            {myNavLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-white hover:text-gray-300 font-space text-sm" // Example styling
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                         
                        <div className='flex items-center justify-end w-full gap-7 lg:w-auto'>
                            <Button className="mx-auto">
                                Play now
                            </Button>
                            <div className='md:hidden mt-1'>
                                <Navigation links={myNavLinks} />
                            </div>
                        </div>
                    </div>
            </header> 
        </>
    );
};

export default Header;