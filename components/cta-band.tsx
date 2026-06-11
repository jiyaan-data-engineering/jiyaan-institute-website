"use client"

import { ArrowRight } from "lucide-react"
import { Reveal } from "./reveal"

export function CtaBand() {
  return (
    <section className="py-16">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-surface px-6 py-12 text-center md:px-16 md:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(600px circle at 50% 0%, rgba(0,255,204,0.12), transparent 70%)",
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold leading-tight md:text-4xl">
                Your cloud career deserves a <span className="gradient-cyan">head start</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
                Join the next batch and learn GCP data engineering the practical way — with mentors who have built
                real-world pipelines.
              </p>
              <a
                href="#enroll"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Book Your Free Demo
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
