import React, { useState } from "react";
import { User, Users, Phone, Send, AlertCircle, Sparkles } from "lucide-react";
import { RsvpRecord } from "../types";
import { maskPhone } from "../utils/phoneMask";

interface RsvpFormProps {
  onSuccess: (record: RsvpRecord) => void;
}

export function RsvpForm({ onSuccess }: RsvpFormProps) {
  const [fullName, setFullName] = useState("");
  const [companionsCount, setCompanionsCount] = useState(0);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = maskPhone(e.target.value);
    setPhone(formatted);
  };

  const handleCompanionsChange = (delta: number) => {
    setCompanionsCount((prev) => Math.max(0, Math.min(10, prev + delta)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Por favor, informe seu nome completo.");
      return;
    }

    if (!phone.trim() || phone.length < 14) {
      setErrorMessage("Por favor, insira um número de telefone válido com DDD.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          companionsCount,
          phone: phone.trim(),
          willAttend: "Sim",
          dietaryRestriction: "",
          notes: "",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erro ao salvar confirmação.");
      }

      onSuccess(data.record);

      // Reset form
      setFullName("");
      setCompanionsCount(0);
      setPhone("");
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage(err.message || "Ocorreu um erro ao enviar sua confirmação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 py-3" id="rsvp-section">
      <div className="bg-white/90 backdrop-blur-md border border-white shadow-xl rounded-3xl p-6 relative overflow-hidden">
        {/* Soft pink glow accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Section Title */}
        <div className="text-center mb-5 border-b border-sky-100/80 pb-3">
          <h2 className="text-xl font-extrabold text-sky-950 font-serif flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Confirme sua Presença</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </h2>
          <p className="text-xs text-sky-800 mt-1">
            Preencha seus dados para garantir seu lugar na festa!
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Nome Completo */}
          <div>
            <label className="block text-xs font-bold text-sky-950 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-sky-600" />
              <span>Nome Completo *</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ex: Maria Silva"
              className="w-full px-4 py-3 rounded-2xl bg-sky-50/60 border border-sky-200/90 text-sky-950 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white transition-all shadow-inner placeholder:text-sky-400/70"
            />
          </div>

          {/* 2. Telefone */}
          <div>
            <label className="block text-xs font-bold text-sky-950 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>Telefone para contato *</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={handlePhoneChange}
              placeholder="(21) 99999-9999"
              className="w-full px-4 py-3 rounded-2xl bg-sky-50/60 border border-sky-200/90 text-sky-950 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white transition-all shadow-inner placeholder:text-sky-400/70"
            />
          </div>

          {/* 3. Quantidade de Acompanhantes */}
          <div>
            <label className="block text-xs font-bold text-sky-950 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sky-600" />
                <span>Quantidade de acompanhantes</span>
              </span>
              <span className="text-[11px] font-semibold text-pink-700 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200/60">
                {companionsCount} {companionsCount === 1 ? "pessoa" : "pessoas"}
              </span>
            </label>
            <div className="flex items-center justify-between bg-sky-50/80 border border-sky-200 rounded-2xl p-2">
              <button
                type="button"
                onClick={() => handleCompanionsChange(-1)}
                disabled={companionsCount <= 0}
                className="w-10 h-10 rounded-xl bg-white border border-sky-200 text-sky-900 font-bold text-lg flex items-center justify-center shadow-sm disabled:opacity-40 active:scale-90 transition-all"
              >
                -
              </button>
              <div className="text-center">
                <span className="text-lg font-extrabold text-sky-950">{companionsCount}</span>
                <p className="text-[10px] text-sky-700">Acompanhante(s)</p>
              </div>
              <button
                type="button"
                onClick={() => handleCompanionsChange(1)}
                disabled={companionsCount >= 10}
                className="w-10 h-10 rounded-xl bg-pink-400 text-white font-bold text-lg flex items-center justify-center shadow-md hover:bg-pink-500 active:scale-90 transition-all"
              >
                +
              </button>
            </div>
          </div>

          {/* Pink Elegant Confirmation Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:to-rose-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-pink-300/40 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer border border-pink-300/60"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Confirmando presença...</span>
                </div>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Confirmar Presença</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
