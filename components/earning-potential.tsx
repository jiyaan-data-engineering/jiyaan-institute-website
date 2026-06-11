import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { GraduationCap, Settings, Rocket, Crown, TrendingUp, Target, Briefcase, Award, Users, MapPin } from "lucide-react"

const careers = [
  {
    icon: GraduationCap,
    title: "Fresher",
    years: "0–1 Years",
    salary: "₹2 – 4.5 LPA",
    monthly: "₹18K – ₹35K/mo",
    points: ["Learning Phase", "Build Foundation", "Skill Development"],
    calls: "30% Interview Calls",
    highlight: false,
  },
  {
    icon: Settings,
    title: "Junior",
    years: "1–3 Years",
    salary: "₹4 – 8 LPA",
    monthly: "₹30K – ₹60K/mo",
    points: ["Skill Building", "Job Switching", "2–3x Growth"],
    calls: "60% Interview Calls",
    highlight: false,
  },
  {
    icon: Rocket,
    title: "Senior",
    years: "3–5 Years",
    salary: "₹10 – 15 LPA",
    monthly: "₹75K – ₹1.1L/mo",
    points: ["Growth Phase", "Big Jump", "100% Growth"],
    calls: "90% Interview Calls",
    highlight: true,
  },
  {
    icon: Crown,
    title: "Lead",
    years: "5+ Years",
    salary: "₹15 – 30+ LPA",
    monthly: "₹1.1L – ₹2L+/mo",
    points: ["Leadership", "Specialist", "Strategic"],
    calls: "100% Interview Calls",
    highlight: false,
  },
]

const insights = [
  { icon: TrendingUp, title: "Experience + Skills", desc: "Every year + skill mastery boosts your call rate by 15–20%." },
  { icon: Target, title: "Job Timing", desc: "Apply during peak months (Jan–Mar) to get 3x more interview calls." },
  { icon: Briefcase, title: "Portfolio Impact", desc: "Strong projects = 10x faster callbacks from top companies." },
  { icon: Award, title: "Certification Power", desc: "GCP certs unlock premium roles & 20–30% salary bumps." },
  { icon: Users, title: "Networking", desc: "LinkedIn presence & referrals generate 5x more opportunities." },
  { icon: MapPin, title: "Location & Domain", desc: "Tier-1 cities & specialized domains offer the highest packages." },
]

export function EarningPotential() {
  return (
    <section className="section-pad" aria-labelledby="earning-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Career Growth"
          title={
            <>
              Real-World <span className="gradient-cyan">Earning Potential</span>
            </>
          }
          subtitle="See how your salary and interview call-rate scale as you grow into senior data engineering roles."
        />

        {/* Career progression */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {careers.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 80}
              className={`rounded-lg border-2 p-6 transition-all hover:-translate-y-2 ${
                c.highlight
                  ? "border-google-blue bg-gradient-to-br from-google-blue to-[#1e40af] text-white"
                  : "border-cyan/20 bg-surface hover:border-cyan/60"
              }`}
            >
              <c.icon className={c.highlight ? "text-white" : "text-cyan"} size={28} />
              <h3 className="mt-3 font-display text-lg font-bold">{c.title}</h3>
              <p className={`text-xs ${c.highlight ? "text-blue-100" : "text-muted"}`}>{c.years}</p>
              <div className={`mt-4 font-display text-2xl font-extrabold ${c.highlight ? "text-white" : "text-google-blue"}`}>
                {c.salary}
              </div>
              <div className={`text-xs ${c.highlight ? "text-blue-100" : "text-muted"}`}>{c.monthly}</div>
              <ul className="mt-4 flex flex-col gap-1.5 text-sm">
                {c.points.map((p) => (
                  <li key={p} className={c.highlight ? "text-blue-50" : "text-muted"}>
                    ✓ {p}
                  </li>
                ))}
              </ul>
              <div
                className={`mt-4 border-t pt-3 text-sm font-bold ${
                  c.highlight ? "border-white/20 text-white" : "border-cyan/20 text-cyan"
                }`}
              >
                {c.calls}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Insights */}
        <Reveal className="mt-12 rounded-lg border-2 border-cyan/40 bg-cyan/[0.06] p-6 lg:p-10">
          <h3 className="heading mb-8 text-center text-xl text-cyan">How You Get Interview Calls</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {insights.map((ins) => (
              <div
                key={ins.title}
                className="rounded-xl border border-cyan/15 bg-surface/80 p-5 text-center transition-all hover:-translate-y-1 hover:border-cyan/60"
              >
                <ins.icon className="mx-auto mb-3 text-cyan" size={24} />
                <h4 className="font-display font-bold text-cyan">{ins.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{ins.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
