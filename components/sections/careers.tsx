"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, Users, Clock, ArrowRight, SearchX, Send } from "lucide-react"
import Link from "next/link"
import { openings } from "@/lib/site-config"

const benefits = [
  { icon: Briefcase, title: "Competitive Salary", description: "Industry-leading compensation packages" },
  { icon: Users, title: "Great Team", description: "Work with passionate educators" },
  { icon: Clock, title: "Work-Life Balance", description: "Flexible working hours" },
]

export function CareersSection() {
  const hasOpenings = openings && openings.length > 0

  return (
    <section id="careers" className="py-14 md:py-24 bg-muted/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Careers</span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Join Our Team
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Be part of our mission to transform education. We are always looking for passionate educators and professionals.
          </p>
        </div>

        {/* Benefits — 1 col mobile, 3 col md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-12">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-center sm:items-start gap-4 bg-card p-4 sm:p-6 rounded-xl border">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">{benefit.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Current Openings heading */}
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-5 sm:mb-6">Current Openings</h3>

        {hasOpenings ? (
          <>
            {/* Job cards — 1 col mobile, 2 col md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {openings.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="text-base sm:text-lg font-bold text-foreground leading-snug">{job.title}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{job.department}</p>
                      </div>
                      <Badge variant="secondary" className="shrink-0 text-xs">{job.type}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                    <p className="text-xs sm:text-sm text-muted-foreground">{job.description}</p>

                    <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                        {job.experience}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground mb-1.5">Requirements:</p>
                      <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                        {job.requirements.map((req: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-secondary mt-0.5 shrink-0">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>

                  <CardFooter className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <Button asChild className="w-full" size="sm">
                      <Link href="#contact">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Open application CTA */}
            <div className="mt-10 md:mt-12 text-center bg-card rounded-xl p-6 sm:p-8 border">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                {"Don't see a perfect match?"}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                {"We're always looking for talented individuals. Send us your resume and we'll get in touch when a suitable position opens."}
              </p>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href="#contact">Submit Open Application</Link>
              </Button>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="bg-card border rounded-2xl px-5 sm:px-6 py-12 sm:py-14 flex flex-col items-center text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mb-4 sm:mb-5">
              <SearchX className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground" />
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
              No Openings Right Now
            </h4>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mb-5 sm:mb-6">
              We don't have any active positions at the moment, but we're always growing. Send us your resume and we'll reach out as soon as a suitable role opens up.
            </p>
            <Button asChild className="w-full sm:w-auto">
              <Link href="#contact">
                <Send className="mr-2 h-4 w-4" />
                Send Your Resume
              </Link>
            </Button>
          </div>
        )}

      </div>
    </section>
  )
}