import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WISK — Your business. Centralised.",
  description:
    "The command centre for freelancers, creators, and small business owners. Manage projects, tasks, goals, leads, and content in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-wisk-bg text-white antialiased">{children}</body>
    </html>
  );
}
