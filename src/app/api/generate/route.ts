import { OpenAI } from "@langchain/openai";
import { getRelevantContext } from "@/lib/vectorStore";

export const runtime = "nodejs"; 

export async function POST(req: Request) {
  try {
    const { prompt, courseId, useRAG } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Missing required prompt string" }), { status: 400 });
    }

    let dynamicContext = "";
    if (useRAG && courseId) {
      const topMatches = await getRelevantContext(prompt, courseId);
      dynamicContext = topMatches.join("\n\n---\n\n");
    }

    const llm = new OpenAI({
      modelName: "gpt-4o",
      streaming: true,
      temperature: 0.3,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const structuredPrompt = `
      You are an expert curriculum developer. Review the reference contexts and fulfill the request.
      
      [CONTEXT REFERENCE]
      ${dynamicContext || "No custom context files provided."}
      
      [REQUESTED TOPIC]
      ${prompt}

      [OUTPUT SCHEMA MANDATE]
      You must respond ONLY with a valid minified raw JSON object matching this structural layout:
      {
        "title": "Module Title String",
        "content": "Deep reading markdown educational modules",
        "quiz": [
          {
            "question": "Clear option validation text?",
            "options": ["A", "B", "C", "D"],
            "answer": "Exact text string of the correct choice matching options array"
          }
        ]
      }
    `;

    const modelStream = await llm.stream(structuredPrompt);
    const encoder = new TextEncoder();

    const clientResponseStream = new ReadableStream({
      async start(controller) {
        for await (const piece of modelStream) {
          controller.enqueue(encoder.encode(piece));
        }
        controller.close();
      },
    });

    return new Response(clientResponseStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Internal Server Failure" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}