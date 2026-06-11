import Image from "next/image"
import { Linkedin, Youtube, Instagram, Mail, Phone } from "lucide-react"

const links = {
  Courses: ["GCP Data Engineering", "Associate Cloud Engineer", "Professional Cloud Architect", "BigQuery Analytics"],
  Company: ["About Us", "Mentors", "Success Stories", "Careers"],
  Resources: ["Blog", "Free Roadmap", "Certification Guide", "Contact"],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image src="/logo.webp" alt="Jiyaan logo" width={44} height={44} className="rounded-lg" />
              <span className="font-display text-xl font-bold">Jiyaan</span>
            </div>
            <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
              Practical, mentor-led training in Google Cloud data engineering — built to turn ambitious learners into
              job-ready cloud professionals.
            </p>
            <div className="mt-6 flex gap-3">
              {[Linkedin, Youtube, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="font-semibold">{title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Jiyaan. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="mailto:hello@jiyaan.com" className="flex items-center gap-2 hover:text-primary">
              <Mail className="h-4 w-4" /> hello@jiyaan.com
            </a>
            <a href="tel:+910000000000" className="flex items-center gap-2 hover:text-primary">
              <Phone className="h-4 w-4" /> +91 00000 00000
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
