"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image"
import { FlipWords } from "@/components/ui/flip-words";
import { Spotlight } from "@/components/ui/spotlight";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import Carousel from "@/components/ui/carousel";
import { CanvasRevealEffectDemo } from "@/components/canvas";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HoverCard, HoverCardTrigger,HoverCardContent} from "@/components/ui/hover-card";


export default function Home() {
  const headerRef = useRef<HTMLElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);

  const words = ["innovates", "creates", "inspires"];
  const infiniteCards = [
    "Development",
    "UI/UX Design",
    "API Integration",
    "Cloud Solutions",
    "Responsive Design",
    "Animation",
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      imageUrl: "/project1.jpg",
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      imageUrl: "/project2.jpg",
    },
    {
      id: 3,
      title: "AI-Powered Chatbot",
      imageUrl: "/project3.jpg",
    },
    {
      id: 4,
      title: "Blockchain Wallet",
      imageUrl: "/project4.jpg",
    },
    {
      id: 5,
      title: "IoT Home Automation",
      imageUrl: "/project5.jpg",
    },
  ];
  const tools = [
    "/logos/nextjs.svg",
    "/logos/tailwindcss.svg",
    "/logos/vercel.svg",
    "/logos/typescript.svg",
    "/logos/mysql.svg",
    "/logos/react.svg",
    "/logos/postgresql.svg",
  ];

  useEffect(() => {
    const updateHeights = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
      if (navbarRef.current) setNavbarHeight(navbarRef.current.offsetHeight);
    };

    const handleScroll = () => {
      // Remove scroll handling logic from here
    };

    const handleHashChange = (e: HashChangeEvent) => {
      e.preventDefault();
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    };

    updateHeights();
    window.addEventListener('resize', updateHeights);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('resize', updateHeights);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [headerHeight, navbarHeight]);

  return (
    <div className="flex flex-col min-h-screen">
      <header ref={headerRef} className="sticky top-0 z-50 bg-yellow-200 h-16 sm:h-20 flex items-center justify-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex justify-center">
              <Image src="/logo.svg" 
                width={80}
                height={80}
                alt="logo"
                className="sm:w-[120px] sm:h-[120px]"
              />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="text-sm sm:text-base">
            Aditya Ghodke <br />  +91 9922 770294   adityaaghodke2@gmail.com.
          </HoverCardContent>
        </HoverCard>
      </header>
      <main className="flex-grow bg-black text-white">
        <Spotlight
          className="top-0 left-0 md:left-20"
          fill="white"
        />
        <div className="h-[30rem] sm:h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative">
          <div className="container mx-auto px-4 py-10 sm:py-20 my-5 sm:my-10 text-white text-center">
            <h1 className="text-4xl sm:text-7xl font-bold mb-4">Software Engineer who <br /><FlipWords words={words} /> </h1>
            <p className="mt-3 sm:mt-5 pt-3 sm:pt-5 text-sm sm:text-base text-slate-200">Crafting elegant solutions to complex problems. <br /><span className="font-bold">Turning ideas into reality</span> and <span className="font-bold">pushing the boundaries of technology.</span></p>
            <a href="/Aditya_Ghodke.pdf" download className="inline-block bg-white text-black font-bold py-2 px-3 sm:py-3 sm:px-4 mt-6 sm:mt-10 transition-all duration-300 rounded-full hover:scale-110 sm:hover:scale-125 text-sm sm:text-base">
              Resume
            </a>
          </div>
        </div>
        <div className="relative w-full overflow-hidden bg-yellow-200 flex items-center justify-center">
          <div className="w-full">
            <InfiniteMovingCards
              items={infiniteCards}
              direction="left"
              speed="normal"
              
            />
          </div>
        </div>
        <div className="relative w-full mt-10 sm:mt-20" id="project">
          <div className="container mx-auto px-4 py-6 sm:py-8 text-left transform rotate-3">
            <p className="text-lg sm:text-xl font-thin pt-3 sm:pt-5 ml-5 sm:ml-10">Featured Projects</p>
            <div className="flex justify-start ml-10 sm:ml-20 pl-10 sm:pl-20 ">
              <Image
                src="/down-righ.svg"
                width={25}
                height={25}
                alt="Down right arrow"
                className="invert sm:w-[35px] sm:h-[35px]"
              />
            </div>
          </div>
          <CanvasRevealEffectDemo/>
        </div>
        
        <div className="mt-10 sm:mt-20 mb-10 sm:mb-20 pt-5 sm:pt-10 flex justify-center" id="skill">
          <button className="bg-neutral-800 rounded-full text-white font-bold py-2 px-4 sm:py-2 sm:px-6 transition-all duration-300 cursor-default text-sm sm:text-base">
            Tech Stack
          </button>
        </div>
    <div className="pb-5 sm:pb-10">
    <div className="relative w-full overflow-hidden bg-yellow-200 border-none">
         <InfiniteMovingCards
           items={tools.map((tool, index) => (
             <Image
               key={index}
               src={tool}
               width={30}
               height={30}
               alt={`Tech stack logo ${index + 1}`}
               className="sm:w-[50px] sm:h-[50px]"
             />
           ))}
           direction="left"
           speed="normal"
         />
       </div>
       <div>
       <div className="mt-10 sm:mt-20 mb-10 sm:mb-20 pt-5 sm:pt-10 flex justify-center">
          <button className="bg-neutral-800 rounded-full text-white font-bold py-2 px-4 sm:py-2 sm:px-6 transition-all duration-300 cursor-default text-sm sm:text-base">
            About Me
          </button>
        </div>
        <h1 className="text-4xl sm:text-7xl font-bold mb-4 text-center">Curious about my journey?</h1>
        <div className="flex justify-center items-center w-full">
          <div className="p-5 sm:p-20 text-left w-full sm:w-[70%]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Educational background?</AccordionTrigger>
                <AccordionContent>
                  B.E. in AI and Data Science, P.E.S Modern College Of Engineering, Pune. Graduating 2024, CGPA: 8.15.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Project experience?</AccordionTrigger>
                <AccordionContent>
                  1. Blockchain Pharmaceutical Supply Chain (2nd prize winner)
                  2. T20 World Cup data analysis
                  3. Student Placement Prediction (88% F1-Score)
                  4. Website Monitoring Service: Uptime tracking, custom alerts
                  5. Pantry Management System: Recipe suggestions using Gemini API
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Technical skills?</AccordionTrigger>
                <AccordionContent>
                  Java, Python, TypeScript, React.js, Next.js, MySQL, Firebase, PostgreSQL, Tailwind CSS, blockchain, data analysis, machine learning, API integration
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Notable achievements?</AccordionTrigger>
                <AccordionContent>
                  2nd prize in college project exhibition for blockchain-based pharmaceutical supply chain system
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Contact information?</AccordionTrigger>
                <AccordionContent>
                  Email: adityaaghodke2@gmail.com
                  Phone: 9922770294
                  LinkedIn: Aditya Ghodke
                  Location: Nashik, Maharashtra
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
       </div>
    </div>
      <div className="relative w-full py-8 sm:py-16 bg-white">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
        <div className="container mx-auto px-4 relative z-10 py-3 sm:py-5 mb-3 sm:mb-5 text-center">
        <h1 className="text-black text-3xl sm:text-5xl spacing-">Ready to bring your ideas to life? Let's collaborate!</h1>
        <button 
          className="w-full sm:w-[80%] p-3 sm:p-5 transition-all duration-300 rounded-full hover:scale-110 sm:hover:scale-125 text-white bg-black mt-5 sm:mt-10 text-sm sm:text-base"
          onClick={() => window.open('https://cal.com/aditya-ghodke', '_blank')}
        >
          Get in Touch ⚡
        </button>


        
        </div>
        <div className="mx-5 sm:mx-10 pt-5 sm:pt-10">
        <hr className="border-t border-x-neutral-500" />
      </div>
        <div className="m-5 sm:m-10 text-center">
        <div className="flex justify-center">
            <Image src="/logo.svg" 
            width={80}
            height={80}
            alt="logo"
            className="sm:w-[120px] sm:h-[120px]"
            />
          </div>
          <p className="text-neutral-600 py-2 sm:py-4 text-sm sm:text-base">© {new Date().getFullYear()} Aditya Ghodke. All rights reserved.</p>
        </div>
      </div>
      </main>
      <nav ref={navbarRef} className="sticky bottom-0 bg-white border-t-2 p-2 sm:p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Image src="/logo.svg" width={30} height={30} alt="logo" className="mr-2 sm:mr-4 sm:w-[40px] sm:h-[40px]" />
          <div className="flex space-x-1 sm:space-x-2">
            <a href="#" className="px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 text-xs sm:text-base">Home</a>
            <a href="#project" className="px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 text-xs sm:text-base">Projects</a>
            <a href="#skill" className="px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 text-xs sm:text-base">Skills</a>
            

            <HoverCard>
          <HoverCardTrigger asChild>
          <button className="px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 text-xs sm:text-base">Contact</button>
          </HoverCardTrigger>
          <HoverCardContent className="text-sm sm:text-base">
            Aditya Ghodke <br />  +91 9922 770294   adityaaghodke2@gmail.com.
          </HoverCardContent>
        </HoverCard>
          </div>
        </div>
      </nav>
    </div>
  )
}