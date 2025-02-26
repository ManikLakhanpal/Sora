"use client";

import { useState } from "react";
import axios from "axios";

interface HistoryInterface {
  role: "user" | "model";
  parts: { text: string }[];
}

export default function Home() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<HistoryInterface[]>([]);
  const [error, setError] = useState("");

  async function sendMessageToGemini() {
    try {
      const userMessage: HistoryInterface = {
        role: "user",
        parts: [{ text: text }],
      };

      setMessages((prev) => [...prev, userMessage]);

      const response = await axios.post("/api/chat", {
        history: messages,
        chat: text,
      });

      const modelMessage: HistoryInterface = {
        role: "model",
        parts: [{ text: response.data.text }],
      };

      setText("");
      setError("");
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      setError("Failed to send message.");
    }
  }

  return (
    <div className="p-4 border-2">
      <h1 className="text-2xl font-bold mb-4 text-center">Sora</h1>

      {/* Display Messages */}
      <div className="mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg w-full ${
              message.role === "user" ? "bg-blue-500 text-white text-left" : "bg-gray-200 text-right text-black"
            }`}
          >
            <strong>{message.role === "user" ? "You" : "AI"}:</strong>{" "}
            {message.parts[0].text}
          </div>
        ))}
    </div>

      {/* Display Error */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Input and Send Button */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg bg-gray-800 text-white"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessageToGemini()} // Send on Enter key
        />
        <button
          onClick={sendMessageToGemini}
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
