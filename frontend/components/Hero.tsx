"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "@/data/heroSlides";
import { openWhatsApp } from "@/lib/whatsapp";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const animateSlideIn = useCallback((index: number) => {
    if (!swiperInstance) return;
    const currentSlideEl = swiperInstance.slides[swiperInstance.activeIndex];
    if (!currentSlideEl) return;

    const lines = currentSlideEl.querySelectorAll(".hero-line");
    const subtexts = currentSlideEl.querySelectorAll(".hero-subtext");
    const ctas = currentSlideEl.querySelectorAll(".hero-cta");
    const images = currentSlideEl.querySelectorAll(".hero-img-container");

    const tl = gsap.timeline();

    // Headline lines stagger in
    if (lines.length > 0) {
      tl.fromTo(
        lines,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    }

    // Subtext fades in
    if (subtexts.length > 0) {
      tl.fromTo(
        subtexts,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }

    // CTA slides in
    if (ctas.length > 0) {
      tl.fromTo(
        ctas,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    }

    // Image clean fade in (no scaling blur)
    if (images.length > 0) {
      tl.fromTo(
        images,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.9"
      );
    }
  }, [swiperInstance]);

  const animateSlideOut = useCallback(() => {
    if (!swiperInstance) return;
    const currentSlideEl = swiperInstance.slides[swiperInstance.activeIndex];
    if (!currentSlideEl) return;

    const lines = currentSlideEl.querySelectorAll(".hero-line");
    const subtexts = currentSlideEl.querySelectorAll(".hero-subtext");
    const ctas = currentSlideEl.querySelectorAll(".hero-cta");
    const images = currentSlideEl.querySelectorAll(".hero-img-container");

    const tl = gsap.timeline();

    if (lines.length > 0) {
      tl.to(lines, {
        y: -30,
        opacity: 0,
        stagger: 0.04,
        duration: 0.35,
        ease: "power2.in",
      });
    }

    if (subtexts.length > 0 || ctas.length > 0) {
      tl.to([...Array.from(subtexts), ...Array.from(ctas)], { opacity: 0, y: -15, duration: 0.3, ease: "power2.in" }, "-=0.2");
    }

    if (images.length > 0) {
      tl.to(images, { opacity: 0, duration: 0.35, ease: "power2.in" }, "-=0.25");
    }
  }, [swiperInstance]);

  useEffect(() => {
    if (!swiperInstance) return;
    const timer = setTimeout(() => animateSlideIn(0), 200);
    return () => clearTimeout(timer);
  }, [swiperInstance, animateSlideIn]);

  const handleSlideChange = (swiper: SwiperType) => {
    animateSlideOut();
    setActiveIndex(swiper.realIndex);
    setTimeout(() => animateSlideIn(swiper.realIndex), 350);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    fallbackUrl?: string
  ) => {
    const target = e.currentTarget;
    if (fallbackUrl && target.src !== fallbackUrl && !target.src.endsWith(fallbackUrl)) {
      target.src = fallbackUrl;
    } else if (target.src.endsWith(".jpeg")) {
      target.src = target.src.replace(".jpeg", ".jpg");
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-bb-dark select-none"
    >
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        loop={true}
        speed={700}
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        className="h-screen w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {/* ============================================================== */}
            {/* 1. DESKTOP VIEW (lg: 1024px+): Widescreen 16:9 Image on Right, Copy Space on Left */}
            {/* ============================================================== */}
            <div className="hidden lg:block absolute inset-0 w-full h-full overflow-hidden">
              <div className="hero-img-container absolute inset-0 w-full h-full">
                <img
                  src={slide.desktopImage}
                  onError={(e) => handleImageError(e, slide.image)}
                  alt={slide.headline.join(" ")}
                  className="w-full h-full object-cover object-center"
                />
                {/* Desktop Left-to-Right Scrim: Text legibility on left while keeping cake 100% clear on right */}
                <div className="absolute inset-0 bg-gradient-to-r from-bb-dark/90 via-bb-dark/40 via-35% to-transparent pointer-events-none" />
              </div>

              {/* Desktop Text Overlay */}
              <div className="relative z-20 h-full w-full max-w-7xl mx-auto px-12 lg:px-16 flex flex-col justify-center items-start text-left pt-20 pb-20">
                {/* Headline */}
                <div className="mb-6 max-w-2xl">
                  {slide.headline.map((line, i) => (
                    <span
                      key={i}
                      className="hero-line block font-serif text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] tracking-tight text-white drop-shadow-md"
                    >
                      {line}
                    </span>
                  ))}
                </div>

                {/* Subtext */}
                <p className="hero-subtext text-white/85 text-lg lg:text-xl max-w-xl mb-8 leading-relaxed drop-shadow font-sans">
                  {slide.subtext}
                </p>

                {/* CTA Button */}
                <div className="hero-cta">
                  <button
                    onClick={() => openWhatsApp(slide.whatsappMessage)}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-bb-primary text-white font-semibold rounded-full transition-all duration-300 hover:bg-bb-hot hover:shadow-xl hover:shadow-bb-primary/35 hover:-translate-y-0.5 active:scale-95 text-lg border border-white/20"
                  >
                    <span>{slide.cta}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Floating badge for desktop */}
                <div className="absolute bottom-20 right-16 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 text-white p-4 rounded-2xl shadow-2xl z-20 animate-float pointer-events-none">
                  <div className="w-10 h-10 bg-bb-primary/90 rounded-full flex items-center justify-center text-lg shadow-inner">
                    🎂
                  </div>
                  <div>
                    <p className="text-xs text-bb-soft font-medium uppercase tracking-wider">
                      Fresh Daily
                    </p>
                    <p className="font-script text-2xl text-white leading-tight">
                      Baked with Love
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================== */}
            {/* 2. MOBILE VIEW (< lg): Full Height Hero Image with Bottom Text */}
            {/* ============================================================== */}
            <div className="block lg:hidden absolute inset-0 w-full h-full overflow-hidden">
              {/* Full height mobile image */}
              <div className="hero-img-container absolute inset-0 w-full h-full">
                <img
                  src={slide.mobileImage}
                  onError={(e) => handleImageError(e, slide.desktopImage || slide.image)}
                  alt={slide.headline.join(" ")}
                  className="w-full h-full object-cover object-top"
                />
                {/* Refined gradient scrim: deep dark base for rich typography contrast while keeping the cake 100% luminous */}
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-bb-dark via-bb-dark/85 via-42% to-transparent pointer-events-none" />
              </div>

              {/* Mobile Text & CTA Section: Anchored lower down to give the cake image massive breathing room */}
              <div className="absolute inset-x-0 bottom-16 sm:bottom-20 z-20 flex flex-col items-center text-center px-5 sm:px-8">
                {/* Mobile Text Block (Headline & Subtext) */}
                <div className="flex flex-col items-center max-w-sm sm:max-w-md">
                  {/* Mobile Headline - Font weight matches desktop (font-medium), font size increased */}
                  <div className="mb-2 sm:mb-2.5">
                    {slide.headline.map((line, i) => (
                      <span
                        key={i}
                        className="hero-line block font-serif text-[2.4rem] min-[390px]:text-[2.65rem] sm:text-5xl font-medium leading-[1.06] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
                      >
                        {line}
                      </span>
                    ))}
                  </div>

                  {/* Mobile Subtext - Font size increased & optimal reading comfort */}
                  <p className="hero-subtext text-white/90 text-[1.05rem] min-[390px]:text-[1.125rem] sm:text-lg max-w-[320px] min-[390px]:max-w-[360px] sm:max-w-md leading-snug sm:leading-relaxed font-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    {slide.subtext}
                  </p>
                </div>

                {/* Mobile CTA Button - Tight, natural proximity with subtext, matching desktop weight (font-semibold) */}
                <div className="hero-cta w-full max-w-[280px] min-[390px]:max-w-[320px] sm:max-w-sm mt-4 sm:mt-5">
                  <button
                    onClick={() => openWhatsApp(slide.whatsappMessage)}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 bg-bb-primary hover:bg-bb-hot active:scale-[0.98] text-white font-semibold rounded-full shadow-lg shadow-bb-primary/35 hover:shadow-xl hover:shadow-bb-primary/45 text-[1.025rem] sm:text-lg border border-white/20 transition-all duration-300 group"
                  >
                    <span>{slide.cta}</span>
                    <ArrowRight className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots (works across both mobile and desktop) */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-lg">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => swiperInstance?.slideToLoop(i)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
              i === activeIndex
                ? "w-7 sm:w-8 bg-bb-primary shadow-sm shadow-bb-primary"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
