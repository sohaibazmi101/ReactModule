import { useState } from "react";
import useTextAI from "../hooks/useTextAI";
import ReactMarkdown from "react-markdown";
import "../styles/TextGenerator.css";

function TextGenerator() {
    const { messages, loading, error, generateStream } = useTextAI();
    const [prompt, setPrompt] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (!prompt.trim()) return;
        await generateStream(prompt);
        setPrompt("");
    }

    return (
        <div className="text-generator">
            <h1>AI Text Generator</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ask somethings........"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button type="submit">
                    {loading ? "Thinking..." : "Send"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="output">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.role === "user" ? "user-msg" : "ai-msg"}>
                        <ReactMarkdown
                            components={{
                                h1: ({ node, ...props }) => <h2 style={{ fontSize: "20px" }} {...props} />,
                                h2: ({ node, ...props }) => <h3 style={{ fontSize: "18px" }} {...props} />,
                                h3: ({ node, ...props }) => <h4 style={{ fontSize: "16px" }} {...props} />,
                                p: ({ node, ...props }) => <p style={{ margin: "5px 0" }} {...props} />,
                                strong: ({ node, ...props }) => <strong style={{ color: "#ffd700" }} {...props} />
                            }}
                        >
                            {msg.text}
                        </ReactMarkdown>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TextGenerator;