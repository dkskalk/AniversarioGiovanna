import React, { useState, useEffect } from "react";
import { Sparkles, Heart, Camera, Image as ImageIcon, RotateCcw } from "lucide-react";
import { CinderellaBabyArtwork } from "./CinderellaBabyArtwork";

export function HeaderHero() {
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("giovanna_photo");
    if (saved) {
      setCustomPhoto(saved);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomPhoto(result);
        localStorage.setItem("giovanna_photo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setCustomPhoto(null);
    localStorage.removeItem("giovanna_photo");
  };

  return (
    <header className="relative w-full pt-4 pb-6 px-4 text-center flex flex-col items-center justify-center">
      {/* First Fold Card with Photo/Artwork Background */}
      <div className="w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-white/90 relative bg-slate-900 group">
        
        {/* Main Visual Container */}
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-gradient-to-b from-sky-100 to-sky-300">
          {customPhoto ? (
            <img
              src={customPhoto}
              alt="Giovanna 1º Aninho Cinderela Baby"
              className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full relative">
              <CinderellaBabyArtwork className="w-full h-full object-cover" />
            </div>
          )}

          {/* Gentle Gradient Overlays for readable text */}
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/95 via-sky-950/30 to-transparent pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-sky-950/50 to-transparent pointer-events-none" />

          {/* Floating Pill Badge on top */}
          <div className="absolute top-4 inset-x-0 flex justify-center px-4 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-sky-950 text-[11px] font-extrabold uppercase tracking-wider shadow-lg border border-pink-200">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>1º Aninho da Giovanna</span>
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            </span>
          </div>

          {/* Photo Customizer / Upload Button overlay (Bottom right corner) */}
          <div className="absolute top-4 right-3 z-10">
            <label
              htmlFor="photo-upload"
              className="cursor-pointer p-2 rounded-full bg-white/80 hover:bg-white text-sky-900 shadow-md backdrop-blur-sm transition-all flex items-center justify-center hover:scale-105 active:scale-95"
              title="Trocar Foto"
            >
              <Camera className="w-4 h-4 text-pink-600" />
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {customPhoto && (
            <button
              type="button"
              onClick={handleResetPhoto}
              className="absolute top-4 left-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-sky-900 shadow-md backdrop-blur-sm transition-all flex items-center justify-center hover:scale-105 active:scale-95"
              title="Voltar para a ilustração oficial"
            >
              <RotateCcw className="w-4 h-4 text-sky-700" />
            </button>
          )}

          {/* Bottom Card Overlay inside First Fold */}
          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white text-center flex flex-col items-center pointer-events-none">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug font-serif drop-shadow-md text-sky-50">
              Você é nosso convidado especial!
            </h1>

            <div className="flex items-center justify-center my-2.5 gap-2">
              <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-80" />
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
              <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-80" />
            </div>

            <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed max-w-xs drop-shadow-sm">
              Venha comemorar o 1º aninho da <strong className="text-white font-bold">Giovanna</strong> conosco em um dia inesquecível! 👑
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
