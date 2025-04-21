import Image from 'next/image';
import Link from 'next/link'; 
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RxDiscordLogo } from "react-icons/rx";
import { LiaTelegramPlane } from "react-icons/lia";



const Footer = () => {
    return (
        <footer className='relative h-[500px] w-full font-fe flex flex-col justify-around items-center py-3 px-10 border-t-2 border-t-[#E8B77C] overflow-hidden'> 
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url(/Hell-Born.avif)] bg-cover bg-no-repeat bg-center"></div>
                {/* Dimmed overlay */}
                <div className="absolute inset-0"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                ></div>
            </div>
            
            <div className='relative z-10 flex flex-col justify-around items-center h-full w-full'>
                <div className='flex justify-center items-center gap-5'>
                    <div className='bg-[#444656] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center'>
                        <Link href={'/'} aria-label='Facebook'>
                            <TiSocialFacebookCircular className='text-[30px]'/>
                        </Link>
                    </div>
                    <div className='bg-[#444656] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center'>
                        <Link href={'/'} aria-label='Instagram' >
                            <FaInstagram className='text-[30px]'/>
                        </Link>
                    </div>
                    <div className='bg-[#444656] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center'>
                        <Link href={'/'} aria-label='Twitter'>
                            <FaXTwitter className='text-[30px]'/>
                        </Link>
                    </div>
                    <div className='bg-[#444656] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center'>
                        <Link href={'/'} aria-label='Discord'>
                            <RxDiscordLogo className='text-[30px]'/>
                        </Link>
                    </div>
                    <div className='bg-[#444656] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center'>
                        <Link href={'/'} aria-label='Telegram'>
                            <LiaTelegramPlane className='text-[30px]'/>
                        </Link>
                    </div>
                </div>
                <Link href={'/'}>
                    <Image src='/ATEMU-TEXT.png' width={160} height={60} alt='atemutextlogo' />
                </Link>
                <div className="grid grid-cols-2 grid-rows-3 gap-10 text-[15px] font-deswash ">
                    <Link href={'/'} className='text-left'>About</Link>
                    <Link href={'/'} className="text-right">Marketplace</Link>
                    <Link href={'/'} className='text-left'>Terms of Use</Link>
                    <Link href={'/'} className="text-right">Support</Link>
                    <Link href={'/'} className='text-left'>Community</Link>
                    <Link href={'/'} className="text-right">Privacy Policy</Link>
                
                </div>
                <p className="text-center text-[15px] font-fe">© 2025 Atemu. All Right Reserved</p>
            </div>
        </footer>
    )
}

export default Footer;