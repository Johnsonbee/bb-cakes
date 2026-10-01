"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Award, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { x: -80, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Content reveal
      if (contentRef.current) {
        const children = contentRef.current.children;
        gsap.fromTo(
          children,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Stats counter animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 90%",
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
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-bb-cream overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bb-soft/20 to-transparent pointer-events-none" />

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:items-start">
          {/* Image Side */}
          <div ref={imageRef} className="relative w-full max-w-md lg:max-w-[450px] xl:max-w-[470px] mx-auto lg:mx-0">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl shadow-bb-dark/10">
              <img
                src="/images/about/about_owner_portrait.jpg"
                alt="BB Cakes Owner"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-bb-dark/20 via-transparent to-transparent" />
            </div>

            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-bb-primary/20 rounded-3xl -z-10" />

            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 lg:bottom-6 lg:-right-6 bg-white rounded-2xl shadow-xl p-5 z-20 border border-bb-primary/10">
              <div className="text-center">
                <p className="font-serif text-4xl font-bold text-bb-primary">10+</p>
                <p className="text-xs text-bb-dark/60 font-medium mt-1">Years of Baking<br />Excellence</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div ref={contentRef} className="w-full">
            <p className="text-bb-primary font-medium text-sm tracking-widest uppercase mb-3">
              Our Story
            </p>
            <h2 className="heading-lg text-bb-dark mb-6">
              Meet the Heart<br />
              Behind <span className="text-bb-primary">BB Cakes</span>
            </h2>

            <div className="space-y-4 body-lg mb-8">
              <p>
                What started as a small kitchen experiment has grown into a beloved bakery 
                that brings joy to thousands of celebrations across Nigeria. Every cake that 
                leaves our oven carries a piece of our heart.
              </p>
              <p>
                We believe that the best cakes aren't just about beautiful designs — they're 
                about the love, care, and premium ingredients that go into every single layer. 
                From birthday surprises to wedding centerpieces, we treat every order like it's 
                for our own family.
              </p>
              
              {/* Editorial Pull-Quote */}
              <div className="border-l-2 border-bb-primary/40 pl-4 py-1 italic font-serif text-lg text-bb-primary my-6">
                "Baking is love made edible, and every customer becomes family."
              </div>

              {/* Founder Sign-off */}
              <div className="pt-2">
                <p className="font-script text-3xl sm:text-4xl text-bb-primary leading-tight">
                  B.B
                </p>
                <p className="text-xs text-bb-dark/60 font-medium uppercase tracking-wider mt-0.5">
                  Founder & Head Baker, BB Cakes
                </p>
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 pt-8 border-t border-bb-dark/10">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Heart className="w-4 h-4 text-bb-primary" />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-bb-dark">5k+</span>
                </div>
                <p className="text-xs text-bb-dark/60">Happy Customers</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Award className="w-4 h-4 text-bb-primary" />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-bb-dark">500+</span>
                </div>
                <p className="text-xs text-bb-dark/60">Custom Designs</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Users className="w-4 h-4 text-bb-primary" />
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-bb-dark">200+</span>
                </div>
                <p className="text-xs text-bb-dark/60">Students Trained</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
