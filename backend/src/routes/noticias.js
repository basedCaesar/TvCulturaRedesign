const express = require('express');
const db = require('../db');

const CATEGORIAS = ['noticias', 'entretenimento', 'economia', 'receitas', 'esporte'];

function createNoticiasRouter(categoria) {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
      const offset = (page - 1) * limit;

      const rows = db.prepare(`
        SELECT id, titulo, slug, categoria, imagem_local, imagem_url, publicado_em, gerado_em
        FROM noticias
        WHERE categoria = ?
        ORDER BY publicado_em DESC
        LIMIT ? OFFSET ?
      `).all(categoria, limit, offset);

      const { total } = db.prepare('SELECT COUNT(*) as total FROM noticias WHERE categoria = ?').get(categoria);

      res.json({ data: rows, page, limit, total, pages: Math.ceil(total / limit) });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:slug', (req, res, next) => {
    try {
      const noticia = db.prepare('SELECT * FROM noticias WHERE slug = ? AND categoria = ?').get(req.params.slug, categoria);
      if (!noticia) return res.status(404).json({ error: 'Notícia não encontrada' });
      res.json(noticia);
    } catch (err) {
      next(err);
    }
  });

  return router;
}

module.exports = { createNoticiasRouter, CATEGORIAS };
