import Chat from '@/components/chat'
import { NavigationMenuAi } from '@/components/ui/nav/nav'

export const runtime = 'edge'

export default function Home() {

  return (
    <div className='bg-gradient-to-b from-[#ffffff] to-[#5be9b9]' >

      <NavigationMenuAi/>
      <section className='text-zinc-700 bg-transparent '>
        <div className="container flex h-screen flex-col items-center justify-center bg-transparent ">
          <h1 className="font-serif text-2x1 font-medium">Welcome to my Ai Toolbox</h1>
        </div>
      </section>
    </div>
  ) 
}