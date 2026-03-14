const { GoogleGenerativeAI } = require("@google/generative-ai");

// Vercel panelinden eklediğin anahtarı çeker
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: "Sadece POST" });

    try {
        const { prompt } = req.body;
      const model = genAI.getGenerativeModel({ 
    model: "gemini-3.1-flash-lite-preview",
    systemInstruction: `Senin adın MandalinaAİ. Enerjik, yardımsever ve teknik derinliği yüksek bir yapay zekasın. 
    Uzmanlık alanların: Three.js (3D grafikler), Java, Python, CSS, C++, C#, C ve Assembly (ASM). 
    
    KURALLAR:
    1. Kod paylaşıyorsan mutlaka ilgili dilin Markdown bloğunu kullan (Örn: \`\`\`cpp ... \`\`\`).
    2. Asla ham HTML veya script çalıştırma, her zaman kod bloğu içinde göster.
    3. Karmaşık programlama kavramlarını basit ama teknik terimleri koruyarak açıkla.
    4. Cevaplarında ara sıra mandalina emojisi (🍊) kullan ve turuncu temasına sadık kal.`
});

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.status(200).json({ text: response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
