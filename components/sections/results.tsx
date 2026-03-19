"use client"

import { useRef, useEffect } from "react"
import { Trophy, Medal, Star, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Confetti, ConfettiRef } from "../ui/confetti"
import { Marquee } from "../ui/marquee"

const toppers = [
  {
    name: "Ishika Bagde",
    classLabel: "Class - X",
    percentage: "96%",
    marks: "M-95 | Sc.-94",
    image: "/gallery/photo-2.jpeg",
    highlight: true,
  },
  {
    name: "Yash Arora",
    classLabel: "Class - X",
    percentage: "90%",
    marks: "M-94 | Sc.-90",
    image: "/gallery/photo-1.jpeg",
    highlight: false,
  },
  {
    name: "Khushi Malik",
    classLabel: "Class - X",
    percentage: "88%",
    marks: "M-87 | Sc.-82",
    image: "/gallery/photo-4.jpeg",
    highlight: false,
  },
  // Duplicated so the marquee feels continuous with few cards
  {
    name: "Ishika Bagde",
    classLabel: "Class - X",
    percentage: "96%",
    marks: "M-95 | Sc.-94",
    image: "/gallery/photo-2.jpeg",
    highlight: true,
  },
  {
    name: "Yash Arora",
    classLabel: "Class - X",
    percentage: "90%",
    marks: "M-94 | Sc.-90",
    image: "/gallery/photo-1.jpeg",
    highlight: false,
  },
  {
    name: "Khushi Malik",
    classLabel: "Class - X",
    percentage: "88%",
    marks: "M-87 | Sc.-82",
    image: "/gallery/photo-4.jpeg",
    highlight: false,
  },
]

const resultsStats = [
  { icon: Trophy, value: "100%", label: "Selection Rate 2025" },
  { icon: Medal, value: "45+", label: "Students Among Top Board Performers" },
  { icon: Star, value: "150+", label: "Students Among Leading Board Achievers" },
  { icon: TrendingUp, value: "100%", label: "Score Improvement" },
]

/* ─────────────────────── Sub-components ─────────────────────── */

function StarBurst({ percentage }: { percentage: string }) {
  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full drop-shadow-md">
        <polygon
          points="32,2 37,22 56,14 44,30 62,36 44,40 50,60 32,48 14,60 20,40 2,36 20,30 8,14 27,22"
          fill="#DC2626"
          stroke="#fff"
          strokeWidth="1.5"
        />
      </svg>
      <span className="relative z-10 text-white font-extrabold text-xs leading-none">
        {percentage}
      </span>
    </div>
  )
}

function TopperCard({ topper }: { topper: (typeof toppers)[0] }) {
  const featured = topper.highlight
  return (
    <figure
      className={cn(
        "relative flex flex-col items-center rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg",
        "w-48 sm:w-52 shrink-0 mx-[1px] sm:mx-1",
        "transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl",
        featured
          ? "bg-primary ring-2 ring-secondary ring-offset-2"
          : "bg-card border border-border"
      )}
    >
      {/* Top accent strip */}
      <div className={`w-full h-1.5 ${featured ? "bg-secondary" : "bg-primary"}`} />

      {/* Class label */}
      <div
        className={cn(
          "mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide",
          featured ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
        )}
      >
        {topper.classLabel}
      </div>

      {/* Photo + starburst */}
      <div className="relative mt-2 mb-1 px-2 w-full flex justify-center">
        <div
          className={cn(
            "relative w-full rounded-lg overflow-hidden border-2 shadow-lg",
            featured ? "border-white/40" : "border-primary/20"
          )}
          style={{
            maxWidth: "108px",
            height: "calc(108px * (4 / 3) + 4px)",
          }}
        >
          <img
            src={topper.image}
            alt={topper.name}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 5%" }}
          />
        </div>
        <div className="absolute -top-2 right-1">
          <StarBurst percentage={topper.percentage} />
        </div>
      </div>

      {/* Name + marks */}
      <div
        className={cn(
          "mx-2 mt-1.5 mb-3 rounded-xl px-2 py-2 text-center w-[calc(100%-1rem)]",
          featured ? "bg-white/15" : "bg-muted"
        )}
      >
        <p
          className={cn(
            "font-extrabold text-[11px] sm:text-xs leading-tight",
            featured ? "text-white" : "text-foreground"
          )}
        >
          {topper.name}
        </p>
        <p
          className={cn(
            "text-[10px] mt-0.5 font-medium",
            featured ? "text-white/70" : "text-muted-foreground"
          )}
        >
          ({topper.marks})
        </p>
      </div>
    </figure>
  )
}

/* ─────────────────────── Main Section ─────────────────────── */

export function ResultsSection() {
  const confettiRef = useRef<ConfettiRef>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const firedRef = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !firedRef.current) {
          firedRef.current = true
          setTimeout(() => {
            confettiRef.current?.fire({
              particleCount: 120,
              spread: 90,
              origin: { y: 0.5 },
            })
          }, 400)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative py-14 md:py-24 bg-background overflow-hidden"
    >
      {/* Confetti canvas */}
      <Confetti
        ref={confettiRef}
        className="pointer-events-none absolute inset-0 z-20 size-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Our Results
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Celebrating Student Success
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Our students consistently achieve outstanding results, making Krishna Classes proud
            year after year.
          </p>
        </div>

        {/* ── Stats Grid — original 2×2 mobile / 4-col desktop ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 md:mb-16">
          {resultsStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center bg-muted/50 border rounded-2xl py-4 sm:py-5 px-2 sm:px-3 hover:border-primary/30 hover:shadow-md transition-all duration-200"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-2 sm:mb-3">
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground mt-1 leading-snug">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── Star Performers Heading ── */}
        <div className="text-center mb-8 md:mb-10">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            Our Star Performers
          </h3>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Board Exam Toppers · Krishna Classes
          </p>
        </div>

        {/* ── Topper Cards — single-row marquee ── */}
        <div className="relative flex w-full items-center overflow-hidden py-2">
          <Marquee pauseOnHover className="[--duration:18s]">
            {toppers.map((topper, i) => (
              <TopperCard key={`${topper.name}-${i}`} topper={topper} />
            ))}
          </Marquee>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent" />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 px-4">
          Results shown are from CBSE / MP Board examinations · Krishna Classes, Kolar Road, Bhopal
        </p>

      </div>
    </section>
  )
}