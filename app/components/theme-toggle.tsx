"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const transition = {
  type: "spring",
  stiffness: 260,
  damping: 20
};

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        aria-label="Toggle theme"
        className="group relative h-12 w-12 overflow-hidden rounded-full border border-slate-200/60 bg-[color:var(--surface)] shadow-lg backdrop-blur transition-all duration-300 hover:border-sky-400 hover:shadow-2xl dark:border-slate-700/60 dark:hover:border-sky-500"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-200/40 via-transparent to-transparent opacity-80 dark:from-sky-500/30"
          animate={{ rotate: isDark ? 35 : 0, scale: isDark ? 1.08 : 1 }}
          transition={transition}
        />

        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full blur-2xl bg-sky-300/30 dark:bg-sky-500/30"
          animate={{ opacity: isDark ? 0.35 : 0.25, scale: isDark ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />

        <AnimatePresence initial={false} mode="wait">
          {isDark ? (
            <motion.svg
              key="moon"
              className="relative h-6 w-6 text-slate-100"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: -45, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 45, opacity: 0, scale: 0.6 }}
              transition={transition}
            >
              <path
                d="M21 12.79A9 9 0 0111.21 3 6.5 6.5 0 0012 16.5 6.5 6.5 0 0021 12.79z"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              className="relative h-7 w-7 text-slate-900"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 45, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -45, opacity: 0, scale: 0.6 }}
              transition={transition}
            >
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={1.8} />
              <path
                d="M12 2v2m0 16v2m10-10h-2M4 12H2m17.07 7.07l-1.42-1.42M6.35 6.35L4.93 4.93m14.14 0l-1.42 1.42M6.35 17.65l-1.42 1.42"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </AnimatePresence>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
