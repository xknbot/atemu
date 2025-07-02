import Image from "next/image";
import Link from "next/link";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RxDiscordLogo } from "react-icons/rx";
import { LiaTelegramPlane } from "react-icons/lia";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#131417] from-0% via-[#E9312B]/10 via-9% to-[#131417] to-100% relative h-[570px] w-full flex flex-col justify-around items-center py-3 px-10 border-t-1 border-t-[#E8B77C]/50 overflow-hidden">
      <div className="relative z-10 flex flex-col justify-around items-center h-full w-full">
        {/* Follow us social media */}
        <p className="text-[25px]">Follow us:</p>
        <div className="flex items-center gap-3 md:gap-10">
          <Link
            href={"/"}
            aria-label="Facebook"
            className="bg-[#131417] text-[#E8B77C] w-15 h-15 lg:w-10 lg:h-10 rounded-3xl flex justify-center items-center"
          >
            <TiSocialFacebookCircular className="text-[50px] lg:text-[35px]" />
          </Link>
          <Link
            href={"/"}
            aria-label="Instagram"
            className="bg-[#131417] text-[#E8B77C] w-15 h-15 lg:w-10 lg:h-10 rounded-3xl flex justify-center items-center"
          >
            <FaInstagram className="text-[40px] lg:text-[35px]" />
          </Link>
          <Link
            href="https://x.com/Atemu_world"
            aria-label="Twitter"
            className="bg-[#131417] text-[#E8B77C] w-15 h-15 lg:w-10 lg:h-10 rounded-3xl flex justify-center items-center"
          >
            <FaXTwitter className="text-[40px] lg:text-[35px]" />
          </Link>
          <Link
            href="https://discord.gg/ZJXMJtYztA"
            aria-label="Discord"
            className="bg-[#131417] text-[#E8B77C] w-15 h-15 lg:w-10 lg:h-10 rounded-3xl flex justify-center items-center"
          >
            <RxDiscordLogo className="text-[40px] lg:text-[35px]" />
          </Link>
          <Link
            href={"/"}
            aria-label="Telegram"
            className="bg-[#131417] text-[#E8B77C] w-15 h-15 lg:w-10 lg:h-10 rounded-3xl flex justify-center items-center"
          >
            <LiaTelegramPlane className="text-[40px] lg:text-[35px]" />
          </Link>
        </div>

        {/* Footer content */}
        <div className="grid h-50 w-full grid-cols-2 grid-rows-4 text-[20px] place-content-between lg:hidden">
          <p className="text-left text-[23px] text-[#faf0fa]/50 ">Company</p>
          <p className="text-right text-[23px] text-[#faf0fa]/50 ">
            Brands & Partners
          </p>
          <Link href={"/"} className="text-left">
            About
          </Link>
          <div className="flex items-center justify-end gap-5">
            <p></p>
            <Image
              src="/SN.webp"
              alt="brand1"
              width={120}
              height={50}
              className="mt-15"
            />
          </div>
          <Link href={"/"} className="text-left ">
            Support
          </Link>
          <Link href={"/"} className="text-right "></Link>
          <Link href={"/"} className="text-left ">
            Contact us
          </Link>
          <div className="flex items-center justify-end"></div>
        </div>

        <div className="hidden lg:flex lg:items-center lg:justify-center lg:w-[70%] lg:h-[50%] lg:text-[20px] ">
          <div className="hidden lg:flex lg:w-full lg:h-[50%] lg:items-start lg:justify-center">
            <p className="hidden lg:block lg:w-[30%] lg:h-[50%] lg:text-[22px] lg:text-[#faf0fa]/50">
              Company
            </p>

            <div className="hidden lg:flex lg:flex-col lg:gap-2 lg:w-[30%] lg:h-[30%]">
              <Link
                href={"/"}
                className="text-left relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-[30%] h-[1px] bg-[#e8b77c] transform scale-x-0 group-hover:scale-x-100 transition-transform 
     duration-300 ease-out" />
              </Link>
              
              <Link
                href={"/"}
                className="text-left relative group"
              >
                Support
                <span className="absolute bottom-0 left-0 w-[40%] h-[1px] bg-[#e8b77c] transform scale-x-0 group-hover:scale-x-100 transition-transform 
     duration-300 ease-out" />
              </Link>
              <Link
                href={"/"}
                className="relative group"
              >
                Contact us
                <span className="absolute bottom-0 left-0 w-[58%] h-[1px] bg-[#e8b77c] transform scale-x-0 group-hover:scale-x-100 transition-transform 
     duration-300 ease-out" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex lg:flex-col lg:w-full lg:h-[50%] lg:items-center lg:justify-start">
            <p className="hidden lg:block lg:w-full lg:h-[50%] lg:text-[22px] lg:text-[#faf0fa]/50 lg:text-center">
              Brands & Partners
            </p>

            <div className="hidden lg:flex lg:justify-between lg:items-center lg:w-[35%] lg:h-[17%]">
              <p></p>
              <Image
                src="/SN.webp"
                alt="brand1"
                width={150}
                height={50}
                className="mr-3"
              />
            </div>
          </div>
        </div>

        {/* coopyright */}
        <p className="text-center text-[17px] text-[#faf0fa]/40">
          © 2025 ATEMU, Blockchain TCG. RYG.Labs.
        </p>

        {/* security */}
        <div className="flex items-center gap-10 text-[15px] text-center text-[#faf0fa]/30">
          <Link
            href={"/"}
            className=" relative group"
          >
            PRIVACY CENTER
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#393939] transform scale-x-0 group-hover:scale-x-100 transition-transform 
     duration-300 ease-out" />
          </Link>
          <Link
            href={"/"}
            className=" relative group"
          >
            CODE OF CONDUCT
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#393939] transform scale-x-0 group-hover:scale-x-100 transition-transform 
     duration-300 ease-out" />
          </Link>
          <Link
            href={"/"}
            className=" relative group"
          >
            TERMS OF USE
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#393939] transform scale-x-0 group-hover:scale-x-100 transition-transform 
     duration-300 ease-out" />
          </Link>
          <Link
            href={"/"}
            className="relative group"
          >
            COOKIE POLICY
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#393939] transform scale-x-0 group-hover:scale-x-100 transition-transform 
     duration-300 ease-out" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
