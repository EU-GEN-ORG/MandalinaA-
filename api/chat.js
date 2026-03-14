const { GoogleGenerativeAI } = require("@google/generative-ai");

// Buradaki isim Vercel paneline yazacağımız isimle aynı olmalı
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: "Sadece POST" });

    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ 
            model: "gemini-3.1-flash-lite-preview",
            systemInstruction: "Senin adın MandalinaAİ. Uzman bir yazılımcısın. 🍊 emojisi kullan ve turuncu temasını koru."
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.status(200).json({ text: response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
