import { Check } from "lucide-react";

import { Button } from "@/components/ui/Button";

type Package = {
  name: string;
  price: string;
  accent: string;
  badge?: string;
  features: string[];
};

const PACKAGES: Package[] = [
  {
    name: "WISK AI",
    price: "£9",
    accent: "#aca0ff",
    features: [
      "Weekly digest",
      "Winston Chat",
      "Smart suggestions",
      "100,000 tokens/month",
    ],
  },
  {
    name: "WISK AI Pro",
    price: "£19",
    accent: "#8b00ff",
    badge: "Most popular",
    features: [
      "Everything in AI",
      "Email integration (Gmail + Outlook)",
      "Higher usage limits",
      "Priority support",
    ],
  },
  {
    name: "WISK Properties",
    price: "£17",
    accent: "#e8001d",
    features: [
      "Portfolio dashboard",
      "Tenant management",
      "Maintenance tracking",
      "Rent tracking",
      "Certificate alerts",
      "Document storage",
    ],
  },
  {
    name: "WISK Properties Pro",
    price: "£32",
    accent: "#e8001d",
    badge: "Landlord Pro",
    features: [
      "Everything in Properties",
      "Yield analytics",
      "Tenant reliability scoring",
      "Legal notice builder",
      "SA105 tax summary",
      "Financial reports",
    ],
  },
];

export function PricingOverview() {
  return (
    <section className="bg-wisk-bg px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-wisk-lime">
            Pricing
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Simple, honest pricing.
          </h2>
          <p className="mt-4 text-base text-wisk-muted md:text-lg">
            Start free. Upgrade when you&apos;re ready.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="overflow-hidden rounded-2xl border border-wisk-border bg-wisk-card"
            >
              <div className="h-1 w-full" style={{ background: pkg.accent }} />
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: pkg.accent }}
                  >
                    {pkg.name}
                  </h3>
                  {pkg.badge && (
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        background: `${pkg.accent}22`,
                        color: pkg.accent,
                      }}
                    >
                      {pkg.badge}
                    </span>
                  )}
                </div>

                <p className="mb-6">
                  <span className="text-3xl font-bold text-white">
                    {pkg.price}
                  </span>
                  <span className="text-wisk-muted">/month</span>
                </p>

                <ul className="mb-8 space-y-2.5">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 size-3.5 shrink-0"
                        style={{ color: pkg.accent }}
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span className="text-sm text-white/75">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="https://app.wiskapp.com/sign-up"
                  className="w-full"
                >
                  Get started
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
