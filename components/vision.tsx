"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Input, Button } from '@/components/ui'
import PicturePreview from "@/components/ui/PicturePreview";
import { sillyPrompt, fashionPrompt, seriousPrompt, aiThoughts } from "@/public/constants";

export default function Vision() {
  const [images, setImages] = useState<File[]>([]);
  const [audio, setAudio] = useState<any>('');
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [voice, setVoice] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [manualPrompt, setManualPrompt] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');

  // audio visualizer, play and pause, restart options
  // pull aiMessage from vision.ts and render text in UI

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setPrompt(newValue)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
    }
  };

  const handlePrompt = (choice: string) => {
    console.log('choice',choice)
    switch (choice) {
      case 'Ai thoughts':
        setPrompt(aiThoughts)
        break;
      case 'manual':
        setManualPrompt('manual')
        break;
      case 'roast':
        setPrompt(sillyPrompt)
        break;
      case 'fashion advice':
        setPrompt(fashionPrompt)
        break;
      case 'serious thoughts':
        setPrompt(seriousPrompt)
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
      console.log("RESPONSE", { response })
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      setAudio(downloadUrl);

    } catch (error) {

      toast.error("Something went wrong generating the audio file!");
      console.error(error);

    } finally {

      setisLoading(false);

    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#5be9b9]">

      <div
        className="container flex bg-transparent rounded-lg p-6 text-center flex flex-col justify-between"
        style={{ height: "500px" }}
      >
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center items-center">
          <audio autoPlay src={audio}></audio>
        <h1 className="text-2xl font-bold text-custom-purple-600">
          Vision Ai
        </h1>
      </div>
      <h2 className="text-l mt-2 font-semibold text-custom-purple-500">
        Upload your images and get insights from Ai!
      </h2>
          </div>
          
          <PicturePreview images={images} />
            
          <div className="flex flex-col items-center justify-between ">
            {images.length === 0 ? (
              <>
                <label className="cursor-pointer">
                  <div className="border-2 border-dashed border-custom-purple-600 rounded-lg p-4 mt-2  w-64">
                    <p className="text-lg text-custom-purple-600">Upload Images</p>
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
                      <p className="text-xs text-custom-purple-500 mt-2">
                        You need to upload an image to use Vision
                      </p>
                    )}
              </>
            ) : (
                <>
                  <div>
                    <button
                      onClick={() => void assessImages()}
                      className="border-2 border-dashed border-custom-purple-600 rounded-lg p-4 mt-2  w-64 text-custom-purple-600"
                      disabled={isLoading || images.length === 0}
                    >
                      {isLoading ? "Generating..." : "Assess"}
                    </button>
                  </div>
                  <div className="w-full max-w-lg">
                    <div className='flex flex-row justify-around mt-5'> 
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
                            handlePrompt(e.target.value)
                          }}
                            className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
                            defaultValue={'Prompt'}>
                          <option value="Ai thoughts">Prompts</option>
                          <option value="roast">silly roast</option>
                          <option value="fashion advice">funny fashion advice</option>
                          <option value="serious thoughts">serious thoughts</option>
                          <option value="manual">manual</option>
                          <option value="Ai thoughts">Ai thoughts</option>
                        </select>
                      </form>
                      
                    </div>
                    {manualPrompt === 'manual' ? (
                      <form
                      className='relative  mt-5'>
                      <Input
                        name='message'
                        onChange={onChange}
                        placeholder='What would you like me to say?...'
                        className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[45px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 placeholder:italic outline-none"
                      />
                      {/* <Button
                        size='icon'
                        type='submit'
                        variant='secondary'
                        disabled={isLoading}
                        className='absolute right-1 top-1 h-9 w-12'
                      >
                        <SendHorizontalIcon className='h-5 w-5 text-custom-teal' />
                      </Button> */}
                    </form>
                    ) : <div className="h-[65px]"/>
                    }

                  </div>  
                </>
              )}
          </div>
        </div>
      </main>
      </>

  );
}