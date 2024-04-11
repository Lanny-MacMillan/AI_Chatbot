import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionContentPart } from "openai/resources/index.mjs";
import data from '@/data.json'

// The API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("speech_req", req.body)
    // // Initialize OpenAI client
    // const openai = new OpenAI();
    const message = req.body;

    // console.log("Generating audio...");
    // // Generate speech from the AI message
    // const speech = await openai.audio.speech.create({
    //   model: "tts-1",
    //   voice: "alloy",
    //   input: message,
    //   response_format: "mp3",
    // });

    // console.log("Finished generating audio");

    // // Convert response to buffer and send as MP3 file
    // const speechMP3Buffer = Buffer.from(await speech.arrayBuffer());
    // res.setHeader("Content-Type", "audio/mpeg");
    // res.setHeader("Content-Disposition", 'attachment; filename="text-to-speech.mp3"');
    // res.status(200).send(speechMP3Buffer);
    res.status(200).send(message);

  } catch (error) {
    // Error handling
    console.error("Error in generating audio:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}