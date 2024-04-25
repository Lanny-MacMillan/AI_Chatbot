import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionContentPart } from "openai/resources/index.mjs";

// The API handler function
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const body = req.body;
		const images: string[] = body.payload.images;
		const voice = body.voice;
		const model = body.model;
		const prompt = body.prompt;
		// console.log("DATA", { voice, model, prompt, images, body });
		if (!images || images.length === 0) {
			res.status(400).json({ message: "No images provided" });
			return;
		}
		const openai = new OpenAI();

		// Map images to chat completion content part format
		const imageMessages: ChatCompletionContentPart[] = images.map(
			(base64Image) => ({
				type: "image_url",
				image_url: {
					url: base64Image,
				},
			})
		);

		// Create a chat completion request to OpenAI
		const response = await openai.chat.completions.create({
			model: "gpt-4-vision-preview",
			stream: false,
			messages: [
				{
					role: "user",
					content: [
						{
							// Text content part with the prompt
							type: "text",
							text: prompt,
						},
						// Image content parts
						...imageMessages,
					],
				},
			],
			max_tokens: 300,
		});

		// Extracting the AI-generated message
		const aiMessage = response.choices[0].message.content;

		// Handling case where no AI message is returned
		if (!aiMessage) {
			return NextResponse.json({ success: false }, { status: 500 });
		}

		console.log("Generating audio...");

		// Generate speech from the AI message
		const visionMP3 = await openai.audio.speech.create({
			model: model,
			voice: voice,
			input: aiMessage,
			response_format: "mp3",
		});

		console.log("Finished generating audio");

		// Convert response to buffer and send as MP3 file
		const visionMP3Buffer = Buffer.from(await visionMP3.arrayBuffer());
		res.setHeader("Content-Type", "audio/mpeg");
		res.setHeader("Content-Disposition", 'attachment; filename="vision.mp3"');
		res.status(200).send(visionMP3Buffer);
		// res.status(200).send("test");
	} catch (error) {
		// Error handling
		console.error("Error in generating audio:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}
