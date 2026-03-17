/**
 * ==========================================
 * KRISHNA CLASSES - SITE CONFIGURATION
 * ==========================================
 * 
 * This file contains all configurable settings for the website.
 * Edit the values below to update offers, contact info, and other settings.
 * No coding knowledge required - just change the values!
 * 
 * HOW TO ADD A NEW OFFER:
 * 1. Copy an existing offer object in the 'offers' array
 * 2. Change the values (id, name, discount, dates, etc.)
 * 3. Set 'active: true' to enable it
 * 4. Set other offers to 'active: false' if you want only one active
 * 
 * HOW TO DISABLE ALL OFFERS:
 * Set 'active: false' on all offer objects
 * 
 * FESTIVAL OFFER EXAMPLES:
 * - Diwali: October-November
 * - Holi: March
 * - Independence Day: August
 * - New Year: December-January
 * - Summer Vacation: April-June
 */

export const siteConfig = {
  // Contact Information
  contact: {
    phone: "+91 78690 69906",
    email: "krishnaclasses2009@gmail.com",
    address: "Address: 207, Mandakini colony, Near Mandakini square, opposite Vimal Saree Emporium Kolar road Bhopal 462042",
    timings: "Mon - Sat: 8:00 AM - 8:00 PM",
    businessMobile: "9244315580"
  },

  // Social Media Links
  social: {
    facebook: "https://www.facebook.com/share/1FufshRYsj/",
    instagram: "https://www.instagram.com/krishna_classes_bhopal?utm_source=qr&igsh=bHY0czE0eWE4dm8=",
    youtube: "https://youtube.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },

  // Offers Configuration
  // Set active: true to show the offer, false to hide it
  // You can add multiple offers, only the first active one will be displayed
  offers: [
    {
      id: "diwali-2024",
      name: "Diwali Special Offer",
      badge: "Festival Special",
      discount: "20% OFF on All Courses",
      description: "Celebrate the festival of lights with our special discount on all courses. Limited time offer!",
      code: "DIWALI20",
      validFrom: "2024-10-15",
      validUntil: "2024-11-15",
      active: false, // Set to false to disable this offer
      appliesTo: ["all"], // Can be ["jee", "neet", "foundation"] or ["all"]
    },
    {
      id: "new-year-2025",
      name: "New Year Offer",
      badge: "New Year Special",
      discount: "15% OFF + Free Study Material",
      description: "Start your new year with knowledge! Get 15% off and free study material.",
      code: "NEWYEAR15",
      validFrom: "2024-12-25",
      validUntil: "2025-01-15",
      active: false,
      appliesTo: ["all"],
    },
    {
      id: "summer-camp",
      name: "Summer Camp Enrollment",
      badge: "Summer Special",
      discount: "Early Bird: 25% OFF",
      description: "Book your summer crash course now and save big!",
      code: "SUMMER25",
      validFrom: "2025-03-01",
      validUntil: "2025-04-30",
      active: false,
      appliesTo: ["jee", "neet"],
    },
  ],

  // Course Pricing (for display with/without offers)
  coursePricing: {
    jee: {
      regular: 81250,   // crossed out (original)
      discounted: 56000, // highlighted (actual)
    },
    neet: {
      regular: 75000,
      discounted: 50000,
    },
    foundation: {
      regular: 45000,
      discounted: 36000,
    },
    homeTuition: {
      regular: 35000,
      discounted: null,
    },
  },

  // Testimonials Display Settings
  testimonialsSettings: {
    autoRotate: true,
    rotateInterval: 5000, // milliseconds
    showCount: 3, // Number of testimonials to show at once on desktop
  },

  // Gallery Settings
  gallerySettings: {
    itemsPerPage: 12,
    enableLightbox: true,
  },
}

export const openings = [
  {
    id: 1,
    title: "Home Tutor",
    department: "Teaching",
    location: "Kolar, Bhopal (Home Visits)",
    type: "Part Time + Full Time",
    experience: "2+ Years",
    description:
      "We are looking for dedicated home tutors who can teach students from Class 1st to 12th across any subject. Candidates must be comfortable travelling to students' homes and delivering personalised, effective lessons.",
    requirements: [
      "Graduate in any discipline (B.Ed. preferred)",
      "Ability to teach Class 1st to 12th (any subject)",
      "Minimum 2 years of teaching or tutoring experience",
      "Strong communication and interpersonal skills",
      "Punctual, patient, and student-friendly approach",
      "Flexible availability as per student schedule",
    ],
  },
]

export const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Krishna+Classes+and+Home+Tutors+Bhopal/@23.1849918,77.4162451,17.19z/data=!4m6!3m5!1s0x397c437d1f7995fb:0xdef331183ffda2d7!8m2!3d23.1847551!4d77.4185513!16s%2Fg%2F11b6cq3lm_?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D"
// Helper function to get active offer
export function getActiveOffer() {
  const now = new Date()
  return siteConfig.offers.find(offer => {
    if (!offer.active) return false
    const validFrom = new Date(offer.validFrom)
    const validUntil = new Date(offer.validUntil)
    return now >= validFrom && now <= validUntil
  })
}

// Helper function to calculate discounted price
export function getDiscountedPrice(originalPrice: number, discountPercentage: number) {
  return Math.round(originalPrice * (1 - discountPercentage / 100))
}
