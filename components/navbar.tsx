"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const links = [
  { label: "Home", href: "#home" },
  { label: "Why GCP", href: "#why-gcp" },
  { label: "Why Jiyaan", href: "#why-jiyaan" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Success", href: "#success" },
  { label: "Contact", href: "#enroll" },
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
        scrolled ? "border-b border-cyan/15 bg-background/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt="Jiyaan Institute logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-lg object-contain"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-extrabold tracking-wide text-foreground">JIYAAN</span>
            <span className="mt-0.5 text-[10px] font-medium tracking-[0.18em] text-muted">
              INSTITUTE OF TECHNOLOGY
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-cyan/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#enroll"
            className="btn bg-cyan text-background hover:bg-cyan-deep hover:shadow-[0_8px_30px_rgba(0,255,204,0.35)]"
          >
            Book Free Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan/20 text-cyan lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-cyan/15 bg-background/95 backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-muted hover:bg-cyan/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#enroll"
              onClick={() => setOpen(false)}
              className="btn mt-2 bg-cyan text-background"
            >
              Book Free Demo
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
