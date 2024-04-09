export const runtime = 'edge'
import { NavigationMenuAi } from '@/components/ui/nav/nav'

export default function Introduction() {

  return (
    <>
      <NavigationMenuAi/>
      <section className='text-zinc-700'>
        <div className="container flex h-screen flex-col items-center justify-center">
          <h1 className="font-serif text-2x1 font-medium">Introduction</h1>
        </div>
      </section>
    </>
  ) 
}