"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quickMessages = [
    "I'd like to order a birthday cake",
    "I want a custom wedding cake",
    "Tell me about your baking classes",
    "What pastries do you have today?",
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Quick Messages Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-72 bg-white rounded-2xl shadow-2xl transition-all duration-500 ${
          isOpen && isVisible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-8 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 bg-green-500 rounded-t-2xl">
          <p className="text-white font-medium text-sm">Chat with BB Cakes</p>
          <p className="text-white/80 text-xs">Typically replies in minutes</p>
        </div>
        <div className="p-3 space-y-2">
          {quickMessages.map((msg) => (
            <button
              key={msg}
              onClick={() => {
                openWhatsApp(`Hi BB Cakes! ${msg}`);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm text-bb-dark bg-bb-cream rounded-xl hover:bg-bb-soft transition-colors duration-200"
            >
              {msg}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
