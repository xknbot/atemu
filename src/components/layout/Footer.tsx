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
            href={"/"}
            aria-label="Twitter"
            className="bg-[#131417] text-[#E8B77C] w-15 h-15 lg:w-10 lg:h-10 rounded-3xl flex justify-center items-center"
          >
            <FaXTwitter className="text-[40px] lg:text-[35px]" />
          </Link>
          <Link
            href={"/"}
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
              src="/partnership/strkfoundation.avif"
              alt="brand1"
              width={50}
              height={50}
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
                className="text-left hover:underline hover:underline-offset-6"
              >
                About
              </Link>
              <Link
                href={"/"}
                className="text-left hover:underline hover:underline-offset-6"
              >
                Support
              </Link>
              <Link
                href={"/"}
                className="text-left hover:underline hover:underline-offset-6"
              >
                Contact us
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
                src="/partnership/strkfoundation.avif"
                alt="brand1"
                width={50}
                height={50}
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
            className="lg:hover:underline lg:hover:underline-offset-6"
          >
            PRIVACY CENTER
          </Link>
          <Link
            href={"/"}
            className="lg:hover:underline lg:hover:underline-offset-6"
          >
            CODE OF CONDUCT
          </Link>
          <Link
            href={"/"}
            className="lg:hover:underline lg:hover:underline-offset-6"
          >
            TERMS OF USE
          </Link>
          <Link
            href={"/"}
            className="lg:hover:underline lg:hover:underline-offset-6"
          >
            COOKIE POLICY
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
