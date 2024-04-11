"use client";
import { useState } from "react";
import { NavigationMenuAi } from '@/components/ui/nav/nav'
import toast from "react-hot-toast";
import PicturePreview from "@/components/ui/PicturePreview";

export default function Vision() {
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setisLoading] = useState(false);
  // pass in voices to be chosen by user
  // pass in different text strings for user to choose
  // add input field for custom text for vision to assess
  
  // Handles changes in the image input field
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Converts FileList to array and updates the state
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
    }
  };

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
        body: JSON.stringify(payload),
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
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "vision.mp3");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {

      toast.error("Something went wrong generating the audio file!");
      console.error(error);

    } finally {

      setisLoading(false);

    }
  };

  return (
    <>
    <NavigationMenuAi/>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#141c3a]">

      <div
        className="bg-transparent rounded-lg p-6 text-center flex flex-col justify-between"
        style={{ height: "500px" }}
      >
      <div className="flex flex-col items-center">
      <div className="flex flex-row justify-center items-center">
        {/* <Image
          className="w-[40px] h-[50px] mr-3"
          src="/images/logo.png"
          height={50}
          width={40}
          alt={"Missing"}
        /> */}
        <h1 className="text-2xl font-bold text-gray-600">
          Vision Ai
        </h1>
      </div>
      <h2 className="text-l mt-2 font-semibold text-gray-500">
        Upload your images and get insights from Ai!
      </h2>
          </div>
          
          <PicturePreview images={images} />
            
          <div className="flex flex-col items-center justify-between ">
            {images.length === 0 ? (
              <>
                <label className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mt-2  w-64">
                    <p className="text-lg text-gray-300">Upload Images</p>
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
                      <p className="text-xs text-gray-500 mt-2">
                        You need to upload an image to use Vision
                      </p>
                    )}
              </>
            ) : (
                <>
                  <div>
                    <button
                      onClick={() => void assessImages()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 mt-2  w-64 text-gray-300"
                      disabled={isLoading || images.length === 0}
                    >
                      {isLoading ? "Generating..." : "Assess"}
                    </button>
                  </div>
                      </>
                  )}
          </div>
        </div>
      </main>
      </>

  );
}