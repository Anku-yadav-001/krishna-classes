import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins"
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'Krishna Classes - Excellence in Education',
  description: 'Krishna Classes is a premier coaching institute dedicated to nurturing academic excellence. We offer comprehensive courses for competitive exams with expert faculty and proven results.',
  keywords: ['coaching classes', 'education', 'competitive exams', 'JEE', 'NEET', 'Krishna Classes'],
  authors: [{ name: 'Krishna Classes' }],
  openGraph: {
    title: 'Krishna Classes - Excellence in Education',
    description: 'Premier coaching institute with expert faculty and proven results',
    type: 'website',
  },
  icons: "logo.jpeg"
}

export const viewport: Viewport = {
  themeColor: '#1e3a5f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights/>
      </body>
    </html>
  )
}
