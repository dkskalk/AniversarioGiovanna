const HARDCODED_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNtUNF2v_1S9wTwRjjFdQNneAokhUrQm5GJFG1pdebG76yK_k9R4N-EM08zXKv3ZsU/exec";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, companionsCount, phone, willAttend, dietaryRestriction, notes } = req.body || {};

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
    });

    const newRecord = {
      id: "rsvp_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      dataHora: nowFormatted,
      fullName: fullName.trim(),
      companionsCount: attendance === "Sim" ? Math.max(0, parseInt(companionsCount, 10) || 0) : 0,
      phone: phone.trim(),
      willAttend: attendance,
      sentToSheet: true,
    };

    // Forward to Google Sheets
    await fetch(HARDCODED_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        dataHora: newRecord.dataHora,
        fullName: newRecord.fullName,
        companionsCount: newRecord.companionsCount,
        phone: newRecord.phone,
        willAttend: newRecord.willAttend,
        dietaryRestriction: dietaryRestriction || "",
        notes: notes || "",
      }),
    });

    return res.status(200).json({
      success: true,
      record: newRecord,
      message: "Confirmação registrada com sucesso!",
    });
  } catch (err) {
    console.error("Vercel API RSVP Error:", err);
    return res.status(500).json({ error: "Erro interno ao processar a confirmação." });
  }
}
