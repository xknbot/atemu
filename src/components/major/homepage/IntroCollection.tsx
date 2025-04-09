import Image from "next/image";




export default function IntroCollection() {
  return (
    <section className="relative w-full">
        <div className="absolute inset-0 top-0 left-0 w-full bg-[#000] h-[980px] blur-2xl z-20"></div>
        <div className="relative inset-1 bg-[#000] w-full h-[980px] flex flex-col justify-center items-center gap-10 md:gap-80 z-21">
            <p className="text-[23px] text-center text-[#E9312B] px-2 md:text-[36px]">ATEMU OG COLLECTION <br/> DROPPING SOON!</p>
            <Image src="/backcard.png" width={300} height={483} alt="backcard"/>
        </div>
          
    </section>
  );
}