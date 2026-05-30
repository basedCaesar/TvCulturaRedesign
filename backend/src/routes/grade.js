const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/datas-disponiveis', (req, res, next) => {
  try {
    const rows = db.prepare(`SELECT DISTINCT data FROM grade ORDER BY data ASC`).all()
    res.json({ datas: rows.map(r => r.data) })
  } catch (err) {
    next(err)
  }
})

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '')
}

let programasByNorm = null
function getProgramasByNorm() {
  if (!programasByNorm) {
    const all = db.prepare('SELECT slug, titulo, imagem_local FROM programas').all()
    programasByNorm = Object.fromEntries(all.map(p => [toSlug(p.titulo), p]))
  }
  return programasByNorm
}

router.get('/', (req, res, next) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const data = req.query.data || today;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      return res.status(400).json({ error: 'Formato de data inválido. Use YYYY-MM-DD' });
    }

    const rows = db.prepare(`
      SELECT g.*, p.imagem_local AS programa_imagem_local
      FROM grade g
      LEFT JOIN programas p
        ON p.slug = TRIM(REPLACE(g.link_programa, 'https://cultura.uol.com.br/programas/', ''))
      WHERE g.data = ?
      ORDER BY g.horario ASC
    `).all(data);

    const byNorm = getProgramasByNorm()
    const items = rows.map(row => {
      if (row.programa_imagem_local && row.link_programa) return row
      const match = byNorm[toSlug(row.programa_titulo)]
      if (!match) return row
      return {
        ...row,
        programa_imagem_local: row.programa_imagem_local || match.imagem_local,
        link_programa: row.link_programa || `https://cultura.uol.com.br/programas/${match.slug}`,
      }
    })

    res.json({ data, items });
  } catch (err) {
    next(err)
  }
});

module.exports = router;
