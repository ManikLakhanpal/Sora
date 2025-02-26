"use client";

import { useState } from "react";
import axios from "axios";

interface HistoryInterface {
  role: "user" | "model";
  parts: { text: string }[];
}

// export default function Home() {
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState<HistoryInterface[]>([]);
//   const [error, setError] = useState("");

//   async function sendMessageToGemini() {
//     try {
//       const userMessage: HistoryInterface = {
//         role: "user",
//         parts: [{ text: text }],
//       };

//       setMessages((prev) => [...prev, userMessage]);

//       const response = await axios.post("/api/chat", {
//         history: messages,
//         chat: text,
//       });

//       const modelMessage: HistoryInterface = {
//         role: "model",
//         parts: [{ text: response.data.text }],
//       };

//       setText("");
//       setError("");
//       setMessages((prev) => [...prev, modelMessage]);
//     } catch (error) {
//       setError("Failed to send message.");
//     }
//   }

//   return (
//     <div className="p-4 border-2">
//       <h1 className="text-2xl font-bold mb-4 text-center">Sora</h1>

//       {/* Display Messages */}
//       <div className="mb-4">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`mb-2 p-2 rounded-lg w-full ${
//               message.role === "user" ? "bg-blue-500 text-white text-left" : "bg-gray-200 text-right text-black"
//             }`}
//           >
//             <strong>{message.role === "user" ? "You" : "AI"}:</strong>{" "}
//             {message.parts[0].text}
//           </div>
//         ))}
//     </div>

//       {/* Display Error */}
//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       {/* Input and Send Button */}
//       <div className="flex gap-2">
//         <input
//           type="text"
//           className="flex-1 p-2 border rounded-lg bg-gray-800 text-white"
//           placeholder="Type a message..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && sendMessageToGemini()} // Send on Enter key
//         />
//         <button
//           onClick={sendMessageToGemini}
//           className="p-2 bg-blue-500 text-white rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

function Home() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<HistoryInterface[]>([]);
  const [error, setErrror] = useState("");

  async function sendMessageToGemini() {
    try {
      const userMessage: HistoryInterface = {
        role: "user",
        parts: [{ text: message }],
      };

      setHistory((prev) => [...prev, userMessage]);

      const response = await axios.post("/api/chat", {
        history: history,
        chat: message,
      });

      const soraResponse: HistoryInterface = {
        role: "model",
        parts: [{ text: response.data.text }],
      };

      setHistory((prev) => [...prev, soraResponse]);

      setErrror("");
      setMessage("");
    } catch (error) {
      setErrror("Failed to send message");
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col p-3 border-2 border-cyan-500 h-screen w-screen">
      <h1 className="mb-5 border-2 text-center text-4xl font-extrabold">
        Sora
      </h1>

      {error.length > 0 && (
        <h2 className="text-center text-red-500">*{error}</h2>
      )}

      {/* Chat message for ai and user */}
      <div className="border-2 mb-3 rounded-xl border-red-500 grow h-full p-4 space-y-2">
       
        {history.map((message, index) => (
          <div
            key={index}
            className={`w-fit px-5 py-2 rounded-xl
              ${
                message.role == "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-black"
              }`}
          >
            {message.parts[0].text}
          </div>
        ))}
      </div>

      {/* Input message with a send button */}
      <div className="flex items-center border-2 border-red-500 rounded-full h-16 overflow-hidden">
        <input
          type="text"
          className="flex-grow px-4 py-2 bg-gray-400 h-full text-lg border-none outline-none rounded-l-full mr-5"
          placeholder="Send Message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessageToGemini()} // Send on Enter key
        />
        <button
          className="bg-blue-500 hover:bg-blue-700
         text-white font-semibold px-6 py-2 h-full rounded-r-full 
         transition duration-300"
          onClick={sendMessageToGemini}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Home;
