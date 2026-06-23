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
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan/15 bg-background/95 shadow-lg shadow-black/20 backdrop-blur-md">
      <div className="container-x">
        <div className="flex h-20 items-center justify-between">
          {/* Brand - Left */}
          <a href="#home" className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80">
            <div className="relative h-12 w-12">
              <Image
                src="/logo.webp"
                alt="Jiyaan Institute logo"
                fill
                className="rounded-lg object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                JIYAAN
              </span>
              <span className="text-xs font-medium tracking-wider text-cyan/70">
                INSTITUTE OF TECHNOLOGY
              </span>
            </div>
          </a>

          {/* Desktop Navigation - Center */}
          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Main navigation"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-bold text-foreground/90 transition-colors duration-200 hover:text-cyan"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Section - Social Icons with Divider */}
          <div className="hidden items-center gap-4 border-l border-cyan/30 pl-6 lg:flex">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan/40 text-cyan transition-all duration-300 hover:border-cyan hover:bg-cyan/20 hover:shadow-lg hover:shadow-cyan/30"
              >
                <social.Icon size={18} className="transition-transform group-hover:scale-125" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-cyan transition-colors duration-200 hover:text-cyan/80 lg:hidden"
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
          className="border-t border-cyan/10 bg-background/98 backdrop-blur-sm lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="container-x space-y-1 py-4">
            {/* Navigation Links */}
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-bold text-foreground/90 transition-colors duration-200 hover:bg-cyan/10 hover:text-cyan"
              >
                {l.label}
              </a>
            ))}

            {/* Divider */}
            <div className="my-2 border-t border-cyan/10" />

            {/* Social Links Section */}
            <div className="px-4 py-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan/70">Follow Us</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-cyan/40 text-cyan transition-all duration-300 hover:border-cyan hover:bg-cyan/20 hover:shadow-lg hover:shadow-cyan/30"
                  >
                    <social.Icon size={20} className="transition-transform group-hover:scale-125" />
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
