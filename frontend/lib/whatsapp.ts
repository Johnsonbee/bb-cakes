const PHONE_NUMBER = "2347036009032"; // ← REPLACE WITH BB CAKES WHATSAPP NUMBER

export const openWhatsApp = (message?: string) => {
  const defaultMessage = "Hi BB Cakes! I'd like to place an order.";
  const text = encodeURIComponent(message || defaultMessage);
  const url = `https://wa.me/${PHONE_NUMBER}?text=${text}`;

  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

export const getOccasionMessage = (occasion: string): string => {
  const messages: Record<string, string> = {
    birthday: "Hi BB Cakes! I'm looking for a birthday cake for a special celebration. Can you help me create something amazing?",
    wedding: "Hi BB Cakes! I'd love to discuss a wedding cake for my big day. I'd like to see your designs and pricing.",
    anniversary: "Hi BB Cakes! I need a beautiful cake for an anniversary celebration. Something romantic and special.",
    surprise: "Hi BB Cakes! I want to surprise someone special with a custom cake. Can you help me plan something amazing?",
    corporate: "Hi BB Cakes! I'm interested in corporate/event cakes for my company. Can we discuss options and pricing?",
    justBecause: "Hi BB Cakes! I don't need a reason — I just want something sweet and delicious. What do you recommend today?",
  };
  return messages[occasion] || messages.justBecause;
};

export const getAcademyMessage = (program: string): string => {
  const messages: Record<string, string> = {
    adult: "Hi BB Cakes! I'm interested in your adult baking classes. Can you share the schedule and pricing?",
    kids: "Hi BB Cakes! I'd love to enroll my child in your summer baking camp. What are the details?",
    family: "Hi BB Cakes! I'd love to learn more about your baking community and upcoming classes.",
  };
  return messages[program] || messages.family;
};
