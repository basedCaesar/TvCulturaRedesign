const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res, next) => {
  try {
    const rows = db.prepare(`
      SELECT id, titulo, descricao, imagem_local, imagem_url, url_externa, slug, gerado_em
      FROM podcasts
      ORDER BY titulo ASC
    `).all();
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
