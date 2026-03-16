"use client"

import { Clock, Calendar, BookOpen, FlaskConical, Calculator, Globe, Home } from "lucide-react"

const batches = [
  {
    course: "Class 11th–12th + IIT-JEE",
    icon: Calculator,
    label: "IIT-JEE",
    timing: "5:30 PM – 7:30 PM",
    days: "Daily (Mon – Sat)",
    subjects: "Physics · Chemistry · Mathematics",
  },
  {
    course: "Class 11th–12th + NEET",
    icon: FlaskConical,
    label: "NEET",
    timing: "5:30 PM – 7:30 PM",
    days: "Daily (Mon – Sat)",
    subjects: "Physics · Chemistry · Biology",
  },
  {
    course: "Class 8th–10th",
    icon: BookOpen,
    label: "Foundation",
    timing: "4:30 PM – 8:00 PM",
    days: "Daily (Mon – Sat)",
    subjects: "Maths · Science · Social Studies · English",
  },
  {
    course: "Class 6th–7th",
    icon: Globe,
    label: "All Subjects",
    timing: "4:30 PM – 6:30 PM",
    days: "Daily (Mon – Sat)",
    subjects: "All Subjects",
  },
  {
    course: "Home Tuition",
    icon: Home,
    label: "Flexible",
    timing: "As per convenience",
    days: "Flexible – Any Day",
    subjects: "Any Class · Any Subject",
  },
]

export function BatchesSection() {
  return (
    <section id="batches" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Batch Timings</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
            Flexible Schedule Options
          </h2>
          <p className="mt-4 text-muted-foreground text-lg text-pretty">
            All batches run Monday to Saturday. Timings can be adjusted as per parent's convenience — just reach out to us.
          </p>
        </div>

        {/* Cards Grid — mirrors faculty card layout */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {batches.map((batch, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow duration-200"
            >
              {/* Blue banner with decorative circles — same as faculty card */}
              <div className="relative bg-primary h-28 flex items-end justify-center pb-0 overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-3 right-4 w-16 h-16 rounded-full bg-white/10" />
                <div className="absolute top-8 right-12 w-8 h-8 rounded-full bg-white/10" />

                {/* Icon circle — sits at the bottom of the banner, half-overlapping */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-primary-foreground/20 border-4 border-card flex items-center justify-center translate-y-8 shadow-md bg-white">
                  <batch.icon className="h-7 w-7 text-primary" />
                </div>
              </div>

              {/* Card body */}
              <div className="pt-10 pb-5 px-5">

                {/* Course name + label row */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-foreground text-base leading-snug">{batch.course}</h3>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                    {batch.label}
                  </span>
                </div>

                {/* Subjects — primary color, like faculty subject */}
                <p className="text-sm font-medium text-primary mb-4">{batch.subjects}</p>

                {/* Timing row */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4 shrink-0 text-primary" />
                  <span className="font-medium text-foreground">{batch.timing}</span>
                </div>

                {/* Schedule row */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4 shrink-0 text-primary" />
                  <span>{batch.days}</span>
                </div>

                {/* Convenience note */}
                <p className="text-xs text-muted-foreground italic border-t border-border pt-3">
                  * Timing can be adjusted as per parent's convenience.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            New batches start every month. Contact us to reserve your seat or schedule a demo class.
          </p>
        </div>

      </div>
    </section>
  )
}