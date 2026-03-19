"use client"

import { BookOpen, GraduationCap, Award } from "lucide-react"
import Image from "next/image"

const faculty = [
  {
    name: "K K Gupta",
    subjects: "Maths & Physics",
    qualification: "M.Tech, B.Tech",
    experience: "12",
    description: "A seasoned educator with over a decade of experience in making complex mathematical and scientific concepts accessible to students.",
    photoUrl: "/faculties/kk-gupta.png",
  },
  {
    name: "Gaurav Mishra",
    subjects: "Mathematics",
    qualification: "M.Tech, B.Tech",
    experience: "13",
    description: "Expert mathematics faculty specializing in problem-solving techniques for competitive exams with 13+ years of dedication.",
    photoUrl: "/faculties/gaurav-mishra.png",
  },
  {
    name: "Dheerendra Patel",
    subjects: "Chemistry",
    qualification: "Ph.D. (Spain)",
    experience: "20",
    description: "Internationally trained chemist with a Ph.D. from Spain and two decades of teaching excellence in chemistry education.",
    photoUrl: "/faculties/dheerendra-patel.png",
  },
  {
    name: "Aniket Sandilya",
    subjects: "English & Social Studies",
    qualification: "M.A.",
    experience: "5",
    description: "Dynamic educator who brings history and civics to life through engaging storytelling and interactive teaching methods.",
    photoUrl: "",
  },
  {
    name: "Dr. Shreya Pathak",
    subjects: "Biology",
    qualification: "BHMS",
    experience: "4",
    description: "Medical professional turned educator with hands-on clinical knowledge, making biology practical for aspiring medical students.",
    photoUrl: "",
  },
]

export function FacultySection() {
  return (
    <section id="faculty" className="py-14 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Our Faculty
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Learn from the Best Minds
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Our faculty comprises experienced educators who are passionate about nurturing the next generation of achievers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {faculty.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              {/* Blue banner with centered circular photo */}
              <div className="h-36 sm:h-40 bg-primary flex items-center justify-center relative overflow-hidden">

                {/* Decorative circles */}
                <div className="absolute top-3 right-3 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full pointer-events-none" />
                <div className="absolute top-5 right-7 w-5 h-5 sm:w-6 sm:h-6 bg-white/10 rounded-full pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/10 rounded-full pointer-events-none" />

                {/* Centered circular avatar */}
                <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-4 ring-white/30 overflow-hidden group-hover:scale-105 transition-transform duration-300 shrink-0">
                  {member.photoUrl ? (
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-400/40 flex items-center justify-center text-white text-3xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* S-curve bottom edge */}
                <div className="absolute -bottom-px left-0 right-0">
                  <svg viewBox="0 0 400 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
                    <path d="M0 50V25C0 25 50 35 100 30C150 25 200 10 250 15C300 20 350 35 400 25V50H0Z" fill="white" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="px-4 sm:px-5 pb-5 pt-3">
                {/* Name + experience badge */}
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 text-base sm:text-lg leading-tight truncate">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-blue-600 truncate">{member.subjects}</p>
                  </div>
                  <div className="bg-blue-50 px-2 py-1 rounded-lg flex items-center gap-1 shrink-0">
                    <Award className="h-3.5 w-3.5 text-blue-600" />
                    <span className="text-xs font-bold text-blue-600 whitespace-nowrap">{member.experience} Yrs</span>
                  </div>
                </div>

                {/* Qualification */}
                <div className="flex items-center gap-2 text-slate-600 mb-2">
                  <div className="bg-blue-50 p-1.5 rounded-md shrink-0">
                    <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium truncate">{member.qualification}</span>
                </div>

                {/* Description */}
                <div className="flex items-start gap-2 text-slate-500">
                  <div className="bg-blue-50 p-1.5 rounded-md shrink-0 mt-0.5">
                    <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
