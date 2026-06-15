"use client"

import { Reveal } from "./reveal"
import { GraduationCap, Briefcase, TrendingUp, Clock, ArrowRight, CalendarCheck } from "lucide-react"

const skills = [
  "SQL",
  "Python",
  "Big Data",
  "PySpark",
  "Data Modelling",
  "Linux",
  "GCP Cloud",
  "Git / Jira",
  "Real Projects",
]

const stats = [
  { icon: GraduationCap, value: "300+", label: "Students Trained" },
  { icon: Briefcase, value: "85%", label: "Placement Rate" },
  { icon: TrendingUp, value: "10+ LPA", label: "Avg. Salary" },
  { icon: Clock, value: "90 Days", label: "Job-Ready Program" },
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 lg:pt-36" aria-labelledby="hero-title">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan/10 blur-[120px]" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-google-blue/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,204,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,204,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="container-x flex flex-col items-center pb-20 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" />
            Hyderabad&apos;s best gcp data ENgineering Institute
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 id="hero-title" className="heading mt-6 max-w-4xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            Become a <span className="gradient-cyan">GCP Data Engineer</span> in 90 Days
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Live mentor-led training in SQL, Python, PySpark, BigQuery &amp; Google Cloud — with real-time projects and
            100% placement support that lands graduates ₹15+ LPA roles.
          </p>
        </Reveal>

        {/* Skill tags */}
        <Reveal delay={200}>
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-cyan/20 bg-surface px-4 py-1.5 text-xs font-medium text-muted transition-colors hover:border-cyan/60 hover:text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={260}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#enroll"
              className="btn bg-cyan px-7 text-background hover:bg-cyan-deep hover:shadow-[0_10px_36px_rgba(0,255,204,0.4)]"
            >
              <CalendarCheck size={18} /> Book a Free Demo Class
            </a>
            <a
              href="#curriculum"
              className="btn border border-cyan/30 bg-transparent px-7 text-foreground hover:border-cyan hover:bg-cyan/5"
            >
              Explore Curriculum <ArrowRight size={18} />
            </a>
          </div>
          <p className="mt-4 text-xs text-muted">
            Limited seats · Live classes · Expert mentors · 100% job placement
          </p>
        </Reveal>

        {/* Floating stats */}
        <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="card-base p-5 hover:-translate-y-1 hover:border-cyan/50">
              <s.icon className="mx-auto mb-3 text-cyan" size={26} />
              <div className="font-display text-2xl font-extrabold text-foreground">{s.value}</div>
              <div className="mt-1 text-xs font-medium text-muted">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
