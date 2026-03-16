"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Medal, Star, TrendingUp } from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────
const toppers = [
  {
    name: "Ishika Bagde",
    classLabel: "Class - X",
    percentage: "96%",
    marks: "M-95 | Sc.-94",
    image: "/gallery/photo-2.jpeg",
    highlight: true, // centre / featured
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
  { icon: Trophy, value: "95%", label: "Selection Rate 2024" },
  { icon: Medal, value: "45+", label: "Students in Top 500" },
  { icon: Star, value: "150+", label: "Students in Top 1000" },
  { icon: TrendingUp, value: "98%", label: "Score Improvement" },
]

// ─── Starburst SVG badge ──────────────────────────────────────────────────────
function StarBurst({ percentage }: { percentage: string }) {
  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full drop-shadow-md">
        <polygon
          points="32,2 37,22 56,14 44,30 62,36 44,40 50,60 32,48 14,60 20,40 2,36 20,30 8,14 27,22"
          fill="#DC2626"
          stroke="#fff"
          strokeWidth="1.5"
        />
      </svg>
      <span className="relative z-10 text-white font-extrabold text-sm leading-none">{percentage}</span>
    </div>
  )
}

// ─── Topper card — passport style ────────────────────────────────────────────
function TopperCard({ topper, featured }: { topper: typeof toppers[0]; featured?: boolean }) {
  return (
    <div
      className={`relative flex flex-col items-center rounded-3xl overflow-hidden shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl ${featured
          ? "bg-primary ring-4 ring-secondary ring-offset-2 scale-105 z-10"
          : "bg-card border border-border"
        }`}
    >
      {/* Top accent strip */}
      <div className={`w-full h-1.5 ${featured ? "bg-secondary" : "bg-primary"}`} />

      {/* Class label */}
      <div className={`mt-4 px-4 py-1 rounded-full text-xs font-bold tracking-wide ${featured ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
        {topper.classLabel}
      </div>

      {/* Photo + starburst */}
      <div className="relative mt-4 mb-1">
        {/* Passport photo frame */}
        <div
          className={`relative w-28 h-32 rounded-2xl overflow-hidden border-4 shadow-lg ${featured ? "border-white/40" : "border-primary/20"
            }`}
        >
          <img
            src={topper.image}
            alt={topper.name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Percentage starburst — top-right of photo */}
        <div className="absolute -top-3 -right-4">
          <StarBurst percentage={topper.percentage} />
        </div>
      </div>

      {/* Name + marks pill */}
      <div className={`mx-4 mt-3 mb-5 rounded-xl px-4 py-2 text-center w-[calc(100%-2rem)] ${featured ? "bg-white/15" : "bg-muted"}`}>
        <p className={`font-extrabold text-sm leading-tight ${featured ? "text-white" : "text-foreground"}`}>
          {topper.name}
        </p>
        <p className={`text-xs mt-0.5 font-medium ${featured ? "text-white/70" : "text-muted-foreground"}`}>
          ({topper.marks})
        </p>
      </div>
    </div>
  )
}

// ─── Results Section ──────────────────────────────────────────────────────────
export function ResultsSection() {
  // Sort: highlight card goes in the centre (index 1 of 3)
  const ordered = [
    toppers.find(t => !t.highlight && toppers.indexOf(t) === 1) ?? toppers[1],
    toppers.find(t => t.highlight) ?? toppers[0],
    toppers.find(t => !t.highlight && toppers.indexOf(t) === 2) ?? toppers[2],
  ]

  return (
    <section id="results" className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Results</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
            Celebrating Student Success
          </h2>
          <p className="mt-4 text-muted-foreground text-lg text-pretty">
            Our students consistently achieve outstanding results, making Krishna Classes proud year after year.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {resultsStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center bg-muted/50 border rounded-2xl py-5 px-3 hover:border-primary/30 hover:shadow-md transition-all duration-200"
            >
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-3xl font-extrabold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground mt-1 leading-snug">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Toppers heading */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">Our Star Performers</h3>
          <p className="text-muted-foreground mt-2 text-sm">Board Exam Toppers · Krishna Classes</p>
        </div>

        {/* Topper cards — centre is featured */}
        <div className="flex flex-col sm:flex-row items-end justify-center gap-6 sm:gap-4 md:gap-8">
          {ordered.map((topper, i) => (
            <div key={topper.name} className={`w-full sm:w-48 md:w-52 ${i === 1 ? "" : "sm:mb-6"}`}>
              <TopperCard topper={topper} featured={topper.highlight} />
            </div>
          ))}
        </div>

        {/* Decorative footnote */}
        <p className="text-center text-xs text-muted-foreground mt-10">
          Results shown are from CBSE / MP Board examinations · Krishna Classes, Kolar Road, Bhopal
        </p>

      </div>
    </section>
  )
}