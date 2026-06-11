import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

const companies = [
  "Google", "Spotify", "Snapchat", "Shopify", "GitLab", "Coursera", "Salesforce", "Databricks",
  "Stripe", "Twilio", "PayPal", "JPMorgan", "Goldman Sachs", "HSBC", "Walmart", "eBay",
  "Flipkart", "Swiggy", "Zomato", "Paytm", "Netflix", "Disney", "YouTube", "Airbnb",
  "Uber", "Ola", "FedEx", "IBM", "Infosys", "TCS", "Accenture", "Deloitte",
  "Razorpay", "Freshworks", "Toyota", "Tata Motors", "Mastercard", "Visa", "SAP", "Oracle",
]

export function Companies() {
  // duplicate for seamless marquee
  const loop = [...companies, ...companies]
  return (
    <section className="section-pad bg-surface/30" aria-labelledby="companies-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Trusted Globally"
          title={
            <>
              <span className="gradient-cyan">100+ Companies</span> Using GCP Today
            </>
          }
          subtitle="Join the fastest-growing cloud platform trusted by Fortune 500 companies and unicorns."
        />
      </div>

      <Reveal className="relative mt-12 overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {loop.map((c, i) => (
            <div
              key={`${c}-${i}`}
              className="grid h-20 w-40 shrink-0 place-items-center rounded-xl border border-cyan/20 bg-cyan/[0.06] px-4 text-center font-display text-sm font-bold text-foreground transition-colors hover:border-cyan/60 hover:bg-cyan/10"
            >
              {c}
            </div>
          ))}
        </div>
      </Reveal>

      <div className="container-x">
        <Reveal className="mt-10 rounded-lg border border-cyan/15 bg-cyan/[0.05] p-6 text-center">
          <p className="font-medium text-cyan">
            These companies trust GCP for their data, AI/ML and cloud infrastructure needs.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
