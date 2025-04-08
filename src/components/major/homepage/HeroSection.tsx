import Image from "next/image";
import Button from "@/components/ui/Button";
import TextLogo from "@/components/ui/AtemuTextLogo";



export default function HeroSection() {
  return (
    <section className="bg-[url('/Greece.png')] bg-center bg-no-repeat bg-cover h-[980px] w-full">
      <div
        className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/90"
        aria-hidden="true" // Hide from screen readers as it's decorative
      ></div>
      <div className="relative z-10 flex flex-col items-center">
        <TextLogo src="/ATEMU-TEXT.png" width={300} height={111} alt="atemutextlogo" className="mt-60"/>
        <p className="text-sm font-space text-center mt-10 mb-2">The First Fully On-Chain Card Game on Starknet</p>
        <p className="text-sm font-space text-center">Where Strategy Meets Legends and Your Cards fuel Battles</p>
        
      </div>
      <div className="relative z-10 flex justify-center mt-110">
        <Button className="">
            Play now
        </Button>
      </div>
    </section>
  );
}