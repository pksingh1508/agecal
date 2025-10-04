import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap"
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Your Exact Age Online | Free Tool",
  description:
    "Calculate your exact age with precision using our free online age calculator. Get years, months, and days instantly. Perfect for birthdays, anniversaries, and age verification. Mobile-friendly and easy to use.",
  keywords: [
    "age calculator",
    "calculate age",
    "birth date calculator",
    "age from date of birth",
    "how old am I",
    "age verification tool",
    "birthday calculator",
    "age calculator online",
    "free age calculator",
    "exact age calculator",
    "age in years months days",
    "date difference calculator",
    "age calculation tool",
    "birthday age finder",
    "age determiner"
  ],
  authors: [{ name: "Age Calculator" }],
  creator: "Age Calculator",
  publisher: "Age Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL("https://www.yourage.info"), // Replace with your actual domain
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Age Calculator - Calculate Your Exact Age Online",
    description:
      "Calculate your exact age with precision using our free online age calculator. Get years, months, and days instantly. Perfect for birthdays, anniversaries, and age verification.",
    url: "https://www.yourage.info", // Replace with your actual domain
    siteName: "Age Calculator",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Age Calculator - Calculate Your Exact Age Online",
    description:
      "Calculate your exact age with precision using our free online age calculator. Get years, months, and days instantly.",
    creator: "@agecalculator" // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code", // Replace with your Google Search Console verification code
    yandex: "your-yandex-verification-code", // Optional: Replace if you use Yandex
    yahoo: "your-yahoo-verification-code" // Optional: Replace if you use Yahoo
  },
  category: "utilities",
  classification: "Age calculation tool",
  other: {
    "google-site-verification": "your-google-verification-code" // Alternative way to add Google verification
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Age Calculator",
              description:
                "Calculate your exact age with precision using our free online age calculator. Get years, months, and days instantly.",
              url: "https://www.yourage.info",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              author: {
                "@type": "Organization",
                name: "Age Calculator"
              },
              publisher: {
                "@type": "Organization",
                name: "Age Calculator"
              },
              mainEntity: {
                "@type": "SoftwareApplication",
                name: "Age Calculator",
                description:
                  "A free online tool to calculate exact age from date of birth",
                applicationCategory: "UtilityApplication",
                operatingSystem: "Any"
              },
              potentialAction: {
                "@type": "UseAction",
                target: "https://www.yourage.info"
              }
            })
          }}
        />

        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="Age Calculator" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Age Calculator" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#3B82F6" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon and app icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${sora.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
