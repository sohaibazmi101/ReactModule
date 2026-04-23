const axios = require("axios");

exports.streamResponse = async (prompt, res) => {
    try {
        const formattedPrompt = `
You are an AI assistant.

Always format your response using Markdown:
- Use headings (#, ##)
- Use **bold** for important points
- Use line breaks properly
- Use bullet points when needed
- Do NOT add extra quotes or symbols

User question:
${prompt}
`;
        const response = await axios({
            method: "post",
            url: "http://localhost:11434/api/generate",
            data: {
                model: "llama3",
                prompt: formattedPrompt,
                stream: true
            },
            responseType: "stream"
        });

        response.data.on("data", (chunk) => {
            const lines = chunk.toString().split("\n").filter(Boolean);

            for (const line of lines) {
                const parsed = JSON.parse(line);

                res.write(`data: ${parsed.response || ""}\n\n`);

                if (parsed.done) {
                    res.write(`data: [DONE]\n\n`);
                    res.end();
                }
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).end("Error generating response");
    }
};