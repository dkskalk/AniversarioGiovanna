import React, { useState, useEffect } from "react";
import { BackgroundDecoration } from "./components/BackgroundDecoration";
import { HeaderHero } from "./components/HeaderHero";
import { EventDetails } from "./components/EventDetails";
import { RsvpForm } from "./components/RsvpForm";
import { GiftSuggestions } from "./components/GiftSuggestions";
import { SuccessModal } from "./components/SuccessModal";
import { GoogleSheetsGuideModal } from "./components/GoogleSheetsGuideModal";
import { AdminPanelModal } from "./components/AdminPanelModal";
import { RsvpRecord } from "./types";
import { Crown, Sparkles, Heart, FileSpreadsheet, ShieldCheck } from "lucide-react";

export default function App() {
  const [submittedRecord, setSubmittedRecord] = useState<RsvpRecord | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showSheetsGuide, setShowSheetsGuide] = useState(false);
  const [googleScriptUrl, setGoogleScriptUrl] = useState("");

  // Load config on startup
  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.googleScriptUrl) {
          setGoogleScriptUrl(data.googleScriptUrl);
        }
      })
      .catch((err) => console.log("Config load error:", err));
  }, []);

  const handleSaveConfig = async (newUrl: string) => {
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googleScriptUrl: newUrl }),
      });
      const data = await res.json();
      if (data.config) {
        setGoogleScriptUrl(data.config.googleScriptUrl || "");
      }
    } catch (err) {
      console.error("Save config error:", err);
    }
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-800 antialiased selection:bg-sky-200 selection:text-sky-900 pb-16">
      {/* Background decoration with ambient sparkles and music toggle */}
      <BackgroundDecoration />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center min-h-screen">
        {/* Top Discreet Admin/Organizer Bar */}
        <div className="w-full px-4 pt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-sky-900/80 font-medium">
            <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-300/40" />
            <span className="font-serif">1º Aninho • Giovanna</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSheetsGuide(true)}
              type="button"
              className="px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-sky-200/80 text-[11px] font-semibold text-sky-900 hover:bg-white flex items-center gap-1 shadow-sm transition-all"
              title="Configurar integração com Google Sheets"
            >
              <FileSpreadsheet className="w-3 h-3 text-emerald-600" />
              <span>Planilha</span>
            </button>

            <button
              onClick={() => setShowAdminModal(true)}
              type="button"
              className="px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-sky-200/80 text-[11px] font-semibold text-sky-900 hover:bg-white flex items-center gap-1 shadow-sm transition-all"
              title="Ver painel com lista de convidados"
            >
              <ShieldCheck className="w-3 h-3 text-sky-600" />
              <span>Painel</span>
            </button>
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
          <div className="pt-2">
            <button
              onClick={() => setShowAdminModal(true)}
              type="button"
              className="text-[11px] text-sky-800 underline hover:text-sky-950 transition-colors"
            >
              Painel de Lista de Presenças (Organização)
            </button>
          </div>
        </footer>
      </main>

      {/* Modals */}
      {submittedRecord && (
        <SuccessModal
          record={submittedRecord}
          onClose={() => setSubmittedRecord(null)}
        />
      )}

      {showSheetsGuide && (
        <GoogleSheetsGuideModal
          currentUrl={googleScriptUrl}
          onSaveUrl={handleSaveConfig}
          onClose={() => setShowSheetsGuide(false)}
        />
      )}

      {showAdminModal && (
        <AdminPanelModal
          onClose={() => setShowAdminModal(false)}
          onOpenSheetsGuide={() => {
            setShowAdminModal(false);
            setShowSheetsGuide(true);
          }}
        />
      )}
    </div>
  );
}
