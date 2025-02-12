const axios = require("axios");
const { GEMINI_API_KEY } = require("../config/config");

exports.handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an expert chatbot that answers only agriculture and crop-related questions. 
                If a question is unrelated, provide a default response. Also, suggest useful features of our app.

                User Question: "${message}"`,
              },
            ],
          },
        ],
      }
    );

    // ✅ Extract response from Gemini API
    let reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to assist you with agriculture-related queries!";

    // ✅ Default response if the answer is unrelated
    if (!reply.includes("crop") && !reply.includes("agriculture") && !reply.includes("farming")) {
      reply = `I specialize in agriculture and crop-related topics. Feel free to ask about farming techniques, weather conditions, or marketplace inquiries.

      🔹 **Navigation Links**:
      - 🌾 [Marketplace](http://localhost:5173/marketplace) (Buy & Sell Crops)
      - ☁️ [Weather](http://localhost:5173/weather) (Check Weather Forecast)
      - 📊 [Crop Reports](http://localhost:5173/daily-reports) (Monitor Crop Growth)`;
    }

    res.json({ reply });
  } catch (error) {
    console.error("❌ Error communicating with Gemini API:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
};
