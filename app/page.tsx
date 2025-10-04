"use client";

import { AgeCalculator } from "./components/age-calculator";
import { ThemeToggle } from "./components/theme-toggle";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Home() {
  return (
    <div className="relative w-full h-full bg-[var(--background)]">
      <ThemeToggle />
      <div className="w-full h-full flex items-center justify-center">
        <main className="w-full mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {/* Header */}
          <motion.header
            className="mb-8 text-center sm:mb-12 lg:mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              variants={itemVariants}
              className="mb-3 text-3xl font-bold text-[var(--foreground)] sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Age Calculator
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-center text-sm text-[var(--muted-foreground)] sm:text-base lg:text-lg"
            >
              Calculate your exact age in years, months, and days with precision
            </motion.p>
          </motion.header>

          {/* Calculator Section */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="mb-8 sm:mb-12 lg:mb-16"
          >
            <AgeCalculator />
          </motion.section>

          {/* About Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={itemVariants}
            className="mx-auto max-w-4xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg sm:rounded-3xl sm:p-8 lg:p-10"
          >
            <h2 className="mb-4 text-2xl font-semibold text-[var(--card-foreground)] sm:text-3xl lg:mb-6 lg:text-4xl">
              Accurate Age Calculations for Every Occasion
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
              <p>
                Our free age calculator instantly works out your exact age from
                your date of birth. Whether you're planning events, preparing
                official paperwork, or simply curious, the results are
                calculated locally in your browser for absolute privacy.
              </p>

              <p className="font-semibold text-[var(--card-foreground)]">
                Highlights include:
              </p>

              <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                {[
                  "Precise breakdown in years, months, and days",
                  "SEO-friendly architecture with lightning-fast load times",
                  "Responsive layouts optimised for any screen size",
                  "Built-in accessibility and keyboard navigation support",
                  "Privacy-first—no data leaves your device",
                  "Enhanced readability with refined typography"
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="flex items-start gap-2"
                  >
                    <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <p>
                Enter any date combination to calculate ages for anniversaries,
                compliance checks, competitions, and more. Save time and ensure
                precision with every calculation.
              </p>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 border-t border-[var(--border)] pt-6 text-center sm:mt-16 sm:pt-8"
          >
            <p className="text-xs text-[var(--muted-foreground)] sm:text-sm">
              © {new Date().getFullYear()} Age Calculator. All calculations are
              performed locally in your browser.
            </p>
          </motion.footer>
        </main>
      </div>
    </div>
  );
}
