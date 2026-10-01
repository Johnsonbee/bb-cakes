export interface HeroSlide {
  id: number;
  headline: string[];
  subtext: string;
  cta: string;
  desktopImage: string;
  mobileImage: string;
  image?: string;
  whatsappMessage: string;
  accent: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    headline: ["MAKE THEIR", "BIRTHDAY", "SWEETER"],
    subtext: "Beautiful custom cakes for moments worth remembering. Freshly baked with love, designed to make them smile.",
    cta: "ORDER YOUR CAKE",
    desktopImage: "/images/hero/hero_birthday_cake_desktop.jpeg",
    mobileImage: "/images/hero/hero_birthday_cake_mobile.jpeg",
    image: "/images/hero/hero_birthday_cake.jpg",
    whatsappMessage: "Hi BB Cakes! I'm looking for a birthday cake for a special celebration. Can you help me create something amazing?",
    accent: "birthday",
  },
  {
    id: 2,
    headline: ["MADE FOR", "YOUR BIG", "DAY"],
    subtext: "Elegant wedding cakes designed to make your celebration unforgettable. From classic tiers to modern masterpieces.",
    cta: "START YOUR ORDER",
    desktopImage: "/images/hero/hero_wedding_cake_desktop.jpeg",
    mobileImage: "/images/hero/hero_wedding_cake_mobile.jpeg",
    image: "/images/hero/hero_wedding_cake.jpg",
    whatsappMessage: "Hi BB Cakes! I'd love to discuss a wedding cake for my big day. I'd like to see your designs and pricing.",
    accent: "wedding",
  },
  {
    id: 3,
    headline: ["SOMETHING", "FRESH JUST", "CAME OUT"],
    subtext: "Cakes, pastries and treats baked to make your day better. Straight from BB's oven to your heart.",
    cta: "SEE WHAT'S FRESH",
    desktopImage: "/images/hero/hero_pastries_tray_desktop.jpeg",
    mobileImage: "/images/hero/hero_pastries_tray.jpg",
    image: "/images/hero/hero_pastries_tray.jpg",
    whatsappMessage: "Hi BB Cakes! I'd love to see what pastries and treats you have fresh today. What do you recommend?",
    accent: "pastries",
  },
  {
    id: 4,
    headline: ["YOU IMAGINE", "IT. WE", "BAKE IT."],
    subtext: "Got something specific in mind? Let's make it real. Custom designs that turn your vision into edible art.",
    cta: "TALK TO BB CAKES",
    desktopImage: "/images/hero/hero_custom_cake_desktop.jpeg",
    mobileImage: "/images/hero/hero_custom_cake_mobile.jpeg",
    image: "/images/hero/hero_custom_cake_desktop.jpeg",
    whatsappMessage: "Hi BB Cakes! I have a custom cake idea in mind and I'd love to discuss it with you. When can we talk?",
    accent: "custom",
  },
];
