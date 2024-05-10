import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import AnimatedTextWord from './AnimatedTextWord';

export default function Bounce() {
  const [animRun, setAnimRun] = useState<any>(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const leftExitRef = useRef<HTMLDivElement>(null);
  const rightExitRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const [animStart, setAnimStart] = useState<any>(false);
  const [movementComplete, setMovementComplete] = useState<any>(false);
  const [dropComplete, setDropComplete] = useState<any>(false);
  const [swipeAwayAnimStart, setSwipeAwayAnimStart] = useState<any>(false);

  let tl = gsap.timeline();

  const returnTextAnimation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    if (animRun || !swipeAwayAnimStart) {
      return;
    }

    //leftExitRef text back to original position
    gsap.to([leftExitRef.current], {
      x: 0,
      duration: 1,
      delay: 0,
      repeat: 0,
      ease: 'ease',
    });

    //  rightExitRef text back to original position
    gsap.to([rightExitRef.current], {
      x: 0,
      duration: 1,
      delay: 0,
      repeat: 0,
      ease: 'ease',
    });

    // spinRef spins "Ai-Powered" 360 degrees
    gsap.to([spinRef.current], {
      rotation: 360,
      duration: 0.25,
      delay: 1,
      repeat: 0,
      ease: 'ease',
    });

    // spinRef scales x2
    gsap.to([spinRef.current], {
      x: 0,
      scale: 2,
      duration: 0.5,
      delay: 1,
      repeat: 0,
      ease: 'ease',
    });

    // spinRef scales text back to original size
    gsap.to([spinRef.current], {
      x: 0,
      scale: 1,
      duration: 0.5,
      delay: 1.5,
      repeat: 0,
      ease: 'ease',
    });

    // revert bouncing title
    tl.reverse();
    // tl.revert(); // removes inline styles that were added by the animation
    setAnimRun(true);
  };

  const clearTextAnimation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (animRun) {
      return;
    }
    setSwipeAwayAnimStart(true);
    // leftExitRef text back to original position
    gsap.to([leftExitRef.current], {
      x: -4000,
      duration: 1,
      delay: 0,
      repeat: 0,
      ease: 'ease',
    });

    // rightExitRef text back to original position
    gsap.to([rightExitRef.current], {
      x: 4000,
      duration: 1,
      delay: 0,
      repeat: 0,
      ease: 'ease',
    });

    // set title to bounce
    tl.to([boxRef.current], {
      scale: 1.15,
      duration: 0.5,
      delay: 0,
      repeat: -1,
      yoyo: true,
      ease: 'Power0.easeNone',
    });
  };

  const getRandomTransformOrigin = () => {
    const value = (16 + 40 * Math.random()) / 100;
    const value2 = (15 + 36 * Math.random()) / 100;
    return {
      originX: value,
      originY: value2,
    };
  };

  const getRandomDelay = () => -(Math.random() * 0.7 + 0.05);

  const randomDuration = () => Math.random() * 0.07 + 0.23;

  const variants = {
    drop: {
      y: 0,
    },
    start: () => ({
      y: 0,
      rotate: [1, -1.4, 0],
      transition: {
        delay: getRandomDelay(),
        repeat: Infinity,
        duration: randomDuration(),
      },
    }),
    reset: {
      y: 0,
      rotate: 0,
    },
  };

  const dropAnim = () => {
    const drop = !dropComplete ? 'drop' : '';
    const start = !movementComplete ? 'start' : 'reset';

    return !animStart ? drop : start;
  };

  const timeoutMovement = setTimeout(() => {
    setMovementComplete(true);
  }, 4000);

  return (
    <div id="title" className="relative z-100 text-center">
      <div>
        <motion.h1
          id="title"
          ref={boxRef}
          initial={{ y: 150, scale: 0, opacity: 0 }}
          animate={{
            y: [150, -50, 0],
            scale: [0, 0.75, 1],
            opacity: [0, 1, 1],
          }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ delay: 3.5, duration: 0.75, type: 'tween' }}
          onAnimationComplete={() => timeoutMovement}
          onClick={swipeAwayAnimStart ? returnTextAnimation : () => {}}
          className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-7xl font-customBlack text-center mt-16 xl:mt-22 2xl:mt-40 z-100 mb-0 pb-0"
        >
          Ai Toolbox
        </motion.h1>
        <div className="flex justify-center align-center ">
          <motion.div
            initial={{ y: -500 }}
            variants={variants}
            animate={dropAnim()}
            style={{ ...getRandomTransformOrigin() }}
            exit={{ y: 20 }}
            onAnimationComplete={() => {
              setAnimStart(true);
              setDropComplete(true);
            }}
            transition={{ type: 'spring', bounce: 0.7 }}
            className="w-[350px] lg:w-[425px]"
          >
            <object type="image/svg+xml" data="/toolbox.svg">
              logo-svg-animation
            </object>
          </motion.div>
        </div>
      </div>

      <div onClick={clearTextAnimation} className="flex flex-col z-10">
        <div ref={rightExitRef}>
          <AnimatedTextWord text="Transform  Your  Approach  With " />
        </div>
        <motion.h1
          ref={leftExitRef}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.7, delay: 6.8 }}
          id="text"
          className="text-xl lg:text-5xl text-center font-customBlack"
        >
          <motion.span
            ref={spinRef}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text font-customBlack"
          >
            Ai-Powered
          </motion.span>{' '}
          Solutions
          <motion.span
            ref={leftExitRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: 'easeInOut',
              type: 'spring',
              bounce: 0.7,
              delay: 7.6,
            }}
            className="font-customBlack"
          >
            .
          </motion.span>
        </motion.h1>
      </div>
    </div>
  );
}
