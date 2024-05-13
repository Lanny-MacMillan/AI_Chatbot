export const runtime = 'edge';
import { NavigationMenuAi } from '@/components/ui/nav/nav';
import DallE3 from '../../components/dalle';

export default function Introduction() {
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
