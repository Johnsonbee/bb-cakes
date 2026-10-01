"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Sun, Heart, ArrowRight } from "lucide-react";
import { academyPrograms } from "@/data/academy";
import { getAcademyMessage, openWhatsApp } from "@/lib/whatsapp";

gsap.registerPlugin(ScrollTrigger);

const icons = [GraduationCap, Sun, Heart];

export default function Academy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            delay: i * 0.15,
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
      id="academy"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-bb-cream via-bb-soft/30 to-bb-cream overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-bb-primary/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-bb-hot/5 rounded-full blur-3xl" />

      <div className="section-padding relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <p className="text-bb-primary font-medium text-sm tracking-widest uppercase mb-3">
            Learn & Grow
          </p>
          <h2 className="heading-lg text-bb-dark mb-4">
            BB <span className="text-bb-primary">ACADEMY</span>
          </h2>
          <p className="body-lg">
            Where passion meets the oven. BB doesn&apos;t just bake — she teaches, mentors, 
            and builds a community of bakers who become family. From adult masterclasses to 
            joyful kids&apos; summer camps, there&apos;s a place for everyone in our kitchen.
          </p>
        </div>

        {/* Program Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {academyPrograms.map((program, i) => {
            const Icon = icons[i];
            const programKeys = ["adult", "kids", "family"];
            return (
              <div
                key={program.id}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg shadow-bb-dark/5 hover:shadow-xl hover:shadow-bb-primary/10 transition-all duration-500"
                style={{ perspective: "1000px" }}
              >
                {/* Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-bb-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-bb-dark mb-2">
                    {program.title}
                  </h3>
                  <p className="text-sm text-bb-dark/70 mb-4 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2 mb-6">
                    {program.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-xs text-bb-dark/60">
                        <span className="w-1.5 h-1.5 bg-bb-primary rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openWhatsApp(getAcademyMessage(programKeys[i]))}
                    className="inline-flex items-center gap-2 text-bb-primary font-medium text-sm group/btn"
                  >
                    {program.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-bb-dark/60 text-sm mb-4">
            Not sure which program is right for you? Let&apos;s chat!
          </p>
          <button
            onClick={() => openWhatsApp(getAcademyMessage("family"))}
            className="btn-outline gap-2"
          >
            ASK ABOUT CLASSES
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
