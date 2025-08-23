"use client";

import { useState } from "react";
import { ThemeToggle } from "./components/theme-toggle";

interface AgeResult {
  years: number;
  months: number;
  days: number;
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [birthDate, setBirthDate] = useState<string>("");
  const [age, setAge] = useState<AgeResult | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateAge = () => {
    if (!birthDate) return;

    const current = new Date(currentDate);
    const birth = new Date(birthDate);

    if (birth > current) {
      alert("Birth date cannot be in the future!");
      return;
    }

    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
    setIsCalculated(true);
  };

  const resetCalculator = () => {
    setBirthDate("");
    setAge(null);
    setIsCalculated(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
      <ThemeToggle />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-4 font-poppins">
              Age Calculator
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium font-inter">
              Calculate your exact age with precision
            </p>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2 font-inter">
              Free online tool to calculate age from date of birth. Get years,
              months, and days instantly.
            </p>
          </header>

          {/* Calculator Card */}
          <section
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 md:p-8 lg:p-10"
            aria-labelledby="calculator-title"
          >
            <h2 id="calculator-title" className="sr-only">
              Age Calculator Form
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {/* Current Date */}
              <div>
                <label
                  htmlFor="currentDate"
                  className="block text-base font-semibold text-slate-700 dark:text-slate-200 mb-2 font-poppins"
                >
                  Today's Date
                </label>
                <input
                  type="date"
                  id="currentDate"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-inter"
                  aria-describedby="current-date-help"
                />
                <p
                  id="current-date-help"
                  className="text-sm text-slate-500 dark:text-slate-400 mt-1"
                >
                  Select today's date or any reference date
                </p>
              </div>

              {/* Birth Date */}
              <div>
                <label
                  htmlFor="birthDate"
                  className="block text-base font-semibold text-slate-700 dark:text-slate-200 mb-2 font-poppins"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={currentDate}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-inter"
                  aria-describedby="birth-date-help"
                  required
                />
                <p
                  id="birth-date-help"
                  className="text-sm text-slate-500 dark:text-slate-400 mt-1"
                >
                  Enter your date of birth to calculate your age
                </p>
              </div>

              {/* Calculate Button */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={calculateAge}
                  disabled={!birthDate}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:cursor-not-allowed font-poppins text-sm sm:text-base"
                  aria-describedby="calculate-help"
                >
                  Calculate Age
                </button>
                <p id="calculate-help" className="sr-only">
                  Click to calculate your exact age based on the selected dates
                </p>
              </div>

              {/* Reset Button */}
              {isCalculated && (
                <div className="flex justify-center">
                  <button
                    onClick={resetCalculator}
                    className="inline-flex items-center justify-center px-4 sm:px-6 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-all duration-200 font-poppins text-sm sm:text-base"
                    aria-describedby="reset-help"
                  >
                    Calculate Again
                  </button>
                  <p id="reset-help" className="sr-only">
                    Click to reset the calculator and start over
                  </p>
                </div>
              )}
            </div>

            {/* Results */}
            {age && (
              <section
                className="mt-8 sm:mt-10 lg:mt-12 p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-xl border border-blue-200 dark:border-slate-600"
                aria-labelledby="results-title"
              >
                <h3
                  id="results-title"
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6 md:mb-8 text-center font-poppins"
                >
                  Your Age
                </h3>
                <div className="text-center">
                  <div
                    className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 bg-white dark:bg-slate-800 p-6 sm:p-8 md:p-10 rounded-xl shadow-lg border border-blue-100 dark:border-slate-600"
                    role="region"
                    aria-label="Age calculation results"
                  >
                    {/* Years */}
                    <div
                      className="flex flex-col items-center justify-center space-y-3"
                      role="group"
                      aria-label="Years"
                    >
                      <span
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blue-600 dark:text-blue-400 font-poppins"
                        aria-label={`${age.years} years`}
                      >
                        {age.years}
                      </span>
                      <span className="text-lg sm:text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300 font-inter">
                        {age.years === 1 ? "year" : "years"}
                      </span>
                    </div>

                    {/* Divider - only show on medium screens and above */}
                    <div
                      className="hidden md:block w-px h-20 bg-slate-300 dark:bg-slate-500"
                      aria-hidden="true"
                    ></div>

                    {/* Months */}
                    <div
                      className="flex flex-col items-center justify-center space-y-3"
                      role="group"
                      aria-label="Months"
                    >
                      <span
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-indigo-600 dark:text-indigo-400 font-poppins"
                        aria-label={`${age.months} months`}
                      >
                        {age.months}
                      </span>
                      <span className="text-lg sm:text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300 font-inter">
                        {age.months === 1 ? "month" : "months"}
                      </span>
                    </div>

                    {/* Divider - only show on medium screens and above */}
                    <div
                      className="hidden md:block w-px h-20 bg-slate-300 dark:bg-slate-500"
                      aria-hidden="true"
                    ></div>

                    {/* Days */}
                    <div
                      className="flex flex-col items-center justify-center space-y-3"
                      role="group"
                      aria-label="Days"
                    >
                      <span
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-purple-600 dark:text-purple-400 font-poppins"
                        aria-label={`${age.days} days`}
                      >
                        {age.days}
                      </span>
                      <span className="text-lg sm:text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300 font-inter">
                        {age.days === 1 ? "day" : "days"}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </section>

          {/* SEO Content Section */}
          <section className="mt-12 sm:mt-16 lg:mt-20 text-center">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6 font-poppins">
                About Our Age Calculator
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-left">
                <p className="text-slate-600 dark:text-slate-300 mb-4 font-inter">
                  Our free online age calculator is a precise tool designed to
                  calculate your exact age from your date of birth. Whether you
                  need to know your age for official documents, want to
                  calculate age differences, or simply curious about your exact
                  age, this calculator provides accurate results in years,
                  months, and days.
                </p>
                <p className="text-slate-600 dark:text-slate-300 mb-4 font-inter">
                  <strong>Key Features:</strong>
                </p>
                <ul className="text-slate-600 dark:text-slate-300 mb-4 font-inter list-disc list-inside space-y-2">
                  <li>Calculate exact age in years, months, and days</li>
                  <li>Mobile-friendly and responsive design</li>
                  <li>Dark and light theme support</li>
                  <li>Instant results with high precision</li>
                  <li>Free to use, no registration required</li>
                  <li>Works on all devices and browsers</li>
                </ul>
                <p className="text-slate-600 dark:text-slate-300 font-inter">
                  Simply enter your date of birth and today's date to get your
                  precise age calculation. Perfect for birthdays, anniversaries,
                  age verification, and educational purposes.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
