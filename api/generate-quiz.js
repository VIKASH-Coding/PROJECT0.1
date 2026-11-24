 export default async function handler(req, res) {
    // 1. Security & CORS Headers (taaki aapka frontend backend se baat kar sake)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST requests allowed" });
    }

    // 2. Server ke Secret Environment Variable se API Key padhna
    // Yeh key kabhi bhi user ke browser ya GitHub par nahi dikhegi
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Server par GROQ_API_KEY set nahi hai." });
    }

    try {
        const { promptText, imgB64, imgMime } = req.body;

        // 3. Groq ke active models auto-detect karna
        const modelsRes = await fetch("https://api.groq.com/openai/v1/models", {
            headers: { "Authorization": `Bearer ${apiKey}` }
        });
        const modelsData = modelsRes.ok ? await modelsRes.json() : { data: [] };
        const availableIds = (modelsData.data || [])
            .map(m => m.id)
            .filter(id => !id.includes("whisper") && !id.includes("guard") && !id.includes("tts") && !id.includes("embed"));

        // Image ho toh vision model pehle, warna best chat model pehle
        availableIds.sort((a, b) => {
            const score = id => {
                if (imgB64) return (id.includes("scout") || id.includes("maverick") || id.includes("vision")) ? 0 : 1;
                if (id.includes("llama-4") || id.includes("70b") || id.includes("gpt-oss")) return 0;
                return 1;
            };
            return score(a) - score(b);
        });

        const modelsToTry = availableIds.length > 0 ? availableIds.slice(0, 3) : ["llama-3.1-8b-instant"];

        // 4. AI se MCQs generate karwana
        for (const model of modelsToTry) {
            const userContent = imgB64
                ? [
                    { type: "text", text: promptText },
                    { type: "image_url", image_url: { url: `data:${imgMime || "image/jpeg"};base64,${imgB64}` } }
                ]
                : promptText;

            const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model,
                    messages: [{ role: "user", content: userContent }],
                    temperature: 0.4
                })
            });

            if (!aiRes.ok) continue;

            const data = await aiRes.json();
            const rawText = data?.choices?.[0]?.message?.content || "";
            const jsonMatch = rawText.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                return res.status(200).json({ questions: JSON.parse(jsonMatch[0]) });
            }
        }

        return res.status(502).json({ error: "AI server busy hai, dobara try karein." });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}