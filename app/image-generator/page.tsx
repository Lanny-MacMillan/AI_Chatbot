'use client';
export const runtime = 'edge';
import { NavigationMenuAi } from '@/components/ui/nav/nav';
import DallE3 from '../../components/dalle';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Introduction() {
  const { user } = useUser();

  if (user) {
    return (
      <div
        id="heightContainer"
        className="bg-gradient-to-b from-[#ffffff] to-[#5be9b9] overflow-hidden"
      >
        <NavigationMenuAi />
        <DallE3 />
      </div>
    );
  }
}
