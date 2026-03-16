"use client"

import { useState, useCallback, useRef } from "react"
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

// ─── Types ────────────────────────────────────────────────────────────────────
type FormErrors = {
  name?: string
  phone?: string
  email?: string
  message?: string
  course?: string
  studentClass?: string
  queryType?: string
  resume?: string
}

type FormValues = {
  name: string
  phone: string
  email: string
  message: string
}

// ─── Validators ───────────────────────────────────────────────────────────────
function validateName(v: string): string | undefined {
  if (!v.trim()) return "Full name is required."
  if (v.trim().length < 2) return "Name must be at least 2 characters."
  if (!/^[a-zA-Z\s'-]+$/.test(v.trim())) return "Name can only contain letters, spaces, hyphens, or apostrophes."
}
function validatePhone(v: string): string | undefined {
  if (!v.trim()) return "Phone number is required."
  const digits = v.replace(/\D/g, "")
  if (digits.length !== 10) return "Enter a valid 10-digit mobile number."
  if (!/^[6-9]\d{9}$/.test(digits)) return "Enter a valid Indian mobile number starting with 6–9."
}
function validateEmail(v: string): string | undefined {
  if (!v.trim()) return "Email address is required."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return "Enter a valid email address."
}
function validateMessage(v: string): string | undefined {
  if (v.trim() && v.trim().length < 10) return "Message must be at least 10 characters if provided."
  if (v.trim().length > 1000) return "Message cannot exceed 1000 characters."
}
function validateCourse(v: string): string | undefined {
  if (!v) return "Please select a course."
}
function validateStudentClass(v: string): string | undefined {
  if (!v) return "Please select a class."
}
function validateQueryType(v: string): string | undefined {
  if (!v) return "Please select a query type."
}
function validateResume(file: File | null, isCareer: boolean): string | undefined {
  if (!isCareer) return undefined
  if (!file) return "Please attach your resume."
  const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
  if (!allowed.includes(file.type)) return "Only PDF or Word (.doc/.docx) files are accepted."
  if (file.size > 5 * 1024 * 1024) return "Resume must be under 5 MB."
}

// ─── Indian Flag SVG + Dial Code Prefix ──────────────────────────────────────
function IndiaDialPrefix({ hasError }: { hasError: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 border-r shrink-0 bg-muted select-none h-full ${hasError ? "border-red-500" : "border-input"
        }`}
    >
      {/* Indian flag — proper SVG, renders on all platforms/browsers */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 900 600"
        className="w-6 h-4 rounded-sm overflow-hidden shadow-sm"
        aria-label="India"
        role="img"
      >
        {/* Saffron band */}
        <rect width="900" height="200" y="0" fill="#FF9933" />
        {/* White band */}
        <rect width="900" height="200" y="200" fill="#FFFFFF" />
        {/* Green band */}
        <rect width="900" height="200" y="400" fill="#138808" />
        {/* Ashoka Chakra — navy blue wheel */}
        <circle cx="450" cy="300" r="90" fill="none" stroke="#000080" strokeWidth="8" />
        <circle cx="450" cy="300" r="12" fill="#000080" />
        {/* 24 spokes */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24
          const rad = (angle * Math.PI) / 180
          const x2 = 450 + 78 * Math.sin(rad)
          const y2 = 300 - 78 * Math.cos(rad)
          return (
            <line
              key={i}
              x1="450" y1="300"
              x2={x2.toFixed(2)} y2={y2.toFixed(2)}
              stroke="#000080"
              strokeWidth="4"
            />
          )
        })}
      </svg>
      <span className="text-sm font-semibold text-foreground">+91</span>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
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

  const isFormValid =
    !validateName(values.name) &&
    !validatePhone(values.phone) &&
    !validateEmail(values.email) &&
    !validateMessage(values.message) &&
    !validateCourse(course) &&
    !validateStudentClass(studentClass) &&
    !validateQueryType(queryType) &&
    !validateResume(resumeFile, isCareerQuery)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      let err: string | undefined
      if (name === "name") err = validateName(value)
      else if (name === "phone") err = validatePhone(value)
      else if (name === "email") err = validateEmail(value)
      else if (name === "message") err = validateMessage(value)
      setErrors((prev) => ({ ...prev, [name]: err }))
    }
  }, [touched])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    let err: string | undefined
    if (name === "name") err = validateName(value)
    else if (name === "phone") err = validatePhone(value)
    else if (name === "email") err = validateEmail(value)
    else if (name === "message") err = validateMessage(value)
    setErrors((prev) => ({ ...prev, [name]: err }))
  }, [])

  const handleSelectChange = useCallback((field: "course" | "studentClass" | "queryType", value: string) => {
    if (field === "course") setCourse(value)
    else if (field === "studentClass") setStudentClass(value)
    else {
      setQueryType(value)
      if (value !== "career") {
        setResumeFile(null)
        setErrors((prev) => ({ ...prev, resume: undefined }))
      }
    }
    const errFns = { course: validateCourse, studentClass: validateStudentClass, queryType: validateQueryType }
    setErrors((prev) => ({ ...prev, [field]: errFns[field](value) }))
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  const handleResumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setResumeFile(file)
    setTouched((prev) => ({ ...prev, resume: true }))
    setErrors((prev) => ({ ...prev, resume: validateResume(file, true) }))
  }, [])

  const removeResume = useCallback(() => {
    setResumeFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    setErrors((prev) => ({ ...prev, resume: isCareerQuery ? "Please attach your resume." : undefined }))
  }, [isCareerQuery])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) return
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("phone", `+91 ${values.phone}`)
    formData.append("email", values.email)
    formData.append("message", values.message)
    formData.append("course", course)
    formData.append("studentClass", studentClass)
    formData.append("queryType", queryType)
    if (resumeFile) formData.append("resume", resumeFile)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        setIsSubmitted(true)
        setValues({ name: "", phone: "", email: "", message: "" })
        setCourse("")
        setStudentClass("")
        setQueryType("")
        setResumeFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
        setErrors({})
        setTouched({})
      }
    } catch (error) {
      console.error("Email send error:", error)
    }

    setIsSubmitting(false)
    setTimeout(() => setIsSubmitted(false), 4000)
  }

  const contactInfo = [
    { icon: Phone, title: "Phone", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}` },
    { icon: Mail, title: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: MapPin, title: "Address", value: siteConfig.contact.address, href: "#" },
    { icon: Clock, title: "Timings", value: siteConfig.contact.timings, href: null },
  ]

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">Get in Touch</h2>
          <p className="mt-4 text-muted-foreground text-lg text-pretty">
            Have questions about our courses? Want to enroll? Reach out to us and our team will get back to you promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Contact Info + Map */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
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
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-slate-800">Get Directions</span>
                      <ExternalLink className="h-3 w-3 text-slate-500" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>

              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Thank You!</h3>
                    <p className="text-muted-foreground">
                      {isCareerQuery
                        ? "Your application has been submitted. We will review your resume and get back to you soon."
                        : "Your message has been sent successfully. We will get back to you soon."}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                    {/* Row 1 — Name + Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FieldGroup>
                        <Field>
                          <FieldLabel>Full Name *</FieldLabel>
                          <Input
                            name="name" value={values.name} placeholder="Enter your name"
                            onBlur={handleBlur} onChange={handleChange} aria-invalid={!!errors.name}
                            className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                          />
                          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </Field>
                      </FieldGroup>

                      <FieldGroup>
                        <Field>
                          <FieldLabel>Phone Number *</FieldLabel>
                          {/* 🇮🇳 +91 prefix — clean, no state dropdown */}
                          <div
                            className={`flex items-center rounded-md border overflow-hidden transition-colors h-10 ${errors.phone ? "border-red-500" : "border-input"
                              } focus-within:ring-2 ${errors.phone ? "focus-within:ring-red-500" : "focus-within:ring-ring"
                              } focus-within:ring-offset-0 focus-within:outline-none`}
                          >
                            <IndiaDialPrefix hasError={!!errors.phone} />
                            <input
                              name="phone"
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              value={values.phone}
                              placeholder="Enter 10-digit number"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              aria-invalid={!!errors.phone}
                              className="flex-1 bg-background text-foreground text-sm px-3 h-full focus:outline-none min-w-0"
                            />
                          </div>
                          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                        </Field>
                      </FieldGroup>
                    </div>

                    {/* Row 2 — Email + Course */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FieldGroup>
                        <Field>
                          <FieldLabel>Email Address *</FieldLabel>
                          <Input
                            name="email" type="email" value={values.email} placeholder="Enter your email"
                            onBlur={handleBlur} onChange={handleChange} aria-invalid={!!errors.email}
                            className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                          />
                          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </Field>
                      </FieldGroup>

                      <FieldGroup>
                        <Field>
                          <FieldLabel>Interested Course *</FieldLabel>
                          <Select value={course} onValueChange={(v) => handleSelectChange("course", v)}>
                            <SelectTrigger className={errors.course && touched.course ? "border-red-500 focus:ring-red-500" : ""}>
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="class-11-12-jee">Class 11th–12th + IIT-JEE</SelectItem>
                              <SelectItem value="class-11-12-neet">Class 11th–12th + NEET</SelectItem>
                              <SelectItem value="class-8-10">Class 8th–10th (Maths + Science + Social + English)</SelectItem>
                              <SelectItem value="class-6-7">Class 6th–7th (All Subjects)</SelectItem>
                              <SelectItem value="home-tuition">Home Tuition (Any Class, Any Subject)</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.course && touched.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
                        </Field>
                      </FieldGroup>
                    </div>

                    {/* Row 3 — Student Class + Query Type */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FieldGroup>
                        <Field>
                          <FieldLabel>Student Class *</FieldLabel>
                          <Select value={studentClass} onValueChange={(v) => handleSelectChange("studentClass", v)}>
                            <SelectTrigger className={errors.studentClass && touched.studentClass ? "border-red-500 focus:ring-red-500" : ""}>
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6">Class 6</SelectItem>
                              <SelectItem value="7">Class 7</SelectItem>
                              <SelectItem value="8">Class 8</SelectItem>
                              <SelectItem value="9">Class 9</SelectItem>
                              <SelectItem value="10">Class 10</SelectItem>
                              <SelectItem value="11">Class 11</SelectItem>
                              <SelectItem value="12">Class 12</SelectItem>
                              <SelectItem value="dropper">Dropper</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.studentClass && touched.studentClass && <p className="text-xs text-red-500 mt-1">{errors.studentClass}</p>}
                        </Field>
                      </FieldGroup>

                      <FieldGroup>
                        <Field>
                          <FieldLabel>Query Type *</FieldLabel>
                          <Select value={queryType} onValueChange={(v) => handleSelectChange("queryType", v)}>
                            <SelectTrigger className={errors.queryType && touched.queryType ? "border-red-500 focus:ring-red-500" : ""}>
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

                    {/* Resume — only for Career Application */}
                    {isCareerQuery && (
                      <FieldGroup>
                        <Field>
                          <FieldLabel>
                            Resume / CV *
                            <span className="text-muted-foreground font-normal text-xs ml-1">(PDF or Word, max 5 MB)</span>
                          </FieldLabel>
                          {resumeFile ? (
                            <div className={`flex items-center gap-3 rounded-md border px-3 py-2.5 ${errors.resume ? "border-red-500" : "border-input"} bg-muted/40`}>
                              <FileText className="h-5 w-5 text-primary shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{resumeFile.name}</p>
                                <p className="text-xs text-muted-foreground">{(resumeFile.size / 1024).toFixed(0)} KB</p>
                              </div>
                              <button
                                type="button" onClick={removeResume}
                                className="shrink-0 w-6 h-6 rounded-full bg-muted hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                                aria-label="Remove resume"
                              >
                                <XIcon className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <label className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed cursor-pointer px-4 py-6 transition-colors hover:bg-muted/40 ${errors.resume && touched.resume ? "border-red-400" : "border-input hover:border-primary/50"}`}>
                              <Paperclip className="h-6 w-6 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground text-center">
                                <span className="font-semibold text-primary">Click to upload</span> your resume
                              </span>
                              <span className="text-xs text-muted-foreground">PDF, DOC, DOCX · Max 5 MB</span>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={handleResumeChange}
                                className="sr-only"
                              />
                            </label>
                          )}
                          {errors.resume && touched.resume && <p className="text-xs text-red-500 mt-1">{errors.resume}</p>}
                        </Field>
                      </FieldGroup>
                    )}

                    {/* Message — optional */}
                    <FieldGroup>
                      <Field>
                        <FieldLabel>
                          Message <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                        </FieldLabel>
                        <Textarea
                          name="message" value={values.message}
                          placeholder={isCareerQuery ? "Tell us about yourself, your experience, and the role you're interested in..." : "Write your message here..."}
                          className={`min-h-[120px] ${errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          onBlur={handleBlur} onChange={handleChange} aria-invalid={!!errors.message}
                        />
                        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                      </Field>
                    </FieldGroup>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !isFormValid}>
                      {isSubmitting ? "Sending..." : (
                        <>
                          {isCareerQuery ? "Submit Application" : "Send Message"}
                          <Send className="ml-2 h-5 w-5" />
                        </>
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