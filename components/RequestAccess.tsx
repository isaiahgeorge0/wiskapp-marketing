"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";

type FormState = "idle" | "submitting" | "success" | "error";

const ease = [0.22, 1, 0.36, 1] as const;

const formContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const fieldVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const inputClasses =
  "w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3.5 text-base text-white/90 placeholder:text-white/40 outline-none transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04] focus:border-purple-400/60 focus:bg-white/[0.04] focus:ring-4 focus:ring-purple-400/15 disabled:opacity-50";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function RequestAccess() {
  const shouldReduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setState("error");
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setState("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setState("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setState("success");
    } catch {
      setState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section
      id="request-access"
      className="relative overflow-hidden px-6 py-16 md:py-24"
    >
      {/* Atmospheric orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Purple — top-right */}
        <motion.div
          className="absolute -right-48 -top-32 h-[700px] w-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(72px)",
            mixBlendMode: "screen",
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, -40, 0], y: [0, 30, 0] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 30, repeat: Infinity, ease: "easeInOut" }
          }
        />
        {/* Teal — bottom-left */}
        <motion.div
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%)",
            filter: "blur(64px)",
            mixBlendMode: "screen",
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 50, 0], y: [0, -30, 0] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 40, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>

      <div className="relative mx-auto max-w-xl text-center">
        {/* Eyebrow */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-purple-300/70"
        >
          Request access
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.05, ease }}
          className="text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Ready to{" "}
          <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
            whisk
          </span>
          {" "}it all together?
        </motion.h2>

        {/* Sub-line */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mt-4 text-wisk-muted"
        >
          WISK is currently invite only. Request access and we&apos;ll be in
          touch within a few days.
        </motion.p>

        {/* Form */}
        <div className="mt-10 md:mt-14">
          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="text-lg text-wisk-teal"
              >
                Thanks. We&apos;ll be in touch soon.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                variants={shouldReduceMotion ? undefined : formContainer}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.3 }}
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-md flex-col gap-4 text-left"
              >
                <motion.input
                  variants={shouldReduceMotion ? undefined : fieldVariant}
                  type="text"
                  name="name"
                  aria-label="Your name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={state === "submitting"}
                  className={inputClasses}
                />
                <motion.input
                  variants={shouldReduceMotion ? undefined : fieldVariant}
                  type="email"
                  name="email"
                  aria-label="Your email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === "submitting"}
                  className={inputClasses}
                />
                <motion.div
                  variants={shouldReduceMotion ? undefined : fieldVariant}
                  whileHover={
                    shouldReduceMotion ? undefined : { y: -1 }
                  }
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Button
                    variant="gradient"
                    type="submit"
                    disabled={state === "submitting"}
                    className="w-full px-7 py-3.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    {state === "submitting" ? "Submitting…" : "Request access"}
                  </Button>
                </motion.div>
                {state === "error" && errorMessage && (
                  <p className="text-center text-sm text-red-400">{errorMessage}</p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
