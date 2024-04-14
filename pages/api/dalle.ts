import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// export const runtime = 'edge'

// The API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("speech_req:", req.body)
    const prompt = req.body;


    // Initialize OpenAI client
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

    console.log("Generating image...");

    // Generate image 
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    // const tempUrl = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-AugVlpmbhznLgzHpeepyR8Da/user-jbUto2flRwMPHW0RMvjaX5k3/img-RiHhK3s380WeneT8eOyiWPs2.png?st=2024-04-14T05%3A05%3A54Z&se=2024-04-14T07%3A05%3A54Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-13T07%3A36%3A13Z&ske=2024-04-14T07%3A36%3A13Z&sks=b&skv=2021-08-06&sig=4Kwdobfi%2BRJR9mtOQ3P0Fe30ESkrcDQFC0MnsZoKmM8%3D"

    console.log("Finished generating image: ", image.data[0].url);
    const url = JSON.stringify(image.data[0].url);
    
    // if (typeof image === 'object') return res.status(200).send(image);
    // if (typeof image === 'string') return res.status(200).send(JSON.parse(image));

    res.setHeader("Content-Type", "aimage/jpeg");
    res.setHeader("Content-Disposition", 'attachment; filename="dallE-image.jpeg"');
    return res.status(200).send(url);
      // return NextResponse.json({
      //   url,
      // })

  } catch (error) {
    // Error handling
    console.error("Error in generating image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}