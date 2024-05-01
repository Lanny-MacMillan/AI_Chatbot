import React, { useRef } from "react";
import { motion } from 'framer-motion'
import gsap from "gsap";
import { useGSAP } from '@gsap/react'

export default function Bounce() {
  const boxRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // drop Title to bottom and bounce
    gsap.to([boxRef.current], {
      y: 645, 
      duration: 2,
      delay: 5,
      repeat: 0,
      ease: "bounce.out"
    }); 

    // bring title back up to original position
    gsap.to([boxRef.current], {
      y: 0, 
      duration: 5,
      delay: 7,
      repeat: 0,
      ease: "ease"
    }); 

    // platform drop out of screen view
    // gsap.to([platformRef.current], {
    //   y: 645, 
    //   delay: 0,
    //   repeat: 0,
    //   // ease: "ease"
    // }); 

    // platform lift title back up to its position
    gsap.to([platformRef.current], {
      y: 0, 
      duration: 5,
      delay: 7,
      repeat: 0,
      ease: "ease"
    }); 

    // platform exit left
    gsap.to([platformRef.current], {
      x: 1000, 
      duration: 5,
      delay: 13,
      repeat: 0,
      opacity: 1,
      ease: "ease"
    }); 

  }, []);


  return (
    // div will run framer motion drop, then 5 second in will run gsap anim to drop to bottom
    <div className="relative">
      <motion.div
        ref={boxRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0}}
        transition={{ type: "spring", bounce: .7 }}
      >
        <h1
          id='text'
          className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-7xl font-customBlack text-center mt-24 xl:mt-44 mb-16 z-10">
          Ai Toolbox
        </h1>
      </motion.div>
      <motion.div
        ref={platformRef}
        className="w-[100%] h-[3vh] bg-custom-purple-600 border-2 border-black absolute bottom-12 xl:bottom-9"
        initial={{ y: 645, opacity: 1 }}
        // animate={{ opacity: 1 }}
        />
    </div>
  );
}