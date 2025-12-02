const Groq = require("groq-sdk");

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Friendly journaling starter line
const getStarterLine = async (req, res) => {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `
            Give me one short, friendly journaling-starter question.
            Tone: warm, simple, supportive — like a close friend checking in.
            Do NOT repeat the same phrasing every time.

            Examples (do NOT copy these):
            - What's something you'd like to get off your chest today?
            - What feeling has been quietly sitting with you?
            - What moment from today stayed in your mind longer than others?

            Rules:
            - No quotes.
            - Return ONLY the question.
            - Must be fresh each time.
          `
        }
      ]
    });

    return res.json({
      starter: response.choices[0].message.content.trim()
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Natural, friendly journal analysis
const analyzeJournal = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `
            Read this journal entry and give a short, warm reflection in a natural tone.
            It should feel like a supportive friend understanding what I'm saying.

            Requirements:
            - 7 to 8 sentences MAX.
            - No headings like “Summary” or “Insight”.
            - No markdown, no bold text.
            - Direct, simple, caring tone.
            - Avoid repeating the same patterns or phrases across responses.
            - Speak to "you", not "the writer".

            Entry: ${text}
          `
        }
      ]
    });

    return res.json({
      analysis: response.choices[0].message.content.trim()
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getStarterLine, analyzeJournal };
