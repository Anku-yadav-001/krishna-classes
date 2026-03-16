"use client"

import { BookOpen, GraduationCap, Award } from "lucide-react"
import Image from "next/image"

const faculty = [
  {
    name: "K K Gupta",
    subjects: "Maths & Science",
    qualification: "M.Tech, B.Tech",
    experience: "12",
    description: "A seasoned educator with over a decade of experience in making complex mathematical and scientific concepts accessible to students.",
    photoUrl: "",
  },
  {
    name: "Gaurav Mishra",
    subjects: "Mathematics",
    qualification: "M.Tech, B.Tech",
    experience: "13",
    description: "Expert mathematics faculty specializing in problem-solving techniques for competitive exams with 13+ years of dedication.",
    photoUrl: "",
  },
  {
    name: "Dheerendra Patel",
    subjects: "Chemistry",
    qualification: "Ph.D. (Spain)",
    experience: "20",
    description: "Internationally trained chemist with a Ph.D. from Spain and two decades of teaching excellence in chemistry education.",
    photoUrl: "",
  },
  {
    name: "Aniket Sandilya",
    subjects: "Social Studies",
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
    <section id="faculty" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Our Faculty
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
            Learn from the Best Minds
          </h2>
          <p className="mt-4 text-slate-600 text-lg text-pretty">
            Our faculty comprises experienced educators who are passionate about nurturing the next generation of achievers.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              {/* Photo Area with S-curve Bottom */}
              <div className="h-40 bg-primary flex items-center justify-center relative">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-blue-400/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white/20 group-hover:scale-105 transition-transform duration-300">
                    {member.name.charAt(0)}
                  </div>
                )}

                {/* Decorative circles */}
                <div className="absolute top-3 right-3 w-12 h-12 bg-white/10 rounded-full" />
                <div className="absolute top-6 right-8 w-6 h-6 bg-white/10 rounded-full" />

                {/* S-curve bottom edge */}
                <div className="absolute -bottom-px left-0 right-0">
                  <svg viewBox="0 0 400 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
                    <path d="M0 50V25C0 25 50 35 100 30C150 25 200 10 250 15C300 20 350 35 400 25V50H0Z" fill="white" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="px-5 pb-5 pt-1">
                {/* Name and Experience */}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{member.name}</h3>
                    <p className="text-sm font-semibold text-blue-600">{member.subjects}</p>
                  </div>
                  <div className="bg-blue-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-blue-600" />
                    <span className="text-xs font-bold text-blue-600">{member.experience} Yrs</span>
                  </div>
                </div>

                {/* Qualification */}
                <div className="flex items-center gap-2 text-slate-600 mb-2">
                  <div className="bg-blue-50 p-1.5 rounded-md">
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">{member.qualification}</span>
                </div>

                {/* Description */}
                <div className="flex items-start gap-2 text-slate-500">
                  <div className="bg-blue-50 p-1.5 rounded-md flex-shrink-0 mt-0.5">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-sm leading-relaxed line-clamp-2">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
