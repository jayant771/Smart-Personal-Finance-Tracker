const fetch = require("node-fetch");

const getGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const message = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return message || "No suggestion available.";
  } catch (error) {
    console.error("Gemini Error:", error.message);
    return "AI error occurred while generating suggestion.";
  }
};

module.exports = getGeminiResponse;
