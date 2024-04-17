import Chat from '@/components/chat'
import { NavigationMenuAi } from '@/components/ui/nav/nav'

export const runtime = 'edge'

export default function Introduction() {


  return (
    <>
      <NavigationMenuAi/>
      <Chat />
    </>
  ) 
}