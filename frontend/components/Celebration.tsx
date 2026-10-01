"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
import { occasions } from "@/data/occasions";
import { openWhatsApp } from "@/lib/whatsapp";

gsap.registerPlugin(ScrollTrigger);

export default function Celebration() {
  const [activeOccasion, setActiveOccasion] = useState(occasions[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleOccasionChange = (occasion: typeof occasions[0]) => {
    if (occasion.id === activeOccasion.id) return;

    // Animate out
    if (contentRef.current && imageRef.current) {
      const tl = gsap.timeline();

      tl.to(contentRef.current.children, {
        y: -20,
        opacity: 0,
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.in",
      });

      tl.to(
        imageRef.current,
        { scale: 0.95, opacity: 0, duration: 0.3, ease: "power2.in" },
        "-=0.2"
      );

      tl.call(() => setActiveOccasion(occasion));

      tl.fromTo(
        imageRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      tl.fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    } else {
      setActiveOccasion(occasion);
    }
  };

  return (
    <section
      id="celebration"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-bb-cream overflow-hidden"
    >
      {/* Dynamic background based on occasion */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${activeOccasion.theme} opacity-5 transition-all duration-1000 pointer-events-none`}
      />

      <div className="section-padding relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <p className="text-bb-primary font-medium text-sm tracking-widest uppercase mb-3">
            Find Your Perfect Cake
          </p>
          <h2 className="heading-lg text-bb-dark">
            WHAT ARE WE <span className="text-bb-primary">CELEBRATING?</span>
          </h2>
        </div>

        {/* Occasion Selector */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 lg:mb-16">
          {occasions.map((occasion) => (
            <button
              key={occasion.id}
              onClick={() => handleOccasionChange(occasion)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeOccasion.id === occasion.id
                  ? "bg-bb-primary text-white shadow-lg shadow-bb-primary/25 scale-105"
                  : "bg-white text-bb-dark/70 hover:bg-bb-soft hover:text-bb-primary border border-bb-dark/10"
              }`}
            >
              {occasion.label}
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image */}
            <div ref={imageRef} className="relative order-1 lg:order-1">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-bb-dark/10">
                <img
                  src={activeOccasion.image}
                  alt={activeOccasion.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Floating decoration */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-float z-20">
                <Sparkles className="w-7 h-7 text-bb-primary" />
              </div>
            </div>

            {/* Text Content */}
            <div ref={contentRef} className="order-2 lg:order-2 text-center lg:text-left">
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-bb-dark mb-4 leading-tight">
                {activeOccasion.headline}
              </h3>
              <p className="body-lg mb-8 max-w-md mx-auto lg:mx-0">
                {activeOccasion.description}
              </p>
              <button
                onClick={() => openWhatsApp(activeOccasion.message)}
                className="btn-primary gap-2"
              >
                {activeOccasion.cta}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
