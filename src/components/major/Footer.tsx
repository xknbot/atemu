import Image from 'next/image';
import Link from 'next/link'; 
import styles from '@/styles/footer.module.css'; 

const Footer = () => {
    return (
        <footer className='h-[500px] w-full bg-[#131417] font-space flex flex-col justify-between py-15 px-5 border-t-2 border-t-[#E8B77C]'> 
            <Link href={'/'}>
                <Image src='/ATEMU-TEXT.png' width={160} height={60} alt='atemutextlogo' />
            </Link>
            <div className="grid grid-cols-2 grid-rows-3 gap-5 text-xs ">
                <Link href={'/'} className='text-left'>ABOUT</Link>
                <Link href={'/'} className="text-right">MARKETPLACE</Link>
                <Link href={'/'} className='text-left'>VISION</Link>
                <Link href={'/'} className="text-right">SUPPORT</Link>
                <Link href={'/'} className='text-left'>COMMUNITY</Link>
                <Link href={'/'} className="text-right">PRIVACY POLICY</Link>
                
            </div>

            <p className="text-center text-xs">COPYRIGHT 2025 ATEMU. ALL RIGHT RESERVED.</p>
        </footer>
    )
}

export default Footer;