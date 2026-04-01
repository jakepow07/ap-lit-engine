import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req) {
  try {
    const { title } = await req.json();

    if (!title) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = await client.messages.stream({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 4096,
            system: `You are an expert AP Literature teacher and literary analyst.
You always respond in valid JSON only — no markdown, no explanation, just the raw JSON object.`,
            messages: [
              {
                role: "user",
                content: `Generate a comprehensive AP Literature study guide for "${title}".

Return a JSON object with exactly this structure:
{
  "synopsis": "A 3-4 sentence plot summary",
  "characters": [
    { "name": "Character Name", "description": "Role and significance" }
  ],
  "themes": [
    { "theme": "Theme Name", "explanation": "How this theme is developed in the text" }
  ],
  "quotes": [
    { "quote": "Exact quote", "speaker": "Who said it", "significance": "Why it matters for AP analysis" }
  ],
  "thesis": "A strong AP-level thesis statement about a central theme"
}

Include at least 4 characters, 4 themes, and 4 quotes.`,
              },
            ],
          });

          for await (const chunk of anthropicStream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta?.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }

          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Error in /api/generate:", error);
    return Response.json(
      { error: "Failed to generate analysis" },
      { status: 500 }
    );
  }
}
