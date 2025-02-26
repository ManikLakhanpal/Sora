import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
  { 
    model: "gemini-1.5-flash" }
);

export async function POST(req: [NextRequest]) {
  try {
    const { history = [], chat } = await req.json();
    
    const chatSession = model.startChat({ history });

    const result = await chatSession.sendMessage(chat);

    const response = await result.response;
    
    const text = response.text();

    return Response.json({ text });

  } catch (error) {
    console.log(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}