import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Companies } from "@/components/companies"
import { GcpOverview } from "@/components/gcp-overview"
import { GcpComparison } from "@/components/gcp-comparison"
import { WhyChooseJiyaan } from "@/components/why-choose"
import { LearningJourney } from "@/components/learning-journey"
import { CoursesCarousel } from "@/components/courses-carousel"
import { CloudGrowth } from "@/components/cloud-growth"
import { Pipeline } from "@/components/pipeline"
import { JobMarket } from "@/components/job-market"
import { EarningPotential } from "@/components/earning-potential"
import { TrackRecord } from "@/components/track-record"
import { Testimonials } from "@/components/testimonials"
import { CtaBand } from "@/components/cta-band"
import { LeadForm } from "@/components/lead-form"
import { Faq } from "@/components/faq"
import { Footer } from "@/components/footer"
import { MobileCta } from "@/components/mobile-cta"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hook & Proof */}
        <Hero />
        <Companies />

        {/* Education Phase */}
        <GcpOverview />
        <GcpComparison />
        <WhyChooseJiyaan />
        <LearningJourney />
        <CoursesCarousel />

        {/* Motivation Phase */}
        <CloudGrowth />
        <Pipeline />
        <JobMarket />
        <EarningPotential />

        {/* Social Proof & Urgency */}
        <TrackRecord />
        <Testimonials />

        {/* Conversion Phase */}
        <CtaBand />
        <LeadForm />
        <Faq />
      </main>
      <Footer />
      <MobileCta />
    </>
  )
}
