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
  title: "Jiyaan Institute | Top GCP Data Engineering Training in India | 100% Placement",
  description:
    "Master Google Cloud Platform (GCP) Data Engineering at Jiyaan Institute. Real-time projects, 100% placement support, expert mentors, SQL, Python, PySpark, BigQuery, Dataflow, and Airflow training. Bangalore's #1 Data Engineering institute.",
  keywords: [
    "GCP Data Engineering Course India",
    "Google Cloud Platform Training",
    "Data Engineering Training Bangalore",
    "BigQuery Course",
    "PySpark Training",
    "Python Data Engineering",
    "Cloud Data Pipeline",
    "Real-time Data Processing",
    "Dataflow Training",
    "Best Data Engineering Institute",
    "Cloud Engineering Placement",
    "Data Engineering Certification",
    "Jiyaan Institute",
    "100% Placement Data Engineering",
    "GCP Certification Training",
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
    siteName: "Jiyaan Institute",
    title: "GCP Data Engineering Training | 100% Placement | Jiyaan Institute",
    description:
      "Learn Google Cloud Platform Data Engineering from industry experts. Real-time projects, hands-on training, and guaranteed job placement. Join 500+ successful graduates.",
    images: [
      {
        url: "https://www.jiyaaninstitute.com/logo.webp",
        width: 1200,
        height: 630,
        alt: "Jiyaan Institute - GCP Data Engineering Training",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GCP Data Engineering Training | Jiyaan Institute",
    description: "Master Google Cloud Platform Data Engineering with 100% placement support",
    creator: "@jiyaaninstitute",
    images: ["https://www.jiyaaninstitute.com/logo.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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
    "@type": "Organization",
    name: "Jiyaan Institute of Technology",
    alternateName: "Jiyaan Institute",
    url: "https://www.jiyaaninstitute.com",
    logo: "https://www.jiyaaninstitute.com/logo.webp",
    description: "Top GCP Data Engineering Training Institute in India with 100% placement support",
    sameAs: [
      "https://www.facebook.com/jiyaaninstitute",
      "https://twitter.com/jiyaaninstitute",
      "https://www.linkedin.com/company/jiyaaninstitute",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "jiyaan.institute@gmail.com",
    },
    areaServed: "IN",
    knowsAbout: [
      "Google Cloud Platform",
      "Data Engineering",
      "BigQuery",
      "PySpark",
      "Python",
      "SQL",
      "Cloud Computing",
    ],
  }

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "GCP Data Engineering Masterclass",
    description: "Comprehensive 90-day GCP Data Engineering training program",
    provider: {
      "@type": "Organization",
      name: "Jiyaan Institute of Technology",
      url: "https://www.jiyaaninstitute.com",
    },
    instructor: {
      "@type": "Person",
      name: "Industry Expert Instructors",
    },
    duration: "P90D",
    courseMode: "OnlineCourse",
    skillLevel: "Beginner to Advanced",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "InStock",
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
