import React, { useState } from "react";
import { BackgroundDecoration } from "./components/BackgroundDecoration";
import { HeaderHero } from "./components/HeaderHero";
import { EventDetails } from "./components/EventDetails";
import { RsvpForm } from "./components/RsvpForm";
import { GiftSuggestions } from "./components/GiftSuggestions";
import { SuccessModal } from "./components/SuccessModal";
import { RsvpRecord } from "./types";
import { Crown, Sparkles } from "lucide-react";

export default function App() {
  const [submittedRecord, setSubmittedRecord] = useState<RsvpRecord | null>(null);

  return (
    <div className="min-h-screen relative font-sans text-slate-800 antialiased selection:bg-sky-200 selection:text-sky-900 pb-16">
      {/* Background decoration with ambient sparkles and music toggle */}
      <BackgroundDecoration />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center min-h-screen">
        {/* Top Header Badge */}
        <div className="w-full px-4 pt-3 flex items-center justify-start text-xs">
          <div className="flex items-center gap-1.5 text-sky-900/80 font-medium">
            <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-300/40" />
            <span className="font-serif">1º Aninho • Giovanna</span>
          </div>
        </div>

        {/* 1. Header / Hero Section */}
        <HeaderHero />

        {/* 2. Event Details Section */}
        <EventDetails />

        {/* 3. RSVP Form Section */}
        <RsvpForm onSuccess={(record) => setSubmittedRecord(record)} />

        {/* 4. Gift Suggestions Section */}
        <GiftSuggestions />

        {/* Footer */}
        <footer className="w-full px-4 py-8 text-center text-xs text-sky-900/80 space-y-2 mt-4">
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-serif font-bold text-sky-950">Giovanna • 1 Aninho</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <p className="text-[11px]">
            Esperamos por você para celebrar este momento mágico! ✨
          </p>
        </footer>
      </main>

      {/* Celebration Success Modal */}
      {submittedRecord && (
        <SuccessModal
          record={submittedRecord}
          onClose={() => setSubmittedRecord(null)}
        />
      )}
    </div>
  );
}
