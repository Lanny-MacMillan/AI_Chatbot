import React, { useRef, useEffect } from "react";
import { motion } from 'framer-motion'
import gsap from "gsap";

// create animation where main page animates header and then subheader
// header drops down
// subheader is typedout word by word
// header falls 5-6 seconds in, after its been complete for 2-3 seconds, maybe way longer for lazy surfers...
// 1 - line drops like fishing and pulls Header back into place
// 2 - little robot pushes it back into place, could be svgator anim for teh robot with motion to push back up


export default function Bounce() {
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // tween (between states)
    gsap.to([boxRef.current], {
      y: 600, // get to fall on bottom of screen
      duration: 2,
      delay: 5,
      repeat: 0,
      ease: "bounce.out"
    }); 
  }, []);

  return (
    <motion.div
      ref={boxRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0}}
      transition={{ type: "spring", bounce: .7 }}
      className="">
      <h1 id='text'
        className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-7xl font-customBlack text-center mt-24 xl:mt-44 mb-16">Ai Toolbox</h1>
    </motion.div>
  );
}