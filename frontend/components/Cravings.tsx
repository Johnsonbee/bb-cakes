"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { cravings } from "@/data/cravings";

gsap.registerPlugin(ScrollTrigger);

export default function Cravings() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
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

      // Cards stagger animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cravings"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-bb-cream overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-bb-soft/30 to-transparent pointer-events-none" />

      <div className="section-padding relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <p className="text-bb-primary font-medium text-sm tracking-widest uppercase mb-3">
            Explore Our World
          </p>
          <h2 className="heading-lg text-bb-dark">
            WHAT DO YOU<br className="sm:hidden" />{" "}
            <span className="text-bb-primary">CRAVE</span> TODAY?
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {cravings.map((craving, i) => (
            <div
              key={craving.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
              style={{ minHeight: "380px" }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={craving.image}
                  alt={craving.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${craving.color} via-black/20 to-black/60 transition-opacity duration-500`} />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-3">
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-2">
                    {craving.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {craving.subtitle}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={craving.link}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(craving.link)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0"
                >
                  EXPLORE
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-white/30 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
