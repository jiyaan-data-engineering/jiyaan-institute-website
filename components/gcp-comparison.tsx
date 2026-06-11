import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { Zap, DollarSign, Bot, Database } from "lucide-react"

const rows = [
  { feature: "Data Analytics", gcp: "BigQuery — Industry Leading", aws: "Redshift — Good", azure: "Synapse — Basic" },
  { feature: "Machine Learning", gcp: "Vertex AI — Best in Class", aws: "SageMaker — Comprehensive", azure: "Azure ML — Standard" },
  { feature: "Real-time Processing", gcp: "Pub/Sub + Dataflow", aws: "Kinesis — Limited", azure: "Event Hubs — Basic" },
  { feature: "Pricing Model", gcp: "Most Competitive", aws: "Higher Cost", azure: "Mid-Range" },
  { feature: "AI / Generative AI", gcp: "Cutting Edge (Gemini)", aws: "Bedrock — Available", azure: "OpenAI Integration" },
  { feature: "Learning Curve", gcp: "Easier & Intuitive", aws: "Complex Ecosystem", azure: "Microsoft-Centric" },
]

const benefits = [
  { icon: Zap, title: "Speed & Performance", desc: "10–100x faster analytics queries than competitors." },
  { icon: DollarSign, title: "Cost Efficient", desc: "30–40% cheaper than equivalent AWS services." },
  { icon: Bot, title: "AI Excellence", desc: "Google's AI expertise built into every service." },
  { icon: Database, title: "Data Native", desc: "Built for data engineering from the ground up — by just Python and SQL proficiencies." },
]

export function GcpComparison() {
  return (
    <section id="why-gcp" className="section-pad scroll-mt-24 bg-surface/30" aria-labelledby="why-gcp-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="GCP vs AWS vs Azure"
          title={
            <>
              Why Choose <span className="gradient-cyan">GCP</span> Over AWS &amp; Azure?
            </>
          }
        />

        {/* Comparison table */}
        <Reveal className="mt-12 overflow-hidden rounded-lg border border-cyan/20 bg-surface">
          {/* header */}
          <div className="grid grid-cols-4 border-b border-cyan/15 bg-gradient-to-r from-[#001a3d] to-[#002147] text-center text-xs font-bold uppercase tracking-wide text-foreground sm:text-sm">
            <div className="p-4">Feature</div>
            <div className="bg-cyan/10 p-4 text-cyan">Google Cloud</div>
            <div className="p-4">Amazon AWS</div>
            <div className="p-4">Microsoft Azure</div>
          </div>
          {rows.map((r) => (
            <div
              key={r.feature}
              className="grid grid-cols-4 border-b border-cyan/10 text-center text-xs transition-colors last:border-0 hover:bg-cyan/[0.04] sm:text-sm"
            >
              <div className="flex items-center justify-center p-4 font-semibold text-foreground">{r.feature}</div>
              <div className="flex items-center justify-center bg-cyan/[0.07] p-4 font-bold text-cyan">{r.gcp}</div>
              <div className="flex items-center justify-center p-4 text-muted">{r.aws}</div>
              <div className="flex items-center justify-center p-4 text-muted">{r.azure}</div>
            </div>
          ))}
        </Reveal>

        {/* Benefits */}
        <Reveal className="mt-14">
          <h3 className="heading mb-8 text-center text-2xl text-cyan">Why GCP Wins</h3>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 80}
              className="rounded-lg border border-cyan/15 bg-cyan/[0.06] p-6 text-center transition-all hover:-translate-y-1.5 hover:border-cyan/60"
            >
              <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan">
                <b.icon size={22} />
              </span>
              <h4 className="font-display font-bold text-foreground">{b.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
