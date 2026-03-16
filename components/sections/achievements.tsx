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
    title: "Trusted by 5000+ Families",
    description: "Over 5000 students have been part of the Krishna Classes family since we started in 2009.",
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
  { icon: Users, number: "5000+", label: "Students Taught" },
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
    <section id="achievements" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Achievements</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
            Our Journey of Excellence
          </h2>
          <p className="mt-4 text-muted-foreground text-lg text-pretty">
            15 years of quality education, trusted by thousands of families across Kolar, Bhopal.
          </p>
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {milestones.map((milestone) => (
            <div key={milestone.label} className="bg-primary rounded-xl p-6 text-center text-primary-foreground">
              <milestone.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-3xl md:text-4xl font-bold">{milestone.number}</div>
              <div className="text-sm opacity-80 mt-1">{milestone.label}</div>
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                    <achievement.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground shrink-0">
                        {achievement.year}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">Our Journey Through the Years</h3>
          <div className="relative">
            {/* Horizontal line — desktop only */}
            <div className="hidden md:block absolute top-5 left-0 right-0 h-0.5 bg-border" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
              {timeline.map((item, index) => (
                <div key={index} className="relative text-center">
                  <div className="hidden md:flex w-10 h-10 bg-primary rounded-full mx-auto mb-4 relative z-10 items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">{item.year.slice(2)}</span>
                  </div>
                  <div className="bg-card p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-base font-bold text-primary mb-1">{item.year}</div>
                    <div className="text-xs text-muted-foreground leading-snug">{item.event}</div>
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