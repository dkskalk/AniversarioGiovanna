import React, { useState, useEffect } from "react";
import { Users, UserCheck, UserX, Search, Download, Trash2, RefreshCw, X, FileSpreadsheet, Settings, Shield, Check } from "lucide-react";
import { RsvpRecord, RsvpStats } from "../types";

interface AdminPanelModalProps {
  onClose: () => void;
  onOpenSheetsGuide: () => void;
}

export function AdminPanelModal({ onClose, onOpenSheetsGuide }: AdminPanelModalProps) {
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const [stats, setStats] = useState<RsvpStats>({
    totalRespostas: 0,
    confirmados: 0,
    recusados: 0,
    totalAcompanhantes: 0,
    totalPessoasConfirmadas: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"Todos" | "Sim" | "Não">("Todos");

  const fetchRsvps = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rsvps");
      const data = await res.json();
      setRsvps(data.rsvps || []);
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
      console.error("Error loading RSVPs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRsvps();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Deseja realmente remover esta resposta da lista?")) return;
    try {
      await fetch(`/api/rsvps/${id}`, { method: "DELETE" });
      fetchRsvps();
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCSV = () => {
    if (rsvps.length === 0) {
      alert("Nenhum convidado para exportar.");
      return;
    }

    const headers = ["Data e Hora", "Nome Completo", "Confirmou Presenca", "Acompanhantes", "Telefone", "Restricao Alimentar", "Observacoes"];
    const rows = rsvps.map((r) => [
      `"${r.dataHora}"`,
      `"${r.fullName}"`,
      `"${r.willAttend}"`,
      r.companionsCount,
      `"${r.phone}"`,
      `"${r.dietaryRestriction || ""}"`,
      `"${r.notes || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Confirmacoes_Aniversario_Giovanna_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery);
    if (filterTab === "Sim") return matchesSearch && r.willAttend === "Sim";
    if (filterTab === "Não") return matchesSearch && r.willAttend === "Não";
    return matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-sky-950/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-sky-200 relative my-6 text-left max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sky-100 pb-3 mb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-sky-950 font-serif">Painel do Evento • Lista de Convidados</h3>
              <p className="text-xs text-sky-800">Gerenciamento de presenças da festa da Giovanna</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={fetchRsvps}
              type="button"
              className="p-2 text-sky-600 hover:bg-sky-50 rounded-xl transition-all"
              title="Atualizar lista"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-2 text-sky-400 hover:text-sky-800 rounded-full hover:bg-sky-50 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5 shrink-0">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
            <span className="block text-xs font-bold uppercase tracking-wider text-emerald-800">Confirmados</span>
            <span className="text-xl font-extrabold text-emerald-950">{stats.confirmados}</span>
            <span className="text-[10px] text-emerald-700 block">Titulares</span>
          </div>

          <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl text-center">
            <span className="block text-xs font-bold uppercase tracking-wider text-sky-800">Total Pessoas</span>
            <span className="text-xl font-extrabold text-sky-950">{stats.totalPessoasConfirmadas}</span>
            <span className="text-[10px] text-sky-700 block">Titulares + {stats.totalAcompanhantes} Acomp.</span>
          </div>

          <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-center">
            <span className="block text-xs font-bold uppercase tracking-wider text-rose-800">Ausentes</span>
            <span className="text-xl font-extrabold text-rose-950">{stats.recusados}</span>
            <span className="text-[10px] text-rose-700 block">Não poderão ir</span>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-center">
            <span className="block text-xs font-bold uppercase tracking-wider text-amber-800">Total Respostas</span>
            <span className="text-xl font-extrabold text-amber-950">{stats.totalRespostas}</span>
            <span className="text-[10px] text-amber-700 block">No sistema</span>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 shrink-0">
          {/* Tabs */}
          <div className="flex bg-sky-100/80 p-1 rounded-xl w-full sm:w-auto">
            {(["Todos", "Sim", "Não"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                type="button"
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterTab === tab
                    ? "bg-white text-sky-950 shadow-sm"
                    : "text-sky-700 hover:text-sky-950"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onOpenSheetsGuide}
              type="button"
              className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-emerald-300"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              <span>Google Sheets</span>
            </button>

            <button
              onClick={handleExportCSV}
              type="button"
              className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Baixar CSV</span>
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-4 shrink-0">
          <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome do convidado ou telefone..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {/* Guest List Table */}
        <div className="flex-1 overflow-y-auto min-h-[220px] border border-sky-100 rounded-2xl">
          {loading ? (
            <div className="p-8 text-center text-xs text-sky-700">Carregando lista de convidados...</div>
          ) : filteredRsvps.length === 0 ? (
            <div className="p-8 text-center text-xs text-sky-700">
              Nenhum convidado encontrado com os filtros selecionados.
            </div>
          ) : (
            <div className="divide-y divide-sky-100">
              {filteredRsvps.map((r) => (
                <div key={r.id} className="p-3 hover:bg-sky-50/60 transition-all flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-sm text-sky-950 truncate">{r.fullName}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          r.willAttend === "Sim"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {r.willAttend === "Sim" ? "Confirmado" : "Ausente"}
                      </span>
                      {r.sentToSheet && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200" title="Enviado para o Google Sheets">
                          Planilha ✓
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-sky-800">
                      <span>📞 {r.phone}</span>
                      {r.willAttend === "Sim" && (
                        <span>👥 {r.companionsCount} acompanhante(s)</span>
                      )}
                      <span className="text-sky-400 text-[10px]">⏱ {r.dataHora}</span>
                    </div>

                    {r.dietaryRestriction && (
                      <p className="text-[11px] text-amber-900 bg-amber-50 p-1.5 rounded-lg border border-amber-200 mt-1.5">
                        ⚠️ <strong>Restrição alimentar:</strong> {r.dietaryRestriction}
                      </p>
                    )}

                    {r.notes && (
                      <p className="text-[11px] text-sky-900 italic mt-1">
                        💬 "{r.notes}"
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(r.id)}
                    type="button"
                    className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    title="Excluir resposta"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
