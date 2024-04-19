'use client'
import { useState } from 'react'
import toast from "react-hot-toast";
import { Input, Button } from '@/components/ui'
import { SendHorizontalIcon } from 'lucide-react'
import Image from 'next/image';
import BounceLoader from "react-spinners/BounceLoader";

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

  const tempUrl = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-AugVlpmbhznLgzHpeepyR8Da/user-jbUto2flRwMPHW0RMvjaX5k3/img-kluK3wAbE3QywCgjUBW5txw7.png?st=2024-04-15T17%3A35%3A29Z&se=2024-04-15T19%3A35%3A29Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-15T08%3A15%3A41Z&ske=2024-04-16T08%3A15%3A41Z&sks=b&skv=2021-08-06&sig=9KCzBqOAyvMFruyxFyPrXu1JIHlFL1DfbYvpFdzQ95U%3D"
  
  return (
    <>
      <div className='bg-gradient-to-b from-[#ffffff] to-[#5be9b9]'>
        <div className="container flex h-screen flex-col items-center">
          <p className="border-red-600 bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-6xl font-custom1 pb-10 text-center">Dalle-3 Image Generation</p>
          <div className="mt-4 w-full max-w-lg">
            <form onSubmit={handleDalleSubmit} className='relative rounded-md w-full max-w-lg mt-10 shadow-2xl'>
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
                  <SendHorizontalIcon className='h-5 w-5 text-custom-teal' />
                </Button>
            </form>
          </div>
          
          <div className="flex items-center mt-10">
            {isLoading && (
                <BounceLoader size='130px' color="rgba(0, 218, 248, 1)" />

              )}
            {dalleResult && (
                <Image src={tempUrl} width={1000} height={1000} alt={dalleResult}/>
              )}
          </div>

        </div>
      </div>
    </>
  );
}