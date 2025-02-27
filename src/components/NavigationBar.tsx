"use client";
import { useTheme } from "next-themes";
import { useState } from "react";

function NavigationBar() {
  const { theme, setTheme } = useTheme();
  const [show, setShow] = useState<boolean>(false);
  return (
    <header className="border-b flex justify-around border-gray-800 dark:bg-red-500 py-4 px-6">
      <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Sora AI Chat
      </h1>

      <div className="relative">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setShow(!show);
          }}
        >
          Color
        </button>

        <div
          className={`absolute mt-2 w-48  border border-gray-300 rounded shadow-lg ${
            show ? "block" : "hidden"
          }`}
        >
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setTheme("light")}
          >
            Light Mode
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setTheme("dark")}
          >
            Dark Mode
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setTheme("system")}
          >
            System Mode
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavigationBar;
