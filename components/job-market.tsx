import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { Flame, CheckCircle2, AlertTriangle } from "lucide-react"

const cards = [
  {
    icon: Flame,
    title: "PEAK Months",
    months: "Jan · Feb · Mar",
    activity: "Highest hiring activity",
    badge: "Best Opportunity",
    accent: "#22c55e",
  },
  {
    icon: CheckCircle2,
    title: "GOOD Months",
    months: "Apr · Jul · Aug · Sep",
    activity: "Good hiring activity",
    badge: "Favorable",
    accent: "#3b82f6",
  },
  {
    icon: AlertTriangle,
    title: "SLOW Months",
    months: "Jun · Nov · Dec",
    activity: "Avoid job switching",
    badge: "Not Recommended",
    accent: "#fbbf24",
  },
]

export function JobMarket() {
  return (
    <section className="section-pad bg-surface/30" aria-labelledby="job-market-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Hiring Calendar"
          title={
            <>
              Job Market Trends <span className="gradient-cyan">2025–2027</span>
            </>
          }
          subtitle="Time your job search right — apply during peak months to maximize interview calls."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 90}
              className="rounded-lg border-2 p-8 text-center transition-all hover:-translate-y-2"
              {...{ style: { borderColor: c.accent, background: `${c.accent}14` } }}
            >
              <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full" style={{ background: `${c.accent}22`, color: c.accent }}>
                <c.icon size={26} />
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">{c.title}</h3>
              <p className="mt-2 font-bold text-cyan">{c.months}</p>
              <p className="mt-1 text-sm text-muted">{c.activity}</p>
              <span
                className="mt-5 inline-block rounded-full border px-4 py-1.5 text-xs font-semibold"
                style={{ borderColor: c.accent, color: c.accent, background: `${c.accent}1a` }}
              >
                {c.badge}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
