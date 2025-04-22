const getGeminiResponse = require("../utils/gemini");

exports.getAISuggestions = async (req, res) => {
  try {
    // Static prompt for now, can make dynamic with user spending
    const prompt = `Give a short and helpful personal finance tip for someone who spent a lot on food, travel, and shopping this month.`;

    const suggestion = await getGeminiResponse(prompt);
    res.status(200).json({ suggestion });
  } catch (error) {
    console.error("Suggestion Error:", error.message);
    res.status(500).json({ message: "Failed to get AI suggestion." });
  }
};
