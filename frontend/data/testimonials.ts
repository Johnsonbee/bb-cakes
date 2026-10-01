export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  occasion: string;
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "BB Cakes understood exactly what I wanted for my daughter's 10th birthday. The cake was not just beautiful — it was the absolute highlight of the party! Everyone asked where we got it.",
    name: "Amara Okafor",
    occasion: "Birthday Cake",
    image: "/images/stories/story_birthday_customer.jpg",
    rating: 5,
  },
  {
    id: 2,
    quote: "Our wedding cake was a masterpiece. Three tiers of pure elegance that matched our theme perfectly. The guests are still talking about it months later. Thank you, BB Cakes!",
    name: "Chioma & Emeka",
    occasion: "Wedding Cake",
    image: "/images/stories/story_wedding_customer.jpg",
    rating: 5,
  },
  {
    id: 3,
    quote: "I ordered pastries for my office team meeting and they disappeared in minutes. Fresh, flaky, and absolutely delicious. BB Cakes is now our go-to for every office celebration.",
    name: "Tunde Balogun",
    occasion: "Corporate Order",
    image: "/images/stories/story_pastry_customer.jpg",
    rating: 5,
  },
];
