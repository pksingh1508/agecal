"use client";

import { useMemo, useState } from "react";
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

function calculateExactAge(referenceDate: string, dateOfBirth: string): AgeResult {
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
  years: "Years",
  months: "Months",
  days: "Days"
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
      age.days === 0
        ? null
        : `${age.days} ${age.days === 1 ? "day" : "days"}`
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
      const message = err instanceof Error ? err.message : "Unable to calculate age";
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
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-start lg:gap-10">
      <Card className="backdrop-blur-md supports-[backdrop-filter]:bg-[color:var(--surface)]">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Calculate Your Age
          </CardTitle>
          <CardDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Enter today&apos;s date or a reference date alongside your date of birth to find your exact age in years, months, and days.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reference-date" className="text-sm lg:text-base">
              Today&apos;s Date
            </Label>
            <Input
              id="reference-date"
              type="date"
              value={referenceDate}
              onChange={(event) => setReferenceDate(event.target.value)}
              aria-describedby="reference-date-help"
            />
            <p
              id="reference-date-help"
              className="text-sm text-slate-500 dark:text-slate-400"
            >
              Select today&apos;s date or any custom reference date.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date-of-birth" className="text-sm lg:text-base">
              Date of Birth
            </Label>
            <Input
              id="date-of-birth"
              type="date"
              max={referenceDate}
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
              aria-describedby="birth-date-help"
              required
            />
            <p
              id="birth-date-help"
              className="text-sm text-slate-500 dark:text-slate-400"
            >
              Enter your birth date to generate a precise age calculation.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/60 dark:bg-red-500/10 dark:text-red-200"
            >
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button onClick={handleCalculate} disabled={!dateOfBirth} className="w-full sm:w-auto">
              Calculate Age
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={handleReset}
              disabled={!dateOfBirth && !age}
            >
              Reset
            </Button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Your data never leaves this page—calculations happen locally in your browser.
          </p>
        </CardContent>
      </Card>

      <Card
        aria-live="polite"
        className={cn(
          "border-slate-200/70 bg-gradient-to-br from-sky-50 via-cyan-50 to-indigo-100 text-slate-900 shadow-2xl transition-all duration-300 dark:border-slate-700/70 dark:from-[#0b1f3a] dark:via-[#10264c] dark:to-[#0d1b36]",
          age ? "opacity-100" : "opacity-80"
        )}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Your Age Breakdown
          </CardTitle>
          <CardDescription className="text-base text-slate-600 dark:text-slate-400">
            {age ? resultSummary : "Results will appear here after you calculate your age."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {Object.keys(resultLabels).map((key) => {
              const label = key as keyof AgeResult;
              const value = age ? age[label] : "--";

              return (
                <div
                  key={label}
                  className="flex h-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/80 p-6 text-center backdrop-blur dark:border-slate-700 dark:bg-slate-950/40"
                  role="group"
                  aria-label={resultLabels[label]}
                >
                  <span className="font-display text-4xl font-semibold text-sky-600 dark:text-sky-400">
                    {value}
                  </span>
                  <span className="mt-2 text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {resultLabels[label]}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
