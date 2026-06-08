import type { Metadata } from "next";

import { AboutWisk } from "@/components/AboutWisk";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { RequestAccess } from "@/components/RequestAccess";
import { CommandCentreModules } from "@/components/sections/CommandCentreModules";
import { OverviewSpotlight } from "@/components/sections/OverviewSpotlight";
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
      <AboutWisk />
      <OverviewSpotlight />
      <CommandCentreModules />
      <Testimonials />
      <RequestAccess />
      <Footer />
    </main>
  );
}
