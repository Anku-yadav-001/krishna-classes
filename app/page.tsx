import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { CoursesSection } from "@/components/sections/courses"
import { ResultsSection } from "@/components/sections/results"
import { FacultySection } from "@/components/sections/faculty"
import { BatchesSection } from "@/components/sections/batches"
import { AchievementsSection } from "@/components/sections/achievements"
import { ReviewsSection } from "@/components/sections/reviews"   // ← new
import { GallerySection } from "@/components/sections/gallery"
import { FAQSection } from "@/components/sections/faq"
import { CareersSection } from "@/components/sections/careers"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { OfferBanner } from "@/components/offer-banner"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <ResultsSection />
      <FacultySection />
      <BatchesSection />
      <AchievementsSection />
      <ReviewsSection /> 
      <GallerySection />
      <FAQSection />
      <CareersSection />
      <ContactSection />
      <Footer />
      <OfferBanner />
    </main>
  )
}