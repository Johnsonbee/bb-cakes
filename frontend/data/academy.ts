export interface AcademyProgram {
  id: number;
  title: string;
  description: string;
  image: string;
  details: string[];
  cta: string;
}

export const academyPrograms: AcademyProgram[] = [
  {
    id: 1,
    title: "Adult Baking Classes",
    description: "From beginner basics to advanced decorating, master the art of baking with hands-on guidance from BB herself.",
    image: "/images/academy/academy_adult_class.jpg",
    details: ["Hands-on training", "Take-home recipes", "Certificate of completion", "Small class sizes"],
    cta: "Join Adult Classes",
  },
  {
    id: 2,
    title: "Kids Summer Camp",
    description: "A fun-filled summer where little hands create big magic. Kids learn baking, decorating, and teamwork in a joyful environment.",
    image: "/images/academy/academy_kids_summer.jpg",
    details: ["Ages 6-16 welcome", "Fun & safe environment", "Take home their creations", "Builds confidence & creativity"],
    cta: "Summer Camp Info",
  },
  {
    id: 3,
    title: "The BB Family",
    description: "More than a class — a community. Our students become family, supporting each other long after the oven timer rings.",
    image: "/images/academy/academy_family_vibe.jpg",
    details: ["Lifelong friendships", "Alumni network", "Ongoing mentorship", "Community events"],
    cta: "Meet the Family",
  },
];
