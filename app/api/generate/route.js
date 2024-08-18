import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:

1. Create clear and short questions for the front of the flashcard.
2. Provide Short and correct answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. Create the flashcard in easy English, not too hard English.
8. Make sure the flashcards are not too long or too short.
9. Only generate 10 flashcards.

Remember, the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the following JSON format:
{
  "flashcards": [{
    "front": str,
    "back": str
  }]
}`;

export async function POST(req) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  const data = await req.text();
  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    response_format: { type: "json_object" },
  });
  // console.log(completion.choices[0].message.content);
  // const flashcards = JSON.parse(completion.choices[0].message.content);
  // return NextResponse.json(flashcards.flashcards);
  const responseContent = completion.choices[0].message.content;

  const startIndex = responseContent.indexOf("{");
  const endIndex = responseContent.lastIndexOf("}") + 1;

  if (startIndex !== -1 && endIndex !== -1) {
    const jsonContent = responseContent.slice(startIndex, endIndex);
    const flashcards = JSON.parse(jsonContent);
    return NextResponse.json(flashcards.flashcards);
  } else {
    throw new Error("Invalid JSON format in the response");
  }
}
