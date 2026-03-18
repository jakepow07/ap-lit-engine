import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req) {
  try {
    const { essay, title } = await req.json();

    if (!essay) {
      return Response.json({ error: "Essay is required" }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      system: `You are a strict but fair AP Literature essay grader with 20 years of experience.
You always respond in valid JSON only — no markdown, no explanation, just the raw JSON object.`,
      messages: [
        {
          role: "user",
          content: `Grade the following AP Literature essay${title ? ` about "${title}"` : ""}.

Essay:
"""
${essay}
"""

Score each category from 1–10 and return a JSON object with exactly this structure:
{
  "grammar": <number 1-10>,
  "originality": <number 1-10>,
  "clarity": <number 1-10>,
  "fidelity": <number 1-10>,
  "total": "<sum>/40",
  "feedback": "2-3 sentences of specific, actionable feedback"
}

Be rigorous. A score of 10 means truly exceptional AP-level work.`,
        },
      ],
    });

    const raw = message.content[0].text;
    const clean = raw.replace(/```json|```/g, "").trim();
    const data = JSON.parse(clean);

    return Response.json(data);
  } catch (error) {
    console.error("Error in /api/grade-essay:", error);
    return Response.json(
      { error: "Failed to grade essay" },
      { status: 500 }
    );
  }
}
