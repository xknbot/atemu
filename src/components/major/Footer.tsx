import Image from 'next/image';
import Link from 'next/link'; 
import styles from '@/styles/footer.module.css'; 

const Footer = () => {
    return (
        <footer className={styles.footer}> 
            <Link href={'/'}>
                <Image src='/ATEMU-TEXT.png' width={160} height={60} alt='atemutextlogo' />
            </Link>
            <div className={styles.footerLink}>
                <Link href={'/'} className={styles.footerLink_item}>ABOUT</Link>
                <Link href={'/'} className={styles.footerLink_item}>MARKETPLACE</Link>
                <Link href={'/'} className={styles.footerLink_item}>VISION</Link>
                <Link href={'/'} className={styles.footerLink_item}>SUPPORT</Link>
                <Link href={'/'} className={styles.footerLink_item}>COMMUNITY</Link>
                <Link href={'/'} className={styles.footerLink_item}>PRIVACY POLICY</Link>
                
            </div>

            <p className={styles.copyright}>COPYRIGHT 2025 ATEMU. ALL RIGHT RESERVED.</p>
        </footer>
    )
}

export default Footer;