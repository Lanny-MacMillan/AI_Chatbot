"use client";
import { NavigationMenuAi } from '@/components/ui/nav/nav'
import VisionAi from "@/components/vision";

export default function Vision() {
  // pass in voices to be chosen by user
  // pass in different text strings for user to choose
  // add input field for custom text for vision to assess
  // option to play mp3 or download it

  return (
    <>
      <NavigationMenuAi />
      <VisionAi />
    </>
  );
}