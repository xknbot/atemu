'use client'

import Image from "next/image";
import styles from "../styles/homepage.module.css";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="bg-[#131417]">
      {/* section 1 */}
      <div className={styles.section1}>
        <Image src='/ATEMU-TEXT.png' width={300} height={111} alt="atemu-text-logo" className="mx-auto relative top-1/4"/>
        
        <p className="text-center font-[spaceGames] relative top-80">The First Fully On-Chain Card Game on Starknet</p>
        <p className='text-center font-[spaceGames] relative top-80'>Where Strategy Meets Legends and Your Cards fuel Battles</p>


        <Button className="mx-auto">
          Play now
        </Button>
      </div>

      {/* section 2 */}
      <div className="flex justify-center items-center gap-50 p-50 w-full h-[980px] bg-[#000]">
        <div>
          <p className="text-center text-4xl text-[#E9312B]">ATEMU OG COLLECTION</p>
          <p className="text-center text-2xl text-[#E9312B] mt-5">DROPPING SOON!</p>
        </div>
        <Image src='/backcard.png' width={300} height={483} alt="backcardimg"/>
      </div>

      {/* section 3 */}
      {/* <div className={styles.section3}>
        <p>THE GENESIS OF ATEMU</p>
      </div>  */}

      <div className="bg-atemub-bg"> 
        

      </div>
      
      
      
     
    </div>
  );
}
