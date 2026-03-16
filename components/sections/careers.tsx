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
    <section id="careers" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Careers</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
            Join Our Team
          </h2>
          <p className="mt-4 text-muted-foreground text-lg text-pretty">
            Be part of our mission to transform education. We are always looking for passionate educators and professionals.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-4 bg-card p-6 rounded-xl border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Current Openings */}
        <h3 className="text-2xl font-bold text-foreground mb-6">Current Openings</h3>

        {hasOpenings ? (
          <div className="grid md:grid-cols-2 gap-6">
            {openings.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-foreground">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.department}</p>
                    </div>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{job.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {job.experience}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Requirements:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-secondary mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="#contact">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          /* ── Empty State ── */
          <div className="bg-card border rounded-2xl px-6 py-14 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-5">
              <SearchX className="h-7 w-7 text-muted-foreground" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-2">
              No Openings Right Now
            </h4>
            <p className="text-muted-foreground max-w-md mb-6">
              We don't have any active positions at the moment, but we're always growing. Send us your resume and we'll reach out as soon as a suitable role opens up.
            </p>
            <Button asChild>
              <Link href="#contact">
                <Send className="mr-2 h-4 w-4" />
                Send Your Resume
              </Link>
            </Button>
          </div>
        )}

        {/* Open Application — only show when there ARE openings */}
        {hasOpenings && (
          <div className="mt-12 text-center bg-card rounded-xl p-8 border">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {"Don't see a perfect match?"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {"We're always looking for talented individuals. Send us your resume and we'll get in touch when a suitable position opens."}
            </p>
            <Button variant="outline" asChild>
              <Link href="#contact">Submit Open Application</Link>
            </Button>
          </div>
        )}

      </div>
    </section>
  )
}