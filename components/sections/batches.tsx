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
    <section id="batches" className="py-14 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Batch Timings</span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Flexible Schedule Options
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            All batches run Monday to Saturday. Timings can be adjusted as per parent's convenience — just reach out to us.
          </p>
        </div>

        {/* Grid: 1 col mobile → 2 col md → 3 col xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {batches.map((batch, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow duration-200"
            >
              {/* Blue banner */}
              <div className="relative bg-primary h-24 sm:h-28 flex items-end justify-center overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-3 right-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 pointer-events-none" />
                <div className="absolute top-7 right-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 pointer-events-none" />

                {/* Icon bubble — half-overlaps into card body */}
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-card flex items-center justify-center translate-y-7 sm:translate-y-8 shadow-md bg-white shrink-0">
                  <batch.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
              </div>

              {/* Card body */}
              <div className="pt-9 sm:pt-10 pb-5 px-4 sm:px-5">

                {/* Course name + label */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-foreground text-sm sm:text-base leading-snug">
                    {batch.course}
                  </h3>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                    {batch.label}
                  </span>
                </div>

                {/* Subjects */}
                <p className="text-xs sm:text-sm font-medium text-primary mb-4 leading-snug">
                  {batch.subjects}
                </p>

                {/* Timing */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary" />
                  <span className="font-medium text-foreground text-xs sm:text-sm">{batch.timing}</span>
                </div>

                {/* Schedule */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary" />
                  <span className="text-xs sm:text-sm">{batch.days}</span>
                </div>

                <p className="text-xs text-muted-foreground italic border-t border-border pt-3">
                  * Timing can be adjusted as per parent's convenience.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-8 text-center px-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            New batches start every month. Contact us to reserve your seat or schedule a demo class.
          </p>
        </div>

      </div>
    </section>
  )
}