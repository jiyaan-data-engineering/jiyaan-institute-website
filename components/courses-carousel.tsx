"use client"

import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { Cloud, Code, Database, Zap, Layers, Terminal, GitBranch, CheckSquare, Users, ArrowRight } from "lucide-react"

const courses = [
  {
    icon: Cloud,
    name: "GCP Cloud",
    color: "from-google-blue/20 to-google-blue/5",
    borderColor: "border-google-blue/40",
  },
  {
    icon: Code,
    name: "Python",
    color: "from-google-yellow/20 to-google-yellow/5",
    borderColor: "border-google-yellow/40",
  },
  {
    icon: Database,
    name: "SQL",
    color: "from-cyan/20 to-cyan/5",
    borderColor: "border-cyan/40",
  },
  {
    icon: Layers,
    name: "Big Data",
    color: "from-google-yellow/20 to-google-yellow/5",
    borderColor: "border-google-yellow/40",
  },
  {
    icon: Zap,
    name: "PySpark",
    color: "from-google-red/20 to-google-red/5",
    borderColor: "border-google-red/40",
  },
  {
    icon: Terminal,
    name: "Linux",
    color: "from-cyan/20 to-cyan/5",
    borderColor: "border-cyan/40",
  },
  {
    icon: GitBranch,
    name: "Git & Jira",
    color: "from-google-red/20 to-google-red/5",
    borderColor: "border-google-red/40",
  },
  {
    icon: Layers,
    name: "Data Modeling",
    color: "from-google-blue/20 to-google-blue/5",
    borderColor: "border-google-blue/40",
  },
  {
    icon: CheckSquare,
    name: "Real Projects",
    color: "from-google-green/20 to-google-green/5",
    borderColor: "border-google-green/40",
  },
  {
    icon: Users,
    name: "Interview Prep",
    color: "from-cyan/20 to-cyan/5",
    borderColor: "border-cyan/40",
  },
]

export function CoursesCarousel() {
  return (
    <section className="section-pad" aria-labelledby="courses-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Course Library"
          title={
            <>
              <span className="gradient-cyan">9+ Skills</span> Covered
            </>
          }
          subtitle="Comprehensive curriculum covering all aspects of GCP data engineering"
        />

        {/* Course grid */}
        <div className="mt-14 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {courses.map((course, i) => (
            <Reveal key={course.name} delay={i * 50}>
              <div
                className={`card-base group overflow-hidden border-2 bg-gradient-to-br p-6 text-center transition-all hover:scale-110 ${course.color} ${course.borderColor}`}
              >
                <div className="flex justify-center">
                  <div className="rounded-lg bg-cyan/10 p-3 transition-all group-hover:scale-125">
                    <course.icon className="text-cyan" size={28} />
                  </div>
                </div>
                <p className="mt-3 font-display font-bold text-foreground">{course.name}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Feature highlight */}
        <Reveal delay={600}>
          <div className="mt-16 rounded-lg border-2 border-cyan/20 bg-gradient-to-r from-cyan/5 to-google-blue/5 p-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan/20 font-bold text-cyan">✓</span>
                <div>
                  <p className="font-semibold">Recorded Videos</p>
                  <p className="text-sm text-muted-foreground">Lifetime access to all sessions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan/20 font-bold text-cyan">✓</span>
                <div>
                  <p className="font-semibold">Hands-on Labs</p>
                  <p className="text-sm text-muted-foreground">Real GCP projects included</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan/20 font-bold text-cyan">✓</span>
                <div>
                  <p className="font-semibold">Expert Mentoring</p>
                  <p className="text-sm text-muted-foreground">1:1 doubt clearing sessions</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={700}>
          <div className="mt-12 text-center">
            <a
              href="#enroll"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-google-blue px-8 py-3 font-display font-bold text-background transition-all hover:shadow-lg hover:shadow-cyan/25 active:scale-95"
            >
              Explore All Courses
              <ArrowRight size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
