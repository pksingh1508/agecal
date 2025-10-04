"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      storageKey="age-calculator-theme"
      disableTransitionOnChange={false}
      {...props}
    >
      {/* Render children immediately, but theme-dependent content will handle its own mounting */}
      {children}

      {/* Optional: Add a subtle transition overlay for theme changes */}
      {mounted && (
        <style jsx global>{`
          :root {
            color-scheme: light;
          }

          .dark {
            color-scheme: dark;
          }

          /* Smooth theme transition */
          html {
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          /* Prevent flash of unstyled content */
          html:not(.dark):not([data-theme]) {
            background-color: var(--background);
            color: var(--foreground);
          }
        `}</style>
      )}
    </NextThemesProvider>
  );
}
