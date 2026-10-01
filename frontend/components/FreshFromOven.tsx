"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { openWhatsApp } from "@/lib/whatsapp";

gsap.registerPlugin(ScrollTrigger);

export default function FreshFromOven() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const activeProduct = products[activeIndex];

  const animateTransition = useCallback((direction: "next" | "prev") => {
    if (!imageRef.current || !infoRef.current) return;

    const tl = gsap.timeline();

    // Exit animation
    tl.to(imageRef.current, {
      x: direction === "next" ? -60 : 60,
      rotateY: direction === "next" ? -5 : 5,
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.in",
    });

    tl.to(
      infoRef.current.children,
      {
        y: -20,
        opacity: 0,
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.3"
    );

    // Enter animation (after state update)
    tl.call(() => {
      setActiveIndex((prev) =>
        direction === "next"
          ? (prev + 1) % products.length
          : (prev - 1 + products.length) % products.length
      );
    });

    tl.fromTo(
      imageRef.current,
      { x: direction === "next" ? 60 : -60, rotateY: direction === "next" ? 5 : -5, opacity: 0, scale: 0.95 },
      { x: 0, rotateY: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
    );

    tl.fromTo(
      infoRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  const goNext = useCallback(() => animateTransition("next"), [animateTransition]);
  const goPrev = useCallback(() => animateTransition("prev"), [animateTransition]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Minimum swipe distance of 40px and dominant horizontal intent (> 1.25x vertical)
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

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
      id="products"
      ref={sectionRef}
      className="relative py-10 sm:py-16 lg:py-36 bg-bb-cream overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bb-soft/20 rounded-full blur-3xl pointer-events-none" />

      <div className="section-padding relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-5 sm:mb-8 lg:mb-20">
          <p className="text-bb-primary font-medium text-xs sm:text-sm tracking-widest uppercase mb-1.5 sm:mb-3">
            Our Signature Collection
          </p>
          <h2 className="font-serif text-[1.85rem] min-[390px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.12] tracking-tight text-bb-dark">
            FRESH FROM <span className="text-bb-primary">BB&apos;S OVEN</span>
          </h2>
        </div>

        {/* Product Display */}
        <div
          className="max-w-6xl mx-auto touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-16 items-center">
            {/* Product Image */}
            <div className="relative order-1 lg:order-1 max-w-sm sm:max-w-md lg:max-w-lg mx-auto w-full">
              {/* Mobile Navigation Arrows (Positioned on Left & Right sides of Image) */}
              <button
                onClick={goPrev}
                className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-white/60 flex items-center justify-center text-bb-dark active:scale-90 hover:bg-bb-primary hover:text-white transition-all duration-200"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-white/60 flex items-center justify-center text-bb-dark active:scale-90 hover:bg-bb-primary hover:text-white transition-all duration-200"
                aria-label="Next product"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div
                ref={imageRef}
                className="relative aspect-square w-full"
                style={{ perspective: "1000px" }}
              >
                <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl shadow-bb-dark/10">
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {activeProduct.tag && (
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-bb-primary text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm">
                      {activeProduct.tag}
                    </div>
                  )}

                  {/* Mobile Slide Counter Badge */}
                  <div className="lg:hidden absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full z-10 pointer-events-none">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows - Desktop beside image */}
              <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-4 xl:-left-12 gap-2">
                <button
                  onClick={goPrev}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-bb-dark hover:bg-bb-primary hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-4 xl:-right-12 gap-2">
                <button
                  onClick={goNext}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-bb-dark hover:bg-bb-primary hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Next product"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div ref={infoRef} className="order-2 lg:order-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 bg-bb-soft/50 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-2 sm:mb-4">
                <span className="w-2 h-2 bg-bb-primary rounded-full animate-pulse" />
                <span className="text-xs font-medium text-bb-primary">Freshly Baked</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-medium text-bb-dark mb-1.5 sm:mb-4">
                {activeProduct.name}
              </h3>

              <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-bb-dark/75 mb-2.5 sm:mb-6 max-w-md mx-auto lg:mx-0 line-clamp-2 lg:line-clamp-none">
                {activeProduct.description}
              </p>

              {/* Ingredients */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center lg:justify-start mb-3 sm:mb-6">
                {activeProduct.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-[11px] sm:text-xs font-medium bg-white border border-bb-dark/10 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-bb-dark/70"
                  >
                    {ing}
                  </span>
                ))}
              </div>

              <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-bb-primary mb-3.5 sm:mb-6 tracking-tight">
                {activeProduct.price}
              </p>

              <button
                onClick={() =>
                  openWhatsApp(
                    `Hi BB Cakes! I'd like to order the ${activeProduct.name}. Can you confirm availability and pricing?`
                  )
                }
                className="btn-primary gap-2.5 w-full max-w-[320px] sm:max-w-none sm:w-auto px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold tracking-wide shadow-lg shadow-bb-primary/25 hover:shadow-xl hover:shadow-bb-primary/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5 shrink-0" />
                <span>ORDER THIS CAKE</span>
              </button>
            </div>
          </div>

          {/* Product Thumbnails - Desktop */}
          <div className="hidden lg:flex justify-center gap-3 mt-12">
            {products.map((product, i) => (
              <button
                key={product.id}
                onClick={() => {
                  if (i !== activeIndex) {
                    animateTransition(i > activeIndex ? "next" : "prev");
                  }
                }}
                className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                  i === activeIndex
                    ? "ring-2 ring-bb-primary ring-offset-2 ring-offset-bb-cream scale-110"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
