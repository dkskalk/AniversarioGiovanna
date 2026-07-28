export interface RsvpFormData {
  fullName: string;
  companionsCount: number;
  phone: string;
  willAttend: "Sim" | "Não";
  dietaryRestriction: string;
  notes: string;
}

export interface RsvpRecord {
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

export interface RsvpStats {
  totalRespostas: number;
  confirmados: number;
  recusados: number;
  totalAcompanhantes: number;
  totalPessoasConfirmadas: number;
}

export interface AppConfig {
  googleScriptUrl: string;
}
