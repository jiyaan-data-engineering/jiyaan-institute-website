import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { ArrowRight, Zap, TrendingUp, ShieldCheck, Lightbulb } from "lucide-react"

const stages = [
  { n: 1, title: "INGEST", category: "Cloud Streaming", service: "Pub/Sub" },
  { n: 2, title: "STORE", category: "Data Lake", service: "GCS" },
  { n: 3, title: "PROCESS", category: "ETL", service: "Dataflow" },
  { n: 4, title: "WAREHOUSE", category: "Analytics", service: "BigQuery" },
  { n: 5, title: "ANALYZE", category: "ML", service: "Vertex AI" },
  { n: 6, title: "VISUALIZE", category: "Reports", service: "Looker" },
]

const sources = ["Databases", "APIs", "Applications", "IoT Sensors", "Log Files"]
const targets = ["Dashboards", "Automation", "ML Models", "Alerts", "BI Tools"]

const stats = [
  { icon: Zap, title: "Real-Time Processing", desc: "Stream & process data in milliseconds." },
  { icon: TrendingUp, title: "Scalable Architecture", desc: "Handle petabytes of data effortlessly." },
  { icon: ShieldCheck, title: "Enterprise Security", desc: "Built-in encryption and compliance." },
  { icon: Lightbulb, title: "AI-Ready Data", desc: "Seamless ML integration at every stage." },
]

function Chips({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-google-blue/20 bg-google-blue/[0.06] p-6">
      <h4 className="mb-4 text-center font-display text-sm font-bold uppercase tracking-wider gradient-text">{title}</h4>
      <div className="flex flex-wrap justify-center gap-3">
        {items.map((s) => (
          <span
            key={s}
            className="rounded-lg border border-google-blue/30 bg-google-blue/[0.08] px-4 py-2 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-google-blue/15"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Pipeline() {
  return (
    <section id="curriculum" className="section-pad scroll-mt-24" aria-labelledby="pipeline-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="What You'll Build"
          title={
            <>
              GCP Data Engineering <span className="gradient-cyan">Pipeline</span>
            </>
          }
          subtitle="Master the complete flow: Ingest → Store → Process → Warehouse → Analyze → Visualize."
        />

        <div className="mt-12 flex flex-col gap-8">
          <Reveal>
            <Chips title="Data Sources" items={sources} />
          </Reveal>

          {/* Pipeline flow */}
          <div className="flex flex-col items-stretch justify-center gap-4 lg:flex-row lg:items-start">
            {stages.map((s, i) => (
              <Reveal key={s.n} delay={i * 80} className="flex flex-1 flex-col items-center gap-3 lg:flex-row">
                <div className="flex w-full flex-col items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-google-blue to-google-green font-bold text-white shadow-[0_5px_20px_rgba(66,133,244,0.4)]">
                    {s.n}
                  </span>
                  <div className="card-base w-full p-4 text-center hover:-translate-y-1 hover:border-google-blue">
                    <h3 className="font-display text-sm font-bold tracking-wide text-foreground">{s.title}</h3>
                    <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">{s.category}</p>
                    <span className="mt-2 inline-block rounded-md border border-google-blue/30 bg-google-blue/10 px-2.5 py-1 text-xs font-bold text-google-blue">
                      {s.service}
                    </span>
                  </div>
                </div>
                {i < stages.length - 1 && (
                  <ArrowRight className="hidden shrink-0 text-google-blue/60 lg:mt-3 lg:block" size={22} />
                )}
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Chips title="Downstream Applications" items={targets} />
          </Reveal>
        </div>

        {/* stats */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 80}
              className="rounded-lg border border-cyan/20 bg-gradient-to-br from-cyan/10 to-google-blue/10 p-6 text-center transition-all hover:-translate-y-1 hover:border-cyan/60"
            >
              <s.icon className="mx-auto mb-3 text-cyan" size={26} />
              <h4 className="font-display font-bold text-foreground">{s.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
