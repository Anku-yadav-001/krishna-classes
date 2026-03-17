"use client"

import { useState } from "react"
import { BookOpen, FlaskConical, Calculator, FileText, Download, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const classes = [
  {
    id: "class-8",
    label: "Class 8th",
    icon: BookOpen,
    subjects: [
      {
        name: "Mathematics",
        icon: Calculator,
        files: [] as { name: string; file: string }[],
      },
      {
        name: "Science",
        icon: FlaskConical,
        files: [] as { name: string; file: string }[],
      },
    ],
  },
  {
    id: "class-9",
    label: "Class 9th",
    icon: BookOpen,
    subjects: [
      {
        name: "Mathematics",
        icon: Calculator,
        files: [] as { name: string; file: string }[],
      },
      {
        name: "Science",
        icon: FlaskConical,
        files: [] as { name: string; file: string }[],
      },
    ],
  },
  {
    id: "class-10",
    label: "Class 10th",
    icon: BookOpen,
    subjects: [
      {
        name: "Mathematics",
        icon: Calculator,
        files: [
          { name: "Class 10th Maths Worksheet Chapter 1", file: "/study-material/class-10/maths/class-10-maths-worksheet-ch1.pdf" },
          { name: "Class 10th Trigonometry Worksheet", file: "/study-material/class-10/maths/class-10-trigonometry-worksheet.pdf" },
          { name: "Class 10th Triangle Worksheet", file: "/study-material/class-10/maths/class-10-triangle-worksheet.pdf" },
        ],
      },
      {
        name: "Science",
        icon: FlaskConical,
        files: [] as { name: string; file: string }[],
      },
    ],
  },
]

export function StudyMaterialSection() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const activeClass = classes.find((c) => c.id === selectedClass)
  const activeSubject = activeClass?.subjects.find((s) => s.name === selectedSubject)

  const handleClassSelect = (id: string) => {
    if (selectedClass === id) {
      setSelectedClass(null)
      setSelectedSubject(null)
    } else {
      setSelectedClass(id)
      setSelectedSubject(null)
    }
  }

  const handleSubjectSelect = (name: string) => {
    setSelectedSubject(selectedSubject === name ? null : name)
  }

  const getFileType = (filename: string) => {
    if (filename.endsWith(".pdf")) return "PDF"
    if (filename.endsWith(".docx") || filename.endsWith(".doc")) return "Word Document"
    return "File"
  }

  return (
    <section id="study-materials" className="py-14 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Study Material</span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Free Study Resources
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Download chapter-wise notes and practice sheets for Class 8th, 9th and 10th — completely free.
          </p>
        </div>

        {/* Step 1 — Select Class */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Step 1 — Select your class
          </p>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
            {classes.map((cls) => {
              const Icon = cls.icon
              const isActive = selectedClass === cls.id
              return (
                <button
                  key={cls.id}
                  onClick={() => handleClassSelect(cls.id)}
                  className={`flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 ${isActive
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-xs sm:text-sm font-semibold ${isActive ? "text-primary" : "text-foreground"
                    }`}>
                    {cls.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 2 — Select Subject */}
        {activeClass && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Step 2 — Select subject
            </p>
            <div className="flex gap-3 flex-wrap">
              {activeClass.subjects.map((subject) => {
                const Icon = subject.icon
                const isActive = selectedSubject === subject.name
                return (
                  <button
                    key={subject.name}
                    onClick={() => handleSubjectSelect(subject.name)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card hover:border-primary/40 text-foreground"
                      }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-semibold">{subject.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3 — File List */}
        {activeSubject && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Step 3 — Download files
            </p>

            {activeSubject.files.length > 0 ? (
              <div className="max-w-2xl space-y-2.5">
                {activeSubject.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card border rounded-xl hover:shadow-sm transition-shadow"
                  >
                    {/* File icon */}
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>

                    {/* File name */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {getFileType(file.file)} · Free Download
                      </p>
                    </div>

                    {/* Download button */}
                    <a
                      href={file.file}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                    >
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                        <Download className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              /* No files yet */
              <div className="max-w-2xl flex items-center gap-3 p-4 bg-muted/50 border border-dashed rounded-xl text-muted-foreground">
                <FileText className="h-4 w-4 shrink-0" />
                <p className="text-sm">
                  No files uploaded yet for {activeClass?.label} {activeSubject.name}. Check back soon!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Placeholder when nothing selected */}
        {!selectedClass && (
          <div className="max-w-2xl mt-2 flex items-center gap-3 p-4 bg-muted/50 border border-dashed rounded-xl text-muted-foreground">
            <ChevronRight className="h-4 w-4 shrink-0" />
            <p className="text-sm">Select a class above to browse available study material.</p>
          </div>
        )}

        {selectedClass && !selectedSubject && (
          <div className="max-w-2xl mt-2 flex items-center gap-3 p-4 bg-muted/50 border border-dashed rounded-xl text-muted-foreground">
            <ChevronRight className="h-4 w-4 shrink-0" />
            <p className="text-sm">Now select a subject to see the available files.</p>
          </div>
        )}

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            More materials added regularly. All files are free to download for Krishna Classes students.
          </p>
        </div>

      </div>
    </section >
  )
}