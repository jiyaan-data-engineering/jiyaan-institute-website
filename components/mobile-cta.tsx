"use client"

import { useEffect, useState } from "react"
import { Phone, ArrowRight } from "lucide-react"

export function MobileCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 600)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-border bg-surface/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="tel:+919948314189"
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-semibold"
      >
        <Phone className="h-4 w-4 text-primary" /> Call
      </a>
      <a
        href="#enroll"
        className="flex flex-[2] items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground"
      >
        Book Free Demo <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}
