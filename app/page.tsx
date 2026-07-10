import type { Metadata } from "next";

import { AboutWisk } from "@/components/AboutWisk";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { RequestAccess } from "@/components/RequestAccess";
import { BuiltForBuilders } from "@/components/sections/BuiltForBuilders";
import { CommandCentreModules } from "@/components/sections/CommandCentreModules";
import { FutureVision } from "@/components/sections/FutureVision";
import { OverviewSpotlight } from "@/components/sections/OverviewSpotlight";
import { PricingOverview } from "@/components/sections/PricingOverview";
import { WiskAIShowcase } from "@/components/sections/WiskAIShowcase";
import { WiskPropertiesShowcase } from "@/components/sections/WiskPropertiesShowcase";
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
      <WiskAIShowcase />
      <WiskPropertiesShowcase />
      <CommandCentreModules />
      <PricingOverview />
      <AboutWisk />
      <OverviewSpotlight />
      <FutureVision />
      <BuiltForBuilders />
      <RequestAccess />
      <Footer />
    </main>
  );
}
