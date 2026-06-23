"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, X, Linkedin, Instagram, Youtube, MessageCircle } from "lucide-react"

const links = [
  { label: "Home", href: "#home" },
  { label: "Why GCP", href: "#why-gcp" },
  { label: "Why Jiyaan", href: "#why-jiyaan" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Success", href: "#success" },
  { label: "Contact", href: "#enroll" },
]

const socialLinks = [
  { Icon: Linkedin, href: "https://in.linkedin.com/in/jiyaan-institute", label: "LinkedIn" },
  { Icon: Instagram, href: "https://www.instagram.com", label: "Instagram" },
  { Icon: Youtube, href: "https://www.youtube.com", label: "YouTube" },
  { Icon: MessageCircle, href: "https://api.whatsapp.com/send/?phone=919948314189&text&type=phone_number&app_absent=0", label: "WhatsApp" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-cyan/10 bg-background/80 shadow-lg shadow-cyan/5 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-x">
        <div className="flex h-20 items-center justify-between md:h-24">
          {/* Brand - Left */}
          <a href="#home" className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80 md:gap-3">
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image
                src="/logo.webp"
                alt="Jiyaan Institute logo"
                fill
                className="rounded-lg object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-base font-extrabold tracking-tight text-foreground md:text-lg">
                JIYAAN
              </span>
              <span className="text-[9px] font-medium tracking-[0.12em] text-muted md:text-[10px] md:tracking-[0.18em]">
                INSTITUTE OF TECHNOLOGY
              </span>
            </div>
          </a>

          {/* Desktop Navigation - Center */}
          <nav
            className="hidden items-center gap-1 lg:flex xl:gap-2"
            aria-label="Main navigation"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-3 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-cyan xl:px-4"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan to-cyan/50 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Right Section - Social Icons */}
          <div className="hidden items-center gap-2 border-l border-cyan/20 pl-4 lg:flex xl:gap-3 xl:pl-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan/20 text-cyan transition-all duration-300 hover:border-cyan hover:bg-cyan/10 xl:h-11 xl:w-11"
              >
                <social.Icon size={18} className="transition-transform group-hover:scale-110" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan/20 text-cyan transition-all duration-300 hover:bg-cyan/5 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav
          className="border-t border-cyan/10 bg-gradient-to-b from-background/95 to-background/98 backdrop-blur-md lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="container-x flex flex-col gap-0.5 py-4">
            {/* Navigation Links */}
            {links.map((l, idx) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="group rounded-lg px-4 py-3 text-sm font-medium text-muted transition-all duration-200 hover:bg-cyan/5 hover:text-cyan"
                style={{
                  animationDelay: `${idx * 50}ms`,
                }}
              >
                <span className="inline-block">{l.label}</span>
              </a>
            ))}

            {/* Divider */}
            <div className="my-3 border-t border-cyan/10" />

            {/* Social Links Section */}
            <div className="px-4 py-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted/70">Connect With Us</p>
              <div className="grid grid-cols-4 gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group flex h-11 items-center justify-center rounded-lg border border-cyan/20 text-cyan transition-all duration-300 hover:border-cyan hover:bg-cyan/10"
                    title={social.label}
                  >
                    <social.Icon size={20} className="transition-transform group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </nav>
      )}
    </header>
  )
}
