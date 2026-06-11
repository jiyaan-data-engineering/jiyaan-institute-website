"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

const faqs = [
  {
    q: "Do I need prior coding or cloud experience?",
    a: "No. Our curriculum starts from the fundamentals and gradually moves to advanced GCP data engineering. Learners from non-IT backgrounds succeed here regularly with our structured mentorship.",
  },
  {
    q: "Will this prepare me for the official GCP certification?",
    a: "Yes. The course is mapped to the Google Cloud Professional Data Engineer and Associate Cloud Engineer exam blueprints, including practice tests and exam strategy sessions.",
  },
  {
    q: "Are the classes live or recorded?",
    a: "Classes are live and interactive with real-time doubt solving. Recordings are shared after every session so you never miss anything and can revise anytime.",
  },
  {
    q: "Do you provide placement assistance?",
    a: "Absolutely. We offer resume building, mock interviews, LinkedIn optimization, and connect you with our hiring partner network until you land a role.",
  },
  {
    q: "What is the batch size and schedule?",
    a: "We keep batches small for personal attention. Both weekday and weekend batches are available, with flexible online and classroom options.",
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="section-pad scroll-mt-24">
      <div className="container-x max-w-4xl">
        <SectionHeading
          eyebrow="Questions"
          title="Frequently asked questions"
          subtitle="Everything you need to know before you enroll."
        />
        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <Reveal key={faq.q} delay={i * 60}>
                <div className="card-base overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold">{faq.q}</span>
                    <Plus
                      className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 leading-relaxed text-muted-foreground">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
