"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ArrowRight, Play, Users, Award, BookOpen, Trophy,
  Calculator, FlaskConical, Globe, Home, Sparkles, Clock,
} from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const stats = [
  { icon: Users,    value: "5000+", label: "Students Enrolled" },
  { icon: Award,    value: "95%",   label: "Success Rate" },
  { icon: BookOpen, value: "15+",   label: "Years Experience" },
  { icon: Trophy,   value: "500+",  label: "Top Rankers" },
]

const courses = [
  {
    icon: Calculator,
    title: "Class 11th–12th",
    subtitle: "+ IIT-JEE",
    timing: "5:30 PM – 7:30 PM",
    color: "bg-white",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    offset: false,
  },
  {
    icon: FlaskConical,
    title: "Class 11th–12th",
    subtitle: "+ NEET",
    timing: "5:30 PM – 7:30 PM",
    color: "bg-white",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    offset: true,
  },
  {
    icon: BookOpen,
    title: "Class 8th–10th",
    subtitle: "Maths · Science · SST · English",
    timing: "4:30 PM – 8:00 PM",
    color: "bg-white",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    offset: false,
  },
  {
    icon: Globe,
    title: "Class 6th–7th",
    subtitle: "All Subjects",
    timing: "4:30 PM – 6:30 PM",
    color: "bg-white",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    offset: true,
  },
]

// ─── Animated "New Batch Starting" ticker ────────────────────────────────────
function NewBatchBanner() {
  const [visible, setVisible] = useState(true)
  const [pulse, setPulse] = useState(false)

  // Pulse dot every 2s
  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  return (
    <div className="relative overflow-hidden bg-secondary/10 border border-secondary/30 rounded-xl px-4 py-3 mb-6 flex items-center justify-between gap-3">
      {/* Animated shimmer sweep */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="flex items-center gap-3 min-w-0">
        {/* Live pulse dot */}
        <span className="relative flex h-3 w-3 shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75`} />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
        </span>

        <Sparkles className="h-4 w-4 text-secondary shrink-0" />

        <p className="text-white text-sm font-semibold truncate">
          🎓 New Batches Starting —{" "}
          <span className="text-secondary">Limited Seats Available!</span>
          <span className="hidden sm:inline text-white/70 font-normal">
            {" "}· Mon–Sat · All Courses
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="#contact"
          className="text-xs font-bold text-secondary hover:text-secondary/80 underline underline-offset-2 transition-colors whitespace-nowrap"
        >
          Book Seat →
        </Link>
        <button
          onClick={() => setVisible(false)}
          className="text-white/40 hover:text-white/80 transition-colors text-lg leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export function HeroSection() {
  const activeOffer = siteConfig.offers?.find((offer: any) => offer.active)

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />

      {/* Decorative blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/50 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Content ── */}
          <div className="text-center lg:text-left">

            {/* New batch banner */}
            <NewBatchBanner />

            {/* Offer badge */}
            {activeOffer && (
              <Badge className="mb-5 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2">
                {activeOffer.badge}: {activeOffer.discount} — Use code: {activeOffer.code}
              </Badge>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight text-balance">
              Unlock Your{" "}
              <span className="relative inline-block">
                <span className="text-secondary">Academic</span>
                {/* Underline accent */}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M2 6 Q50 2 100 5 Q150 8 198 4"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-secondary/60"
                  />
                </svg>
              </span>{" "}
              Potential
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
              Join Krishna Classes — where excellence meets education. Expert faculty, proven results, and flexible batches for every student.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base px-8 shadow-lg shadow-secondary/25"
              >
                <Link href="#courses">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild size="lg" variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 text-base px-8"
              >
                <Link href="#gallery">
                  <Play className="mr-2 h-5 w-5" />
                  See Our Campus
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <stat.icon className="h-5 w-5 text-secondary" />
                    <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                  </div>
                  <span className="text-sm text-white/70">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Course cards ── */}
          <div className="relative hidden lg:block">

            {/* Glow effects */}
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">

              {/* "New Batch" ribbon on the card panel */}
              <div className="flex items-center gap-2 mb-5 px-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
                </span>
                <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">
                  New Batches Now Open
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {courses.map((course, i) => (
                  <div
                    key={course.title + course.subtitle}
                    className={`bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 ${course.offset ? "mt-6" : ""}`}
                  >
                    <div className={`w-11 h-11 ${course.iconBg} rounded-lg flex items-center justify-center mb-3`}>
                      <course.icon className={`h-5 w-5 ${course.iconColor}`} />
                    </div>
                    <h3 className="font-bold text-foreground text-sm leading-tight">{course.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{course.subtitle}</p>
                    <div className="mt-2.5 flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/60 rounded-md px-2 py-1">
                      <Clock className="h-3 w-3 shrink-0" />
                      <span>{course.timing}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Home tuition pill at bottom */}
              <div className="mt-4 flex items-center justify-between bg-white/15 rounded-xl px-4 py-3 border border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Home className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">Home Tuition</p>
                    <p className="text-white/60 text-[10px]">Any Class · Any Subject</p>
                  </div>
                </div>
                <span className="text-white/70 text-[10px] font-medium bg-white/10 px-2 py-1 rounded-full">
                  As per convenience
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  )
}