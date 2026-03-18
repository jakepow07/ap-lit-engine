import Anthropic from "@anthropic-ai/sdk";
 
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
 
export async function POST(req) {
  try {
    const { previousQuestions = [] } = await req.json();
 
    const avoidList =
      previousQuestions.length > 0
        ? `Do NOT repeat any of these questions: ${previousQuestions.join(" | ")}`
        : "";
 
    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      system: `You are a witty, enthusiastic English Literature trivia host — think Jeopardy meets a passionate lit professor. 
You craft questions that range from broad and accessible to delightfully obscure and specific.
You always respond in valid JSON only — no markdown, no explanation, just the raw JSON object.`,
      messages: [
        {
          role: "user",
          content: `Generate a single English Literature trivia question.
 
${avoidList}
 
Mix difficulty freely — sometimes ask something any reader would know, sometimes ask something only a true literature nerd would get.
 
Cover a wide range: Shakespeare, Victorian novels, American classics, modernism, poetry, postcolonial lit, mythology, authors' lives, literary devices, first lines, character names, publication years, awards, adaptations — anything goes.
 
Return a JSON object with exactly this structure:
{
  "question": "The trivia question, phrased in Jeopardy style (as a clue, not a direct question)",
  "answer": "The correct answer",
  "options": ["correct answer", "wrong answer 2", "wrong answer 3", "wrong answer 4"],
  "difficulty": "easy" | "medium" | "hard" | "fiendish",
  "category": "e.g. Shakespeare / Victorian Lit / Poetry / American Classics / Author Lives / Literary Devices",
  "points": <100 for easy, 200 for medium, 300 for hard, 500 for fiendish>,
  "funFact": "A fascinating one-sentence fact related to the answer"
}
 
Shuffle the options array so the correct answer is not always first.`,
        },
      ],
    });
 
    const raw = message.content[0].text;
    const clean = raw.replace(/```json|```/g, "").trim();
    const data = JSON.parse(clean);
 
    return Response.json(data);
  } catch (error) {
    console.error("Error in /api/trivia:", error);
    return Response.json(
      { error: "Failed to generate trivia question" },
      { status: 500 }
    );
  }
}
 