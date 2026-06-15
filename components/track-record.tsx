"use client"

import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { Globe, Users, Award, TrendingUp, Monitor, Handshake, BookOpen, Target } from "lucide-react"
import { getNextBatchMonthYear, getDemoDatesList } from "@/utils/demo-dates"

const stats = [
  {
    icon: Users,
    value: "300+",
    label: "Students Trained",
    subtext: "From beginners to advanced professionals",
  },
  {
    icon: TrendingUp,
    value: "85%",
    label: "Placement Success",
    subtext: "Industry-leading guarantee",
  },
  {
    icon: Globe,
    value: "100+",
    label: "Partner Companies",
    subtext: "Fortune 500 & fast-growing startups",
  },
  {
    icon: Award,
    value: "4.9/5",
    label: "Student Rating",
    subtext: "Consistently excellent reviews",
  },
]

const whyChoose = [
  {
    icon: Monitor,
    title: "100% Online Training",
    description: "Learn from anywhere, anytime with flexible schedules",
  },
  {
    icon: BookOpen,
    title: "Recorded Sessions",
    description: "Lifetime access to all recorded classes for revision",
  },
  {
    icon: Handshake,
    title: "Real-Time Projects",
    description: "Build portfolio with live GCP industry projects",
  },
  {
    icon: Target,
    title: "Job Profile Building",
    description: "Expert-guided resume & LinkedIn optimization",
  },
  {
    icon: Users,
    title: "Mock Interviews",
    description: "Realistic practice with industry experts",
  },
  {
    icon: TrendingUp,
    title: "Career Guidance",
    description: "Comprehensive support from selection to offer",
  },
]

export function TrackRecord() {
  return (
    <section id="success" className="section-pad scroll-mt-24" aria-labelledby="track-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Proven Track Record"
          title={
            <>
              Why <span className="gradient-cyan">Top 300+ Students</span> Trust Us
            </>
          }
          subtitle="Real outcomes with measurable results from students who started exactly where you are"
        />

        {/* Stats grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <div className="card-base border-2 border-cyan/20 p-6 text-center transition-all hover:border-cyan/60 hover:-translate-y-2">
                <div className="flex justify-center">
                  <div className="rounded-lg bg-cyan/10 p-3">
                    <stat.icon className="text-cyan" size={24} />
                  </div>
                </div>
                <p className="mt-4 font-display text-3xl font-extrabold bg-gradient-to-r from-cyan to-google-blue bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="mt-1 font-semibold text-foreground">{stat.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.subtext}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Features grid */}
        <div className="mt-16">
          <h3 className="text-center font-display text-2xl font-bold">What Makes Jiyaan Different</h3>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="card-base border-2 border-border p-6 transition-all hover:border-cyan/60 hover:-translate-y-1">
                  <div className="rounded-lg bg-cyan/10 w-fit p-3">
                    <item.icon className="text-cyan" size={20} />
                  </div>
                  <h4 className="mt-4 font-display font-bold">{item.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <Reveal delay={800}>
          <div className="mt-16 rounded-lg border-2 border-cyan/20 bg-gradient-to-r from-cyan/5 to-google-blue/5 p-8 text-center">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-4xl font-bold text-cyan">⭐ 4.9/5</p>
                <p className="mt-1 text-sm font-semibold">Course Rating</p>
                <p className="text-xs text-muted-foreground">From 300+ alumni</p>
              </div>
              <div className="border-l border-r border-border">
                <p className="text-4xl font-bold text-cyan">📈 10+ LPA</p>
                <p className="mt-1 text-sm font-semibold">Average Salary</p>
                <p className="text-xs text-muted-foreground">Starting package</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-cyan">🎯 30 Days</p>
                <p className="mt-1 text-sm font-semibold">Average Time</p>
                <p className="text-xs text-muted-foreground">To first job offer</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Urgency CTA */}
        <Reveal delay={900}>
          <div className="mt-12 rounded-lg border-2 border-google-red/30 bg-gradient-to-r from-google-red/10 to-google-red/5 p-8 text-center">
            <p className="inline-block rounded-full bg-google-red/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-google-red">
              ⏰ Limited Seats Available
            </p>
            <h3 className="mt-4 font-display text-2xl font-bold">Next Batch Starts {getNextBatchMonthYear()}</h3>
            <p className="mt-2 text-muted-foreground">Demo dates: {getDemoDatesList()} - Only 30 seats per batch</p>
            <a
              href="#enroll"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-google-red to-google-red/80 px-8 py-3 font-display font-bold text-white transition-all hover:shadow-lg hover:shadow-google-red/25 active:scale-95"
            >
              Reserve Your Seat Now
              <span>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
