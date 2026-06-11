import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { Cloud } from "lucide-react"

const companyInfo = [
  { label: "Owner", value: "Google", sub: "By Larry Page & Sergey Brin" },
  { label: "CEO", value: "Thomas Kurian", sub: "Leading innovation & growth" },
  { label: "Industry", value: "Cloud Computing", sub: "Web services & infrastructure" },
  { label: "Launched", value: "Apr 7, 2008", sub: "18 years of innovation" },
  { label: "Revenue (2022)", value: "US $26.3B", sub: "Increasing growth" },
  { label: "Current Status", value: "Active", sub: "Continuously growing" },
]

const tech = ["Java", "C++", "Python", "Go", "Ruby"]

const timeline = [
  { year: "Apr 2008", title: "Google App Engine Preview", desc: "GCP began with App Engine — a platform for building and hosting web apps." },
  { year: "May 2010", title: "Cloud Storage Launch", desc: "Scalable object storage for enterprise data goes live." },
  { year: "2010", title: "BigQuery Preview", desc: "Petabyte-scale analytics announced, revolutionizing data warehousing." },
  { year: "2011", title: "Public Availability", desc: "GCP opens to businesses worldwide." },
  { year: "Today", title: "Global Innovation Leader", desc: "Hundreds of services with continuous global expansion." },
]

export function GcpOverview() {
  return (
    <section className="section-pad" aria-labelledby="gcp-overview">
      <div className="container-x">
        <SectionHeading
          eyebrow="The Platform"
          title={
            <>
              What is <span className="gradient-cyan">Google Cloud Platform?</span>
            </>
          }
          subtitle="Enterprise cloud services by Google — the same infrastructure that powers Search and Gmail."
        />

        {/* Definition card */}
        <Reveal className="mx-auto mt-12 max-w-4xl">
          <div className="card-base relative overflow-hidden p-8 lg:p-10">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan/5 blur-3xl" />
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan">
                <Cloud size={24} />
              </span>
              <p className="text-pretty leading-relaxed text-muted">
                Google Cloud Platform (GCP) is a suite of cloud services including computing, data storage, analytics
                and machine learning, with tools to manage them. It runs on the same infrastructure Google uses for its
                own products like Google Search and Gmail.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Infrastructure as a Service", "Platform as a Service", "Serverless Computing"].map((b) => (
                <span key={b} className="rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5 text-xs font-medium text-cyan">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Company info grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {companyInfo.map((c, i) => (
            <Reveal key={c.label} delay={i * 60} className="card-base p-5 hover:-translate-y-1 hover:border-cyan/50">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan">{c.label}</div>
              <div className="mt-2 font-display text-lg font-bold text-foreground">{c.value}</div>
              <div className="mt-1 text-xs text-muted">{c.sub}</div>
            </Reveal>
          ))}
        </div>

        {/* Built with */}
        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm font-medium text-muted">Built with:</span>
          {tech.map((t) => (
            <span key={t} className="rounded-lg border border-cyan/20 bg-surface px-4 py-2 text-sm font-semibold text-foreground">
              {t}
            </span>
          ))}
        </Reveal>

        {/* Timeline */}
        <div className="mt-16">
          <Reveal>
            <h3 className="heading mb-10 text-center text-2xl text-foreground">GCP Journey — 2008 to Today</h3>
          </Reveal>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan/60 via-google-blue/40 to-transparent md:left-1/2" />
            <div className="flex flex-col gap-8">
              {timeline.map((t, i) => (
                <Reveal
                  key={t.title}
                  delay={i * 80}
                  className={`relative flex items-start gap-5 md:w-1/2 ${
                    i % 2 === 0 ? "md:self-start md:pr-10" : "md:flex-row-reverse md:self-end md:pl-10 md:text-right"
                  }`}
                >
                  <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-cyan bg-background text-xs font-bold text-cyan">
                    {i + 1}
                  </span>
                  <div className="card-base flex-1 p-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-cyan">{t.year}</div>
                    <h4 className="mt-1 font-display font-bold text-foreground">{t.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
