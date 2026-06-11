import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { TrendingUp, Target, Briefcase, Award, Users, MapPin } from "lucide-react"

const insights = [
  { icon: TrendingUp, title: "Experience + Skills", desc: "Every year + skill mastery boosts your call rate by 15–20%." },
  { icon: Target, title: "Job Timing", desc: "Apply during peak months (Jan–Mar) to get 3x more interview calls." },
  { icon: Briefcase, title: "Portfolio Impact", desc: "Strong projects = 10x faster callbacks from top companies." },
  { icon: Award, title: "Certification Power", desc: "GCP certs unlock premium roles & 20–30% salary bumps." },
  { icon: Users, title: "Networking", desc: "LinkedIn presence & referrals generate 5x more opportunities." },
  { icon: MapPin, title: "Location & Domain", desc: "Tier-1 cities & specialized domains offer the highest packages." },
]

export function InterviewCalls() {
  return (
    <section className="section-pad bg-surface/30" aria-labelledby="interview-calls-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Get Noticed by Recruiters"
          title={
            <>
              How You Get <span className="gradient-cyan">Interview Calls</span>
            </>
          }
          subtitle="The proven levers our students pull to consistently land interview calls from top companies."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((ins, i) => (
            <Reveal
              key={ins.title}
              delay={i * 80}
              className="rounded-lg border border-cyan/15 bg-surface/80 p-6 text-center transition-all hover:-translate-y-1.5 hover:border-cyan/60"
            >
              <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan">
                <ins.icon size={22} />
              </span>
              <h4 className="font-display font-bold text-foreground">{ins.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{ins.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
