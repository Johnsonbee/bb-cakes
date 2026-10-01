export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
  ingredients: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Chocolate Dream",
    description: "Rich, moist chocolate layers with silky ganache drip and handcrafted chocolate shards. A cocoa lover's paradise.",
    price: "₦28,000",
    image: "/images/products/product_chocolate_cake.jpg",
    tag: "Best Seller",
    ingredients: ["Dark Chocolate", "Cocoa", "Cream"],
  },
  {
    id: 2,
    name: "Red Velvet Bliss",
    description: "Classic red velvet with tangy cream cheese frosting, finished with delicate red crumb detailing.",
    price: "₦26,000",
    image: "/images/products/product_red_velvet.jpg",
    tag: "Popular",
    ingredients: ["Red Cocoa", "Cream Cheese", "Vanilla"],
  },
  {
    id: 3,
    name: "Vanilla Berry",
    description: "Light vanilla sponge layered with fresh seasonal berries and whipped cream. Freshness in every bite.",
    price: "₦24,000",
    image: "/images/products/product_vanilla_cake.jpg",
    ingredients: ["Madagascar Vanilla", "Fresh Berries", "Cream"],
  },
  {
    id: 4,
    name: "Tropical Fruit",
    description: "Sunshine on a plate — mango, pineapple, and passion fruit layered with light sponge and coconut cream.",
    price: "₦27,000",
    image: "/images/products/product_fruit_cake.jpg",
    ingredients: ["Mango", "Passion Fruit", "Coconut"],
  },
  {
    id: 5,
    name: "Cupcake Box",
    description: "A beautiful box of 6 assorted cupcakes with buttercream swirls, sprinkles, and edible decorations.",
    price: "₦12,000",
    image: "/images/products/product_cupcakes.jpg",
    tag: "Perfect Gift",
    ingredients: ["Assorted Flavors", "Buttercream", "Sprinkles"],
  },
  {
    id: 6,
    name: "Berry Cheesecake",
    description: "Creamy New York style cheesecake topped with a rich berry compote and fresh mint garnish.",
    price: "₦22,000",
    image: "/images/products/product_cheesecake.jpg",
    ingredients: ["Cream Cheese", "Mixed Berries", "Graham"],
  },
];
