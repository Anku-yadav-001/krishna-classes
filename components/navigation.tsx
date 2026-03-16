"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Phone, Mail, GraduationCap, Clock, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { siteConfig } from "@/lib/site-config"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#courses", label: "Courses" },
  { href: "#results", label: "Results" },
  { href: "#faculty", label: "Faculty" },
  { href: "#batches", label: "Batch Timings" },
  { href: "#achievements", label: "Achievements" },
  { href: "#reviews", label: "Reviews" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQs" },
  { href: "#careers", label: "Careers" },
  { href: "#contact", label: "Contact" },
]

// ─── Weekly schedule ──────────────────────────────────────────────────────────
const weeklyHours = [
  { day: "Monday", hours: "10:30 AM – 9:30 PM", open: true },
  { day: "Tuesday", hours: "10:30 AM – 9:30 PM", open: true },
  { day: "Wednesday", hours: "10:30 AM – 9:30 PM", open: true },
  { day: "Thursday", hours: "10:30 AM – 9:30 PM", open: true },
  { day: "Friday", hours: "10:30 AM – 9:30 PM", open: true },
  { day: "Saturday", hours: "10:30 AM – 9:30 PM", open: true },
  { day: "Sunday", hours: "Closed", open: false },
]

// Map JS getDay() (0=Sun … 6=Sat) to our array index
const todayIndex = (() => {
  const d = new Date().getDay() // 0=Sun
  return d === 0 ? 6 : d - 1   // Sun→6, Mon→0 … Sat→5
})()

// ─── Hours Dropdown ───────────────────────────────────────────────────────────
function HoursDropdown() {
  const [open, setOpen] = useState(false)
  const today = weeklyHours[todayIndex]

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity focus:outline-none">
        <Clock className="h-4 w-4 shrink-0" />
        <span>
          {today.open ? (
            <>
              <span className="font-semibold">Open Today</span>
              <span className="opacity-75"> · {today.hours}</span>
            </>
          ) : (
            <span className="font-semibold text-red-300">Closed Today (Sunday)</span>
          )}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute right-0 top-full mt-2 z-50 w-64 rounded-xl bg-card border border-border shadow-xl overflow-hidden transition-all duration-200 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
          }`}
      >
        {/* Header */}
        <div className="bg-primary px-4 py-3">
          <p className="text-primary-foreground text-xs font-semibold uppercase tracking-wider">
            Weekly Hours
          </p>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          {weeklyHours.map((item, idx) => {
            const isToday = idx === todayIndex
            return (
              <div
                key={item.day}
                className={`flex items-center justify-between px-4 py-2.5 text-sm ${isToday ? "bg-primary/5" : ""
                  }`}
              >
                <div className="flex items-center gap-2">
                  {isToday && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  )}
                  <span
                    className={`font-medium ${isToday ? "text-primary" : "text-foreground"
                      }`}
                  >
                    {item.day}
                    {isToday && (
                      <span className="ml-1.5 text-[10px] font-semibold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </span>
                </div>
                <span
                  className={`text-xs font-medium ${item.open ? "text-muted-foreground" : "text-red-500"
                    }`}
                >
                  {item.hours}
                </span>
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <div className="bg-muted/50 px-4 py-2.5">
          <p className="text-[11px] text-muted-foreground">
            * Timings may differ on public holidays
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a
              href="tel:+917869069906"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Phone className="h-4 w-4" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Mail className="h-4 w-4" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>

          {/* ── Interactive hours dropdown ── */}
          <HoursDropdown />
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-md"
            : "bg-background"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-2">
                <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg md:text-xl text-foreground tracking-tight">
                  KRISHNA
                </span>
                <span className="text-xs md:text-sm text-muted-foreground -mt-1">
                  CLASSES
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, 8).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
                  More
                </button>
                <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-card rounded-lg shadow-lg border p-2 min-w-[160px]">
                    {navLinks.slice(8).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Link href="#contact">Enroll Now</Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-primary rounded-lg p-2">
                      <GraduationCap className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-foreground">KRISHNA</span>
                      <span className="text-xs text-muted-foreground -mt-1">CLASSES</span>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-4 pt-4 border-t">
                    <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                      <Link href="#contact" onClick={() => setIsOpen(false)}>
                        Enroll Now
                      </Link>
                    </Button>
                  </div>

                  {/* Mobile hours summary */}
                  <div className="mt-2 rounded-xl border bg-muted/30 overflow-hidden">
                    <div className="bg-primary px-3 py-2">
                      <p className="text-primary-foreground text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> Hours
                      </p>
                    </div>
                    <div className="divide-y divide-border">
                      {weeklyHours.map((item, idx) => {
                        const isToday = idx === todayIndex
                        return (
                          <div
                            key={item.day}
                            className={`flex items-center justify-between px-3 py-2 text-xs ${isToday ? "bg-primary/5" : ""}`}
                          >
                            <span className={`font-medium ${isToday ? "text-primary" : "text-foreground"}`}>
                              {item.day}
                              {isToday && (
                                <span className="ml-1.5 text-[9px] font-semibold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                                  Today
                                </span>
                              )}
                            </span>
                            <span className={item.open ? "text-muted-foreground" : "text-red-500 font-medium"}>
                              {item.hours}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <a href="tel:+917869069906" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      +91 78690 69906
                    </a>
                    <a href="mailto:krishnaclasses2009@gmail.com" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      krishnaclasses2009@gmail.com
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

          </div>
        </div>
      </header>
    </>
  )
}