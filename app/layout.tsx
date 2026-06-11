import type { Metadata, Viewport } from "next"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Jiyaan Institute | Top GCP Data Engineering Training in India",
  description:
    "Master GCP Data Engineering at Jiyaan Institute. Real-time projects, 100% placement support, and expert training in SQL, Python, PySpark, BigQuery, Airflow, and Dataflow.",
  keywords: [
    "GCP Data Engineering Course",
    "Best Data Engineering Training",
    "SQL for Data Engineering",
    "Python for Data Science",
    "PySpark Training",
    "BigQuery Course",
    "Jiyaan Institute",
    "Cloud Engineering Placement",
  ],
  authors: [{ name: "Jiyaan Institute of Technology" }],
  openGraph: {
    type: "website",
    title: "Jiyaan Institute | GCP Data Engineering Excellence",
    description:
      "Accelerate your career with premium GCP Data Engineering courses. Real-time projects and 100% placement support.",
    siteName: "Jiyaan Institute",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0f1c",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
