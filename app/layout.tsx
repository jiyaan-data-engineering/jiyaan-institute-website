import type { Metadata, Viewport } from "next"
import { Inter, Outfit } from "next/font/google"
import Script from "next/script"
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
  title: "Jiyaan Institute | Best GCP Data Engineering Course in Hyderabad | 100% Placement",
  description:
    "Best GCP Data Engineering training course in Hyderabad with 100% placement guarantee. Learn BigQuery, PySpark, Python, SQL, Airflow, Dataflow from industry experts. Real-world projects & job-ready skills at Jiyaan Institute.",
  keywords: [
    "Jiyaan Institute",
    "GCP Data Engineering Course Hyderabad",
    "Best Data Engineering Training Hyderabad",
    "Google Cloud Platform Training Hyderabad",
    "BigQuery Course Hyderabad",
    "PySpark Training Hyderabad",
    "Data Engineering Institute Hyderabad",
    "GCP Certification Course",
    "Data Engineering Training India",
    "Cloud Data Pipeline Course",
    "Real-time Data Processing Training",
    "Dataflow Training",
    "Best GCP Data Engineering Institute",
    "Data Engineering Placement Hyderabad",
    "Cloud Engineering Certification",
    "100% Placement Data Engineering",
    "Jiyaan Institute Hyderabad",
    "GCP Data Engineering Career",
  ],
  authors: [{ name: "Jiyaan Institute of Technology", url: "https://www.jiyaaninstitute.com" }],
  creator: "Jiyaan Institute of Technology",
  publisher: "Jiyaan Institute of Technology",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  canonical: "https://www.jiyaaninstitute.com",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.jiyaaninstitute.com",
    siteName: "Jiyaan Institute - Best GCP Data Engineering Course in Hyderabad",
    title: "Best GCP Data Engineering Course in Hyderabad | 100% Placement | Jiyaan Institute",
    description:
      "Hyderabad's top-rated GCP Data Engineering training course. Learn BigQuery, PySpark, Python, SQL, Airflow from industry experts. 100% job placement guarantee. Join 500+ successful graduates today!",
    images: [
      {
        url: "https://www.jiyaaninstitute.com/logo.webp",
        width: 1200,
        height: 630,
        alt: "Jiyaan Institute - Best GCP Data Engineering Training in Hyderabad",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best GCP Data Engineering Course in Hyderabad | Jiyaan Institute",
    description: "Master GCP Data Engineering with 100% placement support. Real-world projects, expert mentors, and job-ready skills.",
    creator: "@jiyaaninstitute",
    images: ["https://www.jiyaaninstitute.com/logo.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.webp", sizes: "any", type: "image/webp" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/logo.webp",
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Jiyaan Institute",
  },
  formatDetection: {
    email: false,
    telephone: false,
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.jiyaaninstitute.com",
    name: "Jiyaan Institute of Technology",
    alternateName: "Jiyaan Institute - GCP Data Engineering Training",
    url: "https://www.jiyaaninstitute.com",
    logo: "https://www.jiyaaninstitute.com/logo.webp",
    image: "https://www.jiyaaninstitute.com/logo.webp",
    description: "Hyderabad's premier GCP Data Engineering training institute offering 100% placement support with real-world projects and expert mentorship",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    areaServed: [
      "Hyderabad",
      "Telangana",
      "India",
    ],
    sameAs: [
      "https://www.facebook.com/jiyaaninstitute",
      "https://twitter.com/jiyaaninstitute",
      "https://www.linkedin.com/company/jiyaaninstitute",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "jiyaan.institute@gmail.com",
      telephone: "+91-9948314189",
    },
    knowsAbout: [
      "Google Cloud Platform",
      "GCP Data Engineering",
      "BigQuery",
      "PySpark",
      "Python",
      "SQL",
      "Apache Airflow",
      "Dataflow",
      "Cloud Computing",
      "Data Pipeline",
    ],
    priceRange: "₹",
  }

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Best GCP Data Engineering Masterclass - Hyderabad",
    description: "Comprehensive 90-day GCP Data Engineering training program with 100% placement guarantee. Learn BigQuery, PySpark, Python, SQL, Airflow, and Dataflow with real-world projects.",
    url: "https://www.jiyaaninstitute.com",
    provider: {
      "@type": "Organization",
      name: "Jiyaan Institute of Technology",
      url: "https://www.jiyaaninstitute.com",
      sameAs: "https://www.linkedin.com/company/jiyaaninstitute",
    },
    instructor: {
      "@type": "Person",
      name: "Industry Expert Instructors",
    },
    duration: "P90D",
    courseMode: "OnlineCourse",
    skillLevel: "Beginner to Advanced",
    educationLevel: "Professional Training",
    inLanguage: "en-IN",
    isAccessibleForFree: false,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "InStock",
      category: "Professional Training",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "250",
    },
  }

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} bg-background`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="charset" content="utf-8" />
        <meta name="theme-color" content="#0a0f1c" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="canonical" href="https://www.jiyaaninstitute.com" />
        <link rel="sitemap" href="/sitemap.xml" />
        <link rel="manifest" href="/manifest.json" />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="afterInteractive"
        />
        <Script
          id="course-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
