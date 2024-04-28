"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from 'framer-motion'
import { Input, SelectPrompt, SelectModel, SelectVoice } from '@/components/ui';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import PicturePreview from "@/components/ui/PicturePreview";
import { SendHorizontalIcon, CircleX } from 'lucide-react'
import Wavesurfer from './ui/wavesurfer/wavesurfer';
import { sillyPrompt, fashionPrompt, seriousPrompt, aiThoughts } from "@/public/constants";
import PropagateLoader from "react-spinners/PropagateLoader";
import { hoverClass, standardClass } from '@/public/constants';

export default function Vision() {
  const [images, setImages] = useState<File[]>([]);
  const [audio, setAudio] = useState<any>('');
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [voice, setVoice] = useState<string>('alloy');
  const [model, setModel] = useState<string>('tts-1');
  const [manualPrompt, setManualPrompt] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [pause, setPause] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  // pull aiMessage from vision.ts and render text in UI

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setPrompt(newValue)
  }
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (filesArray.length > 2) {
        setError('You are only able to select up to 2 images. Please try again.')
        return
      }
      setImages(filesArray);
      setError('')
    }
  };

  const handlePrompt = (choice: string) => {
    switch (choice) {
      case 'Ai thoughts':
        setPrompt(aiThoughts)
        setManualPrompt('')
        break;
      case 'manual':
        setManualPrompt('manual')
        break;
      case 'roast':
        setPrompt(sillyPrompt)
        setManualPrompt('')
        break;
      case 'fashion advice':
        setPrompt(fashionPrompt)
        setManualPrompt('')
        break;
      case 'serious thoughts':
        setPrompt(seriousPrompt)
        setManualPrompt('')
        break;
      default:
        return null
    }
  }

  // Function to process and assess the images
  const assessImages = async () => {
    setisLoading(true);

    // Convert images to base64 strings for the backend
    const imagePromises = images.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    // Wait for all images to be converted
    const imageBase64Strings = await Promise.all(imagePromises);

    // Prepare payload for API request
    const payload = { images: imageBase64Strings };

    try {
      // API call to the endpoint
      const response = await fetch("/api/vision", {
        body: JSON.stringify({ payload, prompt, voice, model }),
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

    } catch (error:any) {

      toast.error("Something went wrong generating the audio file!");
      setError(error)
      console.error(error);

    } finally {

      setisLoading(false);

    }
  };

  const handleClick = () => {
    setImages([])
    setAudio('')
  }
  
  const Modal = () => {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <CircleX
            className="absolute right-0 top-0 text-red-600"
          />
        </Dialog.Trigger>
        
        <Dialog.Portal >
            <Dialog.Overlay
              className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 " />
          <Dialog.Content
            style={{
              border: '4px solid',
              borderImage: 'linear-gradient(to right,#7427f7,#5be9b9, #bc3ed3) 30',
            }}
            className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[80vw] max-w-[420px] translate-x-[-50%] translate-y-[-50%] bg-custom-purple-100 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              {images.length > 1 ? 'Remove Images' : 'Remove Image'}
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            {images.length > 1 ? 'Remove your images and start the process over?' : 'Remove your image and start the process over?'}

              
            </Dialog.Description>

            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                  <motion.button
                    disabled={isLoading}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="text-mauve11 hover:bg-green5 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-none focus:outline-none">
                  Cancel
                </motion.button>
              </Dialog.Close>
              <Dialog.Close asChild>
                  <motion.button
                    disabled={isLoading}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    onClick={handleClick}
                    className="text-red-600 hover:bg-green5 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-none focus:outline-none"
                  >
                  Delete
                </motion.button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }

  const renderSubmitType = (
    <>
      {manualPrompt === 'manual' ? (
        <div className="relative mt-5">
          <Input
            className=""
            name='message'
            onChange={onChange}
            placeholder='What would you like me to focus on?...'
          />
          <motion.button
            onClick={() => void assessImages()}
            disabled={isLoading}
            className={ hover ? hoverClass : standardClass }
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            whileTap={{ scale: 1.3 }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            >
            <SendHorizontalIcon className={ hover ? 'h-5 w-5 text-custom-purple-500'  : 'h-5 w-5 text-custom-teal-500'}/>
          </motion.button>
        </div>
      ): (
        <motion.button
            onClick={() => void assessImages()}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            whileTap={{ scale: 1.3 }}
            className="border-2 border-dashed border-custom-purple-600 rounded-lg p-4 mt-2  w-64 text-custom-purple-600"
            disabled={isLoading || images.length === 0}
        >
          {isLoading ? "Generating..." : "Assess"}
        </motion.button>

      )}
    </>
  )
  
  const renderAudioAndSelect = (
    <>
    {!audio ? (
      <div className="flex flex-col items-center justify-between ">
        {images.length === 0 ? (
          <>
            <label className="cursor-pointer">
              <div className="border-2 border-dashed border-custom-purple-600 rounded-lg p-4 mt-16  w-64">
                <p className="text-lg text-custom-purple-600">Upload Image(s)</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isLoading}
                />
                
              </div>                  
            </label>
            {images.length === 0 && (
              <>
                <p className="text-xs text-custom-magenta-400 mt-16">
                  You need to upload an image to use Vision.
                </p>
                <p className="text-xs text-custom-magenta-400 mt-2">
                Ai does not need your HD images. The response will be much faster if you upload image {'<'} 1mb
                </p>
                </>
                )}
          </>
        ) : (
            <>
              <div className="w-full max-w-lg">
                  {renderSubmitType}
                  <div className=" flex flex-row justify-between mt-8"> 
                    <SelectVoice setVoice={setVoice} />
                    <SelectModel setModel={setModel} />
                    <SelectPrompt handlePrompt={handlePrompt} /> 
                  </div>    
                {manualPrompt != 'manual' && error.length != 0  && <p className="text-xs text-red-600 mt-10 font-extrabold">{error}</p>}   
                {isLoading && manualPrompt != 'manual' &&(
                      <div className='mt-10'>
                        <PropagateLoader color="#7427f7" />
                      </div>
                    )}
              </div>  
            </>
        )}
      </div>
      ) : (
          <div className="z-0 mt-10">
            <Wavesurfer audio={audio} pause={pause} setPause={setPause} />
          </div>
      )
      }

    </>
  )

  return (
    <>
      <main className="flex flex-col justify-center ">

      <div className="container flex bg-transparent rounded-lg p-6 text-center flex flex-col">
      <div className="flex flex-col ">
        <div className="flex flex-row ">
          <motion.p
            className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-5xl lg:text-5xl  font-customBlack  text-center mt-8 mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0}}
            transition={{ type: "spring", bounce: .7 }}
          >Vision</motion.p>
          <motion.p
            className="bg-gradient-to-r from-custom-magenta-300 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-5xl lg:text-5xl  font-customBlack  text-center mt-8 mb-8 ml-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0}}
            transition={{ delay: .5, type: "spring", bounce: .7 }}
          > Ai</motion.p>
        </div>

      </div>
        <h2 className="text-l font-semibold text-custom-purple-500">
          Submit up to 2 images for Ai analysis and receive valuable insights!
        </h2>
          {images.length != 0 && (
            <div className="flex flex-col rounded-xl overflow-auto mt-16">
              <div className="relative border-2 border-solid border-red-600 rounded-xl">
                <PicturePreview images={images} />
                <Modal />
              </div>
            </div>
          )}


          {error && <p className="text-xs text-red-600 font-extrabold">{error}</p>}   
          {isLoading ? (
            <div className='mt-10'>
              <PropagateLoader color="#7427f7" />
            </div>
          ) : (
              <>
                {renderAudioAndSelect}
              </>
            )
          }
        </div>
      </main>
      </>

  );
}