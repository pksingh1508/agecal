import { AgeCalculator } from "./components/age-calculator";
import { ThemeToggle } from "./components/theme-toggle";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[color:var(--background)] transition-colors">
      <ThemeToggle />
      <main className="container mx-auto flex max-w-5xl flex-col gap-16 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="space-y-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Precise Age Insights
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Age Calculator
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            Discover your exact age in years, months, and days with our professional-grade calculator. Perfect for personal milestones, official documents, and meticulous planners.
          </p>
        </header>

        <section aria-label="Age calculator" className="space-y-12">
          <AgeCalculator />
        </section>

        <section
          aria-label="About the age calculator"
          className="rounded-3xl border border-slate-200 bg-white/90 p-10 text-left shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
        >
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
              Accurate Age Calculations for Every Occasion
            </h2>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Our free age calculator instantly works out your exact age from your date of birth. Whether you\'re planning events, preparing official paperwork, or simply curious, the results are calculated locally in your browser for absolute privacy.
            </p>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              <strong className="font-semibold text-slate-800 dark:text-white">Highlights include:</strong>
            </p>
            <ul className="grid gap-3 text-base text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              <li>Precise breakdown in years, months, and days</li>
              <li>SEO-friendly architecture with lightning-fast load times</li>
              <li>Responsive layouts optimised for any screen size</li>
              <li>Built-in accessibility and keyboard navigation support</li>
              <li>Privacy-first—no data leaves your device</li>
              <li>Enhanced readability with refined typography</li>
            </ul>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Enter any date combination to calculate ages for anniversaries, compliance checks, competitions, and more. Save time and ensure precision with every calculation.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
