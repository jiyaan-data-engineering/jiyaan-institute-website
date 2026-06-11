import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

type Provider = {
  key: string
  name: string
  badge: string
  color: string
  bars: { year: string; value: string; height: number; projected?: boolean }[]
  stats: { label: string; value: string }[]
}

const providers: Provider[] = [
  {
    key: "gcp",
    name: "Google Cloud",
    badge: "bg-cyan/10 text-cyan border-cyan/20",
    color: "linear-gradient(180deg,#00ffcc,#00cc99)",
    bars: [
      { year: "2020", value: "$12.8B", height: 32 },
      { year: "2025", value: "$28B", height: 60 },
      { year: "2030*", value: "$60B", height: 100, projected: true },
    ],
    stats: [
      { label: "CAGR", value: "55–60%" },
      { label: "Growth", value: "Fastest" },
    ],
  },
  {
    key: "aws",
    name: "Amazon AWS",
    badge: "bg-[#ffa500]/10 text-[#ffa500] border-[#ffa500]/20",
    color: "linear-gradient(180deg,#ffa500,#ff8c00)",
    bars: [
      { year: "2020", value: "$40.3B", height: 64 },
      { year: "2025", value: "$75B", height: 80 },
      { year: "2030*", value: "$125B", height: 100, projected: true },
    ],
    stats: [
      { label: "Market Share", value: "Largest" },
      { label: "Growth", value: "Stable" },
    ],
  },
  {
    key: "azure",
    name: "Microsoft Azure",
    badge: "bg-google-blue/10 text-google-blue border-google-blue/20",
    color: "linear-gradient(180deg,#6495ed,#4169e1)",
    bars: [
      { year: "2020", value: "$20.1B", height: 42 },
      { year: "2025", value: "$52B", height: 68 },
      { year: "2030*", value: "$95B", height: 100, projected: true },
    ],
    stats: [
      { label: "CAGR", value: "17–20%" },
      { label: "Growth", value: "Steady" },
    ],
  },
]

const insights = [
  { title: "GCP Advantage", desc: "Fastest growing cloud platform with AI/ML dominance.", border: "border-cyan", bg: "bg-cyan/10" },
  { title: "AWS Position", desc: "Largest market share but slower relative growth.", border: "border-[#ffa500]", bg: "bg-[#ffa500]/10" },
  { title: "Azure Trend", desc: "Steady enterprise adoption across Microsoft ecosystems.", border: "border-google-blue", bg: "bg-google-blue/10" },
]

export function CloudGrowth() {
  return (
    <section className="section-pad" aria-labelledby="cloud-growth-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Market Trends 2020–2030"
          title={
            <>
              Cloud Market Growth: <span className="gradient-cyan">GCP</span> Leads the Curve
            </>
          }
          subtitle="Market revenue projection (USD Billions). GCP shows the steepest growth trajectory."
        />

        <Reveal className="mt-12 rounded-lg border border-cyan/20 bg-surface/60 p-6 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-3">
            {providers.map((p) => (
              <div key={p.key} className="rounded-xl border border-white/5 bg-surface/60 p-5">
                <span className={`mb-6 inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-bold ${p.badge}`}>
                  {p.name}
                </span>
                <div className="flex h-56 items-end justify-around gap-3">
                  {p.bars.map((b) => (
                    <div key={b.year} className="flex h-full flex-1 flex-col items-center justify-end">
                      <span className="mb-2 text-xs font-bold text-foreground">{b.value}</span>
                      <div
                        className={`w-full rounded-t-lg ${b.projected ? "opacity-70" : ""}`}
                        style={{
                          height: `${b.height}%`,
                          background: p.color,
                          borderTop: b.projected ? "2px dashed rgba(255,255,255,0.5)" : "none",
                        }}
                      />
                      <span className="mt-2 text-[11px] font-medium text-muted">{b.year}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-2 border-t border-white/5 pt-3">
                  {p.stats.map((s) => (
                    <div key={s.label} className="flex items-center justify-between text-xs">
                      <span className="font-medium uppercase tracking-wide text-muted">{s.label}</span>
                      <span className="font-bold text-foreground">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {insights.map((ins) => (
              <div key={ins.title} className={`rounded-lg border-l-4 ${ins.border} ${ins.bg} p-4`}>
                <h4 className="font-display text-sm font-bold text-foreground">{ins.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted">{ins.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] text-muted">* 2030 figures are industry estimates.</p>
        </Reveal>
      </div>
    </section>
  )
}
