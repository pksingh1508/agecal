"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

type AgeResult = {
  years: number;
  months: number;
  days: number;
};

function calculateExactAge(
  referenceDate: string,
  dateOfBirth: string
): AgeResult {
  const current = new Date(referenceDate);
  const birth = new Date(dateOfBirth);

  if (Number.isNaN(current.getTime()) || Number.isNaN(birth.getTime())) {
    throw new Error("Invalid date");
  }

  if (birth > current) {
    throw new Error("Birth date cannot be in the future");
  }

  let years = current.getFullYear() - birth.getFullYear();
  let months = current.getMonth() - birth.getMonth();
  let days = current.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPreviousMonth = new Date(
      current.getFullYear(),
      current.getMonth(),
      0
    ).getDate();
    days += daysInPreviousMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

const resultLabels: Record<keyof AgeResult, string> = {
  years: "YEARS",
  months: "MONTHS",
  days: "DAYS"
};

export function AgeCalculator() {
  const [referenceDate, setReferenceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState<AgeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resultSummary = useMemo(() => {
    if (!age) {
      return "";
    }

    const parts = [
      age.years === 0
        ? null
        : `${age.years} ${age.years === 1 ? "year" : "years"}`,
      age.months === 0
        ? null
        : `${age.months} ${age.months === 1 ? "month" : "months"}`,
      age.days === 0 ? null : `${age.days} ${age.days === 1 ? "day" : "days"}`
    ].filter(Boolean);

    return parts.length ? parts.join(", ") : "Less than a day old";
  }, [age]);

  const handleCalculate = () => {
    if (!dateOfBirth) {
      setError("Please choose your date of birth");
      setAge(null);
      return;
    }

    try {
      const result = calculateExactAge(referenceDate, dateOfBirth);
      setAge(result);
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to calculate age";
      setError(message);
      setAge(null);
    }
  };

  const handleReset = () => {
    setDateOfBirth("");
    setAge(null);
    setError(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 max-w-6xl mx-auto">
      {/* Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="h-full border-[var(--border)] bg-[var(--card)] shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl font-semibold text-[var(--card-foreground)] sm:text-2xl">
              Calculate Your Age
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
              Enter today&apos;s date or a reference date alongside your date of
              birth to find your exact age in years, months, and days.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Reference Date */}
            <div className="space-y-2">
              <Label
                htmlFor="reference-date"
                className="text-sm font-medium text-[var(--card-foreground)]"
              >
                Today&apos;s Date
              </Label>
              <Input
                id="reference-date"
                type="date"
                value={referenceDate}
                onChange={(e) => setReferenceDate(e.target.value)}
                className="border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
              />
              <p className="text-xs text-[var(--muted-foreground)]">
                Select today&apos;s date or any custom reference date.
              </p>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label
                htmlFor="date-of-birth"
                className="text-sm font-medium text-[var(--card-foreground)]"
              >
                Date of Birth
              </Label>
              <Input
                id="date-of-birth"
                type="date"
                max={referenceDate}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
                required
              />
              <p className="text-xs text-[var(--muted-foreground)]">
                Enter your birth date to generate a precise age calculation.
              </p>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleCalculate}
                disabled={!dateOfBirth}
                className="w-full bg-[var(--primary)] text-white hover:opacity-90 sm:w-auto"
              >
                Calculate Age
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleReset}
                disabled={!dateOfBirth && !age}
                className="w-full border-[var(--border)] bg-[var(--muted)] text-[var(--card-foreground)] hover:opacity-90 sm:w-auto"
              >
                Reset
              </Button>
            </div>

            <p className="text-xs text-[var(--muted-foreground)]">
              Your data never leaves this page—calculations happen locally in
              your browser.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="h-full border-[var(--border)] shadow-lg bg-[var(--card)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl font-semibold text-[var(--card-foreground)] sm:text-2xl">
              Your Age Breakdown
            </CardTitle>
            <AnimatePresence mode="wait">
              <motion.div
                key={age ? "result" : "empty"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CardDescription className="text-sm text-[var(--muted-foreground)] sm:text-base">
                  {age
                    ? resultSummary
                    : "Results will appear here after you calculate your age."}
                </CardDescription>
              </motion.div>
            </AnimatePresence>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {Object.keys(resultLabels).map((key, index) => {
                const label = key as keyof AgeResult;
                const value = age ? age[label] : "--";

                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.2 + index * 0.1,
                      duration: 0.4
                    }}
                    className="flex flex-col items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-center backdrop-blur-sm sm:rounded-2xl sm:p-6"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-3xl font-bold text-[var(--primary)] sm:text-4xl"
                      >
                        {value}
                      </motion.span>
                    </AnimatePresence>
                    <span className="mt-2 text-xs font-medium tracking-wide text-[var(--muted-foreground)] sm:text-sm">
                      {resultLabels[label]}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
