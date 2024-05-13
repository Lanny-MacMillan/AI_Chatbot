import Chat from '@/components/chat';
import { NavigationMenuAi } from '@/components/ui/nav/nav';

export const runtime = 'edge';

export default function Introduction() {
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
