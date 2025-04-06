'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/styles/header.module.css";
import Button from '../ui/Button';


const Header: React.FC = () => {
    return (
      <div>
            <div className={styles.partner}>
                <p>POWERED BY</p>
                <Image src='/STARKNET-LOGO.png' width={149} height={34} alt='starknetlogo'/>    
          </div>
          <header className={styles.header}>
              <div className={styles.headerBackground}></div>
              <div className={styles.headerContent}>
                  <Link href={'/'} className={styles.logo}>
                      <Image src='/LOGO.png' width={100} height={141} alt='logo'>
                      </Image>
                          </Link>
                        <nav className={styles.navList}>
                          <Link href="/">CARDS</Link>
                          <Link href="/about">GAMEPLAY</Link>
                          <Link href="/contact">MARKETPLACE</Link>
                  </nav>
                  <Button className="mx-auto">
                      Play now
                  </Button>
              </div>
              
              </header>
      </div>
  );
};

export default Header;