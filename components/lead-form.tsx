"use client"

import type React from "react"

import { useState } from "react"
import { Send, CheckCircle2, Phone, Mail, MapPin, Loader2 } from "lucide-react"
import { Reveal } from "./reveal"
import { submitToGoogleForms } from "@/utils/google-forms"

const courses = [
  "GCP Data Engineering",
  "GCP Associate Cloud Engineer",
  "GCP Professional Cloud Architect",
  "Data Analytics with BigQuery",
  "Not sure yet — guide me",
]

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: courses[0],
    message: "",
  })

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const success = await submitToGoogleForms({
        name: form.name,
        email: form.email,
        phone: form.phone,
        course: form.course,
        message: form.message,
      })

      if (success) {
        setSubmitted(true)
      } else {
        setError("Failed to submit form. Please try again.")
      }
    } catch (err) {
      console.error("Submission error:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="enroll" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:gap-14">
        {/* Left: value proposition */}
        <Reveal>
          <div className="flex h-full flex-col justify-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Book Your Free Demo
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold leading-tight md:text-4xl">
              Talk to a mentor and get a personalized career roadmap
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Limited seats per batch to keep mentorship personal. Drop your details and our team will call you within
              24 hours with course details, fees, and the next batch schedule.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Free 1:1 counselling session",
                "Live project-based GCP curriculum",
                "Placement assistance & resume building",
                "Flexible weekday & weekend batches",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-4 text-sm sm:grid-cols-2">
              <a href="tel:+919948314189" className="flex items-center gap-3 text-muted-foreground hover:text-primary">
                <Phone className="h-4 w-4 text-primary" /> +91 99483 14189
              </a>
              <a
                href="mailto:jiyaan.institute@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" /> jiyaan.institute@gmail.com
              </a>
              <span className="flex items-center gap-3 text-muted-foreground sm:col-span-2">
                <MapPin className="h-4 w-4 text-primary" /> Online &amp; Classroom batches across Telugu States
              </span>
            </div>
          </div>
        </Reveal>

        {/* Right: form card */}
        <Reveal delay={120}>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-primary/5 md:p-8">
            {submitted ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-16 w-16 text-primary" />
                <h3 className="mt-6 text-2xl font-bold">You&apos;re all set, {form.name.split(" ")[0] || "there"}!</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">
                  Thank you! Your demo request has been submitted successfully.
                  <br />
                  Our team will contact you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: "", email: "", phone: "", course: courses[0], message: "" })
                  }}
                  className="mt-8 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold">Reserve your seat</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your name"
                      className="form-input"
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 00000 00000"
                      className="form-input"
                    />
                  </Field>
                </div>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    className="form-input"
                  />
                </Field>
                <Field label="Course of interest">
                  <select
                    value={form.course}
                    onChange={(e) => update("course", e.target.value)}
                    className="form-input"
                  >
                    {courses.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Message (optional)">
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us about your background or goals"
                    rows={3}
                    className="form-input resize-none"
                  />
                </Field>
                {error && <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-600">{error}</div>}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get My Free Counselling Call
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  We respect your privacy. Your details are never shared.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground/90">{label}</span>
      {children}
    </label>
  )
}
