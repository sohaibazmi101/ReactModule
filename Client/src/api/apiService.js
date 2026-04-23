import api from "./api";

export const registerUser = async (userData) =>{
    const res = await api.post("/auth/register", userData);
    return res.data;
};

export const loginUser = async (userData) => {
    const res = await api.post("/auth/login", userData);
    return res.data;
}

export const generateText = async (prompt) => {
    const res = await api.post("ai/text/generate", {prompt});
    return res.data;
}

export const streamText = async (prompt) => {
    const res = await fetch("http://localhost:8000/api/ai/text/stream", {
        method: "POST",
        headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({prompt}),
    });
    return res;
}