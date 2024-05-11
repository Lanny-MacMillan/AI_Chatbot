'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationMenuAi } from '@/components/ui/nav/nav';
import Bounce from '@/components/animations/Bounce';

export const runtime = 'edge';

export default function Home() {
  useEffect(() => {
    const handleResize = () => {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      console.log('VH__', vh);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#ffffff] to-[#5be9b9] h-dvh max-h-dvh overflow-hidden">
      <AnimatePresence>
        <NavigationMenuAi />
        <section className="text-zinc-700">
          <div className="container mx-auto flex flex-col z-10 ">
            <Bounce />
          </div>
        </section>
      </AnimatePresence>
    </div>
  );
}
