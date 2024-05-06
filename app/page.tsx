"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { NavigationMenuAi } from '@/components/ui/nav/nav'
import Bounce from '@/components/animations/Bounce'

export const runtime = 'edge'

export default function Home() {


  return (
    <div className='bg-gradient-to-b from-[#ffffff] to-[#5be9b9] h-dvh max-h-dvh overflow-hidden' >
    <AnimatePresence>
      <NavigationMenuAi/>
      <section className='text-zinc-700'>
          <div className="container mx-auto flex flex-col z-10 " >
            <Bounce />
          </div>
      </section>
        </AnimatePresence>
    </div>
  ) 
}