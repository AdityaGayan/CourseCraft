import { OpenAIEmbeddings } from "@langchain/openai";
import { prisma } from "./db";

const embeddings = new OpenAIEmbeddings({
  modelName: "text-embedding-3-small",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function getRelevantContext(query: string, courseId: string): Promise<string[]> {
  try {
    const queryVector = await embeddings.embedQuery(query);
    const vectorString = `[${queryVector.join(",")}]`;

    // Mathematical Cosine Distance Query fetching the top 5 matches
    const matches = await prisma.$queryRawUnsafe<any[]>(
      `
      SELECT content FROM "DocumentVectors"
      WHERE "courseId" = $1
      ORDER BY embedding <=> $2::vector
      LIMIT 5;
      `,
      courseId,
      vectorString
    );

    return matches.map((m) => m.content);
  } catch (error) {
    console.error("Vector matching calculation failure:", error);
    return [];
  }
}