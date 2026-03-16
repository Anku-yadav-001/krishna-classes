"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Users, BookOpen, Star, Heart, Home, CheckCircle, Clock } from "lucide-react"

const achievements = [
  {
    icon: Star,
    title: "5-Star Parent Ratings",
    description: "Consistently rated 5 stars by parents and students for quality teaching and personal attention.",
    year: "2024",
  },
  {
    icon: CheckCircle,
    title: "95%+ Board Results",
    description: "Students from our foundation batches have achieved 90%+ in CBSE and MP Board examinations.",
    year: "2024",
  },
  {
    icon: Heart,
    title: "Trusted by 1000+ Families",
    description: "Over 1000 students have been part of the Krishna Classes family since we started in 2009.",
    year: "Since 2009",
  },
  {
    icon: Home,
    title: "Home Tuition Network",
    description: "One of the most trusted home tuition providers in Kolar, Bhopal — any class, any subject.",
    year: "2024",
  },
  {
    icon: Users,
    title: "Dedicated Faculty",
    description: "Experienced and passionate teachers committed to making every student understand, not just memorise.",
    year: "Ongoing",
  },
  {
    icon: Clock,
    title: "15+ Years of Service",
    description: "Serving the Kolar community since 2009 with consistent quality and affordable education.",
    year: "2009–2024",
  },
]

const milestones = [
  { icon: Users, number: "1000+", label: "Students Taught" },
  { icon: Trophy, number: "95%", label: "Board Result Rate" },
  { icon: BookOpen, number: "15+", label: "Years of Service" },
  { icon: Star, number: "5★", label: "Parent Rating" },
]

const timeline = [
  { year: "2009", event: "Founded with a small batch of 30 students in Kolar, Bhopal" },
  { year: "2012", event: "Crossed 200 students · Launched home tuition service" },
  { year: "2015", event: "Introduced Class 6–10 Foundation programme" },
  { year: "2018", event: "Expanded to IIT-JEE & NEET coaching batches" },
  { year: "2024", event: "1000+ students milestone · 15 years of excellence" },
]

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-14 md:py-24 bg-muted/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Achievements</span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Our Journey of Excellence
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            15 years of quality education, trusted by thousands of families across Kolar, Bhopal.
          </p>
        </div>

        {/* Milestones — 2×2 on mobile, 4-col on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 md:mb-12">
          {milestones.map((milestone) => (
            <div key={milestone.label} className="bg-primary rounded-xl p-4 sm:p-6 text-center text-primary-foreground">
              <milestone.icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 opacity-80" />
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">{milestone.number}</div>
              <div className="text-xs sm:text-sm opacity-80 mt-1">{milestone.label}</div>
            </div>
          ))}
        </div>

        {/* Achievements Grid — 1 col mobile, 2 col md, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {achievements.map((achievement, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                    <achievement.icon className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-foreground text-sm sm:text-base">{achievement.title}</h3>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground shrink-0">
                        {achievement.year}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-12 md:mt-16">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-6 md:mb-8">
            Our Journey Through the Years
          </h3>

          <div className="relative">
            {/* Horizontal connector line — desktop only */}
            <div className="hidden md:block absolute top-5 left-0 right-0 h-0.5 bg-border" />

            {/* Mobile: vertical timeline — Desktop: horizontal 5-col grid */}
            <div className="flex flex-col gap-3 md:grid md:grid-cols-5 md:gap-4">
              {timeline.map((item, index) => (
                <div key={index} className="relative md:text-center">

                  {/* Mobile: left-rail dot + line */}
                  <div className="flex items-start gap-3 md:block">
                    <div className="flex flex-col items-center md:hidden shrink-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                        <span className="text-primary-foreground text-xs font-bold">{item.year.slice(2)}</span>
                      </div>
                      {/* Vertical connector — not on last item */}
                      {index < timeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border mt-1 min-h-[1.5rem]" />
                      )}
                    </div>

                    {/* Desktop: dot above card */}
                    <div className="hidden md:flex w-10 h-10 bg-primary rounded-full mx-auto mb-4 relative z-10 items-center justify-center">
                      <span className="text-primary-foreground text-xs font-bold">{item.year.slice(2)}</span>
                    </div>

                    {/* Card */}
                    <div className="bg-card p-3 sm:p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow flex-1 md:flex-none">
                      <div className="text-sm sm:text-base font-bold text-primary mb-1">{item.year}</div>
                      <div className="text-xs text-muted-foreground leading-snug">{item.event}</div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}