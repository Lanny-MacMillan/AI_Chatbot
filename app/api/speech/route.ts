import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from 'next/server'
import data from '@/data.json'

const openai = new OpenAI();

const speechFile = path.resolve("./speech.mp3");


export async function POST(req: Request, context: any) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse('Missing OpenAI API Key.', { status: 400 })
    }
    console.log("req.json", req.json)
    // const { messages } = await req.json()

    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: "Today is a wonderful day to build something people love!",
    });

    console.log("speechFile", speechFile);

    const buffer = Buffer.from(await response.arrayBuffer());

    const data =  await fs.promises.writeFile(speechFile, buffer);

    return data
  } catch (error: any) {
    return new NextResponse(error.message || 'Something went wrong!', {
      status: 500
    })
  }
}