import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from 'next/server'
import data from '@/data.json'
import { OpenAIStream, StreamingTextResponse } from 'ai'
const client = new OpenAI();

const speechFile = path.resolve("./speech.mp3");
const speechFilePath = "Speech.mp3"

export function GET(req: Request) {
  // console.log(req.json)
  // // const { messages } = await req.json()
  // try {
  //   if (!process.env.OPENAI_API_KEY) {
  //     return new NextResponse('Missing OpenAI API Key.', { status: 400 })
  //   }

  //   const response = client.audio.speech.create({
  //     model: "tts-1",
  //     voice: "alloy",
  //     input: "Today is a wonderful day to build something people love!",
  //   });

  //   console.log(speechFile);


  //   const stream = OpenAIStream(response)
  //   return new StreamingTextResponse(stream)
    
  // } catch (error: any) {
  //   return new NextResponse(error.message || 'Something went wrong!', {
  //     status: 500
  //   })
  // }
}