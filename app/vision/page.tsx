"use client";
import { NavigationMenuAi } from '@/components/ui/nav/nav'
import VisionAi from "@/components/vision";

export default function Vision() {

  return (
    <div className='bg-gradient-to-b from-[#ffffff] to-[#5be9b9] h-screen' >
      <NavigationMenuAi />
      <VisionAi />
    </div>
  );
}