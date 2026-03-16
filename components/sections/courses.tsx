"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { siteConfig } from "@/lib/site-config"
import {
  Clock, Users, BookOpen, ArrowRight, Sparkles,
  Calculator, FlaskConical, Globe, Home, Star,
} from "lucide-react"
import Link from "next/link"

const mainCourses = [
  {
    id: "jee",
    icon: Calculator,
    title: "Class 11th–12th + IIT-JEE",
    subtitle: "For Class 11 & 12 Students",
    description: "Comprehensive preparation for JEE Main & Advanced with in-depth coverage of Physics, Chemistry, and Mathematics.",
    features: ["Complete PCM syllabus coverage", "Daily practice problems", "Weekly mock tests", "Doubt clearing sessions", "Previous year paper analysis"],
    timing: "5:30 PM – 7:30 PM · Mon–Sat",
    batchSize: "30 Students",
    subjects: "Physics · Chemistry · Maths",
    price: siteConfig.coursePricing.jee.regular,
    popular: true,
  },
  {
    id: "neet",
    icon: FlaskConical,
    title: "Class 11th–12th + NEET",
    subtitle: "For Class 11 & 12 Students",
    description: "Expert coaching for NEET-UG with focus on Biology, Physics, and Chemistry for medical aspirants.",
    features: ["NCERT-focused teaching", "Biology special sessions", "All India test series", "Revision modules", "Interview preparation"],
    timing: "5:30 PM – 7:30 PM · Mon–Sat",
    batchSize: "30 Students",
    subjects: "Physics · Chemistry · Biology",
    price: siteConfig.coursePricing.neet.regular,
    popular: true,
  },
  {
    id: "foundation",
    icon: BookOpen,
    title: "Class 8th–10th",
    subtitle: "Foundation · Class 8, 9 & 10",
    description: "Build a strong foundation with complete board exam preparation and competitive exam basics.",
    features: ["Board exam preparation", "Maths · Science · SST · English", "Conceptual clarity focus", "Regular assessments", "Parent-teacher meetings"],
    timing: "4:30 PM – 8:00 PM · Mon–Sat",
    batchSize: "25 Students",
    subjects: "Maths · Science · SST · English",
    price: siteConfig.coursePricing.foundation.regular,
    popular: true,
  },
]

const juniorSubjects = [
  { name: "Mathematics", desc: "Number systems, algebra basics, geometry & mensuration" },
  { name: "Science", desc: "Physics, Chemistry & Biology concepts made easy" },
  { name: "Social Studies", desc: "History, Geography, Civics & Economics" },
  { name: "English", desc: "Grammar, comprehension, writing & spoken skills" },
  { name: "Hindi", desc: "Vyakaran, lekhan & sahitya" },
  { name: "Sanskrit", desc: "Basic grammar and translation" },
]

export function CoursesSection() {
  const activeOffer = siteConfig.offers.find((offer: any) => offer.active)

  const getDiscountedPrice = (courseId: string, originalPrice: number) => {
    if (!activeOffer || originalPrice === 0) return null
    if (activeOffer.appliesTo.includes("all") || activeOffer.appliesTo.includes(courseId)) {
      const match = activeOffer.discount.match(/(\d+)%/)
      if (match) return Math.round(originalPrice * (1 - parseInt(match[1]) / 100))
    }
    return null
  }

  return (
    <section id="courses" className="py-14 md:py-24 bg-muted/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Courses</span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Programs Designed for Success
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Choose from our expertly crafted courses tailored to help you achieve your academic goals.
          </p>
        </div>

        {/* Offer banner */}
        {activeOffer && (
          <div className="mb-7 bg-gradient-to-r from-secondary/10 via-secondary/5 to-secondary/10 rounded-xl p-4 border border-secondary/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <div className="bg-secondary rounded-full p-2 shrink-0">
                  <Sparkles className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm sm:text-base">{activeOffer.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{activeOffer.description}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-sm px-3 py-1 shrink-0">Code: {activeOffer.code}</Badge>
            </div>
          </div>
        )}

        {/* ── 1. Top 3 course cards: JEE · NEET · Foundation (8–10) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mainCourses.map((course) => {
            const discountedPrice = getDiscountedPrice(course.id, course.price)
            const Icon = course.icon
            return (
              <Card
                key={course.id}
                className={`relative overflow-hidden transition-all hover:shadow-lg flex flex-col ${course.popular ? "ring-2 ring-secondary" : ""
                  }`}
              >
                {course.popular && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-secondary text-secondary-foreground text-xs">Popular</Badge>
                  </div>
                )}
                <CardHeader className="pb-3 pt-4 px-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug pr-14">{course.title}</h3>
                  <p className="text-xs text-muted-foreground">{course.subtitle}</p>
                </CardHeader>
                <CardContent className="space-y-3 flex-1 px-4">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{course.description}</p>
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-start gap-1.5"><Clock className="h-3.5 w-3.5 shrink-0 mt-0.5" /><span>{course.timing}</span></div>
                    <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 shrink-0" /><span>{course.batchSize}</span></div>
                    <div className="flex items-start gap-1.5"><BookOpen className="h-3.5 w-3.5 shrink-0 mt-0.5" /><span>{course.subjects}</span></div>
                  </div>
                  <ul className="space-y-1.5">
                    {course.features.slice(0, 3).map((f) => (
                      <li key={f} className="text-xs sm:text-sm text-foreground flex items-start gap-2">
                        <span className="text-secondary mt-0.5 shrink-0">•</span>{f}
                      </li>
                    ))}
                  </ul>
                  {course.price > 0 && (
                    <div className="pt-1">
                      {discountedPrice ? (
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-foreground">₹{discountedPrice.toLocaleString()}</span>
                            <span className="text-xs sm:text-sm text-muted-foreground line-through">₹{course.price.toLocaleString()}</span>
                          </div>
                          <span className="text-xs text-muted-foreground block mt-0.5">per year</span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-xl sm:text-2xl font-bold text-foreground">₹{course.price.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground block mt-0.5">per year</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="px-4 pb-4">
                  <Button asChild className="w-full" size="sm">
                    <Link href="#contact">Enroll Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* ── 2. Junior Segment (Class 6–7) — right after Class 8–10 ── */}
        <div id="junior-courses" className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl bg-primary overflow-hidden">
          <div className="grid lg:grid-cols-2">

            {/* Left — programme info */}
            <div className="p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">Class 6th–7th · Junior Programme</h3>
                    <p className="text-white/70 text-sm">All School Subjects</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: "Batch Timing", value: "4:30 – 6:30 PM" },
                    { label: "Schedule", value: "Mon – Sat" },
                    { label: "Batch Size", value: "25 Students" },
                    { label: "Duration", value: "1 Academic Year" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/10 rounded-xl p-3">
                      <p className="text-white/55 text-xs mb-0.5">{item.label}</p>
                      <p className="text-white font-semibold text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mb-6">
                  {[
                    "All school subjects covered",
                    "CBSE · MP Board · ICSE aligned",
                    "Regular tests & progress reports",
                    "Parent–Teacher meetings",
                    "Timing adjustable as per convenience",
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center shrink-0">
                        <Star className="h-3 w-3 text-secondary" />
                      </div>
                      <span className="text-white/85 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold h-11">
                  <Link href="#contact">Enroll in Junior Programme <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>

            {/* Right — subjects grid */}
            <div className="bg-white/5 p-6 sm:p-8">
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">Subjects Covered</h3>
              <p className="text-white/60 text-sm mb-5">
                All major school subjects taught with a focus on clarity, practice, and exam readiness.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {juniorSubjects.map((subject, idx) => (
                  <div key={subject.name} className="bg-white/10 rounded-xl p-3 hover:bg-white/15 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-white text-xs font-extrabold">{String(idx + 1).padStart(2, "0")}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{subject.name}</h4>
                        <p className="text-white/60 text-xs mt-0.5 leading-snug">{subject.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-2 bg-white/10 rounded-xl px-3 py-2.5">
                <Clock className="h-3.5 w-3.5 text-white/70 mt-0.5 shrink-0" />
                <p className="text-xs text-white/70">
                  <span className="font-semibold text-white">Batch Timing: </span>
                  4:30 PM – 6:30 PM, Mon–Sat.{" "}
                  <span className="italic">Adjustable as per parent's convenience.</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ── 3. Home Tuition ──
            Mobile/sm: compact card matching the top 3 cards style
            lg+:       wide 4-col banner layout  */}
        <div className="mt-6 sm:mt-8">

          {/* Mobile card (hidden on lg+) */}
          <Card className="lg:hidden overflow-hidden transition-all hover:shadow-lg flex flex-col">
            <CardHeader className="pb-3 pt-4 px-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Home className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">Home Tuition</h3>
              <p className="text-xs text-muted-foreground">Any Class · Any Subject</p>
            </CardHeader>
            <CardContent className="space-y-3 flex-1 px-4">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Personalised one-on-one or small-group home tuition for any class and any subject, scheduled as per the family's convenience.
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 shrink-0" /><span>As per convenience</span></div>
                <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 shrink-0" /><span>Flexible batch size</span></div>
                <div className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5 shrink-0" /><span>All Subjects</span></div>
              </div>
              <ul className="space-y-1.5">
                {["Any class from 1st to 12th", "Any subject covered", "Flexible batch timings", "At your home or online", "Personalised attention"].map((f) => (
                  <li key={f} className="text-xs sm:text-sm text-foreground flex items-start gap-2">
                    <span className="text-secondary mt-0.5 shrink-0">•</span>{f}
                  </li>
                ))}
              </ul>
              <div className="pt-1">
                <span className="text-xl sm:text-2xl font-bold text-foreground">₹4,000 – ₹8,000</span>
                <span className="text-xs text-muted-foreground block mt-0.5">per month</span>
              </div>
            </CardContent>
            <CardFooter className="px-4 pb-4">
              <Button asChild className="w-full" size="sm" variant="outline">
                <Link href="#contact">Enroll Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Desktop wide banner (hidden below lg) */}
          <Card className="hidden lg:block overflow-hidden transition-all hover:shadow-lg">
            <div className="grid lg:grid-cols-4 divide-x divide-border">
              <div className="p-5 flex flex-col justify-center">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Home Tuition</h3>
                <p className="text-xs text-muted-foreground mt-0.5 mb-3">Any Class · Any Subject</p>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 shrink-0" /><span>As per convenience</span></div>
                  <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 shrink-0" /><span>Flexible batch size</span></div>
                  <div className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5 shrink-0" /><span>All Subjects</span></div>
                </div>
              </div>
              <div className="p-5 flex items-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Personalised one-on-one or small-group home tuition for any class and any subject, scheduled as per the family's convenience.
                </p>
              </div>
              <div className="p-5 flex items-center">
                <ul className="space-y-1.5 w-full">
                  {["Any class from 1st to 12th", "Any subject covered", "Flexible batch timings", "At your home or online", "Personalised attention"].map((f) => (
                    <li key={f} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-secondary mt-0.5 shrink-0">•</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 flex flex-col justify-center gap-3">
                <div>
                  <span className="text-2xl font-bold text-foreground">₹4,000 – ₹8,000</span>
                  <span className="text-xs text-muted-foreground block mt-0.5">per month</span>
                </div>
                <Button asChild className="w-full" size="sm" variant="outline">
                  <Link href="#contact">Enroll Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </Card>

        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm sm:text-base mb-4">
            Need help choosing the right course? Talk to our counselors.
          </p>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="#contact">
              Get Free Counseling
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  )
}