'use client'

import { useState } from 'react'

import { Input, Button } from '@/components/ui'
import { SendHorizontalIcon } from 'lucide-react'


export default function Speech() {
  // alloy, echo, fable, onyx, nova, and shimmer
  const [input, setInput] = useState<String>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setInput(newValue)
  }
  
  const handleSubmit = () => {
    setIsLoading(true);
  }

  const fetchDataFromApi = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/testendpoint", {
        headers: {
          Accept: "application/json",
          method: "GET",
        }
      });

      if (response) {
        const data = await response.json();
        console.log("DATA", data)
      }

    } catch (error) {
      console.log(error)

    } finally {
      setIsLoading(false)
    }
  }


  return (
    <section className='text-zinc-700'>
      <div className="container flex h-screen flex-col items-center justify-center">
        <h1 className="font-serif text-2x1 font-medium">Text to Speech</h1>
        <div className="mt-4 w-full max-w-lg">
          {/* response container */}


<Button onClick={fetchDataFromApi}>Click for data</Button>
          {/* input form */}
          <form onSubmit={handleSubmit} className='relative'>
              <Input
                name='message'
                // value={input}
                onChange={onChange}
                placeholder='What would you like me to say?...'
                className='pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
              />
              <Button
                size='icon'
                type='submit'
                variant='secondary'
                // disabled={isLoading}
                className='absolute right-1 top-1 h-8 w-10'
              >
                <SendHorizontalIcon className='h-5 w-5 text-emerald-500' />
              </Button>
            </form>
        </div>

      </div>
    </section>
  )

}

// function setIsLoading(arg0: boolean) {
//   throw new Error('Function not implemented.');
// }
