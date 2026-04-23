const { generateText, streamResponse } = require("../services/aiService");

exports.generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }

        const result = await generateText(prompt);

        res.json({
            success: true,
            data: result
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.generateStream = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        await streamResponse(prompt, res);

    } catch (error) {
        res.status(500).end("Streaming error");
    }
};