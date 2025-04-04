"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Loader2, ClipboardCopy } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getAuth } from "firebase/auth";

interface HistoryInterface {
  role: "user" | "model";
  parts: { text: string }[];
}

async function getFirebaseToken() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken(); // Get the ID token
  }
  return null;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<HistoryInterface[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function sendMessageToGemini() {
    try {
      if (!message.trim()) return;

      const userMessage: HistoryInterface = {
        role: "user",
        parts: [{ text: message }],
      };

      setHistory((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setMessage("");

      let token = await getFirebaseToken();

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`, {
        history: history,
        chat: message,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });

      const soraResponse: HistoryInterface = {
        role: "model",
        parts: [{ text: response.data.text }],
      };

      setHistory((prev) => [...prev, soraResponse]);
      setError("");
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.replace("/signin"); // Redirect user to signin page
      } else {
        setError("Failed to send message. Please try again.");
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageToGemini();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-2 mx-6 mt-4 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Chat Window */}
      <div className="flex-1 sm:mx-10 overflow-y-scroll p-4 md:p-6 space-y-4 scrollbar-none mt-16">
        {history.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-lg mb-2">Start a conversation with Sora</p>
              <p className="text-sm">Type a message below to begin</p>
            </div>
          </div>
        ) : (
          history.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700"
                }`}
              >
                <ReactMarkdown
                  components={{
                    code({ inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <div className="relative">
                          <CopyToClipboard text={String(children).trim()}>
                            <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-200">
                              <ClipboardCopy size={16} />
                            </button>
                          </CopyToClipboard>
                          <SyntaxHighlighter
                            {...props}
                            style={dracula}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-lg border border-gray-700"
                          >
                            {String(children).trim()}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code
                          {...props}
                          className="bg-gray-700 px-1 py-0.5 rounded"
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.parts[0].text}
                </ReactMarkdown>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-300 rounded-2xl rounded-tl-none border border-gray-700 px-4 py-3">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="border-t border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full dark:text-white rounded-full px-4 py-3 pr-12 border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
          </div>
          <button
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            onClick={sendMessageToGemini}
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
