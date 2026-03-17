"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Phone, Mail, GraduationCap, Clock, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
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

const todayIndex = (() => {
  const d = new Date().getDay()
  return d === 0 ? 6 : d - 1
})()

// Returns true only if the current time is within 10:30 AM – 9:30 PM on Mon–Sat.
function isCurrentlyOpen(): boolean {
  const now = new Date()
  if (now.getDay() === 0) return false // Sunday
  const totalMins = now.getHours() * 60 + now.getMinutes()
  return totalMins >= 10 * 60 + 30 && totalMins < 21 * 60 + 30
}

// Returns a human-readable "opens …" hint for when closed
function nextOpenLabel(): string {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const totalMins = now.getHours() * 60 + now.getMinutes()
  const openMins = 10 * 60 + 30

  if (dayOfWeek !== 0 && totalMins < openMins) {
    return "Opens today at 10:30 AM"
  }
  if (dayOfWeek === 6) return "Opens Monday at 10:30 AM"
  if (dayOfWeek === 0) return "Opens tomorrow at 10:30 AM"
  return "Opens tomorrow at 10:30 AM"
}

// ─── Top bar height on desktop: ~40px (py-2 + text-sm line)
// ─── Nav header height: h-16 (64px) mobile, h-20 (80px) desktop
// ─── Total fixed nav height:
//       mobile  → 64px  (no top bar on mobile)
//       desktop → 80px + 40px = 120px
//
// NavSpacer compensates for the fixed nav so page content isn't hidden under it.
// Use this immediately after <Navigation /> in your layout/page:
//
//   <Navigation />
//   <NavSpacer />
//   <main>…</main>
//
export function NavSpacer() {
  return (
    <div
      className="w-full"
      style={{
        // mobile: 64px nav only; md+: 64px top-bar(~40px) + 80px nav = 120px
        height: "64px",
      }}
      aria-hidden="true"
    >
      <style>{`
        @media (min-width: 768px) {
          .nav-spacer { height: 120px !important; }
        }
      `}</style>
      <div className="nav-spacer w-full h-full" />
    </div>
  )
}

function HoursDropdown() {
  const [open, setOpen] = useState(false)
  const [currentlyOpen, setCurrentlyOpen] = useState(isCurrentlyOpen)

  useEffect(() => {
    const timer = setInterval(() => setCurrentlyOpen(isCurrentlyOpen()), 60_000)
    return () => clearInterval(timer)
  }, [])

  const today = weeklyHours[todayIndex]

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity focus:outline-none">
        <Clock className="h-4 w-4 shrink-0" />
        <span>
          {currentlyOpen ? (
            <>
              <span className="font-semibold">Open Now</span>
              <span className="opacity-75"> · {today.hours}</span>
            </>
          ) : (
            <>
              <span className="font-semibold text-red-300">Closed</span>
              <span className="opacity-75"> · {nextOpenLabel()}</span>
            </>
          )}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute right-0 top-full mt-2 z-50 w-72 rounded-xl bg-card border border-border shadow-xl overflow-hidden transition-all duration-200 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="bg-primary px-4 py-3 flex items-center justify-between">
          <p className="text-primary-foreground text-xs font-semibold uppercase tracking-wider">
            Weekly Hours
          </p>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              currentlyOpen
                ? "bg-green-400/20 text-green-300 border border-green-400/30"
                : "bg-red-400/20 text-red-300 border border-red-400/30"
            }`}
          >
            {currentlyOpen ? "● Open Now" : "● Closed"}
          </span>
        </div>

        {!currentlyOpen && (
          <div className="px-4 py-2 bg-muted/50 border-b border-border">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3 w-3 shrink-0" />
              {nextOpenLabel()}
            </p>
          </div>
        )}

        <div className="divide-y divide-border">
          {weeklyHours.map((item, idx) => {
            const isToday = idx === todayIndex
            return (
              <div
                key={item.day}
                className={`flex items-center justify-between px-4 py-2.5 text-sm ${isToday ? "bg-primary/5" : ""}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {isToday && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                  <span className={`font-medium truncate ${isToday ? "text-primary" : "text-foreground"}`}>
                    {item.day}
                    {isToday && (
                      <span className="ml-1.5 text-[10px] font-semibold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </span>
                </div>
                <span
                  className={`text-xs font-medium whitespace-nowrap ${
                    isToday
                      ? currentlyOpen
                        ? "text-green-600"
                        : "text-red-500"
                      : item.open
                      ? "text-muted-foreground"
                      : "text-red-500"
                  }`}
                >
                  {item.hours}
                </span>
              </div>
            )
          })}
        </div>

        <div className="bg-muted/50 px-4 py-2.5">
          <p className="text-[11px] text-muted-foreground">* Timings may differ on public holidays</p>
        </div>
      </div>
    </div>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [currentlyOpen, setCurrentlyOpen] = useState(isCurrentlyOpen)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentlyOpen(isCurrentlyOpen()), 60_000)
    return () => clearInterval(timer)
  }, [])

  // Close the sheet first, then scroll after the sheet's close animation (~300ms).
  const handleMobileNavClick = (href: string) => {
    setIsOpen(false)
    setTimeout(() => {
      const id = href.replace("#", "")
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }, 300)
  }

  return (
    // ── KEY CHANGE: fixed instead of sticky ──────────────────────────────────
    // `sticky` silently breaks when any ancestor has overflow:hidden, a CSS
    // transform, or will-change applied — common in Next.js layouts.
    // `fixed` is immune to ancestor styles.
    // Pair this component with <NavSpacer /> right after it in your layout so
    // page content starts below the nav and isn't hidden underneath it.
    <div className="fixed top-0 left-0 right-0 z-50 w-full">

      {/* Top Bar — desktop only */}
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
          <HoursDropdown />
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-md"
            : "bg-background border-b border-border/40"
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
                <span className="font-bold text-lg md:text-xl text-foreground tracking-tight">KRISHNA</span>
                <span className="text-xs md:text-sm text-muted-foreground -mt-1">CLASSES</span>
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
            <div className="flex items-center gap-3">
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
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] flex flex-col p-0 gap-0 [&>button]:hidden"
              >
                {/* Fixed header: logo + custom close button */}
                <SheetHeader className="flex flex-row items-center justify-between px-5 py-4 border-b shrink-0 space-y-0">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary rounded-lg p-2">
                      <GraduationCap className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-foreground leading-tight">KRISHNA</span>
                      <span className="text-xs text-muted-foreground">CLASSES</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </SheetHeader>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <div className="flex flex-col gap-4">

                    <nav className="flex flex-col gap-0.5">
                      {navLinks.map((link) => (
                        <button
                          key={link.href}
                          onClick={() => handleMobileNavClick(link.href)}
                          className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors text-left w-full"
                        >
                          {link.label}
                        </button>
                      ))}
                    </nav>

                    <div className="pt-2 border-t">
                      <Button
                        className="w-full bg-secondary hover:bg-secondary/90"
                        onClick={() => handleMobileNavClick("#contact")}
                      >
                        Enroll Now
                      </Button>
                    </div>

                    {/* Mobile hours */}
                    <div className="rounded-xl border bg-muted/30 overflow-hidden">
                      <div className="bg-primary px-3 py-2.5 flex items-center justify-between">
                        <p className="text-primary-foreground text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" /> Hours
                        </p>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            currentlyOpen
                              ? "bg-green-400/20 text-green-300 border border-green-400/30"
                              : "bg-red-400/20 text-red-300 border border-red-400/30"
                          }`}
                        >
                          {currentlyOpen ? "● Open Now" : "● Closed"}
                        </span>
                      </div>

                      {!currentlyOpen && (
                        <div className="px-3 py-2 bg-muted/50 border-b border-border">
                          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Clock className="h-3 w-3 shrink-0" />
                            {nextOpenLabel()}
                          </p>
                        </div>
                      )}

                      <div className="divide-y divide-border">
                        {weeklyHours.map((item, idx) => {
                          const isToday = idx === todayIndex
                          return (
                            <div
                              key={item.day}
                              className={`flex items-center justify-between px-3 py-2 text-xs ${isToday ? "bg-primary/5" : ""}`}
                            >
                              <span className={`font-medium flex items-center gap-1.5 ${isToday ? "text-primary" : "text-foreground"}`}>
                                {item.day}
                                {isToday && (
                                  <span className="text-[9px] font-semibold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                                    Today
                                  </span>
                                )}
                              </span>
                              <span
                                className={`font-medium ${
                                  isToday
                                    ? currentlyOpen
                                      ? "text-green-600"
                                      : "text-red-500"
                                    : item.open
                                    ? "text-muted-foreground"
                                    : "text-red-500"
                                }`}
                              >
                                {item.hours}
                              </span>
                            </div>
                          )
                        })}
                      </div>

                      <div className="px-3 py-2 bg-muted/30">
                        <p className="text-[10px] text-muted-foreground">* Timings may differ on public holidays</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground pb-2">
                      <a href="tel:+917869069906" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {siteConfig.contact.phone}
                      </a>
                      <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {siteConfig.contact.email}
                      </a>
                    </div>

                  </div>
                </div>
              </SheetContent>
            </Sheet>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}