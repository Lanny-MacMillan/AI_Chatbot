import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from 'next/server'

const openai = new OpenAI();

const speechFile = path.resolve("./speech.mp3");

export async function generateAudio() {
  if (!process.env.OPENAI_API_KEY) {
    return new NextResponse('Missing OpenAI API Key.', { status: 400 })
  }
  // const { message } = await req.json()

  const response = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    // input: { message },
    input: "Today is a wonderful day to build something people love!",
  });
  console.log("speechFile", speechFile);
  const buffer = Buffer.from(await response.arrayBuffer());

  // final mp3 speechfile
  await fs.promises.writeFile(speechFile, buffer);
}
// export default generateAudio;