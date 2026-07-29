import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface RsvpRecord {
  id: string;
  dataHora: string;
  fullName: string;
  companionsCount: number;
  phone: string;
  willAttend: "Sim" | "Não";
  dietaryRestriction?: string;
  notes?: string;
  sentToSheet?: boolean;
}

interface AppConfig {
  googleScriptUrl: string;
}

const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), "rsvps_data.json");
const CONFIG_FILE = path.join(process.cwd(), "app_config.json");

const HARDCODED_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNtUNF2v_1S9wTwRjjFdQNneAokhUrQm5GJFG1pdebG76yK_k9R4N-EM08zXKv3ZsU/exec";

// Load stored RSVPs
let rsvps: RsvpRecord[] = [];
if (fs.existsSync(DATA_FILE)) {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    rsvps = JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read rsvps_data.json:", err);
    rsvps = [];
  }
}

// Ensure config has hardcoded URL
let config: AppConfig = { googleScriptUrl: HARDCODED_SCRIPT_URL };
try {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
} catch (err) {
  console.error("Failed to save app_config.json:", err);
}

function saveData() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2));
  } catch (err) {
    console.error("Failed to save rsvps_data.json:", err);
  }
}

async function forwardToGoogleSheets(payload: any) {
  try {
    const res = await fetch(HARDCODED_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    return { success: true, status: res.status };
  } catch (error: any) {
    console.error("Error forwarding to Google Apps Script:", error);
    return { success: false, reason: error?.message || "Erro de conexão com Google Sheets" };
  }
}

async function startServer() {
  const app = express();

  app.use(express.json());

  // API Endpoints

  // Get config status (without exposing full URL)
  app.get("/api/config", (req, res) => {
    res.json({ configured: true });
  });

  // Get aggregated stats ONLY (Protects guest privacy)
  app.get("/api/rsvps", (req, res) => {
    const totalSim = rsvps.filter((r) => r.willAttend === "Sim");
    const totalNao = rsvps.filter((r) => r.willAttend === "Não");
    const totalAcompanhantes = totalSim.reduce((acc, curr) => acc + (Number(curr.companionsCount) || 0), 0);
    const totalPessoasConfirmadas = totalSim.length + totalAcompanhantes;

    res.json({
      // Do not return personal contact info to protect guest privacy
      rsvps: [],
      stats: {
        totalRespostas: rsvps.length,
        confirmados: totalSim.length,
        recusados: totalNao.length,
        totalAcompanhantes,
        totalPessoasConfirmadas,
      },
    });
  });

  // Submit RSVP
  app.post("/api/rsvp", async (req, res) => {
    try {
      const { fullName, companionsCount, phone, willAttend, dietaryRestriction, notes } = req.body;

      if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
        return res.status(400).json({ error: "Nome completo é obrigatório." });
      }

      if (!phone || typeof phone !== "string" || !phone.trim()) {
        return res.status(400).json({ error: "Telefone de contato é obrigatório." });
      }

      const attendance = willAttend === "Sim" || willAttend === true || willAttend === "sim" ? "Sim" : "Não";
      const nowFormatted = new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const newRecord: RsvpRecord = {
        id: "rsvp_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        dataHora: nowFormatted,
        fullName: fullName.trim(),
        companionsCount: attendance === "Sim" ? Math.max(0, parseInt(companionsCount, 10) || 0) : 0,
        phone: phone.trim(),
        willAttend: attendance,
        dietaryRestriction: attendance === "Sim" ? (dietaryRestriction || "").trim() : "",
        notes: (notes || "").trim(),
        sentToSheet: false,
      };

      // Forward directly to hardcoded Google Sheets URL
      const sheetResult = await forwardToGoogleSheets({
        dataHora: newRecord.dataHora,
        fullName: newRecord.fullName,
        companionsCount: newRecord.companionsCount,
        phone: newRecord.phone,
        willAttend: newRecord.willAttend,
        dietaryRestriction: newRecord.dietaryRestriction || "",
        notes: newRecord.notes || "",
      });

      if (sheetResult.success) {
        newRecord.sentToSheet = true;
      }

      rsvps.unshift(newRecord);
      saveData();

      return res.json({
        success: true,
        record: newRecord,
        message: "Confirmação registrada com sucesso!",
      });
    } catch (err: any) {
      console.error("Error saving RSVP:", err);
      return res.status(500).json({ error: "Ocorreu um erro interno ao processar a confirmação." });
    }
  });

  // Vite or Static handling
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
