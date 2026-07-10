import { Check } from "lucide-react";

const FEATURES = [
  "Weekly AI digest — every Sunday morning",
  "Winston Chat — ask about your pipeline, projects, or goals",
  "Smart suggestions — flags what needs attention before it's a problem",
  "Email intelligence — Gmail and Outlook, organised automatically (AI Pro)",
];

export function WiskAIShowcase() {
  return (
    <section className="bg-wisk-bg px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Content */}
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-wisk-lilac">
            WISK AI
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Your business assistant,{" "}
            <span className="text-wisk-section-winston">built in.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-wisk-muted md:text-lg">
            Winston reads every project, task, lead, goal, and note in your
            workspace. Every Sunday it sends you a digest. Wins, risks,
            what&apos;s coming, and one clear recommendation. Ask it anything,
            anytime.
          </p>

          <ul className="mt-8 space-y-3">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-wisk-section-winston"
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
            From £9/month · WISK AI · £19/month AI Pro
          </p>

          <a
            href="https://app.wiskapp.com/sign-in"
            className="mt-8 inline-flex font-semibold text-wisk-section-winston transition-opacity hover:opacity-80"
          >
            Explore WISK AI →
          </a>
        </div>

        {/* Screenshot */}
        <div className="flex justify-center lg:justify-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/screenshot-winston.png"
            alt="Winston AI weekly digest in WISK"
            className="w-full max-w-[640px] rounded-2xl border border-white/8 shadow-[0_24px_80px_-12px_rgba(139,0,255,0.2)]"
          />
        </div>
      </div>
    </section>
  );
}
