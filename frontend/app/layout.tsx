import type { Metadata } from "next";
import { Fredoka, Quicksand, Alex_Brush } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BB Cakes & More | Fresh Cakes for Every Moment",
  description:
    "Custom cakes, pastries, and baking classes in Nigeria. Made with love for birthdays, weddings, and every celebration worth remembering. Order via WhatsApp today!",
  keywords: [
    "BB Cakes",
    "custom cakes Nigeria",
    "birthday cakes Lagos",
    "wedding cakes",
    "pastries",
    "baking classes",
    "cake shop",
  ],
  openGraph: {
    title: "BB Cakes & More",
    description: "Fresh cakes for every moment. Order via WhatsApp!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${quicksand.variable} ${alexBrush.variable}`}
    >
      <body className="font-sans bg-bb-cream text-bb-dark antialiased">
        {children}
      </body>
    </html>
  );
}
