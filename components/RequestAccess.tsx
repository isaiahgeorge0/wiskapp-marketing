"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";

type FormState = "idle" | "submitting" | "success" | "error";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function RequestAccess() {
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
    <section id="request-access" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Ready to take control of your business?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-left"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={state === "submitting"}
                  className="rounded-lg border border-wisk-border bg-wisk-card px-4 py-3 text-sm text-white placeholder:text-wisk-muted/60 outline-none transition-colors focus:border-wisk-purple/50 disabled:opacity-50"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === "submitting"}
                  className="rounded-lg border border-wisk-border bg-wisk-card px-4 py-3 text-sm text-white placeholder:text-wisk-muted/60 outline-none transition-colors focus:border-wisk-purple/50 disabled:opacity-50"
                />
                <Button
                  type="submit"
                  disabled={state === "submitting"}
                  className="w-full disabled:opacity-50"
                >
                  {state === "submitting" ? "Submitting…" : "Request access"}
                </Button>
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
