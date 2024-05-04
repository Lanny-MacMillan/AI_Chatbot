import Speech from '@/components/text-to-speech'
import { NavigationMenuAi } from '@/components/ui/nav/nav'

export const runtime = 'edge'

export default function Introduction() {

  return (
    <div className='bg-gradient-to-b from-[#ffffff] to-[#5be9b9] h-dvh max-h-dvh overflow-hidden' >
      <NavigationMenuAi/>
      <Speech />
    </div>
  ) 
}