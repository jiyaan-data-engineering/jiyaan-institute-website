import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

const companies = [
  // Tier 1: Verified GCP Partners (Google Cloud Partners)
  "TCS", "Infosys", "Wipro", "HCLTech", "Tech Mahindra",
  "Cognizant", "Accenture", "Capgemini", "Deloitte", "EY",
  "KPMG", "PwC", "LTIMindtree", "Mphasis", "Persistent Systems",

  // Tier 1: GCP Specialists & Data Partners
  "Quantiphi", "Sigmoid", "Tiger Analytics", "Tredence", "Datametica",
  "Fractal Analytics", "LatentView Analytics", "Searce", "GlobalLogic", "Publicis Sapient",
  "Thoughtworks", "Brillio", "Coforge", "Nagarro", "Virtusa", "Flipkart",

  // Tier 2: Indian Product Companies (GCP Verified)
  "Swiggy", "Razorpay", "Unacademy", "InMobi", "Practo",
  "CarDekho", "Yellow.ai", "Vedantu", "Meesho",

  // Tier 2: Strong IT Services (Multi-Cloud with GCP)
  "Atos", "NTT Data", "Hexaware", "Birlasoft", "UST",
  "Zensar Technologies", "Saksoft", "EPAM", "HTC Global Services", "Tavant",

  // Tier 3: Emerging & Niche Services
  "Xebia", "Value Labs", "R Systems", "WalkingTree", "Bristlecone",
  "Infogain", "CGI", "CSG Systems", "CSI Global", "Globant",

  // Tier 3: Global Companies with India Operations
  "Snap", "Twitter", "PayPal", "Target", "HSBC",
  "Deutsche Bank", "Standard Chartered", "Vodafone", "Air India", "Mastercard",

  // Tier 3: Financial & Enterprise (India Operations)
  "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra", "Wells Fargo",
  "Colgate-Palmolive", "PepsiCo", "Bayer", "UPS", "Ford",

  // Tier 3: Automotive & Manufacturing (India Operations)
  "General Motors", "Mercedes-Benz R&D", "Renault Nissan Tech", "Equifax", "HDFC ERGO",
  "Hindustan Unilever", "L'Oréal", "Mondelez", "AB InBev", "Tata Elxsi",
]

export function Companies() {
  // duplicate for seamless marquee
  const loop = [...companies, ...companies]
  return (
    <section id="companies" className="section-pad scroll-mt-24 bg-surface/30" aria-labelledby="companies-title">
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
        <div className="flex w-max animate-marquee gap-8 hover:[animation-play-state:paused]">
          {loop.map((c, i) => (
            <div
              key={`${c}-${i}`}
              className="grid h-24 w-48 shrink-0 place-items-center rounded-xl border border-cyan/20 bg-cyan/[0.06] px-6 text-center font-display text-base font-bold text-foreground transition-colors hover:border-cyan/60 hover:bg-cyan/10"
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
