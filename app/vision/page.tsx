'use client';
import { NavigationMenuAi } from '@/components/ui/nav/nav';
import VisionAi from '@/components/vision';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Vision() {
  const { user } = useUser();

  if (user) {
    return (
      <div
        id="heightContainer"
        className="bg-gradient-to-b from-[#ffffff] to-[#5be9b9] overflow-hidden"
      >
        <NavigationMenuAi />
        <VisionAi />
      </div>
    );
  }
}
