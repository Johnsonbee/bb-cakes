"use client";

import { useState, useEffect } from "react";
import { Cake, ArrowRight, MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const navLinks = [
  { label: "Home", href: "#hero", hint: "Welcome to BB Cakes" },
  { label: "Cravings", href: "#cravings", hint: "Daily treats & sweets" },
  { label: "Cakes", href: "#products", hint: "Signature collection" },
  { label: "Academy", href: "#academy", hint: "Master the craft" },
  { label: "Your Moment", href: "#celebration", hint: "Weddings & milestones" },
  { label: "Stories", href: "#testimonials", hint: "Words of love" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isMobileMenuOpen
            ? "bg-transparent py-4"
            : isScrolled
            ? "bg-bb-cream/90 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="flex items-center gap-2 group relative z-50"
          >
            <Cake className="w-7 h-7 text-bb-primary transition-transform duration-300 group-hover:rotate-12" />
            <span
              className={`font-serif text-xl sm:text-2xl font-semibold tracking-tight transition-colors duration-300 ${
                isMobileMenuOpen || isScrolled ? "text-bb-dark" : "text-white drop-shadow-sm"
              }`}
            >
              BB CAKES <span className="text-bb-primary">& MORE</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`text-sm font-medium transition-colors duration-300 relative group ${
                  isScrolled
                    ? "text-bb-dark/75 hover:text-bb-primary"
                    : "text-white/85 hover:text-white drop-shadow-sm"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bb-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Order Button - Desktop */}
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() =>
              openWhatsApp("Hi BB Cakes! I'd like to place an order.")
            }
            className="hidden lg:inline-flex items-center px-6 py-2.5 bg-bb-primary text-white text-sm font-semibold rounded-full transition-all duration-300 hover:bg-bb-hot hover:shadow-lg hover:shadow-bb-primary/25 hover:-translate-y-0.5 active:scale-95"
          >
            <span className="relative overflow-hidden h-5">
              <span
                className={`block transition-transform duration-300 ${
                  isHovered ? "-translate-y-full" : ""
                }`}
              >
                ORDER NOW
              </span>
              <span
                className={`absolute top-0 left-0 block transition-transform duration-300 ${
                  isHovered ? "translate-y-0" : "translate-y-full"
                }`}
              >
                LET'S BAKE
              </span>
            </span>
          </button>

          {/* Mobile Hamburger (3-dash morphing to X) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-50 p-2 focus:outline-none"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between items-center">
              <span
                className={`block w-6 h-0.5 rounded-full transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen || isScrolled ? "bg-bb-dark" : "bg-white"
                } ${
                  isMobileMenuOpen ? "translate-y-[9px] rotate-45 bg-bb-dark" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 rounded-full transition-all duration-200 ease-in-out ${
                  isMobileMenuOpen || isScrolled ? "bg-bb-dark" : "bg-white"
                } ${
                  isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                }`}
              />
              <span
                className={`block w-6 h-0.5 rounded-full transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen || isScrolled ? "bg-bb-dark" : "bg-white"
                } ${
                  isMobileMenuOpen ? "-translate-y-[9px] -rotate-45 bg-bb-dark" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Full Page Mobile Menu Transition */}
      <div
        className={`fixed inset-0 z-40 lg:hidden w-full h-[100dvh] bg-gradient-to-b from-bb-cream via-[#FFF5ED] to-bb-cream flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        {/* Decorative subtle bakery lighting & watermark */}
        <div className="absolute top-10 right-0 w-80 h-80 bg-bb-soft/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 left-0 w-80 h-80 bg-bb-primary/5 rounded-full blur-3xl pointer-events-none" />
        <Cake className="absolute -bottom-8 -right-8 w-64 h-64 text-bb-primary/[0.04] pointer-events-none select-none -rotate-12" />

        <div className="relative z-10 flex flex-col h-full pt-24 pb-7 px-6 sm:px-10 justify-between overflow-y-auto">
          {/* Menu Header Label */}
          <div className="flex items-center justify-between mb-3 border-b border-bb-dark/5 pb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-bb-primary">
              Bakery & Academy
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-bb-dark/70 bg-white/80 border border-bb-dark/5 px-2.5 py-0.5 rounded-full shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Baking Daily
            </span>
          </div>

          {/* Links list */}
          <div className="flex flex-col divide-y divide-bb-dark/5 my-auto">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="group flex items-center justify-between py-3.5 transition-all duration-300"
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 45}ms` : "0ms",
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(14px)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                }}
              >
                <div className="flex flex-col">
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-bb-dark group-hover:text-bb-primary group-hover:translate-x-2 transition-all duration-300">
                    {link.label}
                  </span>
                  <span className="text-[11px] font-sans font-medium text-bb-dark/45 uppercase tracking-wider group-hover:text-bb-primary/80 transition-colors mt-0.5">
                    {link.hint}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-bb-soft/40 flex items-center justify-center text-bb-dark/40 group-hover:bg-bb-primary group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-xs">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </a>
            ))}
          </div>

          {/* Bottom Card / CTA */}
          <div className="mt-4 pt-4 border-t border-bb-dark/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openWhatsApp("Hi BB Cakes! I'd like to place an order.");
              }}
              className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 sm:py-4 bg-bb-primary text-white font-bold rounded-full text-base sm:text-lg hover:bg-bb-hot active:scale-[0.98] transition-all duration-300 shadow-xl shadow-bb-primary/25 border border-white/20"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>ORDER ON WHATSAPP</span>
            </button>
            <div className="flex items-center justify-between text-[11px] text-bb-dark/50 px-1 font-medium">
              <span>📍 Abuja, Nigeria</span>
              <span>Fresh daily with love</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
