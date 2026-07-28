export const GOOGLE_APPS_SCRIPT_CODE = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Se a planilha estiver vazia, cria o cabeçalho automaticamente
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Data e Hora do Envio",
        "Nome Completo",
        "Quantidade de Acompanhantes",
        "Telefone",
        "Confirmará Presença?",
        "Restrição Alimentar",
        "Observações"
      ]);
      // Formata o cabeçalho
      sheet.getRange(1, 1, 1, 7)
           .setFontWeight("bold")
           .setBackground("#D4E6F1")
           .setFontColor("#1B4F72");
    }
    
    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }
    
    sheet.appendRow([
      data.dataHora || new Date().toLocaleString("pt-BR"),
      data.fullName || "",
      data.companionsCount !== undefined ? data.companionsCount : 0,
      data.phone || "",
      data.willAttend || "",
      data.dietaryRestriction || "",
      data.notes || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

export const GOOGLE_SHEETS_STEPS = [
  {
    step: 1,
    title: "Abra sua Planilha no Google Sheets",
    description: "Crie uma nova planilha vazia no Google Drive ou abra uma existente para o evento da Giovanna."
  },
  {
    step: 2,
    title: "Abra o Editor de Apps Script",
    description: "No menu superior da planilha, clique em 'Extensões' > 'Apps Script'."
  },
  {
    step: 3,
    title: "Cole o Código do Script",
    description: "Apague o código padrão no editor, cole o código fornecido abaixo e clique no ícone de Salvar (💾)."
  },
  {
    step: 4,
    title: "Implantar como Web App",
    description: "Clique em 'Implantar' (Deploy) no canto superior direito > 'Nova implantação'. Escolha o tipo 'App da Web' (Web App)."
  },
  {
    step: 5,
    title: "Ajustar Permissões de Acesso",
    description: "Defina 'Executar como' = 'Mim' e 'Quem tem acesso' = 'Qualquer pessoa' (Anyone). Clique em 'Implantar' e autorize o acesso."
  },
  {
    step: 6,
    title: "Copiar a URL da Implantação",
    description: "Copie a URL do App da Web gerada (começa com https://script.google.com/macros/s/...) e cole no painel de configurações do site."
  }
];
