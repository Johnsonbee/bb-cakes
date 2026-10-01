export interface Craving {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  color: string;
}

export const cravings: Craving[] = [
  {
    id: 1,
    title: "CAKES",
    subtitle: "Birthday, wedding & celebration cakes",
    image: "/images/cravings/cravings_cakes.jpg",
    link: "#products",
    color: "from-bb-primary/20 to-bb-hot/20",
  },
  {
    id: 2,
    title: "PASTRIES",
    subtitle: "Fresh croissants, donuts & daily treats",
    image: "/images/cravings/cravings_pastries.jpg",
    link: "#products",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: 3,
    title: "CUSTOM CAKES",
    subtitle: "Your imagination, our creation",
    image: "/images/cravings/cravings_custom.jpg",
    link: "#celebration",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 4,
    title: "BB ACADEMY",
    subtitle: "Learn to bake like a pro",
    image: "/images/cravings/cravings_academy.jpg",
    link: "#academy",
    color: "from-emerald-500/20 to-teal-500/20",
  },
];
