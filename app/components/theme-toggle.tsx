"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6 lg:right-8 lg:top-8">
        <div className="h-10 w-10 rounded-full bg-[color:var(--surface)] sm:h-12 sm:w-12" />
      </div>
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.div
      className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6 lg:right-8 lg:top-8"
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      }}
    >
      <motion.button
        onClick={toggleTheme}
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--foreground)] shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)] focus:ring-offset-2 focus:ring-offset-[color:var(--background)] sm:h-12 sm:w-12"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/20 to-indigo-400/20 opacity-0 transition-opacity group-hover:opacity-100 dark:from-sky-400/10 dark:to-indigo-400/10"
          layoutId="glow"
        />

        {/* Icon container */}
        <div className="relative h-5 w-5 sm:h-6 sm:w-6">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Moon className="h-full w-full text-sky-400" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Sun className="h-full w-full text-amber-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ripple effect on click */}
        <motion.span
          className="absolute inset-0 rounded-full"
          initial={false}
          animate={isDark ? { scale: [1, 1.5], opacity: [0.5, 0] } : {}}
          transition={{ duration: 0.6 }}
        />
      </motion.button>

      {/* Tooltip */}
      <motion.div
        className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1.5 text-xs font-medium text-[color:var(--foreground)] opacity-0 shadow-lg backdrop-blur-md transition-opacity group-hover:opacity-100 sm:text-sm"
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
      >
        {isDark ? "Light mode" : "Dark mode"}
        <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rotate-45 border-b border-r border-[color:var(--border)] bg-[color:var(--surface)]" />
      </motion.div>
    </motion.div>
  );
}
