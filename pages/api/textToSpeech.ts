import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// The API handler function
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const body = req.body;
		const prompt = body.input;
		const voice = body.voice;
		const model = body.model;

		const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

		console.log("Generating audio...");

		const speech = await openai.audio.speech.create({
			model: model,
			voice: voice,
			input: prompt,
			response_format: "mp3",
		});

		console.log("Finished generating audio");

		// Convert response to buffer and send as MP3 file
		const speechMP3Buffer = Buffer.from(await speech.arrayBuffer());
		res.setHeader("Content-Type", "audio/mpeg");
		res.setHeader(
			"Content-Disposition",
			'attachment; filename="text-to-speech.mp3"'
		);
		res.status(200).send(speechMP3Buffer);
	} catch (error) {
		// Error handling
		console.error("Error in generating audio:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}
