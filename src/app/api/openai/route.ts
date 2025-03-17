import { NextRequest, NextResponse } from 'next/server'; 
import { OpenAI } from 'openai';  

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();  
        console.log("Received Prompt:", prompt); 

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", 
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
        });

        console.log("OpenAI Response:", response); 

        if (!response.choices || response.choices.length === 0) {
            return NextResponse.json({ error: "No choices in response" }, { status: 500 });
        }

        return NextResponse.json({
            text: response.choices[0].message.content, 
        });
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
