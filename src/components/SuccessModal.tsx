import React, { useEffect } from "react";
import { CheckCircle2, Sparkles, Heart, X, PartyPopper } from "lucide-react";
import { RsvpRecord } from "../types";
import { triggerFestiveExplosion } from "../utils/partyEffects";

interface SuccessModalProps {
  record: RsvpRecord;
  onClose: () => void;
}

export function SuccessModal({ record, onClose }: SuccessModalProps) {
  useEffect(() => {
    // Fire festive sound (estampido de estouro) + party hats, ribbons and confetti explosion!
    triggerFestiveExplosion();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/70 backdrop-blur-md animate-fadeIn overflow-hidden">
      {/* Visual Floating Party Items Background (Chapeuzinhos e Serpentinas saltando) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Jumping Party Hats */}
        <div className="absolute top-[10%] left-[8%] text-5xl animate-popHat delay-100 filter drop-shadow-lg">
          🥳
        </div>
        <div className="absolute top-[15%] right-[10%] text-5xl animate-popHat delay-300 filter drop-shadow-lg">
          🎉
        </div>
        <div className="absolute bottom-[20%] left-[12%] text-5xl animate-popHat delay-500 filter drop-shadow-lg">
          🎩
        </div>
        <div className="absolute bottom-[18%] right-[12%] text-5xl animate-popHat delay-200 filter drop-shadow-lg">
          👑
        </div>

        {/* Floating Streamers / Serpentinas */}
        <div className="absolute top-[5%] left-[30%] text-4xl animate-floatStreamer opacity-90">
          🎊
        </div>
        <div className="absolute top-[8%] right-[32%] text-4xl animate-floatStreamer opacity-90 delay-300">
          🎀
        </div>
        <div className="absolute bottom-[8%] left-[45%] text-4xl animate-floatStreamer opacity-90 delay-700">
          ✨
        </div>
      </div>

      {/* Main Modal Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full border-2 border-pink-200 shadow-2xl relative text-center overflow-hidden z-10 animate-fadeIn">
        {/* Glow Effects */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-pink-300/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-sky-300/40 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 p-2 text-sky-400 hover:text-sky-800 rounded-full hover:bg-sky-50 transition-all cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Festive Header Icon */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-pink-400 via-amber-300 to-sky-400 p-1 mx-auto mb-3 shadow-xl flex items-center justify-center animate-bounce">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <CheckCircle2 className="w-11 h-11 text-emerald-500" />
          </div>
          {/* Sparkles around badge */}
          <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-amber-400 animate-spin" />
          <Sparkles className="absolute -bottom-1 -left-1 w-6 h-6 text-pink-400 animate-pulse" />
        </div>

        <h3 className="text-2xl font-black text-sky-950 font-serif mb-1 leading-snug">
          {record.willAttend === "Sim" ? "Presença Confirmada! 🥳" : "Resposta Registrada! 💖"}
        </h3>

        <p className="text-xs text-sky-800 mb-4 font-medium leading-relaxed">
          {record.willAttend === "Sim"
            ? `Parabéns, ${record.fullName}! Sua presença foi confirmada e a mágica começou!`
            : `Agradecemos por nos avisar, ${record.fullName}. Sentiremos sua falta!`}
        </p>

        {/* Button to Re-trigger Sound + Explosion */}
        <button
          type="button"
          onClick={() => triggerFestiveExplosion()}
          className="mb-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold border border-amber-300 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <PartyPopper className="w-4 h-4 text-amber-600 animate-bounce" />
          <span>Estourar Confetes & Chapéus Novamente! 🎉</span>
        </button>

        {/* Recap Box */}
        <div className="bg-gradient-to-b from-sky-50 to-pink-50/50 border border-sky-100 rounded-2xl p-4 text-left text-xs space-y-2 mb-5 shadow-inner">
          <div className="flex justify-between text-sky-900 border-b border-sky-200/60 pb-1.5">
            <span className="font-semibold text-sky-700">Convidado:</span>
            <span className="font-bold text-sky-950">{record.fullName}</span>
          </div>
          <div className="flex justify-between text-sky-900 border-b border-sky-200/60 pb-1.5">
            <span className="font-semibold text-sky-700">Status:</span>
            <span className={`font-bold ${record.willAttend === "Sim" ? "text-emerald-600" : "text-rose-600"}`}>
              {record.willAttend === "Sim" ? "Confirmado ✨" : "Não comparecerá"}
            </span>
          </div>
          {record.willAttend === "Sim" && (
            <div className="flex justify-between text-sky-900 border-b border-sky-200/60 pb-1.5">
              <span className="font-semibold text-sky-700">Acompanhantes:</span>
              <span className="font-bold text-sky-950">{record.companionsCount} pessoa(s)</span>
            </div>
          )}
          <div className="flex justify-between text-sky-900">
            <span className="font-semibold text-sky-700">Contato:</span>
            <span className="font-bold text-sky-950">{record.phone}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-lg shadow-pink-300/50 active:scale-95 transition-all cursor-pointer border border-pink-300"
        >
          Concluir ✨
        </button>
      </div>
    </div>
  );
}
