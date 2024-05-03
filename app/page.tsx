"use client"
// import { useState,useRef, useEffect } from'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavigationMenuAi } from '@/components/ui/nav/nav'
import RocketTitle from '@/components/animations/RocketTitle'

export const runtime = 'edge'

export default function Home() {
  // const [alarm, setAlarm] = useState<boolean>(false);
  // const alarmRef = useRef(0)

  // useEffect(() => {
  //   if (alarmRef.current >= 1) {
  //     window.location.reload()
  //   }
  // },[alarmRef.current])

  return (
    <div className='bg-gradient-to-b from-[#ffffff] to-[#5be9b9] h-dvh max-h-dvh overflow-hidden' >
    <AnimatePresence>
      <NavigationMenuAi/>
      <section className='text-zinc-700'>
          <div className="container mx-auto flex flex-col z-10 " >
            <RocketTitle
              // alarmRef={alarmRef}
            />
          </div>
      </section>
        </AnimatePresence>
    </div>
  ) 
}