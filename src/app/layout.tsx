import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TodoProvider } from "@/contexts/TodoContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App - Manage Your Tasks",
  description: "A modern todo app to help you manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <TodoProvider>
            <ThemeToggle />
            {children}
          </TodoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
