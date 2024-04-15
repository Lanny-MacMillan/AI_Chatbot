'use client'
import { useState } from 'react'
import toast from "react-hot-toast";
import { Input, Button } from '@/components/ui'
import { SendHorizontalIcon } from 'lucide-react'
import Image from 'next/image';


export default function Dalle3() {
  const [prompt, setPrompt] = useState<string>('');
  const [dalleResult, setDalleResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleDalleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true)

      const response = await fetch("/api/dalle", {
        body: JSON.stringify(prompt),
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
      });
      
      if (!response.ok) throw new Error("Error generating Image");

      const imageURL = await response.json();

      toast.success("Image generated successfully!");
      setDalleResult(imageURL);
      
    } catch (error) {
      console.error(error);

    } finally {
      setIsLoading(false)
    }
  }

  
  return (
    <div className='text-zinc-700'>
      <div className="container flex h-screen flex-col items-center justify-center">
        <h1 className="font-serif text-2x1 font-medium">Dalle-3 Image generation</h1>
        <div className="mt-4 w-full max-w-lg">
          <form onSubmit={handleDalleSubmit} className='relative'>
            <Input
              type='text'
              value={prompt}
              name='message'
              onChange={(e) => setPrompt(e.currentTarget.value)}
              placeholder='What would you like to see?...'
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
          {isLoading && <h2 className="flex items-center justify-center mt-5">loading...</h2>}
          {dalleResult && (
            // <Image src={dalleResult} width={1000} height={1000} alt={prompt} />
            <Image src={dalleResult} width={1000} height={1000} alt={dalleResult}/>
          )}
          
        </div>

      </div>
    </div>
  );
}