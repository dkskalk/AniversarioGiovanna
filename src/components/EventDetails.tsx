import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus, Sparkles } from "lucide-react";

export function EventDetails() {
  const eventDate = "13/09/2026";
  const eventTime = "14:00";
  const eventAddress = "Rua Teixeira de Azevedo, nº 69 - Abolição, Rio de Janeiro - RJ";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Rua Teixeira de Azevedo, 69 - Abolição, Rio de Janeiro - RJ")}`;

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Event Date: September 13, 2026 at 14:00 (Month 8 in JS zero-indexed months)
    const targetTime = new Date(2026, 8, 13, 14, 0, 0).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    // Generate Google Calendar Event Link
    const title = encodeURIComponent("1º Aninho da Giovanna - Cinderela Baby");
    const details = encodeURIComponent("Venha comemorar o 1º aninho da Giovanna conosco!");
    const location = encodeURIComponent(eventAddress);
    // Start: 20260913T170000Z / End: 20260913T220000Z (UTC estimate for 14:00 BRT)
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260913T170000Z/20260913T220000Z&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 py-3">
      <div className="bg-white/80 backdrop-blur-md border border-white/90 shadow-xl rounded-3xl p-6 relative overflow-hidden transition-all hover:shadow-2xl">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between mb-4 border-b border-sky-100 pb-3">
          <h2 className="text-lg font-bold text-sky-950 flex items-center gap-2 font-serif">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Informações do Evento</span>
          </h2>
          <span className="text-[11px] font-semibold text-sky-700 bg-sky-100 px-2.5 py-1 rounded-full">
            Festa do Reino
          </span>
        </div>

        {/* RSVP Deadline Notice Banner */}
        <div className="mb-4 p-3 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-xs flex items-center gap-2.5 shadow-sm">
          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="leading-tight">
            <strong className="font-bold text-amber-900">Prazo de Confirmação:</strong> Favor confirmar sua presença até <span className="underline decoration-amber-400 font-extrabold text-amber-950">20 de Agosto de 2026</span>.
          </p>
        </div>

        {/* Details Grid */}
        <div className="space-y-4">
          {/* Data */}
          <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-sky-50/80 border border-sky-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Data</span>
              <p className="text-base font-bold text-sky-950">13 de Setembro de 2026</p>
              <p className="text-xs text-sky-800">Domingo</p>
            </div>
          </div>

          {/* Horário */}
          <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center shrink-0 shadow-md">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Horário</span>
              <p className="text-base font-bold text-sky-950">14:00h</p>
              <p className="text-xs text-amber-900/80">Chegue no horário para não perder os encantos!</p>
            </div>
          </div>

          {/* Local */}
          <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-sky-50/80 border border-sky-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <MapPin className="w-5 h-5 animate-bounce" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Local</span>
              <p className="text-sm font-bold text-sky-950 leading-snug">
                Rua Teixeira de Azevedo, nº 69 - Abolição
              </p>
              <p className="text-xs text-sky-800 mt-0.5">Rio de Janeiro - RJ</p>
            </div>
          </div>
        </div>

        {/* Google Maps Action Button */}
        <div className="mt-5">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>Abrir no Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
          </a>
        </div>

        {/* Countdown Box */}
        <div className="mt-5 pt-4 border-t border-sky-100 text-center">
          <span className="text-xs font-semibold text-sky-800 block mb-2">Contagem regressiva para o grande dia:</span>
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
            <div className="bg-sky-100/90 rounded-xl p-2 text-center">
              <span className="block text-base sm:text-lg font-extrabold text-sky-950">{timeLeft.days}</span>
              <span className="text-[10px] text-sky-700 font-medium">Dias</span>
            </div>
            <div className="bg-sky-100/90 rounded-xl p-2 text-center">
              <span className="block text-base sm:text-lg font-extrabold text-sky-950">{timeLeft.hours}</span>
              <span className="text-[10px] text-sky-700 font-medium">Horas</span>
            </div>
            <div className="bg-sky-100/90 rounded-xl p-2 text-center">
              <span className="block text-base sm:text-lg font-extrabold text-sky-950">{timeLeft.minutes}</span>
              <span className="text-[10px] text-sky-700 font-medium">Min</span>
            </div>
            <div className="bg-sky-100/90 rounded-xl p-2 text-center">
              <span className="block text-base sm:text-lg font-extrabold text-sky-950">{timeLeft.seconds}</span>
              <span className="text-[10px] text-sky-700 font-medium">Seg</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
