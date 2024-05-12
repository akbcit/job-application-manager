import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI();

export async function generateResponse(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message['content']);
}

