"use client"

import { useState } from "react"
import { BookOpen, FlaskConical, Calculator, FileText, Download, ChevronRight, Atom, Dna, FileType2, File } from "lucide-react"
import { Button } from "@/components/ui/button"

const classes = [
  {
    id: "class-8",
    label: "Class 8th",
    icon: BookOpen,
    subjects: [
      { name: "Mathematics", icon: Calculator, files: [] as { name: string; file: string }[] },
      { name: "Science", icon: FlaskConical, files: [] as { name: string; file: string }[] },
    ],
  },
  {
    id: "class-9",
    label: "Class 9th",
    icon: BookOpen,
    subjects: [
      { name: "Mathematics", icon: Calculator, files: [] as { name: string; file: string }[] },
      { name: "Science", icon: FlaskConical, files: [] as { name: string; file: string }[] },
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
          { name: "Class 10th Maths Worksheet Chapter 2 (Polynomials)", file: "/study-material/class-10/maths/Class 10th Maths Worksheet (Polynomials) Chapter 2.pdf" },
          { name: "Class 10th Maths Worksheet Chapter 3 (Pair of Linear equations in two variable) ", file: "/study-material/class-10/maths/Class 10th Maths Worksheet (Pair of Linear equations in two variable) Chapter 3.pdf" },
          { name: "Class 10th Maths Worksheet Chapter 4 (Quadratic Equations)", file: "/study-material/class-10/maths/Class 10th Maths Worksheet (Quadratic Equations) Chapter 4.pdf" },
          { name: "Class 10th Maths Worksheet Chapter 5 (Arithmetic Progression)", file: "/study-material/class-10/maths/Class 10th  maths worksheet Arithmetic Progression (Chapter 5).pdf" },
          { name: "Class 10th Maths Worksheet (Coordinate Geometry)", file: "/study-material/class-10/maths/Class 10th Coordinate Geometry Worksheet.pdf" },
          { name: "Class 10th Maths Worksheet (Trigonometry)", file: "/study-material/class-10/maths/class-10-trigonometry-worksheet.pdf" },
          { name: "Class 10th Maths Worksheet (Triangle)", file: "/study-material/class-10/maths/class-10-triangle-worksheet.pdf" },
          { name: "Class 10th Maths Worksheet (Circles)", file: "/study-material/class-10/maths/Class 10th Circles Worksheet.pdf" },
        ],
      },
      { name: "Science", icon: FlaskConical, files: [] as { name: string; file: string }[] },
    ],
  },
  {
    id: "class-11",
    label: "Class 11th",
    icon: BookOpen,
    subjects: [
      { name: "Physics", icon: Atom, files: [] as { name: string; file: string }[] },
      { name: "Chemistry", icon: FlaskConical, files: [] as { name: string; file: string }[] },
      { name: "Mathematics", icon: Calculator, files: [] as { name: string; file: string }[] },
      { name: "Biology", icon: Dna, files: [] as { name: string; file: string }[] },
    ],
  },
  {
    id: "class-12",
    label: "Class 12th",
    icon: BookOpen,
    subjects: [
      { name: "Physics", icon: Atom, files: [] as { name: string; file: string }[] },
      { name: "Chemistry", icon: FlaskConical, files: [] as { name: string; file: string }[] },
      { name: "Mathematics", icon: Calculator, files: [] as { name: string; file: string }[] },
      { name: "Biology", icon: Dna, files: [] as { name: string; file: string }[] },
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
    if (filename.endsWith(".docx") || filename.endsWith(".doc")) return "DOCX"
    return "File"
  }

  const getFileIcon = (filename: string) => {
    if (filename.endsWith(".pdf")) return FileText
    if (filename.endsWith(".docx") || filename.endsWith(".doc")) return FileType2
    return File
  }

  const getFileIconColor = (filename: string) => {
    if (filename.endsWith(".pdf")) return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
    if (filename.endsWith(".docx") || filename.endsWith(".doc")) return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    return "bg-primary/10 text-primary"
  }

  return (
    <section id="study-materials" className="py-14 md:py-24 bg-background overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Study Material
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Free Study Resources
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Download chapter-wise notes and practice sheets for Class 8th–12th — completely free.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Step 1 — Select your class
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
            {classes.map((cls) => {
              const Icon = cls.icon
              const isActive = selectedClass === cls.id
              return (
                <button
                  key={cls.id}
                  onClick={() => handleClassSelect(cls.id)}
                  className={`flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 w-full ${isActive
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
                    }`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 ${isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                      }`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span
                    className={`text-[11px] sm:text-xs font-semibold text-center leading-tight ${isActive ? "text-primary" : "text-foreground"
                      }`}
                  >
                    {cls.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {activeClass && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Step 2 — Select subject
            </p>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              {activeClass.subjects.map((subject) => {
                const Icon = subject.icon
                const isActive = selectedSubject === subject.name
                return (
                  <button
                    key={subject.name}
                    onClick={() => handleSubjectSelect(subject.name)}
                    className={`flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-200 ${isActive
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
              <div className="space-y-2.5">
                {activeSubject.files.map((file, index) => {
                  const FileIcon = getFileIcon(file.file)
                  return (
                    <div
                      key={index}
                      className="flex items-start sm:items-center gap-3 p-3 sm:p-4 bg-card border rounded-xl hover:shadow-sm transition-shadow"
                    >
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 ${getFileIconColor(file.file)}`}>
                        <FileIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground leading-snug">
                          {file.name}
                        </p>
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
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs h-8 sm:h-9 px-2.5 sm:px-3"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </a>
                    </div>
            )})}
          </div>
        ) : (
        <div className="flex items-start sm:items-center gap-3 p-4 bg-muted/50 border border-dashed rounded-xl text-muted-foreground">
          <FileText className="h-4 w-4 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-sm">
            No files uploaded yet for {activeClass?.label} {activeSubject.name}. Check back soon!
          </p>
        </div>
            )}
      </div>
        )}

      {/* Placeholder hints */}
      {!selectedClass && (
        <div className="flex items-center gap-3 p-4 bg-muted/50 border border-dashed rounded-xl text-muted-foreground mt-2">
          <ChevronRight className="h-4 w-4 shrink-0" />
          <p className="text-sm">Select a class above to browse available study material.</p>
        </div>
      )}

      {selectedClass && !selectedSubject && (
        <div className="flex items-center gap-3 p-4 bg-muted/50 border border-dashed rounded-xl text-muted-foreground mt-2">
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
    </section>
  )
}