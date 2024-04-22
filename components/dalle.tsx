'use client'
import { useState } from 'react'
import toast from "react-hot-toast";
import { Input } from '@/components/ui'
import { motion } from 'framer-motion'
import { SendHorizontalIcon } from 'lucide-react'
import Image from 'next/image';
import BounceLoader from "react-spinners/BounceLoader";
import exampleImage from '@/public/image/example.png'
import { hoverClass, standardClass } from '@/public/constants';

export default function Dalle3() {
  const [prompt, setPrompt] = useState<string>('');
  const [dalleResult, setDalleResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ hover, setHover ] = useState<boolean>(false);

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
      setPrompt('')
    } catch (error) {
      console.error(error);

    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <>
      <div className="container flex flex-col items-center">
        <motion.div
          className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-5xl font-customBlack text-center mt-4 mb-4 pb-3 leading-none"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0}}
          transition={{ type: "spring", bounce: .7 }}
        >Image Generation
        </motion.div>

          <div className="flex mt-4 w-full max-w-lg justify-center">
            <form onSubmit={handleDalleSubmit} className='relative rounded-md w-[400px] max-w-lg shadow-2xl'>
              <Input
                type='text'
                value={prompt}
                name='message'
                onChange={(e) => setPrompt(e.currentTarget.value)}
                placeholder='What would you like to see?...'
                />
              <motion.button
                type='submit'
                disabled={isLoading}
                className={ hover ? hoverClass : standardClass }
                whileHover={{ scale: 1.4 }}
                transition={{ tpe: "spring", stiffness: 300 }}
                whileTap={{ scale: 1.7 }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                >
                <SendHorizontalIcon className={ hover ? 'h-5 w-5 text-custom-purple-500'  : 'h-5 w-5 text-custom-teal-500'}/>
              </motion.button>
            </form>
          </div>
          
          <div className="flex items-center justify-center align-center mt-5">
            {isLoading ? <BounceLoader size='130px' color="rgba(0, 218, 248, 1)" /> : <Image src={dalleResult ? dalleResult : exampleImage} width={400} height={400} alt={dalleResult}/>
              }
          </div>

        </div>
    </>
  );
}