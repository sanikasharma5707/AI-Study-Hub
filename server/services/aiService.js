const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateSummary(text) {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Summarize these notes in simple language:

${text}`,
    });

    return response.text;
}

async function generateFlashcards(text) {

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `
           Create exactly 10 flashcards from the following notes.

Rules:
- Each flashcard should have one Question and one Answer.
- Keep answers short (1-3 lines).
- Do not include introductions or conclusions.
Format exactly like this:
Q: What is Artificial Intelligence?
A: Artificial Intelligence is the simulation of human intelligence by machines.
Q: What is Machine Learning?
A: Machine Learning enables computers to learn from data without explicit programming.
Notes:
${text}
`
});
    return response.text;
}

async function generateMCQs(text) {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `
Generate exactly 10 MCQs from these notes.
Return ONLY valid JSON.
Format:
[
  {
    "question": "What is AI?",
    "options": [
      "Artificial Intelligence",
      "Machine Learning",
      "Compiler",
      "Database"
    ],
    "answer": "Artificial Intelligence"
  }
]
Rules:
- Exactly 10 questions.
- 4 options each.
- One correct answer.
- No explanation.
- Do not write anything except JSON.
Notes:
${text}
`
    });
    return response.text;
}

module.exports = {
    generateSummary,generateFlashcards,generateMCQs
};