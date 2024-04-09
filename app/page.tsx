import Chat from '@/components/chat'
import { NavigationMenuAi } from '@/components/ui/nav/nav'

export const runtime = 'edge'

export default function Home() {

  return (
    <>
      <NavigationMenuAi/>
      <section className='text-zinc-700'>
        <div className="container flex h-screen flex-col items-center justify-center">
          <h1 className="font-serif text-2x1 font-medium">Welcome to my ChatBot</h1>
        </div>
      </section>
    </>
  ) 
}