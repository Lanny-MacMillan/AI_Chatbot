'use client'
import { useState, useRef } from 'react'
import toast from "react-hot-toast";
import { Input, Button } from '@/components/ui'
import { SendHorizontalIcon } from 'lucide-react'


export default function Speech() {
  // alloy, echo, fable, onyx, nova, and shimmer
  const [input, setInput] = useState<string>('');
  const [audio, setAudio] = useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [download, setDownlaod] = useState<boolean>(false);
  const [voice, setVoice] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [downloadAudio, setDownloadAudio] = useState<string>('');



  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setInput(newValue)
  }

  const handleSubmitDownload = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true)

      const response = await fetch("/api/textToSpeech", {
        body: JSON.stringify({ input, voice, model }),
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
    try {
      setIsLoading(true)

      const response = await fetch("/api/textToSpeech", {
        body: JSON.stringify({ input, voice, model }),
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

    } catch (error) {
      console.error(error);

    } finally {
      setIsLoading(false)
    }
  }

console.log("VOICE", voice)
console.log("model", model)
console.log("downloadAudio", downloadAudio)
  return (
    <div className='text-zinc-700'>
      <div className="container flex h-screen flex-col items-center justify-center">
        <h1 className="font-serif text-2x1 font-medium">Text to Speech</h1>
        <div className="mt-4 w-full max-w-lg">

          <audio autoPlay src={audio}></audio>

          <form onSubmit={downloadAudio === "true" ? handleSubmitDownload : handleSubmitAudio} className='relative'>
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
              disabled={isLoading}
              className='absolute right-1 top-1 h-8 w-10'
            >
              <SendHorizontalIcon className='h-5 w-5 text-emerald-500' />
            </Button>
          </form>
        <div className='flex flex-row justify-around mt-10'> 
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
                defaultValue={'tts-1'}>
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
    </div>
  );
}