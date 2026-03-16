"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    question: "What courses does Krishna Classes offer?",
    answer: "We offer comprehensive coaching for IIT-JEE (Main & Advanced), NEET-UG, Foundation courses for Class 8-10, and Olympiad training. Each course is designed with a focus on conceptual clarity and exam-oriented preparation."
  },
  {
    question: "What is the batch size at Krishna Classes?",
    answer: "We maintain small batch sizes of 25-30 students to ensure personalized attention. This allows our faculty to address individual doubts and track each student's progress effectively."
  },
  {
    question: "Who are the faculty members at Krishna Classes?",
    answer: "Our faculty comprises experienced educators from premier institutions and top universities. They have an average teaching experience of 10+ years and have mentored thousands of successful students."
  },
  {
    question: "Do you offer online classes?",
    answer: "No, we offer only offline batch options."
  },
  {
    question: "What study materials are provided?",
    answer: "Students receive comprehensive study materials including topic-wise notes, practice sheets, previous year question papers, mock tests, and formula handbooks. All materials are regularly updated as per the latest exam patterns."
  },
  {
    question: "How are doubt-clearing sessions conducted?",
    answer: "We have dedicated doubt-clearing sessions after regular classes. Students can also book one-on-one sessions with faculty members. Additionally, we have a WhatsApp support group for quick doubt resolution."
  },
  {
    question: "What is the fee structure?",
    answer: "Fee varies by course and batch type. JEE preparation costs around ₹85,000/year, NEET preparation ₹75,000/year, Foundation courses ₹45,000/year, and Olympiad training ₹35,000/year. We also offer installment options and scholarships for meritorious students."
  },
  {
    question: "How can I enroll my child?",
    answer: "You can enroll by visiting our center, calling our helpline, or filling the contact form on our website. We conduct a counseling session to understand the student's needs and recommend the most suitable course and batch."
  },
  {
    question: "Do you offer scholarship or fee concession?",
    answer: "Yes, we offer scholarships based on performance in our scholarship test conducted every year. Meritorious students can get up to 100% fee waiver. We also have special concessions for economically weaker students."
  },
  {
    question: "What are the timings of the coaching center?",
    answer: "Our center operates from 9:00 AM to 9:00 PM on weekdays and 10:00 AM to 9:00 PM on weekends. We offer evening batches to accommodate students with different school timings."
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-14 md:py-24 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">FAQs</span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Find answers to common questions about our courses, admission process, and facilities.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-xl px-4 sm:px-5 data-[state=open]:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left text-sm sm:text-base text-foreground hover:text-primary py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Still have questions */}
        <div className="mt-10 md:mt-12 text-center bg-muted rounded-xl p-6 sm:p-8">
          <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-primary mx-auto mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            {"Can't find the answer you're looking for? Our team is happy to help."}
          </p>
          <Button asChild className="w-full sm:w-auto">
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>

      </div>
    </section>
  )
}
