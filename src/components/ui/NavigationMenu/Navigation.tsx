"use client";

// import section
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Link from "next/link";
import Logo from "../AtemuLogo";

import { TiSocialFacebookCircular } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RxDiscordLogo } from "react-icons/rx";
import { LiaTelegramPlane } from "react-icons/lia";
import { TfiSearch } from "react-icons/tfi";

import Form from "next/form";

import gsap from "gsap";
import { hover } from "framer-motion";

// Define the structure for navigation items
interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

// Props for Navigation component
interface NavigationProps {
  navItems?: NavItem[];
  className?: string;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  indexOffset?: number;
}

// Default navigation items
const defaultNavItems: NavItem[] = [
  {
    label: "Play",
    href: "https://atemu.xyz",
    subItems: [
      {
        label: "Cards Database",
        href: "#cardsdatabase",
        subItems: [
          { label: "Card Packs", href: "#cardpacks" },
          { label: "Egypt", href: "#egypt" },
          { label: "Greece", href: "#greece" },
          { label: "Hellborn", href: "#hellborn" },
          { label: "Shinto", href: "#shinto" },
          { label: "Viking", href: "#viking" },
        ],
      },
      {
        label: "Getting Started",
        href: "#foradvanced",
        subItems: [
          { label: "FAQ", href: "#faq" },
          { label: "Keyword Glossary", href: "#glossary" },
          { label: "Rules", href: "#rules" },
        ],
      },
    ],
  },
  {
    label: "Store",
    href: "#store",
    subItems: [
      { label: "Flex Marketplace", href: "https://hyperflex.market/" },
      { label: "Transactions History", href: "#transactionshistory" },
    ],
  },
  {
    label: "News",
    href: "#news",
    subItems: [
      { label: "Latest News", href: "#latestnews" },
      { label: "Announcements", href: "#announcements" },
      { label: "Lore", href: "#lore" },
    ],
  },
  {
    label: "Events",
    href: "#events",
    subItems: [{ label: "Coming soon", href: "#comingsoon" }],
  },
];

// Navigation component
const Navigation: React.FC<NavigationProps> = ({
  navItems = defaultNavItems,
  className = "",
  hoveredIndex,
  setHoveredIndex,
  indexOffset = 0, // Offset for right navigation items
}) => {
  const memoizedNavItems = useMemo(() => navItems, [navItems]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  // Toggle menu
  const toggleMenu = useCallback(() => {
    // setIsOpen((prev) => !prev);
    setIsOpen((prev) => {
      if (!prev) {
        // If opening the menu
        setOpenAccordionIndex(null); // reset accordion state when menu opens
      }
      return !prev;
    });
  }, []);

  // Toggle accordion
  const handleAccordionToggle = useCallback(
    (index: number) => {
      setOpenAccordionIndex(openAccordionIndex === index ? null : index);
    },
    [openAccordionIndex],
  );

  // Set up GSAP time   lines
  const menuTl = useRef(
    gsap.timeline({
      paused: true,
    }),
  );

  // initial GSAP setup whole menu animation
  useEffect(() => {
    // Reset timeline
    menuTl.current.clear();

    // Create a new timeline for menu animations
    menuTl.current
      .to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.4,
        ease: "power2.inOut",
        willChange: "opacity",
      })
      .to(
        navRef.current,
        { x: 0, duration: 0.8, ease: "power2.out", willChange: "transform" },
        "-=0.1",
      )
      .fromTo(
        menuItemsRef.current.filter((item) => item !== null), // filter out null items
        { x: -20, autoAlpha: 0 }, // Start state
        // End state
        {
          x: 0,
          autoAlpha: 1,
          stagger: 0.2,
          duration: 0.3,
          ease: "power2.out",
          willChange: "transform, opacity",
        },
        "-=0.1",
      );
    // Set initial states
    gsap.set(overlayRef.current, { autoAlpha: 0, willChange: "opacity" });
    gsap.set(navRef.current, { x: "-100%", willChange: "transform" });
    gsap.set(
      menuItemsRef.current.filter((item) => item !== null),
      { autoAlpha: 0 },
    );

    // Capture the ref value here
    const menuTimeline = menuTl.current;

    return () => {
      menuTimeline.kill();
    };
  }, [navItems]);

  // Play/reverse animation when menu state changes
  useEffect(() => {
    if (isOpen) {
      menuTl.current.play();
      document.body.style.overflow = "hidden";
    } else {
      menuTl.current.reverse().then(() => {
        setOpenAccordionIndex(null); // Reset accordion state when menu closed
      });
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Nested Accordion component for sub-items
  const NestedAccordion = ({ items }: { items: NavItem[] }) => {
    const [openSubIndex, setOpenSubIndex] = useState<number | null>(null);
    const subMenuRef = useRef<HTMLDivElement>(null); // Ref for the sublist container
    const subTl = useRef(gsap.timeline({ paused: true })); // GSAP timeline for sub-animations

    const handleSubToggle = (index: number) => {
      setOpenSubIndex(openSubIndex === index ? null : index);
    };

    // Set up GSAP animation for sublists
    useEffect(() => {
      subTl.current.clear(); // Clear previous timeline
      if (subMenuRef.current) {
        subTl.current.fromTo(
          subMenuRef.current,
          { height: 0, autoAlpha: 0, overflow: "hidden" }, // Start state: hidden
          { height: "auto", autoAlpha: 1, duration: 0.5, ease: "power2.out" }, // End state: visible
        );
      }

      if (openSubIndex !== null) {
        subTl.current.play(); // Play animation when opening
      } else {
        subTl.current.reverse(1); // Reverse animation when closing
      }

      // Capture the ref value here
      const subTimeline = subTl.current;

      return () => {
        subTimeline.kill();
      }; // Clean up on unmount
    }, [openSubIndex]); // Re-run when openSubIndex changes

    return (
      <ul className=" mt-2 space-y-2 inset-shadow-xs inset-shadow-[#e8b77c]/50 py-3 px-6">
        {items.map((item, index) => (
          <li key={item.label + index}>
            {item.subItems ? (
              // Accordion header for items with subItems
              <button
                onClick={() => handleSubToggle(index)}
                className="text-[20px] text-[#faf0fa] flex justify-between items-center w-full border-b-1 border-[#393939] py-1"
              >
                {item.label}
                <span className="text-[25px]">
                  {openSubIndex === index ? "−" : "+"}
                </span>{" "}
                {/* Toggle icon */}
              </button>
            ) : (
              // Regular link for items without subItems
              <Link
                href={item.href}
                className="text-[20px] text-[#faf0fa] block py-1 border-b-1 border-[#393939]"
                onClick={toggleMenu} // Close menu on click
              >
                {item.label}
              </Link>
            )}

            {item.subItems && openSubIndex === index && (
              <div ref={subMenuRef} className="mt-2">
                <NestedAccordion items={item.subItems} />
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  // Render the HamburgerMenu component
  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* Hamburger Button */}
      <button
        className="lg:hidden p-2 focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-6 flex flex-col justify-between">
          <span
            className={`h-1 w-full bg-white border-t border-[#E8B77C] rounded-[1px] transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
          ></span>
          <span
            className={`h-1 w-full bg-white border-t border-[#E8B77C] rounded-[1px] transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
          ></span>
          <span
            className={`h-1 w-full bg-white border-t border-[#E8B77C] rounded-[1px] transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
          ></span>
        </div>
      </button>

      {/* Mobile Navigation Menu Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-40 transform transition-transform duration-300 lg:hidden opacity-0 invisible ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ visibility: "hidden" }}
      >
        <nav
          ref={navRef}
          className="fixed top-0 left-0 h-screen w-screen max-w-screen bg-[#131417] z-50"
        >
          {/* Close Button and Search Bar */}
          <div className="flex justify-between items-center p-4">
            <button
              onClick={toggleMenu}
              className="text-[#faf0fa]"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <Form
              action="/search"
              className="flex items-center justify-between bg-[#e8b77c]/5 rounded-full py-4 px-8 gap-3
                        "
            >
              {/* On submission, the input value will be appended to
                                the URL, e.g. /search?query=abc */}
              <input
                name="query"
                type="text"
                placeholder="Search..."
                className="text-[25px] border-none focus:outline-none"
              />
              <button type="submit">
                <TfiSearch className="w-8 h-8" />
              </button>
            </Form>
          </div>

          {/* Logo */}
          <div className="flex justify-center items-center my-10">
            <Link href="/">
              <Logo
                src="/ATEMU-TEXT.png"
                alt="Atemu Logo"
                width={70}
                height={141}
                className={`w-45 h-auto transition-all duration-1500 opacity-0 ${isOpen ? "opacity-100" : ""}`}
              />
            </Link>
          </div>

          {/* Navigation links */}
          <div className="py-10 px-5">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <li
                  key={item.label + index}
                  ref={(el) => {
                    menuItemsRef.current[index] = el;
                  }}
                >
                  {item.subItems ? (
                    // Accordion header for items with subItems
                    <button
                      onClick={() => handleAccordionToggle(index)}
                      className="text-[25px] text-[#faf0fa] flex justify-between items-center w-full border-b-1 border-[#E8B77C] py-4"
                    >
                      {item.label}
                      <span className="text-[35px]">
                        {openAccordionIndex === index ? "−" : "+"}
                      </span>{" "}
                      {/* Simple toggle icon */}
                    </button>
                  ) : (
                    // Regular link for items without subItems
                    <Link
                      href={item.href}
                      className="text-[25px] text-[#faf0fa]"
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.subItems && openAccordionIndex === index && (
                    <NestedAccordion items={item.subItems} />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="absolute w-full px-4 bg-[#131417] mt-8">
            <div className="border-t border-[#e8b77c]/20 pt-8">
              <div className="flex justify-center items-center gap-10 md:gap-10">
                <Link
                  href={"/"}
                  aria-label="Facebook"
                  className="bg-[#131417] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center"
                >
                  <TiSocialFacebookCircular className="text-[40px]" />
                </Link>
                <Link
                  href={"/"}
                  aria-label="Instagram"
                  className="bg-[#131417] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center"
                >
                  <FaInstagram className="text-[30px]" />
                </Link>
                <Link
                  href={"/"}
                  aria-label="Twitter"
                  className="bg-[#131417] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center"
                >
                  <FaXTwitter className="text-[30px]" />
                </Link>
                <Link
                  href={"/"}
                  aria-label="Discord"
                  className="bg-[#131417] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center"
                >
                  <RxDiscordLogo className="text-[30px]" />
                </Link>
                <Link
                  href={"/"}
                  aria-label="Telegram"
                  className="bg-[#131417] text-[#E8B77C] w-12 h-12 rounded-3xl flex justify-center items-center"
                >
                  <LiaTelegramPlane className="text-[30px]" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:block">
        <ul className="flex space-x-8">
          {memoizedNavItems.map((item, index) => {
            const uniqueIndex = index + indexOffset;

            return (
              <li
                key={index}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative p-4"
              >
                <Link
                  href={item.href}
                  className="text-[20px] text-[#faf0fa] group"
                  onMouseEnter={() => setHoveredIndex(uniqueIndex)}
                >
                  <span className="relative inline-block">
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 block w-0 h-[1px] bg-[#e8b77c] transition-all duration-700 ease-in-out ${hoveredIndex === uniqueIndex ? "w-full" : "w-0"}`}
                    ></span>
                  </span>
                </Link>

                {item.subItems && (
                  <div className="absolute top-full left-0 pt-2">
                    <ul
                      className={`bg-[#131417] p-4 w-max pt-6 transition-all duration-700 ease-in-out
                    ${hoveredIndex === uniqueIndex ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
                    >
                      {item.subItems?.map((subItem, subIndex) => (
                        <li key={subIndex} className="">
                          <Link
                            href={subItem.href}
                            className="block py-3 px-4 text-gray-300 transition-all duration-700 ease-in-out hover:text-[#faf0fa] group"
                          >
                            <span className="relative inline-block">
                              {subItem.label}
                              <span className="absolute -bottom-1 left-0 block w-0 h-[1px] bg-[#393939] transition-all duration-700 ease-in-out group-hover:w-full"></span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
