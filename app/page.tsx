"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavigationMenuAi } from '@/components/ui/nav/nav'
import AnimatedTextWord from '@/components/animations/AnimatedTextWord'

export const runtime = 'edge'

export default function Home() {
  // custom SVG below

  return (
    <div className='bg-gradient-to-b from-[#ffffff] to-[#5be9b9] h-screen' >
    <AnimatePresence>
      <NavigationMenuAi/>
      <section className='text-zinc-700'>
        <div className="container mx-auto flex flex-col">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0}}
            transition={{ type: "spring", bounce: .7 }}
            className="">
            <h1 id='text'
              className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-7xl font-customBlack text-center mt-24 xl:mt-44 mb-16">Ai Toolbox</h1>
          </motion.div>
            <div className='flex flex-col'>
              <AnimatedTextWord text="Transform  Your  Approach  With " />
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0}}
                transition={{ type: "spring", bounce: .7, delay: 2.3 }}
                id='text'
                className='text-xl lg:text-5xl text-center font-customBlack'
              >
                <motion.span
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0}}
                  className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text font-customBlack"
                >Ai-Powered</motion.span> Solutions

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0}}
                  transition={{ ease: "easeInOut", type: "spring", bounce: .7, delay: 3 }}
                  className="font-customBlack"
                >.</motion.span>
              </motion.h1>
              
          </div>
        </div>
        </section>
        </AnimatePresence>
    </div>
  ) 
}