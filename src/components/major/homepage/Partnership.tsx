'use client'

import Image from 'next/image';

// Define the partner data for each row
const partnersRow1 = [
  { id: 1, src: '/partnership/10kswap.jpg', alt: 'Partner 1' },
  { id: 2, src: '/partnership/lambda.jpg', alt: 'Partner 2' },
  { id: 3, src: '/partnership/forceprime.jpg', alt: 'Partner 3' },
  { id: 4, src: '/partnership/zkx.jpg', alt: 'Partner 4' },
  { id: 5, src: '/partnership/rabbitx.jpg', alt: 'Partner 5' },
  { id: 6, src: '/partnership/cryptorover.png', alt: 'Partner 6' },
];

const partnersRow2 = [
  { id: 7, src: '/partnership/elibensasson.jpg', alt: 'Partner 7' },
  { id: 8, src: '/partnership/strkfoundation.png', alt: 'Partner 8' },
  { id: 9, src: '/partnership/strkdefi.png', alt: 'Partner 9' },
  { id: 10, src: '/partnership/robert.png', alt: 'Partner 10' },
  { id: 11, src: '/partnership/nurstar.jpg', alt: 'Partner 11' },
  { id: 12, src: '/partnership/antiyro.jpg', alt: 'Partner 12' },
];

const partnersRow3 = [
  { id: 13, src: '/partnership/zklend.png', alt: 'Partner 13' },
  { id: 14, src: '/partnership/catridge.jpg', alt: 'Partner 14' },
  { id: 15, src: '/partnership/gyan.jpg', alt: 'Partner 15' },
  { id: 16, src: '/partnership/starknetid.jpg', alt: 'Partner 16' },
  { id: 17, src: '/partnership/nethermindeth.png', alt: 'Partner 17' },
  { id: 18, src: '/partnership/focustree.jpg', alt: 'Partner 18' },
];

const Partnership = () => {
    return (
        <section className='w-full py-20 overflow-hidden bg-gradient-to-b from-[#E8B77c] from-3% to-[#131417] to-25%'>
            <p className='text-[29px] pb-20 flex justify-center text-center text-[#1886F1] tracking-wide'>Our Partners</p>

            {/* Row 1 - Moving Left to Right */}
            <div className="relative w-full overflow-hidden mb-12">
                <div className="flex animate-marquee">
                    {/* First set of partners */}
                    {partnersRow1.map((partner) => (
                        <div 
                            key={partner.id} 
                            className="flex-shrink-0 mx-4 w-[100px] h-[100px] flex items-center justify-center"
                        >
                            <div className="w-full h-full backdrop-blur-sm bg-transparent rounded-lg border border-[#1886F1] flex items-center justify-center p-4 hover:bg-white/20 transition-all duration-300">
                                <Image 
                                    src={partner.src} 
                                    alt={partner.alt} 
                                    width={150} 
                                    height={60} 
                                    className="object-contain w-fit max-h-[80px] rounded-full"
                                />
                            </div>
                        </div>
                    ))}
                    
                    {/* Duplicate set for seamless looping */}
                    {partnersRow1.map((partner) => (
                        <div 
                            key={`dup-${partner.id}`} 
                            className="flex-shrink-0 mx-4 w-[100px] h-[100px] flex items-center justify-center"
                        >
                            <div className="w-full h-full backdrop-blur-sm bg-transparent rounded-lg border border-[#1886F1] flex items-center justify-center p-4 hover:bg-white/20 transition-all duration-300">
                                <Image 
                                    src={partner.src} 
                                    alt={partner.alt} 
                                    width={150} 
                                    height={60} 
                                    className="object-contain w-fit max-h-[80px] rounded-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Row 2 - Moving Right to Left */}
            <div className="relative w-full overflow-hidden mb-12">
                <div className="flex animate-marquee-reverse">
                    {/* First set of partners */}
                    {partnersRow2.map((partner) => (
                        <div 
                            key={partner.id} 
                            className="flex-shrink-0 mx-4 w-[180px] h-[100px] flex items-center justify-center"
                        >
                            <div className="w-full h-full backdrop-blur-sm bg-transparent rounded-lg border border-[#1886F1] flex items-center justify-center p-4 hover:bg-white/20 transition-all duration-300">
                                <Image 
                                    src={partner.src} 
                                    alt={partner.alt} 
                                    width={150} 
                                    height={60} 
                                    className="object-contain w-fit max-h-[80px] rounded-full"
                                />
                            </div>
                        </div>
                    ))}
                    
                    {/* Duplicate set for seamless looping */}
                    {partnersRow2.map((partner) => (
                        <div 
                            key={`dup-${partner.id}`} 
                            className="flex-shrink-0 mx-4 w-[180px] h-[100px] flex items-center justify-center"
                        >
                            <div className="w-full h-full backdrop-blur-sm bg-transparent rounded-lg border border-[#1886F1] flex items-center justify-center p-4 hover:bg-white/20 transition-all duration-300">
                                <Image 
                                    src={partner.src} 
                                    alt={partner.alt} 
                                    width={150} 
                                    height={60} 
                                    className="object-contain w-fit max-h-[80px] rounded-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Row 3 - Moving Left to Right */}
            <div className="relative w-full overflow-hidden">
                <div className="flex animate-marquee">
                    {/* First set of partners */}
                    {partnersRow3.map((partner) => (
                        <div 
                            key={partner.id} 
                            className="flex-shrink-0 mx-4 w-[100px] h-[100px] flex items-center justify-center"
                        >
                            <div className="w-full h-full backdrop-blur-sm bg-transparent rounded-lg border border-[#1886F1] flex items-center justify-center p-4 hover:bg-white/20 transition-all duration-300">
                                <Image 
                                    src={partner.src} 
                                    alt={partner.alt} 
                                    width={150} 
                                    height={60} 
                                    className="object-contain w-fit max-h-[80px] rounded-full"
                                />
                            </div>
                        </div>
                    ))}
                    
                    {/* Duplicate set for seamless looping */}
                    {partnersRow3.map((partner) => (
                        <div 
                            key={`dup-${partner.id}`} 
                            className="flex-shrink-0 mx-4 w-[100px] h-[100px] flex items-center justify-center"
                        >
                            <div className="w-full h-full backdrop-blur-sm bg-transparent rounded-lg border border-[#1886F1] flex items-center justify-center p-4 hover:bg-white/20 transition-all duration-300">
                                <Image 
                                    src={partner.src} 
                                    alt={partner.alt} 
                                    width={150} 
                                    height={60} 
                                    className="object-contain w-fit max-h-[80px] rounded-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partnership;