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

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 font-poppins">
              Age Calculator
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-medium font-inter">
              Calculate your exact age with precision
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
            <div className="space-y-6">
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
                />
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
                />
              </div>

              {/* Calculate Button */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={calculateAge}
                  disabled={!birthDate}
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:cursor-not-allowed font-poppins"
                >
                  Calculate Age
                </button>
              </div>

              {/* Reset Button */}
              {isCalculated && (
                <div className="flex justify-center">
                  <button
                    onClick={resetCalculator}
                    className="inline-flex items-center justify-center px-6 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-all duration-200 font-poppins"
                  >
                    Calculate Again
                  </button>
                </div>
              )}
            </div>

            {/* Results */}
            {age && (
              <div className="mt-8 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-xl border border-blue-200 dark:border-slate-600">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center font-poppins">
                  Your Age
                </h3>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center space-x-3 bg-white dark:bg-slate-800 px-8 py-6 rounded-xl shadow-lg border border-blue-100 dark:border-slate-600">
                    <span className="text-4xl font-bold text-blue-600 dark:text-blue-400 font-poppins">
                      {age.years}
                    </span>
                    <span className="text-xl font-medium text-slate-600 dark:text-slate-300 font-inter">
                      {age.years === 1 ? "year" : "years"}
                    </span>
                    <div className="w-px h-12 bg-slate-300 dark:bg-slate-500"></div>
                    <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 font-poppins">
                      {age.months}
                    </span>
                    <span className="text-xl font-medium text-slate-600 dark:text-slate-300 font-inter">
                      {age.months === 1 ? "month" : "months"}
                    </span>
                    <div className="w-px h-12 bg-slate-300 dark:bg-slate-500"></div>
                    <span className="text-4xl font-bold text-purple-600 dark:text-purple-400 font-poppins">
                      {age.days}
                    </span>
                    <span className="text-xl font-medium text-slate-600 dark:text-slate-300 font-inter">
                      {age.days === 1 ? "day" : "days"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
