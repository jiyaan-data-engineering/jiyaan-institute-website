"use client"

import { Star, Quote } from "lucide-react"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Data Engineer @ Fortune 500",
    quote:
      "The hands-on BigQuery and Dataflow projects made all the difference. I cleared my GCP certification and landed a role within two months of finishing the course.",
    initial: "A",
  },
  {
    name: "Rahul Verma",
    role: "Cloud Engineer",
    quote:
      "Mentors actually care here. The 1:1 doubt sessions and real pipeline projects gave me the confidence to switch from support to a core data engineering role.",
    initial: "R",
  },
  {
    name: "Priya Nair",
    role: "Analytics Engineer",
    quote:
      "Coming from a non-IT background, I was nervous. The structured curriculum and placement support helped me triple my salary in my first cloud job.",
    initial: "P",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="section-pad scroll-mt-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Success Stories"
          title="Careers we helped transform"
          subtitle="Real outcomes from learners who started exactly where you are today."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="card-base flex h-full flex-col p-7 hover:border-primary/40">
                <Quote className="h-8 w-8 text-primary/40" />
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-google-yellow text-google-yellow" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 leading-relaxed text-foreground/85">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary">
                    {t.initial}
                  </span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
