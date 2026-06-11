import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { GcpOverview } from "@/components/gcp-overview"
import { GcpComparison } from "@/components/gcp-comparison"
import { CloudGrowth } from "@/components/cloud-growth"
import { JobMarket } from "@/components/job-market"
import { EarningPotential } from "@/components/earning-potential"
import { InterviewCalls } from "@/components/interview-calls"
import { Companies } from "@/components/companies"
import { Pipeline } from "@/components/pipeline"
import { WhyChooseJiyaan } from "@/components/why-choose"
import { LearningJourney } from "@/components/learning-journey"
import { CoursesCarousel } from "@/components/courses-carousel"
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
        {/* Hook */}
        <Hero />

        {/* Why GCP — education */}
        <GcpOverview />
        <GcpComparison />

        {/* Motivation — market & money */}
        <CloudGrowth />
        <JobMarket />
        <EarningPotential />
        <InterviewCalls />

        {/* Proof — companies & what you build */}
        <Companies />
        <Pipeline />

        {/* Why Jiyaan — offering */}
        <WhyChooseJiyaan />
        <LearningJourney />
        <CoursesCarousel />

        {/* Social proof & urgency */}
        <TrackRecord />
        <Testimonials />

        {/* Conversion */}
        <CtaBand />
        <LeadForm />
        <Faq />
      </main>
      <Footer />
      <MobileCta />
    </>
  )
}
