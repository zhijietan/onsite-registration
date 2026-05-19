import type { Metadata } from "next";
import "./globals.css";
import ThemeScript from "@/components/ThemeScript";

export const metadata: Metadata = {
  title: "Onsite Archive | ZJ",
  description: "All past and upcoming onsite events curated by Zhijie Tan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#ede8dc] text-[#2d2600] dark:bg-[#0e0c09] dark:text-[#ede8dc]">
        {children}
      </body>
    </html>
  );
}
