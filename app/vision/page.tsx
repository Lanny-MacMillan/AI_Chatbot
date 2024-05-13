'use client';
import { NavigationMenuAi } from '@/components/ui/nav/nav';
import VisionAi from '@/components/vision';

export default function Vision() {
  return (
    <div
      id="heightContainer"
      className="bg-gradient-to-b from-[#ffffff] to-[#5be9b9]overflow-hidden"
    >
      <NavigationMenuAi />
      <VisionAi />
    </div>
  );
}
