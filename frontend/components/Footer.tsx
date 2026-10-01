"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Instagram, MapPin, ArrowRight, Cake, Heart } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
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
    <footer
      id="footer"
      ref={sectionRef}
      className="relative bg-bb-cream overflow-hidden"
    >
      {/* Main Footer Content */}
      <div className="section-padding pt-20 sm:pt-28 lg:pt-36 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Big Heading */}
          <div ref={headingRef} className="text-center mb-12 lg:mb-16 relative">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-bb-dark leading-[0.95]">
              LET&apos;S BAKE
              <br />
              <span className="text-bb-primary">SOMETHING</span>
              <br />
              SPECIAL.
            </h2>

            {/* Floating cake image */}
            <div
              ref={imageRef}
              className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 w-64 h-80"
            >
              <img
                src="/images/footer/footer_hero_cake.jpg"
                alt="BB Cakes Signature"
                className="w-full h-full object-cover rounded-3xl shadow-2xl rotate-3"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-16 lg:mb-20">
            <button
              onClick={() => openWhatsApp("Hi BB Cakes! I'd like to place an order.")}
              className="btn-primary gap-2 text-lg px-10 py-5"
            >
              ORDER WITH BB CAKES
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Contact Grid */}
          <div
            ref={contentRef}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-bb-dark/10"
          >
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Cake className="w-6 h-6 text-bb-primary" />
                <span className="font-serif text-xl font-semibold text-bb-dark">
                  BB CAKES <span className="text-bb-primary">& MORE</span>
                </span>
              </div>
              <p className="text-sm text-bb-dark/60 leading-relaxed">
                Freshly baked with love for every moment worth celebrating. 
                Your story, our oven.
              </p>
            </div>

            {/* WhatsApp */}
            <div>
              <h4 className="font-semibold text-bb-dark mb-3 text-sm uppercase tracking-wider">
                Order Now
              </h4>
              <button
                onClick={() => openWhatsApp()}
                className="flex items-center gap-2 text-bb-dark/70 hover:text-bb-primary transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                WhatsApp Order
              </button>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-bb-dark mb-3 text-sm uppercase tracking-wider">
                Follow Us
              </h4>
              <a
                href="https://instagram.com/bbcakes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-bb-dark/70 hover:text-bb-primary transition-colors text-sm"
              >
                <Instagram className="w-4 h-4" />
                @bbcakes
              </a>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-semibold text-bb-dark mb-3 text-sm uppercase tracking-wider">
                Find Us
              </h4>
              <p className="flex items-start gap-2 text-bb-dark/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Abuja, Nigeria</span>
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-bb-dark/40">
              © {new Date().getFullYear()} BB Cakes & More. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-xs text-bb-dark/40">
              Made with <Heart className="w-3 h-3 text-bb-primary fill-bb-primary" /> in Abuja
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
