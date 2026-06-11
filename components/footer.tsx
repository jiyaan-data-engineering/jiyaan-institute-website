import Image from "next/image"
import { Linkedin, Youtube, Instagram, MessageCircle, Mail, Phone } from "lucide-react"

const linkGroups = {
  Courses: [
    { label: "GCP Data Engineering", href: "#curriculum" },
    { label: "Associate Cloud Engineer", href: "#curriculum-learn" },
    { label: "Professional Cloud Architect", href: "#curriculum-learn" },
    { label: "BigQuery Analytics", href: "#curriculum" },
  ],
  Company: [
    { label: "About Us", href: "#home" },
    { label: "Mentors", href: "#why-jiyaan" },
    { label: "Success Stories", href: "#success" },
    { label: "Careers", href: "#companies" },
  ],
  Resources: [
    { label: "Blog", href: "#home" },
    { label: "Free Roadmap", href: "#curriculum" },
    { label: "Certification Guide", href: "#curriculum-learn" },
    { label: "Contact", href: "#enroll" },
  ],
}

const socials = [
  { Icon: Linkedin, href: "https://in.linkedin.com/in/jiyaan-institute", label: "LinkedIn" },
  { Icon: Instagram, href: "https://www.instagram.com", label: "Instagram" },
  { Icon: Youtube, href: "https://www.youtube.com", label: "YouTube" },
  {
    Icon: MessageCircle,
    href: "https://api.whatsapp.com/send/?phone=919876543210&text&type=phone_number&app_absent=0",
    label: "WhatsApp",
  },
]

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
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(linkGroups).map(([title, items]) => (
            <div key={title}>
              <h3 className="font-semibold">{title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-muted-foreground transition-colors hover:text-primary">
                      {item.label}
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
            <a href="mailto:jiyaan.institute@gmail.com" className="flex items-center gap-2 hover:text-primary">
              <Mail className="h-4 w-4" /> jiyaan.institute@gmail.com
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-primary">
              <Phone className="h-4 w-4" /> +91 9876543210
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
