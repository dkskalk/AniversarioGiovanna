import React, { useState } from "react";
import { FileSpreadsheet, Copy, Check, ExternalLink, X, Send, Sparkles, AlertCircle } from "lucide-react";
import { GOOGLE_APPS_SCRIPT_CODE, GOOGLE_SHEETS_STEPS } from "../utils/googleScriptTemplate";

interface GoogleSheetsGuideModalProps {
  currentUrl: string;
  onSaveUrl: (url: string) => Promise<void>;
  onClose: () => void;
}

export function GoogleSheetsGuideModal({ currentUrl, onSaveUrl, onClose }: GoogleSheetsGuideModalProps) {
  const [scriptUrl, setScriptUrl] = useState(currentUrl || "");
  const [copiedCode, setCopiedCode] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleTestConnection = async () => {
    if (!scriptUrl.trim()) {
      setTestResult({ success: false, message: "Insira a URL do Web App para testar." });
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/test-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: scriptUrl.trim() }),
      });
      const data = await res.json();

      if (data.success) {
        setTestResult({ success: true, message: "Conexão bem-sucedida! O teste enviou uma linha para sua planilha." });
      } else {
        setTestResult({ success: false, message: data.reason || "Não foi possível conectar à URL fornecida." });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || "Erro de conexão ao testar webhook." });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSaveUrl(scriptUrl.trim());
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-sky-950/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-sky-200 relative my-8 text-left max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sky-100 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-sky-950 font-serif">Integração Google Planilhas</h3>
              <p className="text-xs text-sky-800">Conecte o formulário diretamente ao Google Sheets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 text-sky-400 hover:text-sky-800 rounded-full hover:bg-sky-50 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Web App URL */}
        <form onSubmit={handleSave} className="mb-6 bg-sky-50 p-4 rounded-2xl border border-sky-200 space-y-3">
          <label className="block text-xs font-bold text-sky-950">
            URL do Web App do Google Apps Script
          </label>
          <input
            type="url"
            value={scriptUrl}
            onChange={(e) => setScriptUrl(e.target.value)}
            placeholder="https://script.google.com/macros/s/.../exec"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sky-300 text-xs text-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
          />

          {testResult && (
            <div
              className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                testResult.success
                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                  : "bg-rose-100 text-rose-900 border border-rose-300"
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{testResult.message}</span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testing || !scriptUrl.trim()}
              className="py-2 px-3 rounded-xl bg-sky-200 hover:bg-sky-300 text-sky-950 font-semibold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{testing ? "Testando..." : "Testar Envio"}</span>
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>{saving ? "Salvando..." : "Salvar Configuração"}</span>
            </button>
          </div>
        </form>

        {/* Copy Script Code Box */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-sky-950 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Código do Google Apps Script</span>
            </span>
            <button
              type="button"
              onClick={handleCopyCode}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                copiedCode
                  ? "bg-emerald-500 text-white"
                  : "bg-sky-500 text-white hover:bg-sky-600"
              }`}
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Código Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Script</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3 bg-slate-900 text-sky-200 rounded-2xl text-[11px] font-mono leading-relaxed overflow-x-auto max-h-40 border border-slate-700">
            {GOOGLE_APPS_SCRIPT_CODE}
          </pre>
        </div>

        {/* Step by Step instructions */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 mb-3">
            Passo a Passo de Instalação (1 minuto):
          </h4>
          <div className="space-y-3">
            {GOOGLE_SHEETS_STEPS.map((s) => (
              <div key={s.step} className="flex items-start gap-3 p-2.5 rounded-xl bg-sky-50/70 border border-sky-100">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {s.step}
                </span>
                <div>
                  <h5 className="text-xs font-bold text-sky-950">{s.title}</h5>
                  <p className="text-[11px] text-sky-800 leading-normal">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
