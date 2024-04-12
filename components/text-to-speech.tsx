'use client'
import { useState, useRef } from 'react'
import toast from "react-hot-toast";
import { Input, Button } from '@/components/ui'
import { SendHorizontalIcon } from 'lucide-react'


export default function Speech() {
  // alloy, echo, fable, onyx, nova, and shimmer
  const [input, setInput] = useState<String>('');
  const [audio, setAudio] = useState<any>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [download, setDownlaod] = useState<Boolean>(false);

  // const playFile = useRef<HTMLInputElement>(null)

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setInput(newValue)
  }



  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true)

      const response = await fetch("/api/textToSpeech", {
        body: JSON.stringify(input),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      

      // Error handling for unsuccessful response
      if (!response.ok) throw new Error("Error generating audio");

      // Notify success and trigger file download
      toast.success("Audio generated successfully!");

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      setAudio(downloadUrl);
      
      // creates file to downlaod
      // const link = document.createElement("a");
      // link.href = downloadUrl;
      // link.setAttribute("download", "vision.mp3");
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      

    } catch (error) {
      console.error(error);

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

          <audio autoPlay src={audio}></audio>

          {/* input form */}
          <form onSubmit={handleSubmit} className='relative'>
            <Input
              name='message'
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
  );
}