"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { GOOGLE_MAPS_URL, siteConfig } from "@/lib/site-config"
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle,
  ExternalLink, Navigation, Paperclip, X as XIcon, FileText,
} from "lucide-react"

type FormErrors = {
  name?: string; phone?: string; email?: string; message?: string
  course?: string; studentClass?: string; queryType?: string; resume?: string
}
type FormValues = { name: string; phone: string; email: string; message: string }

function validateName(v: string) { if (!v.trim()) return "Full name is required."; if (v.trim().length < 2) return "Name must be at least 2 characters."; if (!/^[a-zA-Z\s'-]+$/.test(v.trim())) return "Name can only contain letters, spaces, hyphens, or apostrophes." }
function validatePhone(v: string) { if (!v.trim()) return "Phone number is required."; const d = v.replace(/\D/g, ""); if (d.length !== 10) return "Enter a valid 10-digit mobile number."; if (!/^[6-9]\d{9}$/.test(d)) return "Enter a valid Indian mobile number starting with 6–9." }
function validateEmail(v: string) { if (!v.trim()) return "Email address is required."; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return "Enter a valid email address." }
function validateMessage(v: string) { if (v.trim() && v.trim().length < 10) return "Message must be at least 10 characters if provided."; if (v.trim().length > 1000) return "Message cannot exceed 1000 characters." }
function validateCourse(v: string) { if (!v) return "Please select a course." }
function validateStudentClass(v: string) { if (!v) return "Please select a class." }
function validateQueryType(v: string) { if (!v) return "Please select a query type." }
function validateResume(file: File | null, isCareer: boolean) {
  if (!isCareer) return undefined
  if (!file) return "Please attach your resume."
  const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
  if (!allowed.includes(file.type)) return "Only PDF or Word (.doc/.docx) files are accepted."
  if (file.size > 5 * 1024 * 1024) return "Resume must be under 5 MB."
}

function IndiaDialPrefix({ hasError }: { hasError: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 border-r shrink-0 bg-muted select-none h-full ${hasError ? "border-red-500" : "border-input"}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-5 h-3.5 sm:w-6 sm:h-4 rounded-sm overflow-hidden shadow-sm" aria-label="India" role="img">
        <rect width="900" height="200" y="0" fill="#FF9933" />
        <rect width="900" height="200" y="200" fill="#FFFFFF" />
        <rect width="900" height="200" y="400" fill="#138808" />
        <circle cx="450" cy="300" r="90" fill="none" stroke="#000080" strokeWidth="8" />
        <circle cx="450" cy="300" r="12" fill="#000080" />
        {Array.from({ length: 24 }).map((_, i) => {
          const rad = (i * 360 / 24 * Math.PI) / 180
          return <line key={i} x1="450" y1="300" x2={(450 + 78 * Math.sin(rad)).toFixed(2)} y2={(300 - 78 * Math.cos(rad)).toFixed(2)} stroke="#000080" strokeWidth="4" />
        })}
      </svg>
      <span className="text-xs sm:text-sm font-semibold text-foreground">+91</span>
    </div>
  )
}

function isCurrentlyOpen(): boolean {
  const now = new Date()
  if (now.getDay() === 0) return false
  const totalMins = now.getHours() * 60 + now.getMinutes()
  return totalMins >= 10 * 60 + 30 && totalMins < 21 * 60 + 30
}

function nextOpenLabel(): string {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const totalMins = now.getHours() * 60 + now.getMinutes()
  if (dayOfWeek !== 0 && totalMins < 10 * 60 + 30) return "Opens today at 10:30 AM"
  if (dayOfWeek === 6) return "Opens Monday at 10:30 AM"
  return "Opens tomorrow at 10:30 AM"
}

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [course, setCourse] = useState("")
  const [studentClass, setStudentClass] = useState("")
  const [queryType, setQueryType] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [values, setValues] = useState<FormValues>({ name: "", phone: "", email: "", message: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const isCareerQuery = queryType === "career"
  const [currentlyOpen, setCurrentlyOpen] = useState(isCurrentlyOpen)

  useEffect(() => {
    const timer = setInterval(() => setCurrentlyOpen(isCurrentlyOpen()), 60_000)
    return () => clearInterval(timer)
  }, [])
  const isFormValid =
    !validateName(values.name) && !validatePhone(values.phone) && !validateEmail(values.email) &&
    !validateMessage(values.message) && !validateCourse(course) && !validateStudentClass(studentClass) &&
    !validateQueryType(queryType) && !validateResume(resumeFile, isCareerQuery)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues(p => ({ ...p, [name]: value }))
    if (touched[name]) {
      const err = name === "name" ? validateName(value) : name === "phone" ? validatePhone(value) : name === "email" ? validateEmail(value) : validateMessage(value)
      setErrors(p => ({ ...p, [name]: err }))
    }
  }, [touched])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched(p => ({ ...p, [name]: true }))
    const err = name === "name" ? validateName(value) : name === "phone" ? validatePhone(value) : name === "email" ? validateEmail(value) : validateMessage(value)
    setErrors(p => ({ ...p, [name]: err }))
  }, [])

  const handleSelectChange = useCallback((field: "course" | "studentClass" | "queryType", value: string) => {
    if (field === "course") setCourse(value)
    else if (field === "studentClass") setStudentClass(value)
    else { setQueryType(value); if (value !== "career") { setResumeFile(null); setErrors(p => ({ ...p, resume: undefined })) } }
    const errFns = { course: validateCourse, studentClass: validateStudentClass, queryType: validateQueryType }
    setErrors(p => ({ ...p, [field]: errFns[field](value) }))
    setTouched(p => ({ ...p, [field]: true }))
  }, [])

  const handleResumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setResumeFile(file)
    setTouched(p => ({ ...p, resume: true }))
    setErrors(p => ({ ...p, resume: validateResume(file, true) }))
  }, [])

  const removeResume = useCallback(() => {
    setResumeFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    setErrors(p => ({ ...p, resume: isCareerQuery ? "Please attach your resume." : undefined }))
  }, [isCareerQuery])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) return
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append("name", values.name); formData.append("phone", `+91 ${values.phone}`)
    formData.append("email", values.email); formData.append("message", values.message)
    formData.append("course", course); formData.append("studentClass", studentClass)
    formData.append("queryType", queryType)
    if (resumeFile) formData.append("resume", resumeFile)
    try {
      const res = await fetch("/api/contact", { method: "POST", body: formData })
      if (res.ok) {
        setIsSubmitted(true)
        setValues({ name: "", phone: "", email: "", message: "" })
        setCourse(""); setStudentClass(""); setQueryType(""); setResumeFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
        setErrors({}); setTouched({})
      }
    } catch (error) { console.error("Email send error:", error) }
    setIsSubmitting(false)
    setTimeout(() => setIsSubmitted(false), 4000)
  }

  const contactInfo = [
    { icon: Phone, title: "Phone", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}` },
    { icon: Mail, title: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: MapPin, title: "Address", value: siteConfig.contact.address, href: "#" },
  ]

  return (
    <section id="contact" className="py-14 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Get in Touch</h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Have questions about our courses? Want to enroll? Reach out and our team will get back to you promptly.
          </p>
        </div>

        {/*
          KEY FIX: On mobile — form comes first (order-1), info+map comes second (order-2).
          On lg+ — standard side-by-side layout with info on left, form on right.
          We use flex-col on mobile with explicit order classes to control the stacking order
          independently of the DOM order.
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">

          {/* ── Contact Info + Map — order-2 mobile, left col desktop ── */}
          <div className="order-2 lg:order-1 space-y-5 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">Contact Information</h3>

            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-foreground text-sm sm:text-base">{item.title}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-words">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Live Timings block */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-medium text-foreground text-sm sm:text-base">Timings</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${currentlyOpen
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-600 border border-red-200"
                    }`}>
                    {currentlyOpen ? "● Open Now" : "● Closed"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Mon–Sat: 10:30 AM – 9:30 PM
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Sunday: Closed
                </p>
                {!currentlyOpen && (
                  <p className="text-xs text-primary font-medium mt-1">
                    {nextOpenLabel()}
                  </p>
                )}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 p-2">
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="relative block group">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-slate-100 relative overflow-hidden rounded-md">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.3!2d77.4162451!3d23.1849918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c437d1f7995fb%3A0xdef331183ffda2d7!2sKrishna%20Classes%20and%20Home%20Tutors%20Bhopal!5e0!3m2!1sen!2sin!4v1"
                    width="100%" height="100%" style={{ border: 0 }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 sm:gap-2">
                      <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">Get Directions</span>
                      <ExternalLink className="h-3 w-3 text-slate-500" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* ── Contact Form — order-1 mobile, right 2 cols desktop ── */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <Card>
              <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Send us a Message</CardTitle>
              </CardHeader>

              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                {isSubmitted ? (
                  <div className="text-center py-10 sm:py-12">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Thank You!</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {isCareerQuery
                        ? "Your application has been submitted. We will review your resume and get back to you soon."
                        : "Your message has been sent successfully. We will get back to you soon."}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>

                    {/* Row 1 — Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FieldGroup>
                        <Field>
                          <FieldLabel className="text-sm">Full Name *</FieldLabel>
                          <Input
                            name="name" value={values.name} placeholder="Enter your name"
                            onBlur={handleBlur} onChange={handleChange} aria-invalid={!!errors.name}
                            className={`h-10 text-sm ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          />
                          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </Field>
                      </FieldGroup>

                      <FieldGroup>
                        <Field>
                          <FieldLabel className="text-sm">Phone Number *</FieldLabel>
                          <div className={`flex items-center rounded-md border overflow-hidden transition-colors h-10 ${errors.phone ? "border-red-500" : "border-input"} focus-within:ring-2 ${errors.phone ? "focus-within:ring-red-500" : "focus-within:ring-ring"} focus-within:ring-offset-0`}>
                            <IndiaDialPrefix hasError={!!errors.phone} />
                            <input
                              name="phone" type="tel" inputMode="numeric" maxLength={10}
                              value={values.phone} placeholder="10-digit number"
                              onBlur={handleBlur} onChange={handleChange} aria-invalid={!!errors.phone}
                              className="flex-1 bg-background text-foreground text-sm px-2.5 sm:px-3 h-full focus:outline-none min-w-0"
                            />
                          </div>
                          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                        </Field>
                      </FieldGroup>
                    </div>

                    {/* Row 2 — Email + Course */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FieldGroup>
                        <Field>
                          <FieldLabel className="text-sm">Email Address *</FieldLabel>
                          <Input
                            name="email" type="email" value={values.email} placeholder="Enter your email"
                            onBlur={handleBlur} onChange={handleChange} aria-invalid={!!errors.email}
                            className={`h-10 text-sm ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          />
                          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </Field>
                      </FieldGroup>

                      <FieldGroup>
                        <Field>
                          <FieldLabel className="text-sm">Interested Course *</FieldLabel>
                          <Select value={course} onValueChange={(v) => handleSelectChange("course", v)}>
                            <SelectTrigger className={`h-10 text-sm ${errors.course && touched.course ? "border-red-500 focus:ring-red-500" : ""}`}>
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="class-11-12-jee">Class 11th–12th + IIT-JEE</SelectItem>
                              <SelectItem value="class-11-12-neet">Class 11th–12th + NEET</SelectItem>
                              <SelectItem value="class-8-10">Class 8th–10th (Foundation)</SelectItem>
                              <SelectItem value="class-6-7">Class 6th–7th (All Subjects)</SelectItem>
                              <SelectItem value="home-tuition">Home Tuition</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.course && touched.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
                        </Field>
                      </FieldGroup>
                    </div>

                    {/* Row 3 — Student Class + Query Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FieldGroup>
                        <Field>
                          <FieldLabel className="text-sm">Student Class *</FieldLabel>
                          <Select value={studentClass} onValueChange={(v) => handleSelectChange("studentClass", v)}>
                            <SelectTrigger className={`h-10 text-sm ${errors.studentClass && touched.studentClass ? "border-red-500 focus:ring-red-500" : ""}`}>
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                              {["6", "7", "8", "9", "10", "11", "12"].map(c => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}
                              <SelectItem value="dropper">Dropper</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.studentClass && touched.studentClass && <p className="text-xs text-red-500 mt-1">{errors.studentClass}</p>}
                        </Field>
                      </FieldGroup>

                      <FieldGroup>
                        <Field>
                          <FieldLabel className="text-sm">Query Type *</FieldLabel>
                          <Select value={queryType} onValueChange={(v) => handleSelectChange("queryType", v)}>
                            <SelectTrigger className={`h-10 text-sm ${errors.queryType && touched.queryType ? "border-red-500 focus:ring-red-500" : ""}`}>
                              <SelectValue placeholder="Select query type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admission">Admission Inquiry</SelectItem>
                              <SelectItem value="fees">Fee Structure</SelectItem>
                              <SelectItem value="demo">Demo Class</SelectItem>
                              <SelectItem value="career">Career Application</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.queryType && touched.queryType && <p className="text-xs text-red-500 mt-1">{errors.queryType}</p>}
                        </Field>
                      </FieldGroup>
                    </div>

                    {/* Resume — career only */}
                    {isCareerQuery && (
                      <FieldGroup>
                        <Field>
                          <FieldLabel className="text-sm">
                            Resume / CV *
                            <span className="text-muted-foreground font-normal text-xs ml-1">(PDF or Word, max 5 MB)</span>
                          </FieldLabel>
                          {resumeFile ? (
                            <div className={`flex items-center gap-3 rounded-md border px-3 py-2.5 ${errors.resume ? "border-red-500" : "border-input"} bg-muted/40`}>
                              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-foreground truncate">{resumeFile.name}</p>
                                <p className="text-xs text-muted-foreground">{(resumeFile.size / 1024).toFixed(0)} KB</p>
                              </div>
                              <button type="button" onClick={removeResume} className="shrink-0 w-6 h-6 rounded-full bg-muted hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors" aria-label="Remove resume">
                                <XIcon className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <label className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed cursor-pointer px-4 py-5 sm:py-6 transition-colors hover:bg-muted/40 ${errors.resume && touched.resume ? "border-red-400" : "border-input hover:border-primary/50"}`}>
                              <Paperclip className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                              <span className="text-xs sm:text-sm text-muted-foreground text-center">
                                <span className="font-semibold text-primary">Click to upload</span> your resume
                              </span>
                              <span className="text-xs text-muted-foreground">PDF, DOC, DOCX · Max 5 MB</span>
                              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleResumeChange} className="sr-only" />
                            </label>
                          )}
                          {errors.resume && touched.resume && <p className="text-xs text-red-500 mt-1">{errors.resume}</p>}
                        </Field>
                      </FieldGroup>
                    )}

                    {/* Message */}
                    <FieldGroup>
                      <Field>
                        <FieldLabel className="text-sm">
                          Message <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                        </FieldLabel>
                        <Textarea
                          name="message" value={values.message}
                          placeholder={isCareerQuery ? "Tell us about yourself, your experience, and the role you're interested in..." : "Write your message here..."}
                          className={`min-h-[100px] sm:min-h-[120px] text-sm ${errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          onBlur={handleBlur} onChange={handleChange} aria-invalid={!!errors.message}
                        />
                        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                      </Field>
                    </FieldGroup>

                    <Button type="submit" size="lg" className="w-full text-sm sm:text-base" disabled={isSubmitting || !isFormValid}>
                      {isSubmitting ? "Sending..." : (
                        <>{isCareerQuery ? "Submit Application" : "Send Message"}<Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" /></>
                      )}
                    </Button>

                  </form>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  )
}