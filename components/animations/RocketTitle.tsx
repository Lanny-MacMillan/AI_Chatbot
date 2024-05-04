import React, { useState, useRef } from "react";
import { motion } from 'framer-motion'
import gsap from "gsap";
import AnimatedTextWord from "./AnimatedTextWord";


export default function Bounce() {
  const [animRun, setAnimRun] = useState<any>(false);
  const boxRef = useRef<HTMLDivElement>(null);
  // const platformRef = useRef<HTMLDivElement>(null);
  const leftExitRef = useRef<HTMLDivElement>(null);
  const rightExitRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  // const isTouch = !!(
  //   "undefined" != typeof document.documentElement.ontouchstart
  // );

  let tl = gsap.timeline();

  const returnTextAnimation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()

    if(animRun){
      return
    }

    //leftExitRef text back to original position
    gsap.to([leftExitRef.current], {
      x: 0, 
      duration: 1,
      delay: 0,
      repeat: 0,
      ease: "ease"
    }); 

    //  rightExitRef text back to original position
    gsap.to([rightExitRef.current], {
      x: 0, 
      duration: 1,
      delay: 0,
      repeat: 0,
      ease: "ease"
    }); 

    // spinRef spins "Ai-Powered" 360 degrees
    gsap.to([spinRef.current], {
      rotation: 360,
      duration: .25,
      delay: 1,
      repeat: 0,
      ease: "ease"

    }); 

    // spinRef scales x2
    gsap.to([spinRef.current], {
      x: 0, 
      scale: 2,
      duration: .5,
      delay: 1,
      repeat: 0,
      ease: "ease"
    }); 

    // spinRef scales text back to original size
    gsap.to([spinRef.current], {
      x: 0, 
      scale: 1,
      duration: .5,
      delay: 1.5,
      repeat: 0,
      ease: "ease",
    }); 

    // revert bouncing title
    tl.revert()
    setAnimRun(true)
  }

  const clearTextAnimation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    if(animRun){
      return
    }
    // leftExitRef text back to original position
    gsap.to([leftExitRef.current], {
      x: -4000, 
      duration: 1,
      delay: 0,
      repeat: 0,
      ease: "ease"
    }); 

    // rightExitRef text back to original position
    gsap.to([rightExitRef.current], {
      x: 4000, 
      duration: 1,
      delay: 0,
      repeat: 0,
      ease: "ease"
    }); 

    tl.to([boxRef.current], {
      scale:  1.15,
      duration: .5,
      delay: 0,
      repeat: -1,
      yoyo: true,
      ease: "Power0.easeNone",
    });

  }


  // const startAnimation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   e.preventDefault()

  //   if (animRun || isTouch) {
  //     console.log("ANIM_RAN OR iSTOUCH")
  //     return
  //   }

  //   setAnimRun(true)
  //   gsap.to([boxRef.current], {
  //     y: 645,
  //     duration: 2,
  //     delay: 5,
  //     repeat: 0,
  //     ease: "bounce.out",
  //   });

  //   // siren sounds
  //   // add flashing red lights as if alarm was pulled



  //   // 5.45sec - title knocks the words out of frame
  //   gsap.to([leftExitRef.current], {
  //     rotation: 180,
  //     x: -1800,
  //     y: 1000,
  //     duration: .7,
  //     delay: 5.45,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  //   // 5.45sec - title knocks the words out of frame
  //   gsap.to([rightExitRef.current], {
  //     rotation: -260,
  //     x: 1800,
  //     y: 1000,
  //     duration: .7,
  //     delay: 5.45,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  //   // 12sec - leftExitRef text back to original y position and reset rotation for next animation
  //   gsap.to([leftExitRef.current], {
  //     rotation: 0,
  //     y: 0,
  //     duration: 1,
  //     delay: 12,
  //     repeat: 0,
  //   });

  //  // 12sec - rightExitRef text back to original y position and reset rotation for next animation
  //   gsap.to([rightExitRef.current], {
  //     rotation: 0,
  //     y: 0,
  //     duration: 1,
  //     delay: 12,
  //     repeat: 0,
  //   });


  //   // 12sec - bring title back up to original position
  //   gsap.to([boxRef.current], {
  //     y: 0,
  //     duration: 5,
  //     delay: 12,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  //   // 12sec - platform lift title back up to its position
  //   gsap.to([platformRef.current], {
  //     y: 0,
  //     duration: 5,
  //     delay: 12,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  //   // 18sec - platform exit
  //   gsap.to([platformRef.current], {
  //     y: 645,
  //     duration: 3,
  //     delay: 18,
  //     repeat: 0,
  //     opacity: 1,
  //     ease: "ease"
  //   });

  //   // 22sec - leftExitRef text back to original position
  //   gsap.to([leftExitRef.current], {
  //     x: 0,
  //     duration: 1,
  //     delay: 22,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  //  // 22sec - rightExitRef text back to original position
  //   gsap.to([rightExitRef.current], {
  //     x: 0,
  //     duration: 1,
  //     delay: 22,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  //   // 24sec - spinRef spins "Ai-Powered" 360 degrees
  //   gsap.to([spinRef.current], {
  //     rotation: 360,
  //     duration: .25,
  //     delay: 23,
  //     repeat: 0,
  //     ease: "ease"

  //   });

  //   // 24sec - spinRef scales x2
  //   gsap.to([spinRef.current], {
  //     x: 0,
  //     scale: 2,
  //     duration: .5,
  //     delay: 23,
  //     repeat: 0,
  //     ease: "ease"
  //   });
    
  //   // 24.5sec - spinRef scales text back to original size
  //   gsap.to([spinRef.current], {
  //     x: 0,
  //     scale: 1,
  //     duration: .5,
  //     delay: 23.5,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  // }
  
  // useGSAP(() => {
  //   // 5sec - project title drops to floor
  //   gsap.to([boxRef.current], {
  //     y: 645,
  //     duration: 2,
  //     delay: 5,
  //     repeat: 0,
  //     ease: "bounce.out",
  //   });

  //   // siren sounds
  //   // add flashing red lights as if alarm was pulled



  //   // 5.45sec - title knocks the words out of frame
  //   gsap.to([leftExitRef.current], {
  //     rotation: 180,
  //     x: -800,
  //     y: 1000,
  //     duration: .7,
  //     delay: 5.45,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  //   // 5.45sec - title knocks the words out of frame
  //   gsap.to([rightExitRef.current], {
  //     rotation: -260,
  //     x: 800,
  //     y: 1000,
  //     duration: .7,
  //     delay: 5.45,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  //   // 12sec - leftExitRef text back to original y position and reset rotation for next animation
  //   gsap.to([leftExitRef.current], {
  //     rotation: 0,
  //     y: 0,
  //     duration: 1,
  //     delay: 12,
  //     repeat: 0,
  //   });

  //  // 12sec - rightExitRef text back to original y position and reset rotation for next animation
  //   gsap.to([rightExitRef.current], {
  //     rotation: 0,
  //     y: 0,
  //     duration: 1,
  //     delay: 12,
  //     repeat: 0,
  //   });


  //   // 12sec - bring title back up to original position
  //   gsap.to([boxRef.current], {
  //     y: 0,
  //     duration: 5,
  //     delay: 12,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  //   // 12sec - platform lift title back up to its position
  //   gsap.to([platformRef.current], {
  //     y: 0,
  //     duration: 5,
  //     delay: 12,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  //   // 18sec - platform exit
  //   gsap.to([platformRef.current], {
  //     y: 645,
  //     duration: 3,
  //     delay: 18,
  //     repeat: 0,
  //     opacity: 1,
  //     ease: "ease"
  //   });

  //   // 22sec - leftExitRef text back to original position
  //   gsap.to([leftExitRef.current], {
  //     x: 0,
  //     duration: 1,
  //     delay: 22,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  //  // 22sec - rightExitRef text back to original position
  //   gsap.to([rightExitRef.current], {
  //     x: 0,
  //     duration: 1,
  //     delay: 22,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  //   // 24sec - spinRef spins "Ai-Powered" 360 degrees
  //   gsap.to([spinRef.current], {
  //     rotation: 360,
  //     duration: .25,
  //     delay: 23,
  //     repeat: 0,
  //     ease: "ease"

  //   });

  //   // 24sec - spinRef scales x2
  //   gsap.to([spinRef.current], {
  //     x: 0,
  //     scale: 2,
  //     duration: .5,
  //     delay: 23,
  //     repeat: 0,
  //     ease: "ease"
  //   });
    
  //   // 24.5sec - spinRef scales text back to original size
  //   gsap.to([spinRef.current], {
  //     x: 0,
  //     scale: 1,
  //     duration: .5,
  //     delay: 23.5,
  //     repeat: 0,
  //     ease: "ease"
  //   });

  // }, []);

  // useGSAP(() => {
    
  //   if (animRun) {
  //     gsap.to([boxRef.current], {
  //       scale:  1.15,
  //       // duration: .5,
  //       delay: 0,
  //       repeat: -1,
  //       yoyo: true,
  //       ease: "Power0.easeNone",
  //     }); 
  //   }

  // },[animRun])
  
  return (
    <div  id='title' className="relative z-100 text-center ">
      <motion.div
        id='title'
        ref={boxRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0}}
        transition={{ type: "spring", bounce: .7 }} 
      >
        <h1
          onClick={returnTextAnimation}
          className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-7xl font-customBlack text-center mt-24 xl:mt-44 mb-16 z-100">
          Ai Toolbox
        </h1>
      </motion.div>
      {/* <motion.div
        ref={platformRef}
        id='steel'
        className="w-[100%] h-[3vh] bg-custom-purple-600 border-2 border-black absolute bottom-12 xl:bottom-9"
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
      </motion.div> */}
      <div
        onClick={clearTextAnimation}
        className='flex flex-col z-10'>
        <div
          ref={rightExitRef} >
          <AnimatedTextWord text="Transform  Your  Approach  With " /> 
        </div>
        <motion.h1
          ref={leftExitRef}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0}}
          transition={{ type: "spring", bounce: .7, delay: 2.3 }}
          id='text'
          className='text-xl lg:text-5xl text-center font-customBlack'
        >
          <motion.span
            ref={spinRef}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0}}
            className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text font-customBlack"
          >Ai-Powered</motion.span> Solutions

        <motion.span
          ref={leftExitRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0}}
          transition={{ ease: "easeInOut", type: "spring", bounce: .7, delay: 3 }}
          className="font-customBlack"
        >.</motion.span>
      </motion.h1>
      
      </div>
    </div>
  );
}