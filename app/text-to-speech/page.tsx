import Speech from '@/components/text-to-speech'
import { NavigationMenuAi } from '@/components/ui/nav/nav'

export const runtime = 'edge'

export default function Introduction() {

  return (
    <>
      <NavigationMenuAi/>
      <Speech />
    </>
  ) 
}