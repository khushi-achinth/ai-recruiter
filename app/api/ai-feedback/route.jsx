import {FEEDBACK_PROMPT} from "@/services/constants";
import {NextResponse} from "next/server";
import OpenAI from "openai";

export async function POST(req) {
    const {conversation} = await req.json();
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', conversation)

    try {
        const openai = new OpenAI({
            baseURL: process.env.OPENROUTER_BASE_URL,
            apiKey: process.env.OPENROUTER_API_KEY,
        })
        const completion = await openai.chat.completions.create({
            model: process.env.OPENROUTER_AI_MODEL,
            messages: [
                {role: "user", content: FINAL_PROMPT}
            ],

        })
        return NextResponse.json(completion.choices[0].message)
    } catch (e) {
        console.error(e)
        return NextResponse.json(e)
    }

}