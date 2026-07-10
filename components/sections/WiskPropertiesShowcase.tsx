import { Check } from "lucide-react";

const FEATURES = [
  "Portfolio dashboard — properties, tenants, maintenance at a glance",
  "Yield analytics — gross yield, net yield, ROI per property",
  "Tenant reliability scoring — A to F grade based on payment history",
  "Legal notice builder — Section 8 and Section 13 official forms",
  "SA105 tax summary — HMRC-aligned, ready for your accountant",
];

export function WiskPropertiesShowcase() {
  return (
    <section
      className="px-6 py-24"
      style={{ background: "rgba(232,0,29,0.03)" }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Screenshot — left on desktop */}
        <div className="relative order-2 flex justify-center lg:order-1 lg:justify-start">
          <div className="relative w-full max-w-[640px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/screenshot-properties-dashboard.png"
              alt="WISK Properties portfolio dashboard"
              className="w-full rounded-2xl border border-white/8 shadow-[0_24px_80px_-12px_rgba(232,0,29,0.2)]"
            />
            <div className="absolute -bottom-4 -right-4 rounded-xl border border-white/10 bg-wisk-card px-4 py-3 shadow-xl backdrop-blur-sm">
              <p className="mb-1 text-xs text-wisk-muted">Portfolio yield</p>
              <p className="text-2xl font-bold text-wisk-ferrari">7.0%</p>
              <p className="text-xs text-wisk-muted">gross · 2 properties</p>
            </div>
          </div>
        </div>

        {/* Content — right on desktop */}
        <div className="order-1 lg:order-2">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-wisk-ferrari">
            WISK Properties
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Landlord software that{" "}
            <span className="text-wisk-ferrari">actually thinks.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-wisk-muted md:text-lg">
            Manage your portfolio, track rent, handle maintenance, and prepare
            legal notices all in one place. WISK Properties Pro adds yield
            analytics, tenant reliability scoring, financial reports, and SA105
            tax summaries.
          </p>

          <ul className="mt-8 space-y-3">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-wisk-ferrari"
                  strokeWidth={2.5}
                  aria-hidden
                />
                <span className="text-sm leading-relaxed text-white/80 md:text-base">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-wisk-muted">
            From £17/month · Properties Pro from £32/month
          </p>

          <a
            href="https://app.wiskapp.com/sign-in"
            className="mt-8 inline-flex font-semibold text-wisk-ferrari transition-opacity hover:opacity-80"
          >
            Explore Properties →
          </a>
        </div>
      </div>
    </section>
  );
}
