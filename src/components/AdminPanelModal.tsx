import React, { useState, useEffect } from "react";
import { Users, UserCheck, RefreshCw, X, ShieldCheck, HeartHandshake } from "lucide-react";
import { RsvpStats } from "../types";

interface AdminPanelModalProps {
  onClose: () => void;
}

export function AdminPanelModal({ onClose }: AdminPanelModalProps) {
  const [stats, setStats] = useState<RsvpStats>({
    totalRespostas: 0,
    confirmados: 0,
    recusados: 0,
    totalAcompanhantes: 0,
    totalPessoasConfirmadas: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rsvps");
      const data = await res.json();
      setStats(
        data.stats || {
          totalRespostas: 0,
          confirmados: 0,
          recusados: 0,
          totalAcompanhantes: 0,
          totalPessoasConfirmadas: 0,
        }
      );
    } catch (err) {
      console.error("Error loading stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-sky-200 relative my-6 text-left overflow-hidden">
        {/* Decorative Background Accents */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-sky-100 pb-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold shadow-inner">
              <ShieldCheck className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-sky-950 font-serif">Resumo de Confirmações</h3>
              <p className="text-xs text-sky-800">1º Aninho da Giovanna • Total Geral</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={fetchStats}
              type="button"
              className="p-2 text-sky-600 hover:bg-sky-50 rounded-xl transition-all cursor-pointer"
              title="Atualizar estatísticas"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-2 text-sky-400 hover:text-sky-800 rounded-full hover:bg-sky-50 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Highlight Card - Total Pessoas Confirmadas */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white text-center shadow-lg mb-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Users className="w-24 h-24 text-white" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-100 block mb-1">
            Total Geral de Pessoas Confirmadas
          </span>
          <span className="text-4xl sm:text-5xl font-black font-serif drop-shadow-md">
            {stats.totalPessoasConfirmadas}
          </span>
          <p className="text-xs text-sky-100 mt-1 font-medium">
            {stats.confirmados} convidado(s) principal(is) + {stats.totalAcompanhantes} acompanhante(s)
          </p>
        </div>

        {/* Grid Stats (3 Columns) */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {/* Confirmados */}
          <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-2xl text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 text-emerald-700 mb-1">
              <UserCheck className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Titulares</span>
            </div>
            <span className="text-xl font-black text-emerald-950">{stats.confirmados}</span>
            <span className="text-[10px] text-emerald-800 block mt-0.5 font-medium">Confirmados</span>
          </div>

          {/* Acompanhantes */}
          <div className="p-3 bg-sky-50 border border-sky-200/80 rounded-2xl text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 text-sky-700 mb-1">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Acompanh.</span>
            </div>
            <span className="text-xl font-black text-sky-950">{stats.totalAcompanhantes}</span>
            <span className="text-[10px] text-sky-800 block mt-0.5 font-medium">Acompanhantes</span>
          </div>

          {/* Total Respostas */}
          <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-2xl text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 text-amber-700 mb-1">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Respostas</span>
            </div>
            <span className="text-xl font-black text-amber-950">{stats.totalRespostas}</span>
            <span className="text-[10px] text-amber-800 block mt-0.5 font-medium">Formulários</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full py-3 px-4 rounded-2xl bg-sky-900 hover:bg-sky-950 text-white font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer"
        >
          Fechar Painel
        </button>
      </div>
    </div>
  );
}
