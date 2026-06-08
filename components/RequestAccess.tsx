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
    <section id="request-access" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease }}
          className="text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Ready to take control of your business?
        </motion.h2>
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.08, ease }}
          className="mt-4 text-wisk-muted"
        >
          WISK is currently invite-only. Request access and we&apos;ll be in
          touch.
        </motion.p>

        <div className="mt-10">
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
                Thanks — we&apos;ll be in touch soon.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                variants={shouldReduceMotion ? undefined : formContainer}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.3 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-left"
              >
                <motion.input
                  variants={shouldReduceMotion ? undefined : fieldVariant}
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={state === "submitting"}
                  className="rounded-lg border border-wisk-border bg-wisk-card px-4 py-3 text-sm text-white placeholder:text-wisk-muted/60 outline-none transition-colors focus:border-wisk-purple/50 disabled:opacity-50"
                />
                <motion.input
                  variants={shouldReduceMotion ? undefined : fieldVariant}
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === "submitting"}
                  className="rounded-lg border border-wisk-border bg-wisk-card px-4 py-3 text-sm text-white placeholder:text-wisk-muted/60 outline-none transition-colors focus:border-wisk-purple/50 disabled:opacity-50"
                />
                <motion.div
                  variants={shouldReduceMotion ? undefined : fieldVariant}
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.02, 1],
                        }
                  }
                  viewport={{ once: false, amount: 0.6 }}
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                >
                  <Button
                    type="submit"
                    disabled={state === "submitting"}
                    className="w-full disabled:opacity-50"
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
