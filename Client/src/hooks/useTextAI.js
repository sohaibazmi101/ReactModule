import { useState } from "react";
import { generateText, streamText } from "../api/apiService";

export default function useTextAI() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generate = async (prompt) => {
        try {
            setLoading(true);
            setError(null);

            const res = await generateText(prompt);

            setMessages((prev) => [
                ...prev,
                { role: "user", text: prompt },
                { role: "ai", text: res.data },
            ]);

        } catch (err) {
            setError("Failed to Generate Response");
        } finally {
            setLoading(false);
        }
    };

    const generateStream = async (prompt) => {
        try {
            setLoading(true);
            setError(null);


            setMessages((prev) => [
                ...prev,
                { role: "user", text: prompt },
                { role: "ai", text: "" },
            ]);

            const res = await streamText(prompt);

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            let result = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n").filter(Boolean);

                for (let line of lines) {
                    if (!line.startsWith("data: ")) continue;

                    const raw = line.replace("data: ", "").trim();

                    if (raw === "[DONE]") {
                        setLoading(false);
                        return;
                    }

                    let text;
                    try {
                        text = JSON.parse(raw);
                    } catch {
                        continue;
                    }

                    const cleanText = text
                        .replace(/([a-zA-Z])\*\*/g, "$1 **")
                        .replace(/\*\*([a-zA-Z])/g, "** $1");

                    result += cleanText;

                    setMessages((prev) => {
                        const updated = [...prev];
                        updated[updated.length - 1].text = result;
                        return updated;
                    });
                }
            }

        } catch (err) {
            console.error(err);
            setError("Streaming Failed");
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        loading,
        error,
        generate,
        generateStream,
    };
}