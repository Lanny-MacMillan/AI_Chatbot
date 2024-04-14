import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";


// The API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("speech_req:", req.body)
    const prompt = req.body;


    // // Initialize OpenAI client
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

    console.log("Generating image...");

    // Generate image 
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    console.log("Finished generating image: ", image.data[0].url);
    const url = image.data[0].url;

    // res.setHeader("Content-Type", "aimage/jpeg");
    // res.setHeader("Content-Disposition", 'attachment; filename="dallE-image.jpeg"');
    res.status(200).send(url);

  } catch (error) {
    // Error handling
    console.error("Error in generating image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}