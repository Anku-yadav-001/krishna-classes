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

// ─── Senior courses (Class 8–12) ─────────────────────────────────────────────
const seniorCourses = [
  {
    id: "jee",
    icon: Calculator,
    title: "Class 11th–12th + IIT-JEE",
    subtitle: "For Class 11 & 12 Students",
    description: "Comprehensive preparation for JEE Main & Advanced with in-depth coverage of Physics, Chemistry, and Mathematics.",
    features: [
      "Complete PCM syllabus coverage",
      "Daily practice problems",
      "Weekly mock tests",
      "Doubt clearing sessions",
      "Previous year paper analysis",
    ],
    timing: "5:30 PM – 7:30 PM · Daily (Mon–Sat)",
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
    features: [
      "NCERT-focused teaching",
      "Biology special sessions",
      "All India test series",
      "Revision modules",
      "Interview preparation",
    ],
    timing: "5:30 PM – 7:30 PM · Daily (Mon–Sat)",
    batchSize: "30 Students",
    subjects: "Physics · Chemistry · Biology",
    price: siteConfig.coursePricing.neet.regular,
    popular: true,
  },
  {
    id: "foundation",
    icon: BookOpen,
    title: "Class 8th–10th",
    subtitle: "Foundation · For Class 8, 9 & 10",
    description: "Build a strong foundation with complete board exam preparation and competitive exam basics for Maths, Science, Social Studies and English.",
    features: [
      "Board exam preparation",
      "Maths · Science · SST · English",
      "Conceptual clarity focus",
      "Regular assessments",
      "Parent-teacher meetings",
    ],
    timing: "4:30 PM – 8:00 PM · Daily (Mon–Sat)",
    batchSize: "25 Students",
    subjects: "Maths · Science · SST · English",
    price: siteConfig.coursePricing.foundation.regular,
    popular: true,
  },
  {
    id: "home-tuition",
    icon: Home,
    title: "Home Tuition",
    subtitle: "Any Class · Any Subject",
    description: "Personalised one-on-one or small-group home tuition for any class and any subject, scheduled as per parent's convenience.",
    features: [
      "Any class from 1st to 12th",
      "Any subject covered",
      "Flexible batch timings",
      "At your home or online",
      "Personalised attention",
    ],
    timing: "As per parent's convenience",
    batchSize: "Flexible",
    subjects: "All Subjects",
    price: siteConfig.coursePricing.homeTuition?.regular ?? 0,
    popular: false,
  },
]

// ─── Junior courses (Class 6–7) ───────────────────────────────────────────────
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
      if (match) {
        return Math.round(originalPrice * (1 - parseInt(match[1]) / 100))
      }
    }
    return null
  }

  return (
    <>
      {/* ════════════════════════════════════════════════════
          SECTION 1 — Senior Courses (Class 8–12)
      ════════════════════════════════════════════════════ */}
      <section id="courses" className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Courses</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
              Programs Designed for Success
            </h2>
            <p className="mt-4 text-muted-foreground text-lg text-pretty">
              Choose from our expertly crafted courses tailored to help you achieve your academic goals.
            </p>
          </div>

          {/* Active offer banner */}
          {activeOffer && (
            <div className="mb-8 bg-gradient-to-r from-secondary/10 via-secondary/5 to-secondary/10 rounded-xl p-4 md:p-6 border border-secondary/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary rounded-full p-2">
                    <Sparkles className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{activeOffer.name}</p>
                    <p className="text-sm text-muted-foreground">{activeOffer.description}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-base px-4 py-1">
                  Code: {activeOffer.code}
                </Badge>
              </div>
            </div>
          )}

          {/* Courses grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seniorCourses.map((course) => {
              const discountedPrice = getDiscountedPrice(course.id, course.price)
              const Icon = course.icon

              return (
                <Card
                  key={course.id}
                  className={`relative overflow-hidden transition-all hover:shadow-lg flex flex-col ${course.popular ? "ring-2 ring-secondary" : ""
                    }`}
                >
                  {course.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-secondary text-secondary-foreground">Popular</Badge>
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-snug pr-16">{course.title}</h3>
                    <p className="text-xs text-muted-foreground">{course.subtitle}</p>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>

                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        <span>{course.timing}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 shrink-0" />
                        <span>{course.batchSize}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 shrink-0" />
                        <span>{course.subjects}</span>
                      </div>
                    </div>

                    <ul className="space-y-1.5">
                      {course.features.slice(0, 3).map((f) => (
                        <li key={f} className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-secondary mt-0.5 shrink-0">•</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {course.price > 0 && (
                      <div className="pt-2">
                        {discountedPrice ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-foreground">
                              ₹{discountedPrice.toLocaleString()}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{course.price.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-2xl font-bold text-foreground">
                            ₹{course.price.toLocaleString()}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground block mt-0.5">per year</span>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter>
                    <Button asChild className="w-full" variant={course.popular ? "default" : "outline"}>
                      <Link href="#contact">
                        Enroll Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Need help choosing the right course? Talk to our counselors.</p>
            <Button asChild variant="outline" size="lg">
              <Link href="#contact">
                Get Free Counseling
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 2 — Junior Segment (Class 6th–7th)
      ════════════════════════════════════════════════════ */}
      <section id="junior-courses" className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Junior Segment</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
              Class 6th–7th · All Subjects
            </h2>
            <p className="mt-4 text-muted-foreground text-lg text-pretty">
              A dedicated programme for junior students to build strong conceptual basics across all school subjects — the right foundation for a brilliant future.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Left — details card */}
            <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden">
              {/* decorative circles */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Junior Programme</h3>
                    <p className="text-white/70 text-sm">Class 6th & 7th</p>
                  </div>
                </div>

                {/* Batch info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Batch Timing", value: "4:30 – 6:30 PM" },
                    { label: "Schedule", value: "Mon – Sat · Daily" },
                    { label: "Batch Size", value: "25 Students" },
                    { label: "Duration", value: "1 Academic Year" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/10 rounded-xl p-3">
                      <p className="text-white/55 text-xs mb-0.5">{item.label}</p>
                      <p className="text-white font-semibold text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-2.5 mb-8">
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

                <Button
                  asChild
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold h-12"
                >
                  <Link href="#contact">
                    Enroll in Junior Programme
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right — subjects grid */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Subjects Covered</h3>
              <p className="text-muted-foreground text-sm mb-6">
                All major school subjects are taught by experienced teachers with a focus on clarity, practice, and exam readiness.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {juniorSubjects.map((subject, idx) => (
                  <div
                    key={subject.name}
                    className="group bg-card border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/15 transition-colors">
                        <span className="text-primary text-xs font-extrabold">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm">{subject.name}</h4>
                        <p className="text-muted-foreground text-xs mt-0.5 leading-snug">{subject.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timing note */}
              <div className="mt-6 flex items-start gap-3 bg-muted/50 rounded-xl px-4 py-3 border">
                <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Batch Timing: </span>
                  4:30 PM – 6:30 PM, Monday to Saturday.{" "}
                  <span className="italic">Timing can be adjusted as per parent's convenience.</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}