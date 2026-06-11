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
    color: "from-yellow-500/20 to-yellow-500/5",
    borderColor: "border-yellow-500/40",
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
    color: "from-orange-500/20 to-orange-500/5",
    borderColor: "border-orange-500/40",
  },
  {
    icon: Zap,
    name: "PySpark",
    color: "from-red-500/20 to-red-500/5",
    borderColor: "border-red-500/40",
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
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/40",
  },
  {
    icon: CheckSquare,
    name: "Real Projects",
    color: "from-green-500/20 to-green-500/5",
    borderColor: "border-green-500/40",
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
                className={`card-base group overflow-hidden border-2 p-6 text-center transition-all hover:scale-110 ${course.borderColor}`}
                style={{ backgroundImage: `linear-gradient(to br, ${course.color})` }}
              >
                <div className="flex justify-center">
                  <div className="rounded-lg bg-white/10 p-3 transition-all group-hover:scale-125">
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
              href="#lead-form"
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
