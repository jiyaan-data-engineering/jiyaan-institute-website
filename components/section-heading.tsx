import { Reveal } from "./reveal"

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: string
  align?: "center" | "left"
}) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left"
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan">
          {eyebrow}
        </span>
      )}
      <h2 className="heading text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">{title}</h2>
      {subtitle && <p className="text-pretty leading-relaxed text-muted">{subtitle}</p>}
    </Reveal>
  )
}
