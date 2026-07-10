'use client'
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowToUseEasyPay from "@/components/HowToUse";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/Faq";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden w-full">
      <Hero />
      <Features />
      <HowToUseEasyPay />
      <Testimonials />
      <FAQSection />
      <CTA />
    </div>
  );
}