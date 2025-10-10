"use client";

import { useState, useEffect } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { Button } from "./Button";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.className = storedTheme;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.className = initialTheme;
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 h-9 p-0" aria-label="Toggle theme">
      {theme === "light" ? <IconMoon size={16} /> : <IconSun size={16} />}
    </Button>
  );
}