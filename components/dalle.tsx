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
  
  return (
    <>
      <div className='bg-gradient-to-b from-[#ffffff] to-[#5be9b9]'>
        <div className="container flex h-screen flex-col items-center">
          <p className="border-red-600 bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-5xl font-customBlack pb-7 text-center">Dalle-3 Image Generation</p>
          <div className="mt-4 w-full max-w-lg">
            <form onSubmit={handleDalleSubmit} className='relative rounded-md w-full max-w-lg mt-10 shadow-2xl'>
              <Input
                type='text'
                value={prompt}
                name='message'
                onChange={(e) => setPrompt(e.currentTarget.value)}
                placeholder='What would you like to see?...'
                />
                <Button
                  size='icon'
                  type='submit'
                  variant='secondary'
                  disabled={isLoading}
                  className='absolute right-1 top-1 h-8 w-10'
                >
                  <SendHorizontalIcon className='h-5 w-5 text-custom-teal-500' />
                </Button>
            </form>
          </div>
          
          <div className="flex items-center justify-center align-center mt-10">
            {isLoading && (
                <BounceLoader size='130px' color="rgba(0, 218, 248, 1)" />
              )}
            {dalleResult && (
                <Image src={dalleResult} width={500} height={500} alt={dalleResult}/>
            )}
          </div>

        </div>
      </div>
    </>
  );
}