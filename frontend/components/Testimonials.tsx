"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const activeTestimonial = testimonials[activeIndex];

  const animateTransition = useCallback((direction: "next" | "prev") => {
    if (!cardRef.current) return;

    const tl = gsap.timeline();

    tl.to(cardRef.current, {
      x: direction === "next" ? -40 : 40,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    tl.call(() => {
      setActiveIndex((prev) =>
        direction === "next"
          ? (prev + 1) % testimonials.length
          : (prev - 1 + testimonials.length) % testimonials.length
      );
    });

    tl.fromTo(
      cardRef.current,
      { x: direction === "next" ? 40 : -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      animateTransition("next");
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, animateTransition]);

  // Progress bar animation
  useEffect(() => {
    if (!progressRef.current || isPaused) return;
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 6, ease: "none" }
    );
  }, [activeIndex, isPaused]);

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

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-bb-cream to-bb-soft/20 overflow-hidden"
    >
      <div className="section-padding relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <p className="text-bb-primary font-medium text-sm tracking-widest uppercase mb-3">
            Real Stories
          </p>
          <h2 className="heading-lg text-bb-dark max-w-3xl mx-auto">
            STORIES FROM PEOPLE WHO <span className="text-bb-primary">CELEBRATED</span> WITH US
          </h2>
        </div>

        {/* Testimonial Card (Image frame removed) */}
        <div
          className="max-w-3xl mx-auto touch-pan-y"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={(e) => {
            setIsPaused(true);
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            setIsPaused(false);
            const deltaX = e.changedTouches[0].clientX - touchStartX.current;
            const deltaY = e.changedTouches[0].clientY - touchStartY.current;
            if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
              if (deltaX < 0) {
                animateTransition("next");
              } else {
                animateTransition("prev");
              }
            }
          }}
        >
          <div
            ref={cardRef}
            className="relative bg-white rounded-3xl shadow-xl shadow-bb-dark/5 border border-bb-dark/5 p-8 sm:p-12 md:p-14 text-center overflow-hidden"
          >
            {/* Soft decorative background glow */}
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-80 h-80 bg-bb-soft/25 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-bb-primary/20 mb-6" />

              {/* Stars */}
              <div className="flex justify-center gap-1.5 mb-6">
                {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="font-serif text-xl sm:text-2xl md:text-3xl text-bb-dark leading-relaxed mb-8 max-w-2xl">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </p>

              <div className="flex flex-col items-center">
                <p className="font-semibold text-base sm:text-lg text-bb-dark tracking-tight">
                  {activeTestimonial.name}
                </p>
                <p className="text-xs sm:text-sm font-medium text-bb-primary uppercase tracking-wider mt-0.5">
                  {activeTestimonial.occasion}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 px-2">
            {/* Progress */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-bb-dark">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <div className="w-24 h-1 bg-bb-dark/10 rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full bg-bb-primary rounded-full origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <span className="text-sm font-medium text-bb-dark/40">
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => animateTransition("prev")}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-bb-dark hover:bg-bb-primary hover:text-white transition-all duration-300 active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => animateTransition("next")}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-bb-dark hover:bg-bb-primary hover:text-white transition-all duration-300 active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Your Turn CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <p className="font-serif text-2xl sm:text-3xl text-bb-dark mb-2">Your turn.</p>
          <p className="text-bb-dark/60 mb-6">What are you celebrating?</p>
        </div>
      </div>
    </section>
  );
}
