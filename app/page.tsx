'use client';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NavigationMenuAi } from '@/components/ui/nav/nav';
import Bounce from '@/components/animations/Bounce';

export const runtime = 'edge';

export default function Home() {
  useEffect(() => {
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      // Set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  console.log('env_vars:AUTH0_SECRET', process.env.AUTH0_SECRET);
  console.log('env_vars:AUTH0_BASE_URL', process.env.AUTH0_BASE_URL);
  console.log('env_vars:AUTH0_ISSUER_BASE_URL', process.env.AUTH0_ISSUER_BASE_URL);
  console.log('env_vars:AUTH0_CLIENT_ID', process.env.AUTH0_CLIENT_ID);
  console.log('env_vars:AUTH0_CLIENT_SECRET', process.env.AUTH0_CLIENT_SECRET);

  return (
    <div
      id="heightContainer"
      className="bg-gradient-to-b from-[#ffffff] to-[#5be9b9] overflow-hidden"
    >
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
