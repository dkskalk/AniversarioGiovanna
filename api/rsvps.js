export default async function handler(req, res) {
  return res.status(200).json({
    rsvps: [],
    stats: {
      totalRespostas: 0,
      confirmados: 0,
      recusados: 0,
      totalAcompanhantes: 0,
      totalPessoasConfirmadas: 0,
    },
  });
}
