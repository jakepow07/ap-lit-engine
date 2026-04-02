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
      max_tokens: 4096,
      system: `You are an expert AP Literature writing coach, editor, and rhetorician. You analyze student essays with deep expertise across grammar, rhetoric, logic, and textual analysis.

You always respond in valid JSON only — no markdown, no explanation, just the raw JSON object.

You annotate essays across these eight categories:

STYLE PRINCIPLES (from The Elements of Style by Strunk):
1. OMIT_NEEDLESS_WORDS — Wordy phrases, redundant modifiers, unnecessary padding
2. CLARITY — Confusing sentence structure, ambiguous pronoun references, unclear meaning
3. PARAGRAPH_STRUCTURE — Weak topic sentences, poor transitions, illogical paragraph flow
4. WORD_CHOICE — Vague or weak word choices, overused words, imprecise language

GRAMMAR:
5. GRAMMAR_ERROR — Subject-verb disagreement, tense inconsistency, misplaced modifiers, comma splices, run-on sentences, sentence fragments, incorrect punctuation

RHETORIC:
6. RHETORICAL_ERROR — Weak or missing thesis, underdeveloped argument, poor use of ethos/pathos/logos, ineffective transitions, lack of counterargument

LOGIC:
7. LOGICAL_FALLACY — Ad hominem, straw man, hasty generalization, false dichotomy, circular reasoning, appeal to authority, slippery slope, non sequitur

TEXT ADHERENCE:
8. TEXT_ADHERENCE — Claims unsupported by the text, misquotation, misinterpretation of source material, lack of textual evidence, plot inaccuracies`,
      messages: [
        {
          role: "user",
          content: `Analyze this essay${title ? ` about "${title}"` : ""} and return detailed annotations across all eight categories.

Essay:
"""
${essay}
"""

Return a JSON object with exactly this structure:
{
  "annotations": [
    {
      "id": "unique string like ann_1, ann_2...",
      "startIndex": <exact character index where the issue begins in the original essay>,
      "endIndex": <exact character index where the issue ends>,
      "text": "the exact text being annotated",
      "type": "OMIT_NEEDLESS_WORDS" | "CLARITY" | "PARAGRAPH_STRUCTURE" | "WORD_CHOICE" | "GRAMMAR_ERROR" | "RHETORICAL_ERROR" | "LOGICAL_FALLACY" | "TEXT_ADHERENCE",
      "severity": "minor" | "moderate" | "major",
      "note": "Concise, direct note explaining the issue (max 20 words)",
      "suggestion": "The improved version of the flagged text"
    }
  ],
  "overallScore": <number 1-100>,
  "summary": "2-3 sentence overall assessment — direct, honest, constructive",
  "strengths": ["strength 1", "strength 2"],
  "topIssues": ["most common issue 1", "most common issue 2", "most common issue 3"]
}

Important rules:
- Provide 10-24 annotations covering a mix of all relevant categories
- startIndex and endIndex must be EXACT character positions in the original essay text
- The "text" field must be the EXACT substring from essay[startIndex:endIndex]
- Spread annotations across the full essay, not just the beginning
- For GRAMMAR_ERROR: name the specific error type in the note (e.g. "Comma splice. Join with semicolon or split into two sentences.")
- For LOGICAL_FALLACY: name the specific fallacy (e.g. "Hasty generalization — one example does not prove a universal claim.")
- For TEXT_ADHERENCE: be specific about what is unsupported or misread
- For RHETORICAL_ERROR: explain what rhetorical move is missing or weak`,
        },
      ],
    });

    const raw = message.content[0].text;
    const clean = raw.replace(/```json|```/g, "").trim();
    const data = JSON.parse(clean);

    // Validate annotations — only keep those with valid character ranges
    data.annotations = (data.annotations || []).filter((ann) => {
      const slice = essay.slice(ann.startIndex, ann.endIndex);
      return slice.length > 0;
    });

    return Response.json(data);
  } catch (error) {
    console.error("Error in /api/annotate:", error);
    return Response.json(
      { error: "Failed to annotate essay" },
      { status: 500 }
    );
  }
}
