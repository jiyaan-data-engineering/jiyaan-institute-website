"use client"

import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { CheckCircle2, Database, Code, Layers, Cloud, Briefcase } from "lucide-react"

const phases = [
  {
    phase: "Days 1-30",
    icon: Database,
    title: "SQL Fundamentals",
    description: "Database basics, SQL queries, and data manipulation",
    topics: ["SQL Basics", "Database Design", "Query Optimization"],
    progress: 100,
  },
  {
    phase: "Days 31-45",
    icon: Code,
    title: "Python & Data Processing",
    description: "Programming, data structures, Pandas, NumPy",
    topics: ["Python", "Pandas", "NumPy"],
    progress: 100,
  },
  {
    phase: "Days 46-60",
    icon: Layers,
    title: "Big Data & PySpark",
    description: "Distributed computing, Hadoop, Spark, data modeling",
    topics: ["PySpark", "Big Data", "Hadoop"],
    progress: 100,
  },
  {
    phase: "Days 61-75",
    icon: Cloud,
    title: "GCP Cloud Platform",
    description: "Cloud services, BigQuery, Dataflow, Pub/Sub",
    topics: ["GCP", "BigQuery", "Dataflow"],
    progress: 100,
  },
  {
    phase: "Days 76-85",
    icon: Code,
    title: "DevOps & Tools",
    description: "Linux, Git, Jira, CI/CD pipelines, best practices",
    topics: ["Linux", "Git", "Jira"],
    progress: 100,
  },
  {
    phase: "Days 86-90",
    icon: Briefcase,
    title: "Interview & Job Ready",
    description: "Resume building, mock interviews, placement prep",
    topics: ["Interview Prep", "Portfolio", "Placement"],
    progress: 100,
  },
]

const summaryStats = [
  { icon: "⏱️", value: "90 Days", label: "Complete Program" },
  { icon: "🎯", value: "9+ Skills", label: "Master All Tools" },
  { icon: "💼", value: "Real Projects", label: "Hands-on Experience" },
  { icon: "💰", value: "15+ LPA", label: "Average Salary" },
]

export function LearningJourney() {
  return (
    <section className="section-pad" aria-labelledby="journey-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="90-Day Transformation"
          title={
            <>
              What You'll Learn <span className="gradient-cyan">& Master</span>
            </>
          }
          subtitle="Transform from beginner to GCP Data Engineering expert in just 90 days"
        />

        {/* Timeline */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {phases.map((p, i) => (
            <Reveal key={p.phase} delay={i * 70}>
              <div className="card-base border-2 border-cyan/20 p-6 transition-all hover:border-cyan/60 hover:-translate-y-2">
                {/* Phase badge */}
                <div className="inline-block rounded-full bg-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan">
                  {p.phase}
                </div>

                {/* Icon + Title */}
                <div className="mt-4 flex items-start gap-3">
                  <div className="rounded-lg bg-gradient-to-br from-cyan/20 to-google-blue/10 p-2">
                    <p.icon className="text-cyan" size={20} />
                  </div>
                  <h3 className="font-display text-lg font-bold leading-tight">{p.title}</h3>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>

                {/* Skills Earned */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.topics.map((topic) => (
                    <span key={topic} className="rounded-full bg-cyan/10 px-2.5 py-1 text-xs font-semibold text-cyan">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-full bg-gradient-to-r from-cyan to-google-blue" />
                </div>
                <p className="mt-1 text-xs font-semibold text-cyan">100% Complete</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Summary Stats */}
        <Reveal delay={500}>
          <div className="mt-16 grid gap-4 rounded-lg border-2 border-cyan/20 bg-gradient-to-r from-cyan/5 to-google-blue/5 p-8 sm:grid-cols-2 lg:grid-cols-4">
            {summaryStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl">{stat.icon}</div>
                <p className="mt-2 font-display text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={600}>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">Ready to start your 90-day transformation?</p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-google-blue px-8 py-3 font-display font-bold text-background transition-all hover:shadow-lg hover:shadow-cyan/25 active:scale-95">
              Enroll Now
              <span>→</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
