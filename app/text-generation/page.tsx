'use client';
import Chat from '@/components/chat';
import { NavigationMenuAi } from '@/components/ui/nav/nav';
import { useUser } from '@auth0/nextjs-auth0/client';

export const runtime = 'edge';

export default function Introduction() {
  const { user } = useUser();

  if (user) {
    return (
      <div
        id="heightContainer"
        className="bg-gradient-to-b from-[#ffffff] to-[#5be9b9] overflow-hidden"
      >
        <NavigationMenuAi />
        <Chat />
      </div>
    );
  }
}
