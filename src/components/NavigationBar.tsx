"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

function NavigationBar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b flex justify-around dark:border-gray-600 border-gray-200 py-4 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Sora AI Chat
      </h1>

      <button
        className="p-2 border dark:border-gray-600 border-gray-200 rounded"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <Sun /> : <Moon />}
      </button>
    </header>
  );
}

export default NavigationBar;
