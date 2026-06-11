"use client"

import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { BookOpen, Users, Trophy, Zap, Target, Award } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Industry-Expert Mentors",
    description: "Learn from GCP certified professionals with 10+ years of experience",
    color: "from-google-blue/20 to-google-blue/5",
    border: "border-google-blue/30",
  },
  {
    icon: BookOpen,
    title: "Real-Time Projects",
    description: "Work on live GCP projects and build an impressive portfolio",
    color: "from-cyan/20 to-cyan/5",
    border: "border-cyan/30",
  },
  {
    icon: Trophy,
    title: "100% Placement Support",
    description: "Partnerships with 100+ hiring companies across India",
    color: "from-google-red/20 to-google-red/5",
    border: "border-google-red/30",
  },
  {
    icon: Zap,
    title: "GCP Certified Program",
    description: "Aligned with official Google Cloud Professional certifications",
    color: "from-google-yellow/20 to-google-yellow/5",
    border: "border-google-yellow/30",
  },
  {
    icon: Target,
    title: "Lifetime Course Access",
    description: "Lifetime access to updated materials, recordings, and new modules",
    color: "from-google-green/20 to-google-green/5",
    border: "border-google-green/30",
  },
  {
    icon: Award,
    title: "Flexible Learning",
    description: "Self-paced + instructor-led options, adapt to your schedule",
    color: "from-cyan/20 to-cyan/5",
    border: "border-cyan/30",
  },
]

export function WhyChooseJiyaan() {
  return (
    <section className="section-pad" aria-labelledby="why-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why Jiyaan?"
          title={
            <>
              Why <span className="gradient-cyan">Top 500+ Students</span> Choose Us
            </>
          }
          subtitle="Industry-leading training with proven track record of placements and salary hikes"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 80}>
              <div
                className={`group card-base overflow-hidden border-2 p-6 transition-all hover:-translate-y-2 hover:shadow-lg ${feature.border}`}
              >
                <div className={`rounded-lg bg-gradient-to-br ${feature.color} p-3 w-fit`}>
                  <feature.icon className="text-cyan" size={24} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>

                {/* Hover indicator */}
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-cyan opacity-0 transition-opacity group-hover:opacity-100">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trust indicator */}
        <Reveal delay={500}>
          <div className="mt-16 rounded-lg border border-cyan/20 bg-gradient-to-r from-cyan/5 to-google-blue/5 p-6 text-center sm:p-8">
            <p className="text-sm font-semibold text-cyan">✨ TRUSTED BY</p>
            <p className="mt-2 font-display text-2xl font-bold">
              500+ Students | 95% Placements | 10+ LPA Average Salary
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Join the fastest-growing GCP training institute in India</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
