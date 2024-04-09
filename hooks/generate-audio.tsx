
import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI();

const speechFile = path.resolve("./speech.mp3");

async function generateAudio() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    // input: { text },
    input: "Today is a wonderful day to build something people love!",
  });
  console.log("speechFile", speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);

}
export default generateAudio;