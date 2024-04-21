"use client"
import { motion, AnimatePresence } from 'framer-motion'
import Chat from '@/components/chat'
import { NavigationMenuAi } from '@/components/ui/nav/nav'
import AnimatedTextWord from '@/components/animations/AnimatedTextWord'

export const runtime = 'edge'

export default function Home() {
  // framer motion text animation
  //      "Transform your
  // approach with AI-Powered Solutions"
  
  // custom SVG below

  // <motion.div
  // style={{ marginTop: '1em'}}
  // initial={{ y: -20, opacity: 0 }}
  // animate={{ y: 0, opacity: 1 }}
  // exit={{ y: 20, opacity: 0}}
  // transition={{ ease: "easeInOut", duration: 1 }}>{animatedContent}</motion.div>
  return (
    <div className='bg-gradient-to-b from-[#ffffff] to-[#5be9b9] h-screen' >
    <AnimatePresence>
      <NavigationMenuAi/>
      <section className='text-zinc-700'>
        <div className="container mx-auto flex flex-col">
          <motion.div
            style={{ marginTop: '1em'}}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0}}
            transition={{ type: "spring", bounce: .7 }}
            className="flex mt-40">
            <h1 id='text'
              className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-9xl font-customBlack mt-32 mb-40">Ai Toolbox</h1>
          </motion.div>
            <div className='flex mt-28 flex-col'>
              <AnimatedTextWord text="Transform Your Approach With " />
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0}}
                transition={{ type: "spring", bounce: .7 }}
                id='text'
                className='text-7xl text-center font-customBlack'
              >
                <motion.span
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0}}
                  transition={{ type: "spring", bounce: .7 }}
                  className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text font-customBlack"
                >Ai-Powered</motion.span> Solutions</motion.h1>
          </div>
        </div>
        </section>
        </AnimatePresence>
    </div>
  ) 
}