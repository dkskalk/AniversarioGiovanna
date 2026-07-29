import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from "lucide-react";

export function BackgroundDecoration() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.45; // 45% volume (audible and clear)
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
        });
    }
  };

  useEffect(() => {
    // Attempt playback on first user touch/click anywhere on page
    const handleUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Keep paused if blocked by browser
          });
      }
    };

    window.addEventListener("click", handleUserInteraction, { once: true });
    window.addEventListener("touchstart", handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* HTML5 Audio Element for rock-solid browser compatibility */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Delicate Gradient Layers matching Cinderela Baby theme */}
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

      {/* Top Floating Music Controller Pill */}
      <div className="pointer-events-auto fixed top-3 right-3 z-50">
        <button
          onClick={togglePlay}
          type="button"
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border shadow-lg text-xs font-bold transition-all active:scale-95 cursor-pointer ${
            isPlaying
              ? "bg-white/95 border-pink-300 text-sky-950 shadow-pink-200/60 ring-2 ring-pink-300/40"
              : "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-300 shadow-amber-300/50 animate-bounce"
          }`}
          title={isPlaying ? "Pausar música do aniversário" : "Tocar música da Cinderela"}
        >
          {isPlaying ? (
            <>
              <Music className="w-3.5 h-3.5 text-pink-500 animate-spin" />
              <span>Música On</span>
              <Volume2 className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              <span>Tocar Música 🎵</span>
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
