"use client"

import { useState } from "react"
import { Star, Quote, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?kgmid=/g/11b6cq3lm_&q=Krishna+Classes+and+Home+Tutors+Bhopal#lrd=0x397c437d1f7995fb:0xdef331183ffda2d7,1"

const PER_PAGE = 9

const reviews = [
  { name: "Nilufar Khan", avatar: "NK", rating: 5, date: "a month ago", text: "Sir you are an accomplished and valuable teacher who makes complex problems easy to understand. His teaching style is interactive, and he explains concepts with clarity and practical examples. His dedication and support to his students inspires." },
  { name: "Raj ku Bind", avatar: "RB", rating: 5, date: "a month ago", text: "My son struggled with Maths in 10th grade, and we decided to enroll him at Krishna Classes. The tutors were patient and explained concepts clearly. Within a few months, his grades improved significantly and he gained confidence." },
  { name: "Clinton Patel", avatar: "CP", rating: 5, date: "a month ago", text: "I had an exceptional learning experience with Krishna Sir. His teaching style is clear, engaging, and student-centered. He explains concepts with crystal clear steps, making it easy to grasp and apply them in practice." },
  { name: "Shambhavi Yadav", avatar: "SY", rating: 5, date: "a month ago", text: "Highly Experienced Faculty. The coaching institute has well qualified and experienced teachers who explain concepts in a very simple and effective manner." },
  { name: "Lanju Jhumu", avatar: "LJ", rating: 5, date: "a month ago", text: "Krishna home classes provided a fantastic tutor for my daughter's Science subjects. The tutor was punctual, professional, and had a great understanding of the curriculum. The personalized attention made a huge difference in her learning." },
  { name: "Raj arko", avatar: "RA", rating: 5, date: "a month ago", text: "An excellent coaching with good and peaceful environment. Management is very cooperative and very humble. Good correlation between teachers and students. Every teacher has their own teaching style and qualification in respective subjects." },
  { name: "Anush Khan", avatar: "AK", rating: 5, date: "a month ago", text: "Excellent teaching and very supportive tuition. Highly recommended." },
  { name: "RuhanRajhi", avatar: "RR", rating: 5, date: "a month ago", text: "Best classes for girls with safe environment and experienced faculty." },
  { name: "VidhuGautam", avatar: "VG", rating: 5, date: "a month ago", text: "A dedicated math teacher who explains every concept clearly and makes tough topics easy." },
  { name: "Shashi Patel", avatar: "SP", rating: 5, date: "2 months ago", text: "I enrolled my child in Krishna Classes 4 years ago. I've been happy for 4 years for my 9th and 10th grade child. Over the past 4 years my experience has been tremendous. Krishna sir is very passionate about teaching." },
  { name: "Rashoop Nikita", avatar: "RN", rating: 5, date: "2 months ago", text: "Krishna Classes and Home Tutors in Bhopal have been excellent for my Class 12 preparation. The teachers are knowledgeable, supportive, and provide personalised attention to each student. Highly recommended." },
  { name: "Bhanu Charasid", avatar: "BC", rating: 5, date: "2 months ago", text: "I really appreciated the quality of my education at Krishna Classes Bhopal. I learned PCM perfectly in class 12 with ease. I would spread thanks to Krishna sir for guidance." },
  { name: "Maili France", avatar: "MF", rating: 5, date: "2 months ago", text: "Very amazing. I love the personality and their knowledge about the topic. This way of teaching is very productive 😊" },
  { name: "Rogar Ful", avatar: "RF", rating: 5, date: "2 months ago", text: "According to my son, he is brilliant. I have never seen such a teacher by good mentor, good person and also an old teacher. I cannot explain — he is just a good asset." },
  { name: "Hamid Clancy", avatar: "HC", rating: 5, date: "2 months ago", text: "Talent understanding of the subject is essential, but the ability to translate that knowledge into effective teaching is what truly makes a great teacher." },
  { name: "Nisha Chandal", avatar: "NC", rating: 5, date: "2 months ago", text: "Good for Juniors — very informative and a great person for any guidance. Sir is the right guy for everything." },
  { name: "Anjali Dabeeral", avatar: "AD", rating: 5, date: "2 months ago", text: "Best coaching center in Bhopal. Teachers are very experienced and friendly. I cleared JEE and I am grateful. 10/10 would recommend — spread thanks to Krishna sir for guidance." },
  { name: "Rashida Kayinga", avatar: "RK", rating: 5, date: "2 months ago", text: "It is one of the best home tutor providers at Bhopal. Specially for those who can't afford big coaching classes." },
  { name: "Arpit Pandey", avatar: "AP", rating: 4, date: "2 months ago", text: "It's a good coaching place. I am studying here from 3 years and I am quite satisfied with the education." },
  { name: "Anudeep Agrawal", avatar: "AA", rating: 5, date: "2 months ago", text: "They are the teachers who understand your learning style and goals." },
  { name: "Adda a Singh", avatar: "AS", rating: 5, date: "2 months ago", text: "Best coaching institute. I am fully satisfied with their commitment towards students." },
  { name: "Keshla Yomas", avatar: "KY", rating: 5, date: "2 months ago", text: "Appreciate your efforts in providing individual attention and support to struggling students." },
  { name: "Chandrav Kumar", avatar: "CK", rating: 5, date: "2 months ago", text: "Good for Junior kids — thorough knowledge of the subjects they teach." },
  { name: "Bhaushan Yadav", avatar: "BY", rating: 5, date: "3 months ago", text: "The teacher demonstrates excellent subject knowledge. Their coaching and support helps students understand even difficult topics with ease. Overall, a dedicated and inspiring educator." },
  { name: "Maili Reld", avatar: "MR", rating: 5, date: "3 months ago", text: "I had an amazing learning experience with Krishna Sir. His teaching methods are easy to understand. He explains even the toughest concepts in a very simple and clear way, making learning extremely smooth." },
  { name: "ABU SUPTA", avatar: "AS", rating: 5, date: "3 months ago", text: "Good academic and professional institute for girls. The teachers are very supportive and provide personal care to students to reach their goals." },
  { name: "Dur", avatar: "DU", rating: 5, date: "3 months ago", text: "Determined man. The kind of knowledge which is providing in this coaching is fabulous. Nature is very cooperative and friendly." },
  { name: "Rohani Dileep", avatar: "RD", rating: 5, date: "a month ago", text: "Thank you for all your guidance and your teaching staff is excellent." },
  { name: "Rajul Choubey", avatar: "RC", rating: 5, date: "2 months ago", text: "Very enjoyable experience. Their way of teaching and using techniques helped me a lot in understanding my studies." },
  { name: "Shibi Rehman", avatar: "SR", rating: 4, date: "2 months ago", text: "This was the first coaching I have ever attended. I am fully satisfied and I recommend everyone to attend here. It is the best coaching and I am still attending." },
  { name: "Khushboo Kanwar", avatar: "KK", rating: 4, date: "a month ago", text: "Sir, you are good at teaching for students. Your explanation is knowledgeable and thank you." },
  { name: "Rhoah jupujal", avatar: "RJ", rating: 5, date: "2 months ago", text: "He is a great person overall. His teaching is challenging but worth doing my assignments and achieving my goals." },
  { name: "Nidhi Shukla", avatar: "NS", rating: 5, date: "2 months ago", text: "The coaching is very helpful for me — it provides the best student care and interest." },
  { name: "Sunil Paratkar", avatar: "SP", rating: 5, date: "2 months ago", text: "Teaching way and Sir is very supportive. Sir has a lot of knowledge to explain." },
  { name: "Abhijay Kautkale", avatar: "AK", rating: 4, date: "2 months ago", text: "Krishna sir is a good teacher in NEET mentorship." },
  { name: "Rucif Chaney", avatar: "RC", rating: 5, date: "a month ago", text: "An excellent PCM teacher who explains concepts clearly and builds strong fundamentals." },
]

const overallRating = 4.9
const totalReviews = 398

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "h-6 w-6" : "h-4 w-4"
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
    <div className={`w-10 h-10 rounded-full ${AVATAR_COLORS[idx]} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
      {initials}
    </div>
  )
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
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
    <div className="bg-card border rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200 h-full">
      <Quote className="h-4 w-4 text-primary/25 shrink-0" />
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {displayText}
        {isLong && (
          <button onClick={() => setExpanded(!expanded)} className="ml-1 text-primary text-xs font-semibold hover:underline">
            {expanded ? "less" : "more"}
          </button>
        )}
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-border mt-auto">
        <Avatar initials={review.avatar} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{review.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <Stars rating={review.rating} />
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
        </div>
        <GoogleG />
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ReviewsSection() {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(reviews.length / PER_PAGE)
  const start = page * PER_PAGE
  const displayed = reviews.slice(start, start + PER_PAGE)

  const goTo = (p: number) => {
    setPage(p)
    // Scroll back to section top smoothly
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section id="reviews" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Reviews</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
            What Parents & Students Say
          </h2>
          <p className="mt-4 text-muted-foreground text-lg text-pretty">
            Trusted by thousands of families across Kolar, Bhopal. Real reviews from Google.
          </p>
        </div>

        {/* Overall rating card */}
        <div className="flex justify-center mb-12">
          <div className="bg-card border rounded-3xl px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm w-full max-w-2xl">
            <div className="text-center shrink-0">
              <div className="text-6xl font-extrabold text-foreground leading-none">{overallRating}</div>
              <div className="mt-2 flex justify-center"><Stars rating={5} size="lg" /></div>
              <p className="text-sm text-muted-foreground mt-1">{totalReviews}+ Google Reviews</p>
            </div>

            <div className="hidden sm:block w-px h-20 bg-border shrink-0" />

            <div className="space-y-1.5 flex-1 min-w-[160px]">
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

            <div className="flex flex-col items-center gap-1 shrink-0">
              <GoogleG />
              <p className="text-xs text-muted-foreground font-medium text-center leading-tight mt-1">Google<br />Reviews</p>
            </div>
          </div>
        </div>

        {/* Review cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[400px]">
          {displayed.map((review, i) => (
            <ReviewCard key={`${review.name}-${start + i}`} review={review} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex flex-col items-center gap-4">

          {/* Page controls */}
          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              className="w-9 h-9 rounded-xl border bg-card flex items-center justify-center text-foreground hover:border-primary/40 hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page dots/numbers */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-9 h-9 rounded-xl border text-sm font-semibold transition-all ${i === page
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
              className="w-9 h-9 rounded-xl border bg-card flex items-center justify-center text-foreground hover:border-primary/40 hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <GoogleG />
            View all {totalReviews}+ reviews on Google
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <p className="text-xs text-muted-foreground">
            Happy with us? Leave us a review on Google — it helps other parents find us! 🙏
          </p>
        </div>

      </div>
    </section>
  )
}