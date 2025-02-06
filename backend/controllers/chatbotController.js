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
                text: `My website provides agricultural insights and crop monitoring. ${message}`,
              },
            ],
          },
        ],
      }
    );

    res.json({ reply: response.data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error("Error communicating with Gemini API:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
};
