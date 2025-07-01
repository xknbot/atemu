'use client'

import {motion} from 'framer-motion';

import Image from 'next/image';

// Define the partner data for each row
const partnersRow1 = [
  { id: 1, src: '/partnership/10kswap.avif', alt: 'Partner 1' },
  { id: 2, src: '/partnership/lambda.avif', alt: 'Partner 2' },
  { id: 3, src: '/partnership/forceprime.avif', alt: 'Partner 3' },
  { id: 4, src: '/partnership/zkx.avif', alt: 'Partner 4' },
  { id: 5, src: '/partnership/rabbitx.avif', alt: 'Partner 5' },
  { id: 6, src: '/partnership/cryptorover.avif', alt: 'Partner 6' },
];

const partnersRow2 = [
  { id: 7, src: '/partnership/elibensasson.avif', alt: 'Partner 7' },
  { id: 8, src: '/partnership/strkfoundation.avif', alt: 'Partner 8' },
  { id: 9, src: '/partnership/strkdefi.avif', alt: 'Partner 9' },
  { id: 10, src: '/partnership/robert.avif', alt: 'Partner 10' },
  { id: 11, src: '/partnership/nurstar.avif', alt: 'Partner 11' },
  { id: 12, src: '/partnership/antiyro.avif', alt: 'Partner 12' },
];

const partnersRow3 = [
  { id: 13, src: '/partnership/zklend.avif', alt: 'Partner 13' },
  { id: 14, src: '/partnership/catridge.avif', alt: 'Partner 14' },
  { id: 15, src: '/partnership/gyan.avif', alt: 'Partner 15' },
  { id: 16, src: '/partnership/starknetid.avif', alt: 'Partner 16' },
  { id: 17, src: '/partnership/nethermindeth.avif', alt: 'Partner 17' },
  { id: 18, src: '/partnership/focustree.avif', alt: 'Partner 18' },
];

const Partnership = () => {
    // Style object for will-change hint
    const marqueeStyle = { willChange: 'transform' };

    return (
        <motion.section
            className='w-full py-20 overflow-hidden bg-gradient-to-b from-[#E8B77c] from-3% to-[#131417] to-25% relative'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
    >
            {/* Background Partnership Image with Inner Shadow */}
            <div className="absolute inset-0 w-full h-full z-0">
                {/* The image */}
                <div className="relative w-full h-full">
                    {/* <Image 
                        src="/elementbg.png" 
                        alt="Partnership" 
                        fill
                        className="object-contain w-full h-full opacity-100"
                        loading="lazy"
                        decoding="async"
                    /> */}
                    {/* Shadow từ trên xuống */}
                    <div className="absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-1"></div>

                    {/* Shadow từ dưới lên */}
                    <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
                </div>
                

                <div className="absolute top-0 left-0 inset-0 shadow-[inset_10px_90px_20px_rgba(0,0,0,0.8)]"></div>

                

                
                {/* Additional inner shadows for more depth */}
                <div className="absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-black/90 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-[180px] bg-gradient-to-t from-black/90` to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-[120px] bg-gradient-to-r from-black/90 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-[120px] bg-gradient-to-l from-black/90 to-transparent"></div>
            </div>

            {/* Content - now with relative z-index to appear above the background */}
            <div className="relative z-10">
                <p className='text-[25px] pb-20 flex justify-center text-center bg-gradient-to-r from-[#E8B77C] to-[#E9312B] text-transparent bg-clip-text tracking-widest font-deswash'>OUR PARTNERS</p>

                {/* Row 1 - Moving Left to Right */}
                <div className="relative w-full overflow-hidden mb-12">
                    <div className="flex animate-marquee" style={marqueeStyle}>
                        {/* First set of partners */}
                        {partnersRow1.map((partner) => (
                            <div 
                                key={partner.id} 
                                className="flex-shrink-0 mx-4 w-[100px] h-[100px] flex items-center justify-center"
                            >
                                <div className="w-full h-full bg-transparent rounded-full border border-[#1886F1] flex items-center justify-center p-4">
                                    <Image 
                                        src={partner.src} 
                                        alt={partner.alt} 
                                        width={150} 
                                        height={60} 
                                        loading='lazy'
                                        decoding='async'
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
                                <div className="w-full h-full bg-transparent rounded-full border border-[#1886F1] flex items-center justify-center p-4 ">
                                    <Image 
                                        src={partner.src} 
                                        alt={partner.alt} 
                                        width={150} 
                                        height={60} 
                                        loading='lazy'
                                        decoding='async'
                                        className="object-contain w-fit max-h-[80px] rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Row 2 - Moving Right to Left */}
                <div className="relative w-full overflow-hidden mb-12">
                    <div className="flex animate-marquee-reverse" style={marqueeStyle}>
                        {/* First set of partners */}
                        {partnersRow2.map((partner) => (
                            <div 
                                key={partner.id} 
                                className="flex-shrink-0 mx-4 w-[100px] h-[100px] flex items-center justify-center"
                            >
                                <div className="w-full h-full bg-transparent rounded-full border border-[#1886F1] flex items-center justify-center p-4 ">
                                    <Image 
                                        src={partner.src} 
                                        alt={partner.alt} 
                                        width={150} 
                                        height={60} 
                                        loading='lazy'
                                        decoding='async'
                                        className="object-contain w-fit max-h-[80px] rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                        
                        {/* Duplicate set for seamless looping */}
                        {partnersRow2.map((partner) => (
                            <div 
                                key={`dup-${partner.id}`} 
                                className="flex-shrink-0 mx-4 w-[100px] h-[100px] flex items-center justify-center"
                            >
                                <div className="w-full h-full bg-transparent rounded-full border border-[#1886F1] flex items-center justify-center p-4 ">
                                    <Image 
                                        src={partner.src} 
                                        alt={partner.alt} 
                                        width={150} 
                                        height={60} 
                                        loading='lazy'
                                        decoding='async'                                    
                                        className="object-contain w-fit max-h-[80px] rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Row 3 - Moving Left to Right */}
                <div className="relative w-full overflow-hidden mb-16">
                    <div className="flex animate-marquee" style={marqueeStyle}>
                        {/* First set of partners */}
                        {partnersRow3.map((partner) => (
                            <div 
                                key={partner.id} 
                                className="flex-shrink-0 mx-4 w-[100px] h-[100px] flex items-center justify-center"
                            >
                                <div className="w-full h-full bg-transparent rounded-full border border-[#1886F1] flex items-center justify-center p-4 ">
                                    <Image 
                                        src={partner.src} 
                                        alt={partner.alt} 
                                        width={150} 
                                        height={60} 
                                        loading='lazy'
                                        decoding='async'                                    
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
                                <div className="w-full h-full bg-transparent rounded-full border border-[#1886F1] flex items-center justify-center p-4 ">
                                    <Image 
                                        src={partner.src} 
                                        alt={partner.alt} 
                                        width={150} 
                                        height={60} 
                                        loading='lazy'
                                        decoding='async'                                    
                                        className="object-contain w-fit max-h-[80px] rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Partnership;