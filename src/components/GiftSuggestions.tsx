import React, { useState } from "react";
import { Gift, Shirt, Footprints, Heart, Sparkles, Check } from "lucide-react";

export function GiftSuggestions() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const gifts = [
    {
      id: 1,
      category: "Brinquedos",
      detail: "Brinquedos educativos, musicais ou de encaixar",
      icon: Gift,
      color: "from-pink-400 to-rose-400",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      badge: "Inclusivo",
    },
    {
      id: 2,
      category: "Roupa",
      detail: "Tamanho 2 anos",
      icon: Shirt,
      color: "from-sky-400 to-blue-500",
      bgColor: "bg-sky-50",
      borderColor: "border-sky-200",
      badge: "Tam. 2 anos",
    },
    {
      id: 3,
      category: "Sapato",
      detail: "Número 20",
      icon: Footprints,
      color: "from-pink-400 to-rose-400",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      badge: "Nº 20",
    },
  ];

  const handleCopyGift = (text: string, index: number) => {
    navigator.clipboard.writeText(`Sugestão de Presente para a Giovanna: ${text}`);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 py-3">
      <div className="bg-white/80 backdrop-blur-md border border-white/90 shadow-xl rounded-3xl p-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 border-b border-sky-100 pb-3">
          <h2 className="text-lg font-bold text-sky-950 flex items-center gap-2 font-serif">
            <Gift className="w-5 h-5 text-sky-600" />
            <span>Sugestões de Presentes</span>
          </h2>
          <span className="text-[11px] font-semibold text-pink-800 bg-pink-100 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-pink-500" />
            <span>Dicas</span>
          </span>
        </div>

        {/* Delicate Heart Message */}
        <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-pink-50 border border-sky-100 shadow-sm text-center">
          <Heart className="w-5 h-5 text-pink-400 fill-pink-200 mx-auto mb-1.5 animate-pulse" />
          <p className="text-xs sm:text-sm text-sky-900 font-medium italic leading-relaxed">
            "Sua presença é o nosso maior presente, mas caso deseje presentear a Giovanna, essas são algumas sugestões."
          </p>
        </div>

        {/* Gift Cards Grid */}
        <div className="space-y-3">
          {gifts.map((item, idx) => {
            const Icon = item.icon;
            const isCopied = copiedIndex === idx;

            return (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3.5 rounded-2xl ${item.bgColor} border ${item.borderColor} transition-all hover:scale-[1.01]`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-sky-950">{item.category}</h3>
                      <span className="text-[10px] font-bold text-sky-800 bg-white/80 px-2 py-0.5 rounded-full border border-sky-200">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-sky-800 mt-0.5">{item.detail}</p>
                  </div>
                </div>

                {/* Quick copy interaction */}
                <button
                  type="button"
                  onClick={() => handleCopyGift(`${item.category} - ${item.detail}`, idx)}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-all ${
                    isCopied
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                      : "bg-white text-sky-700 border-sky-200 hover:bg-sky-100"
                  }`}
                  title="Copiar sugestão"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copiado!</span>
                    </>
                  ) : (
                    <span className="text-[11px] px-1">Copiar</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
