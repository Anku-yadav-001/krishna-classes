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

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
            Building Futures Through Quality Education
          </h2>
          <p className="mt-4 text-muted-foreground text-lg text-pretty">
            Since 2009, Krishna Classes has been a trusted name in Kolar, Bhopal — helping thousands of students build strong academic foundations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <div>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Krishna Classes was founded with a simple but powerful vision — to make quality coaching accessible to every student in the neighbourhood. Starting with a small batch in 2009, we have grown into one of the most trusted institutes in Kolar, Bhopal, serving students from Class 6 to Class 12 across all major subjects.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We offer structured coaching for IIT-JEE and NEET aspirants, a comprehensive foundation programme for Class 6–10, and a dedicated home tuition service that fits every family's schedule. Our focus has always been on genuine understanding — not just exam results — and on maintaining a close relationship with parents throughout the learning journey.
              </p>
            </div>

            {/* Features */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="relative">
            <div className="bg-muted rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 shadow-sm border">
                  <div className="text-4xl font-bold text-primary">15+</div>
                  <div className="text-muted-foreground text-sm mt-1">Years of Excellence</div>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-sm border">
                  <div className="text-4xl font-bold text-secondary">5000+</div>
                  <div className="text-muted-foreground text-sm mt-1">Students Taught</div>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-sm border">
                  <div className="text-4xl font-bold text-primary">95%</div>
                  <div className="text-muted-foreground text-sm mt-1">Board Result Rate</div>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-sm border">
                  <div className="text-4xl font-bold text-secondary">5★</div>
                  <div className="text-muted-foreground text-sm mt-1">Parent Rating</div>
                </div>
              </div>
            </div>
            {/* Decorative blur */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          </div>

        </div>

        {/* Mission, Vision, Values */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}