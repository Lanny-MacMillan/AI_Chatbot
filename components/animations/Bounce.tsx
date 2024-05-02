import React, { useRef } from "react";
import { motion } from 'framer-motion'
import gsap from "gsap";
import { useGSAP } from '@gsap/react'

// the dot on the I could be a robot or AI eyeball that blinks and morphs into a siren, or just spins when it falls, screen lights up red...
// after the title falls to floor, maybe a word or letter spins while screen flashes red, then lift comes to fix title...
// use GSAP to animate flashing BG

export default function Bounce() {
  const boxRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  const liftRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // project title drops to floor
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
      delay: 12,
      repeat: 0,
      ease: "ease"
    }); 

    // platform lift title back up to its position
    gsap.to([platformRef.current], {
      y: 0, 
      duration: 5,
      delay: 12,
      repeat: 0,
      ease: "ease"
    }); 

    // platform exit 
    gsap.to([platformRef.current], {
      y: 645, 
      duration: 3,
      delay: 18,
      repeat: 0,
      opacity: 1,
      ease: "ease"
    }); 

    


  }, []);


  return (
    <div  id='title' className="relative z-100">
      <motion.div
        id='title'
        ref={boxRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0}}
        transition={{ type: "spring", bounce: .7 }}
      >
        <h1
          className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-7xl font-customBlack text-center mt-24 xl:mt-44 mb-16 z-100">
          Ai Toolbox
        </h1>
      </motion.div>
      <motion.div
        ref={platformRef}
        id='steel'
        className="w-[100%] h-[3vh] bg-custom-purple-600 border-2 border-black absolute bottom-12 xl:bottom-9"
        // initial={{ y: 525, opacity: 1 }} // good styling position
        initial={{ y: 645, opacity: 1 }}
      >
        <div id='innerPlatform'>
          <div id='rivet'/>
          <div id='rivet'/>
          <div id='rivet'/>
          <div id='rivet'/>
        </div>
        <div id='base'/>
        <div id='knuckle' />
        <div className='flame'></div>
      </motion.div>
      {/* <motion.div
        ref={liftRef}
        id='lift'
        initial={{ y: 500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, scale: 0}}
        transition={{ delay: 2 }}

      /> */}
    </div>
  );
}