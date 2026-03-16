"use client"

import { useState } from "react"
import { Star, Quote, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?kgmid=/g/11b6cq3lm_&q=Krishna+Classes+and+Home+Tutors+Bhopal#lrd=0x397c437d1f7995fb:0xdef331183ffda2d7,1"

const PER_PAGE = 9

const reviews = [
  // Image 1
  { name: "Khushbu Yadav", avatar: "KY", rating: 5, date: "3 months ago", text: "I joined this aptitude class and my experience has been really good. The teacher explains every concept in a very simple and clear way. Even difficult topics feel easy because they start from the basics and then gradually move to advanced questions." },
  { name: "Aditi Mehto", avatar: "AM", rating: 5, date: "2 months ago", text: "The teacher is highly knowledgeable and explains concepts very clearly. Their teaching style is engaging, and they ensure that every student understands the topic. I really appreciate their dedication and supportive nature." },
  { name: "Sangam Yadav", avatar: "SY", rating: 5, date: "2 months ago", text: "The best PCM coaching teacher I have ever learned from clear explanations, strong concepts, and excellent support. Their teaching made even tough topics easy to understand. Highly recommended." },
  { name: "Bhumi Choudhary", avatar: "BC", rating: 5, date: "3 months ago", text: "The teacher demonstrates excellent subject knowledge and delivers lessons in a clear, structured manner. Their supportive approach helps students understand even difficult topics with ease. Overall, a dedicated and inspiring educator." },
  { name: "Rohit Saini", avatar: "RS", rating: 5, date: "3 months ago", text: "I had an amazing learning experience with Krishna Sir. His teaching methods and easy-to-understand techniques helped me a lot in cracking my Maths/Aptitude. He explains even the toughest concepts in a very simple and clear way, making learning extremely smooth." },
  { name: "ANU GUPTA", avatar: "AG", rating: 5, date: "a month ago", text: "A safe and professional institute for girls. The teachers are very supportive and provide personal care to help students reach their goals." },
  { name: "Himanshu Bhardwaj", avatar: "HB", rating: 5, date: "3 months ago", text: "krishna classes is very best and very amazing experience and the teacher are very good and well they always treat like your own child and they always provide the works and assignment...its very best ..for the students" },
  { name: "Dev", avatar: "DV", rating: 5, date: "a month ago", text: "One of the best tutor. The kind of knowledge which is providing in this coaching is fabulous. Nature is very polite. Highly recommended." },
  { name: "Sourabh Bamne", avatar: "SB", rating: 5, date: "3 months ago", text: "Excellent coaching institute." },

  // Image 2
  { name: "DURGE SHNI MARKAM", avatar: "DM", rating: 5, date: "3 months ago", text: "Best coaching institute in bhopal\nConcepts are cleared, expertised facluty\nI secured 94 percent in class 10 centre board special thanks to krishna sir for guidance ." },
  { name: "Prince Kush", avatar: "PK", rating: 5, date: "3 months ago", text: "Sir your explanation is awesome I learned new things daily in your classes that inspire me and motivates me to continue my bleach journey." },
  { name: "Bhupendra Goyal", avatar: "BG", rating: 5, date: "3 months ago", text: "Best platform for the learning.\nK.K. sir is brilliant teacher for aptitude.." },
  { name: "Rohan Kasr", avatar: "RK", rating: 5, date: "a year ago", text: "Krishna Sir is an exceptional aptitude teacher who makes complex problems easy to understand. His teaching style is interactive, and he explains concepts with clarity and practical examples. His dedication and support help students improve." },
  { name: "Brij lala Soni", avatar: "BS", rating: 5, date: "a year ago", text: "My son was struggling with Maths in 10th grade, and we decided to enroll him at Krishna Classes. The tutors were patient and explained concepts clearly. Within a few months, his grades improved significantly, and he gained confidence." },
  { name: "Preet Nagar", avatar: "PN", rating: 5, date: "3 months ago", text: "Sir the way your teaches us is awesome, I learned new things daily in your class thank you sir." },
  { name: "Yashvant Singh", avatar: "YS", rating: 5, date: "3 months ago", text: "If anyone want one-on-one learning at home go check-out krisna sir classes and home tutor." },
  { name: "Ankit Meena", avatar: "AM", rating: 5, date: "3 months ago", text: "The kind of knowledge which is providing in this coaching is fabulous. Overall this is wow." },
  { name: "Rishi Sarathe", avatar: "RS", rating: 5, date: "3 months ago", text: "Sir is excellent teaching master and providing the knowledge to the students 😊" },
  { name: "Anash Khan", avatar: "AK", rating: 5, date: "3 months ago", text: "Excellent teaching and very supportive tutors. Highly recommended" },
  { name: "Balram Gupta", avatar: "BG", rating: 5, date: "3 months ago", text: "Excellent coaching." },

  // Image 3
  { name: "Shubham Narware", avatar: "SN", rating: 5, date: "3 months ago", text: "Sir, you are good teaching for students.\nYour explanation is knowledgeable and thank you." },
  { name: "Raj sahu", avatar: "RS", rating: 5, date: "11 months ago", text: "An institute with good staff and peaceful environment. Management is very co-operative and very humble. Good coordination between teachers and students. Every teacher have their own teaching style and specialised in respective subjects.( True teachership ) 👍👍" },
  { name: "saroj sharma", avatar: "SS", rating: 5, date: "a year ago", text: "Krishna Home Tutors provided a fantastic tutor for my daughter's Science subjects. The tutor was punctual, professional, and had a great understanding of the curriculum. The personalized attention and one-on-one sessions made a huge difference. Highly recommend their home tutoring services" },
  { name: "Abhishek Mishra", avatar: "AM", rating: 5, date: "3 months ago", text: "Krishna classes is very best and amazing experience and the teacher are very good." },
  { name: "Shivram Ahirwar", avatar: "SA", rating: 5, date: "3 months ago", text: "Excellent knowledge in the subject!\nDoubt clearing capacity and command on subject is excellent." },
  { name: "Rashi Chourey", avatar: "RC", rating: 5, date: "3 months ago", text: "An excellent PCM teacher who explains concepts clearly and builds strong fundamentals." },
  { name: "Lalit Verma", avatar: "LV", rating: 5, date: "3 months ago", text: "Best coaching institute in bhopal\nConcepts are cleared, expertised faculty" },
  { name: "Laxmi Verma", avatar: "LV", rating: 5, date: "3 months ago", text: "His explanation is very good and his also communicate with very friendly" },
  { name: "Priyansh Sharma", avatar: "PS", rating: 5, date: "3 months ago", text: "Great classes, easy to understand, and very helpful guidance.\"" },
  { name: "Gourav Sarkar", avatar: "GS", rating: 5, date: "3 months ago", text: "Very supportive and always helps students understand better" },
  { name: "Harshit Dubey", avatar: "HD", rating: 5, date: "3 months ago", text: "Excellent coaching." },
]

const overallRating = 4.9
const totalReviews = 398

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "h-5 w-5 sm:h-6 sm:w-6" : "h-3.5 w-3.5 sm:h-4 sm:w-4"
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${sz} ${i <= rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}`} />
      ))}
    </div>
  )
}

const AVATAR_COLORS = [
  "bg-blue-500", "bg-green-500", "bg-violet-500",
  "bg-amber-500", "bg-rose-500", "bg-teal-500",
  "bg-indigo-500", "bg-orange-500", "bg-cyan-500",
]

function Avatar({ initials }: { initials: string }) {
  const idx = ((initials.charCodeAt(0) ?? 0) + (initials.charCodeAt(1) ?? 0)) % AVATAR_COLORS.length
  return (
    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${AVATAR_COLORS[idx]} flex items-center justify-center text-white text-xs sm:text-sm font-bold shrink-0`}>
      {initials}
    </div>
  )
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.text.length > 150
  const displayText = isLong && !expanded ? review.text.slice(0, 150) + "…" : review.text

  return (
    <div className="bg-card border rounded-2xl p-4 sm:p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200 h-full">
      <Quote className="h-4 w-4 text-primary/25 shrink-0" />
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1 whitespace-pre-line">
        {displayText}
        {isLong && (
          <button onClick={() => setExpanded(!expanded)} className="ml-1 text-primary text-xs font-semibold hover:underline">
            {expanded ? "less" : "more"}
          </button>
        )}
      </p>
      <div className="flex items-center gap-2 sm:gap-3 pt-2 border-t border-border mt-auto">
        <Avatar initials={review.avatar} />
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-foreground truncate">{review.name}</p>
          <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
            <Stars rating={review.rating} />
            <span className="text-[10px] sm:text-xs text-muted-foreground">{review.date}</span>
          </div>
        </div>
        <GoogleG />
      </div>
    </div>
  )
}

export function ReviewsSection() {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(reviews.length / PER_PAGE)
  const start = page * PER_PAGE
  const displayed = reviews.slice(start, start + PER_PAGE)

  const goTo = (p: number) => {
    setPage(p)
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section id="reviews" className="py-14 md:py-24 bg-muted/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Reviews</span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            What Parents & Students Say
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Trusted by thousands of families across Kolar, Bhopal. Real reviews from Google.
          </p>
        </div>

        {/* Overall rating card */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="bg-card border rounded-2xl sm:rounded-3xl px-5 sm:px-8 md:px-10 py-5 sm:py-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 shadow-sm w-full max-w-2xl">

            {/* Score */}
            <div className="text-center shrink-0">
              <div className="text-5xl sm:text-6xl font-extrabold text-foreground leading-none">{overallRating}</div>
              <div className="mt-2 flex justify-center"><Stars rating={5} size="lg" /></div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{totalReviews}+ Google Reviews</p>
            </div>

            <div className="hidden sm:block w-px h-20 bg-border shrink-0" />
            {/* Mobile divider */}
            <div className="block sm:hidden w-full h-px bg-border" />

            {/* Bar chart */}
            <div className="space-y-1.5 flex-1 w-full sm:w-auto min-w-0 sm:min-w-[160px]">
              {[{ star: 5, pct: 90 }, { star: 4, pct: 7 }, { star: 3, pct: 2 }, { star: 2, pct: 1 }, { star: 1, pct: 0 }].map(({ star, pct }) => (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-3 text-right">{star}</span>
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 shrink-0" />
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-muted-foreground w-6">{pct}%</span>
                </div>
              ))}
            </div>

            <div className="hidden sm:block w-px h-20 bg-border shrink-0" />

            {/* Google badge */}
            <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-1 shrink-0">
              <GoogleG />
              <p className="text-xs text-muted-foreground font-medium text-center leading-tight">
                Google Reviews
              </p>
            </div>
          </div>
        </div>

        {/* Review cards grid — 1 col mobile, 2 col sm, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {displayed.map((review, i) => (
            <ReviewCard key={`${review.name}-${start + i}`} review={review} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3 sm:gap-4">

          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
            {/* Prev */}
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border bg-card flex items-center justify-center text-foreground hover:border-primary/40 hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${i === page
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages - 1}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border bg-card flex items-center justify-center text-foreground hover:border-primary/40 hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Page info */}
          <p className="text-xs text-muted-foreground">
            Showing {start + 1}–{Math.min(start + PER_PAGE, reviews.length)} of {reviews.length} reviews
          </p>

          {/* Google link */}
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-primary hover:underline"
          >
            <GoogleG />
            View all {totalReviews}+ reviews on Google
            <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </a>

          <p className="text-xs text-muted-foreground text-center px-4">
            Happy with us? Leave us a review on Google — it helps other parents find us! 🙏
          </p>
        </div>

      </div>
    </section>
  )
}