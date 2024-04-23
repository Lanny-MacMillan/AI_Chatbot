'use client'
import { useState, useRef } from 'react'
import toast from "react-hot-toast";
import { motion } from 'framer-motion'
import { Input } from '@/components/ui'
import { SendHorizontalIcon } from 'lucide-react'
import Wavesurfer from './ui/wavesurfer/wavesurfer';
import { hoverClass, standardClass } from '@/public/constants';

export default function Speech() {
  const [input, setInput] = useState<string>('');
  const [audio, setAudio] = useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voice, setVoice] = useState<string>('alloy');
  const [model, setModel] = useState<string>('tts-1');
  const [downloadAudio, setDownloadAudio] = useState<string>('false');
  const [pause, setPause] = useState<boolean>(false);
  const [ hover, setHover ] = useState<boolean>(false);

  

  // const standardClass =
	// "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 absolute right-1 top-1 h-9 w-12 bg-custom-purple-100 text-secondary-foreground h-10 w-10";

  // const hoverClass =
	// "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 absolute right-1 top-1 h-9 w-12 bg-custom-teal-100 text-secondary-foreground h-10 w-10";

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setInput(newValue)
  }

  const handleSubmitDownload = async (e: any) => {
    e.preventDefault();
    setAudio('')

    try {
      setIsLoading(true)

      const response = await fetch("/api/textToSpeech", {
        body: JSON.stringify({ input, voice, model }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) throw new Error("Error generating audio");

      toast.success("Audio generated successfully!");

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      
      // // creates file to download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "vision.mp3");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error(error);

    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitAudio = async (e: any) => {
    e.preventDefault();
    setAudio('')
    try {
      setIsLoading(true)

      const response = await fetch("/api/textToSpeech", {
        body: JSON.stringify({ input, voice, model }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) throw new Error("Error generating audio");

      toast.success("Audio generated successfully!");

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      setAudio(downloadUrl);

    } catch (error) {
      console.error(error);

    } finally {
      setIsLoading(false)
    }
  }
  


  return (
      <div className=" container flex w-screen flex-col items-center justify-around">
      <motion.h1
        className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text lg:text-7xl font-customBlack  text-center lg:mt-16 lg:mb-24"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0}}
        transition={{ type: "spring", bounce: .7 }}      >Text to Speech</motion.h1>
        <div className="w-full max-w-lg ">

        {audio ? (
          <div className='lg:mt-16'>
            <Wavesurfer className='lg:mt-24' audio={audio} pause={pause} setPause={setPause} />
          </div>
          ) : <div className='h-60 lg:mt-24'/>}
          
          <form onSubmit={downloadAudio === "true" ? handleSubmitDownload : handleSubmitAudio} className='relative rounded-md w-full max-w-lg mt-24 shadow-2xl'>
            <Input
              name='message'
              onChange={onChange}
              placeholder='What would you like me to say?...'
            />
            <motion.button
              type='submit'
              disabled={isLoading || input.length === 0}

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
          <div className='flex flex-row justify-around mt-10 max-w-lg'> 
            <form className="max-w-sm mx-auto flex flex-row ">
              <select
                  onChange={(e) => {
                  setVoice(e.target.value)
                  }}
                  className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
                  defaultValue={'Choose a voice'}
                >
                <option value="alloy" >Choose a voice</option>
                <option value="alloy">Alloy</option>
                <option value="echo">Echo</option>
                <option value="fable">Fable</option>
                <option value="onyx">Onyx</option>
                <option value="nova">Nova</option>
                <option value="shimmer">Shimmer</option>
              </select>
            </form>
            <form className="max-w-sm mx-auto flex flex-row ">
              <select
                  onChange={(e) => {
                    setModel(e.target.value)
                  }}
                  className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
                  defaultValue={'Choose a Model'}>
                <option value="tts-1">Choose a model</option>
                <option value="tts-1">tts-1</option>
                <option value="tts-1-hd">tts-1-hd</option>
              </select>
            </form>
            <form className="max-w-sm mx-auto flex flex-row ">
              <select
                onChange={(e) => {
                setDownloadAudio(e.target.value)
                }}
                  className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
                  defaultValue={'Audio Source'}>
                <option value="false">Audio Source</option>
                <option value="true">Download</option>
                <option value="false">Listen</option>
              </select>
            </form>
          </div>         
        </div>
      </div>
  );
}