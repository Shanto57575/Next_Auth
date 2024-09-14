import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next_Auth_App",
  description: "Created By Sh@nto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-serif`}
      >
        <nav className="max-w-xl mx-auto flex flex-wrap items-center justify-center space-x-4 p-4 pt-10">
          <Link href="/" className="text-xl text-zinc-300 hover:text-white hover:underline">
            Home
          </Link>
          <Link href="/signup" className="text-xl text-zinc-300 hover:text-white hover:underline">
            SignUp
          </Link>
          <Link href="/login" className="text-xl text-zinc-300 hover:text-white hover:underline">
            Login
          </Link>
          <Link href="/profile" className="text-xl text-zinc-300 hover:text-white hover:underline">
            Profile
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
