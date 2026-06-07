import type { Metadata } from "next";

import { AboutWisk } from "@/components/AboutWisk";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { RequestAccess } from "@/components/RequestAccess";
import { Testimonials } from "@/components/Testimonials";
import { siteDescription, siteTitle } from "@/lib/metadata";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: "WISK",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Features />
      <AboutWisk />
      <Testimonials />
      <RequestAccess />
      <Footer />
    </main>
  );
}
