import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Crown, Sparkles } from "lucide-react";

export function BackgroundDecoration() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => {
    // Royalty free soft music / lullaby audio stream
    const a = new Audio("https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=baby-lullaby-music-box-113264.mp3");
    a.loop = true;
    a.volume = 0.3;
    return a;
  });

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Audio play blocked by browser:", err);
      });
    }
  };

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Delicate Gradient Layers matching Cinderela Baby theme (Soft Powder Blue, Pearl White, Gentle Gold) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D8EBF8] via-[#EBF3FB] to-[#F3F7FD]" />

      {/* Magical Glowing Orbs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -left-10 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl" />

      {/* Floating Sparkles & Star Particles */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[8%] left-[12%] text-amber-300 animate-bounce text-sm">✦</div>
        <div className="absolute top-[18%] right-[15%] text-blue-300 animate-pulse text-lg">✨</div>
        <div className="absolute top-[35%] left-[8%] text-sky-300 animate-ping text-xs">✦</div>
        <div className="absolute top-[48%] right-[10%] text-amber-300 animate-bounce text-sm">✨</div>
        <div className="absolute top-[65%] left-[15%] text-blue-200 animate-pulse text-base">✦</div>
        <div className="absolute top-[82%] right-[18%] text-amber-200 animate-pulse text-xs">✨</div>
        <div className="absolute top-[92%] left-[25%] text-sky-300 animate-bounce text-sm">✦</div>
      </div>

      {/* Top Glass Floating Audio Toggle Button */}
      <div className="pointer-events-auto fixed top-3 right-3 z-50">
        <button
          onClick={toggleAudio}
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/85 backdrop-blur-md border border-blue-200/80 shadow-md text-sky-900 text-xs font-medium hover:bg-white transition-all active:scale-95"
          title={isPlaying ? "Mutar música suave" : "Tocar música do evento"}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-sky-600 animate-pulse" />
              <span className="hidden sm:inline">Música On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Música</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
