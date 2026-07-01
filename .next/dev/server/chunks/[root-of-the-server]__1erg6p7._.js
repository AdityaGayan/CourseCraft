module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:worker_threads [external] (node:worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:worker_threads", () => require("node:worker_threads"));

module.exports = mod;
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const prisma = globalThis.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) {
    globalThis.prisma = prisma;
}
}),
"[project]/src/lib/vectorStore.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRelevantContext",
    ()=>getRelevantContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$openai$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@langchain/openai/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$openai$2f$dist$2f$embeddings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@langchain/openai/dist/embeddings.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
;
const embeddings = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$openai$2f$dist$2f$embeddings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIEmbeddings"]({
    modelName: "text-embedding-3-small",
    openAIApiKey: process.env.OPENAI_API_KEY
});
async function getRelevantContext(query, courseId) {
    try {
        const queryVector = await embeddings.embedQuery(query);
        const vectorString = `[${queryVector.join(",")}]`;
        // Mathematical Cosine Distance Query fetching the top 5 matches
        const matches = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$queryRawUnsafe(`
      SELECT content FROM "DocumentVectors"
      WHERE "courseId" = $1
      ORDER BY embedding <=> $2::vector
      LIMIT 5;
      `, courseId, vectorString);
        return matches.map((m)=>m.content);
    } catch (error) {
        console.error("Vector matching calculation failure:", error);
        return [];
    }
}
}),
"[project]/src/app/api/generate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$openai$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@langchain/openai/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$openai$2f$dist$2f$llms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@langchain/openai/dist/llms.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vectorStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/vectorStore.ts [app-route] (ecmascript)");
;
;
const runtime = "nodejs";
async function POST(req) {
    try {
        const { prompt, courseId, useRAG } = await req.json();
        if (!prompt) {
            return new Response(JSON.stringify({
                error: "Missing required prompt string"
            }), {
                status: 400
            });
        }
        let dynamicContext = "";
        if (useRAG && courseId) {
            const topMatches = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vectorStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRelevantContext"])(prompt, courseId);
            dynamicContext = topMatches.join("\n\n---\n\n");
        }
        const llm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$openai$2f$dist$2f$llms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAI"]({
            modelName: "gpt-4o",
            streaming: true,
            temperature: 0.3,
            openAIApiKey: process.env.OPENAI_API_KEY
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
            async start (controller) {
                for await (const piece of modelStream){
                    controller.enqueue(encoder.encode(piece));
                }
                controller.close();
            }
        });
        return new Response(clientResponseStream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message || "Internal Server Failure"
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1erg6p7._.js.map