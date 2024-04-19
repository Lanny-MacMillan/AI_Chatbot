import Chat from '@/components/chat'
import { NavigationMenuAi } from '@/components/ui/nav/nav'

export const runtime = 'edge'

export default function Home() {

  return (
    <div className='bg-gradient-to-b from-[#ffffff] to-[#5be9b9]' >

      <NavigationMenuAi/>
      <section className='text-zinc-700'>
        <div className="container flex h-screen flex-col items-center justify-center">
          <h1
            id='text'
            className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-9xl font-custom1">Ai Toolbox</h1>
        </div>
      </section>
    </div>
  ) 
}