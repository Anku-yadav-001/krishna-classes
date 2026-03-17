"use client"

import { CheckCircle, Target, Eye, Heart } from "lucide-react"

const features = [
  "Experienced faculty with subject expertise",
  "Personalised attention with small batch sizes",
  "Comprehensive study material provided",
  "Regular parent-teacher meetings (PTM)",
  "Dedicated doubt clearing sessions",
  "Weekly tests and performance tracking",
]

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To provide affordable, quality education that empowers every student — from Class 6 to 12 — to build strong fundamentals and achieve their academic goals.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "To be the most trusted coaching institute and home tuition provider in Kolar, Bhopal — nurturing confident, capable students year after year.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Integrity, student-first approach, regular communication with parents, continuous improvement, and genuine commitment to every student's growth.",
  },
]

const stats = [
  { value: "15+", label: "Years of Excellence", color: "text-primary" },
  { value: "1000+", label: "Students Taught", color: "text-secondary" },
  { value: "100%", label: "Board Result Rate", color: "text-primary" },
  { value: "5★", label: "Parent Rating", color: "text-secondary" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-14 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Building Futures Through Quality Education
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Since 2009, Krishna Classes has been a trusted name in Kolar, Bhopal — helping thousands of students build strong academic foundations.
          </p>
        </div>

        {/* Main two-col grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Left: Content */}
          <div>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Krishna Classes was founded with a simple but powerful vision — to make quality coaching accessible to every student in the neighbourhood. Starting with a small batch in 2009, we have grown into one of the most trusted institutes in Kolar, Bhopal, serving students from Class 6 to Class 12 across all major subjects.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                We offer structured coaching for IIT-JEE and NEET aspirants, a comprehensive foundation programme for Class 6–10, and a dedicated home tuition service that fits every family's schedule.
              </p>
            </div>

            {/* Features — 1 col on mobile, 2 on sm+ */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          {/* overflow-hidden on wrapper so the blur doesn't escape */}
          <div className="relative">
            <div className="bg-muted rounded-2xl p-5 sm:p-8 md:p-10">
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border">
                    {/* Fluid font size so "1000+" never overflows on small screens */}
                    <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${stat.color} leading-tight`}>
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-xs sm:text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative blur — kept inside overflow-hidden parent */}
            <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          </div>

        </div>

        {/* Mission, Vision, Values — 1 col mobile, 3 col md+ */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-card rounded-xl p-5 sm:p-6 border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}