"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className="w-[3rem] fixed right-5 top-2 p-2 rounded-2xl hover:scale-110 active:scale-100 duration-200 hover:bg-zinc-200 bg-zinc-100 dark:bg-zinc-800 z-10"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};
