"use client"

import { Star, Quote } from "lucide-react"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

const testimonials = [
  // TCS
  { name: "Kandula Ayyappareddy", role: "Data Engineer @ TCS", quote: "BigQuery optimization and Dataflow training got me TCS placement. Mentors' real-world experience made complex concepts simple.", initial: "K" },
  { name: "Rajasekhar", role: "Cloud Data Engineer @ TCS", quote: "GCP fundamentals to advanced - this course covered everything TCS needed. Certified and placed with 150% salary hike!", initial: "R" },
  // Capgemini
  { name: "Gopisetti Venkata Durga Bhavani", role: "Data Engineer @ Capgemini", quote: "From zero cloud experience to Data Engineer at Capgemini. SQL and PySpark modules were exactly what the interview needed!", initial: "G" },
  { name: "Jogi Himaja", role: "GCP Data Engineer @ Capgemini", quote: "Hands-on Dataflow projects and BigQuery deep-dives gave me confidence. Now building cloud pipelines at Capgemini!", initial: "J" },
  { name: "Kasa Bala Phani Kumar", role: "Cloud Data Specialist @ Capgemini", quote: "Best decision ever! Placement support team got me interview at Capgemini and negotiated a great package.", initial: "K" },
  { name: "Rella Leelavathi", role: "Data Pipeline Engineer @ Capgemini", quote: "From non-technical background to building production pipelines at Capgemini. Dream job realized!", initial: "R" },
  { name: "karthik", role: "Data Engineer @ Capgemini", quote: "Real-world Airflow and SQL projects prepared me perfectly. Salary tripled compared to previous role!", initial: "Y" },
  { name: "Manish", role: "Senior Consultant @ Capgemini", quote: "The comprehensive GCP training and leadership modules prepared me for senior consultant role at Capgemini. Exceptional ROI!", initial: "M" },
  // HCL
  { name: "Bhanu", role: "GCP Data Engineer @ HCL", quote: "Interview focused on BigQuery and optimization - exactly our curriculum. Placed on first attempt!", initial: "B" },
  { name: "Sainadh", role: "Data Pipeline Engineer @ HCL", quote: "From Python basics to GCP Data Engineer at HCL. This course accelerated career by 5 years!", initial: "S" },
  { name: "Sivannarayana", role: "Data Engineer @ HCL", quote: "Structured curriculum and 1:1 doubt sessions made all the difference. HCL hired me on the spot!", initial: "S" },
  // IBM
  { name: "Ramesh Varma Namuri", role: "Data Engineer @ IBM", quote: "IBM's role required cloud architecture knowledge. Course provided exactly that. Promoted within a year!", initial: "R" },
  { name: "Adabala Phaneendra", role: "GCP Data Architect @ IBM", quote: "BigQuery and cloud architecture modules helped in IBM's interviews. Now designing data solutions for enterprise clients!", initial: "A" },
  // Tech Mahindra
  { name: "Achanta Venkata Durga Sai Krishna Phalgun", role: "Data Engineer @ Tech Mahindra", quote: "TechM's GCP projects require solid fundamentals. Course provided exactly that. 180% salary jump!", initial: "A" },
  { name: "Gannabattula Ashok Babu", role: "Cloud Data Engineer @ Tech Mahindra", quote: "Support engineer to Data Engineer transition made possible by placement support. Grateful!", initial: "G" },
  // Accenture
  { name: "Padamati Lohith Kumar", role: "Data Engineer @ Accenture", quote: "Interview focused on real-world pipelines. Hands-on Dataflow projects gave confidence for any question!", initial: "P" },
  // EY
  { name: "Pavan Sai", role: "Data Engineer @ EY", quote: "EY looking for GCP + legacy systems expertise. Course covered both aspects beautifully!", initial: "K" },
  // Altimetrik
  { name: "Chennu Chandra Sekhar", role: "Data Engineer @ Altimetrik", quote: "Altimetrik values hands-on GCP experience. Real projects and mentorship placed me in role I love!", initial: "C" },
  // Ascendion
  { name: "Sivakrishna Marabattini", role: "GCP Data Engineer @ Ascendion", quote: "Fresher to Data Engineer at Ascendion thanks to structured approach and placement support!", initial: "S" },
  // Quantiphi
  { name: "Ashok Babu Gannabattula", role: "Senior Data Engineer @ Quantiphi", quote: "Quantiphi specialist - advanced modules prepared me for challenging role. Leading data projects!", initial: "A" },
  { name: "Rajulapati Syam Venkat Ram", role: "Data Engineer @ Quantiphi", quote: "Quantiphi interview was GCP expertise focused. Perfect match for what I learned here!", initial: "R" },
  // Persistent
  { name: "Achanta Phalgun", role: "Data Pipeline Architect @ Persistent", quote: "Architecture role required deep GCP knowledge. Advanced modules were game-changing!", initial: "A" },
  // Infinite
  { name: "Achanta Phalgun", role: "Data Engineer @ Infinite", quote: "Interview asked about real data engineering challenges. Real-world projects prepared me well!", initial: "A" },
  // Dun & Bradstreet
  { name: "Tummala Sai Pranav", role: "Cloud Data Engineer @ Dun & Bradstreet", quote: "Role required SQL + cloud expertise. Course covered both comprehensively!", initial: "T" },
  // HumanCloud
  { name: "Tarun Barry", role: "Data Engineer @ HumanCloud", quote: "HumanCloud values hands-on GCP experience. Practical projects got me placed in desired role!", initial: "T" },
  // 9nexus
  { name: "Ravi Kiran", role: "Data Engineer @ 9nexus", quote: "9nexus's dynamic startup environment needed hands-on data engineers with GCP expertise. This course prepared me perfectly!", initial: "R" },
  // Programming Minds
  { name: "Phani Kumar", role: "Data Engineer @ Programming Minds", quote: "High technical bar, but mentorship prepared me to exceed expectations!", initial: "P" },
  // Photon
  { name: "Ramarao Nunna", role: "Data Engineer @ Photon", quote: "Fast-paced environment needed solid GCP fundamentals and quick learning. Perfect fit!", initial: "R" },
  // SQSHFT
  { name: "Sri Krishna Yamana", role: "Data Engineer @ SQSHFT", quote: "Thorough interview process met with comprehensive training confidence!", initial: "S" },
  // TECH T7
  { name: "Teja Suvvari", role: "Cloud Data Engineer @ TECH T7", quote: "TECH T7 values innovation and cloud expertise. Advanced curriculum aligned perfectly!", initial: "T" },
  // Techila
  { name: "Vijay Bhaskara Raju Nadimpalli", role: "Data Engineer @ Techila", quote: "Role required quick learning and adaptability. Real-world projects taught me both!", initial: "V" },
  // UpwardIQ
  { name: "Dungala Charan Saiteja", role: "Data Engineer @ UpwardIQ", quote: "Startup needed hands-on data engineers. Practical training made me production-ready!", initial: "D" },
  // VSPL
  { name: "Kattula Omkar Sri Harsha", role: "Data Engineer @ VSPL", quote: "Challenging interview met with excellent mock interview prep. Ready for anything!", initial: "K" },
  // Crown Solution
  { name: "Borra Srinu", role: "Senior GCP Engineer @ Crown Solution", quote: "Advanced GCP architecture modules and mentorship took my career to senior level. Leading cloud infrastructure at Crown Solution!", initial: "B" },
  // Data Engineering
  { name: "Amarnath", role: "GCP Data Engineer", quote: "From basics to production-ready data engineer. This course's hands-on approach and mentorship made all the difference in my career!", initial: "A" },
]

export function Testimonials() {
  // Duplicate for seamless marquee
  const loop = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="section-pad scroll-mt-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Success Stories"
          title="GCP Data Engineering Careers We Transformed"
          subtitle="Real outcomes from learners now working at leading global companies as GCP Data Engineers."
        />
      </div>

      {/* Auto-Scrolling Testimonials */}
      <Reveal className="relative mt-14 overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling Container */}
        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="card-base flex h-full w-96 shrink-0 flex-col p-7 transition-all duration-300 hover:border-primary/40"
            >
              <Quote className="h-8 w-8 text-primary/40" />
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-google-yellow text-google-yellow" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 leading-relaxed text-foreground/85">{t.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary">
                  {t.initial}
                </span>
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      <div className="container-x">
        <Reveal className="mt-10 rounded-lg border border-cyan/15 bg-cyan/[0.05] p-6 text-center">
          <p className="font-medium text-cyan">
            These are our graduates now working as GCP Data Engineers at Fortune 500 companies, unicorns, and leading tech firms. Join them today.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
