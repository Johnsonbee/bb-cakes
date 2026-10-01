export interface Occasion {
  id: string;
  label: string;
  headline: string;
  description: string;
  cta: string;
  image: string;
  message: string;
  theme: string;
}

export const occasions: Occasion[] = [
  {
    id: "birthday",
    label: "BIRTHDAY",
    headline: "Let's make their birthday unforgettable.",
    description: "From themed character cakes to elegant adult celebrations, we create birthday magic that leaves everyone in awe. Every candle deserves a cake worth remembering.",
    cta: "ORDER A BIRTHDAY CAKE",
    image: "/images/moments/moment_birthday.jpg",
    message: "Hi BB Cakes! I'm looking for a birthday cake for a special celebration. Can you help me create something amazing?",
    theme: "from-bb-primary to-bb-hot",
  },
  {
    id: "wedding",
    label: "WEDDING",
    headline: "Made for your forever.",
    description: "Your wedding cake should be as unique as your love story. Elegant tiers, delicate florals, and flavors that make your special day even sweeter.",
    cta: "PLAN YOUR WEDDING CAKE",
    image: "/images/moments/moment_wedding.jpg",
    message: "Hi BB Cakes! I'd love to discuss a wedding cake for my big day. I'd like to see your designs and pricing.",
    theme: "from-rose-400 to-pink-500",
  },
  {
    id: "anniversary",
    label: "ANNIVERSARY",
    headline: "Celebrating love, one slice at a time.",
    description: "Mark another year of togetherness with a cake that speaks your love language. Romantic, refined, and made just for the two of you.",
    cta: "ORDER AN ANNIVERSARY CAKE",
    image: "/images/moments/moment_anniversary.jpg",
    message: "Hi BB Cakes! I need a beautiful cake for an anniversary celebration. Something romantic and special.",
    theme: "from-red-400 to-rose-500",
  },
  {
    id: "surprise",
    label: "SURPRISE",
    headline: "The best surprises are sweet.",
    description: "Nothing says 'I thought of you' like a surprise cake delivery. Let us help you create a moment they'll never forget.",
    cta: "PLAN A SURPRISE",
    image: "/images/moments/moment_surprise.jpg",
    message: "Hi BB Cakes! I want to surprise someone special with a custom cake. Can you help me plan something amazing?",
    theme: "from-violet-400 to-purple-500",
  },
  {
    id: "corporate",
    label: "CORPORATE",
    headline: "Impress them professionally.",
    description: "Branded cakes, event desserts, and corporate treats that elevate your brand. Perfect for launches, celebrations, and team milestones.",
    cta: "CORPORATE ORDERS",
    image: "/images/moments/moment_corporate.jpg",
    message: "Hi BB Cakes! I'm interested in corporate/event cakes for my company. Can we discuss options and pricing?",
    theme: "from-slate-500 to-slate-700",
  },
  {
    id: "justBecause",
    label: "JUST BECAUSE",
    headline: "Honestly? You don't need a reason.",
    description: "Sometimes the best moments are the ones you don't plan. Treat yourself or someone you love — just because. You deserve something sweet today.",
    cta: "ORDER SOMETHING SWEET",
    image: "/images/moments/moment_just_because.jpg",
    message: "Hi BB Cakes! I don't need a reason — I just want something sweet and delicious. What do you recommend today?",
    theme: "from-amber-400 to-orange-500",
  },
];
