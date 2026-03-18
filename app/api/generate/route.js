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

    const message = await client.messages.create({
      model: "claude-opus-4-6",
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

    const raw = message.content[0].text;
    const clean = raw.replace(/```json|```/g, "").trim();
    const data = JSON.parse(clean);

    return Response.json(data);
  } catch (error) {
    console.error("Error in /api/generate:", error);
    return Response.json(
      { error: "Failed to generate analysis" },
      { status: 500 }
    );
  }
}
