import React, { useEffect } from "react";
import { CheckCircle2, Sparkles, Heart, Calendar, Users, X } from "lucide-react";
import confetti from "canvas-confetti";
import { RsvpRecord } from "../types";

interface SuccessModalProps {
  record: RsvpRecord;
  onClose: () => void;
}

export function SuccessModal({ record, onClose }: SuccessModalProps) {
  useEffect(() => {
    // Fire confetti bursts for Cinderela Baby celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#A1C4FD", "#C2E9FB", "#FEE140", "#F8BBD0", "#FFFFFF"],
      });
    } catch (e) {
      console.log("Confetti error:", e);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-2 border-sky-200 shadow-2xl relative text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-300/30 rounded-full blur-2xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 p-2 text-sky-400 hover:text-sky-800 rounded-full hover:bg-sky-50 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon Header */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-300 via-sky-300 to-emerald-400 p-0.5 mx-auto mb-3 shadow-lg flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-bounce" />
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-sky-950 font-serif mb-1">
          {record.willAttend === "Sim" ? "Presença Confirmada! 👑" : "Resposta Registrada! 💖"}
        </h3>

        <p className="text-xs text-sky-800 mb-4 font-medium">
          {record.willAttend === "Sim"
            ? `Obrigado, ${record.fullName}! Mal podemos esperar para comemorar com você o 1º aninho da Giovanna!`
            : `Agradecemos por nos avisar, ${record.fullName}. Sentiremos sua falta nessa comemoração especial!`}
        </p>

        {/* Recap Box */}
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3.5 text-left text-xs space-y-2 mb-5">
          <div className="flex justify-between text-sky-900 border-b border-sky-200/60 pb-1.5">
            <span className="font-semibold text-sky-700">Convidado:</span>
            <span className="font-bold">{record.fullName}</span>
          </div>
          <div className="flex justify-between text-sky-900 border-b border-sky-200/60 pb-1.5">
            <span className="font-semibold text-sky-700">Status:</span>
            <span className={`font-bold ${record.willAttend === "Sim" ? "text-emerald-600" : "text-rose-600"}`}>
              {record.willAttend === "Sim" ? "Confirmado" : "Não comparecerá"}
            </span>
          </div>
          {record.willAttend === "Sim" && (
            <div className="flex justify-between text-sky-900 border-b border-sky-200/60 pb-1.5">
              <span className="font-semibold text-sky-700">Acompanhantes:</span>
              <span className="font-bold">{record.companionsCount} pessoa(s)</span>
            </div>
          )}
          <div className="flex justify-between text-sky-900">
            <span className="font-semibold text-sky-700">Contato:</span>
            <span className="font-bold">{record.phone}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-sm shadow-md shadow-pink-300/40 transition-all active:scale-95 cursor-pointer"
        >
          Concluir
        </button>
      </div>
    </div>
  );
}
