"use client"

import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { GraduationCap, Facebook, Instagram, Youtube, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react"

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#courses", label: "Courses" },
  { href: "#results", label: "Results" },
  { href: "#faculty", label: "Faculty" },
  { href: "#batches", label: "Batch Timings" },
  { href: "#reviews", label: "Reviews" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
]

const courses = [
  { href: "#courses", label: "Class 11th–12th + IIT-JEE" },
  { href: "#courses", label: "Class 11th–12th + NEET" },
  { href: "#courses", label: "Class 8th–10th (Foundation)" },
  { href: "#junior-courses", label: "Class 6th–7th (All Subjects)" },
  { href: "#courses", label: "Home Tuition (Any Class)" },
]

const resources = [
  { href: "#faq", label: "FAQs" },
  { href: "#gallery", label: "Gallery" },
  { href: "#batches", label: "Batch Timings" },
  { href: "#achievements", label: "Achievements" },
  { href: "#reviews", label: "Reviews" },
  { href: "#careers", label: "Careers" },
]

const socialLinks = [
  { href: siteConfig.social.facebook, icon: Facebook, label: "Facebook" },
  { href: siteConfig.social.instagram, icon: Instagram, label: "Instagram" },
  { href: siteConfig.social.youtube, icon: Youtube, label: "YouTube" },
  { href: siteConfig.social.twitter, icon: Twitter, label: "Twitter" },
  { href: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-background rounded-lg p-2">
                <GraduationCap className="h-6 w-6 text-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-background">KRISHNA</span>
                <span className="text-xs text-background/70 -mt-1">CLASSES</span>
              </div>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed mb-4">
              Empowering students to achieve academic excellence through quality education since 2009.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-semibold text-background mb-4">Our Courses</h4>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.label}>
                  <Link
                    href={course.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {course.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-background mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.label}>
                  <Link
                    href={resource.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {resource.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-background mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-2 text-sm text-background/70 hover:text-background transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-2 text-sm text-background/70 hover:text-background transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-sm text-background/60 text-center md:text-left">
              &copy; {new Date().getFullYear()} Krishna Classes. All rights reserved.
            </p>
          </div>
        </div>
      </div>

    </footer>
  )
}