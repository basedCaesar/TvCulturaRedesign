const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res, next) => {
  try {
    const rows = db.prepare(`
      SELECT id, slug, titulo, categoria, descricao, imagem_local, gerado_em
      FROM programas
      ORDER BY titulo ASC
    `).all();
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', (req, res, next) => {
  try {
    const programa = db.prepare(`
      SELECT * FROM programas WHERE slug = ?
    `).get(req.params.slug);

    if (!programa) return res.status(404).json({ error: 'Programa não encontrado' });

    const episodios = db.prepare(`
      SELECT * FROM episodios WHERE programa_id = ? ORDER BY data_episodio DESC, id DESC
    `).all(programa.id);

    res.json({ ...programa, episodios });
  } catch (err) {
    next(err);
  }
});

const episodiosRouter = express.Router();

episodiosRouter.get('/:id', (req, res, next) => {
  try {
    const episodio = db.prepare('SELECT * FROM episodios WHERE id = ?').get(req.params.id);
    if (!episodio) return res.status(404).json({ error: 'Episódio não encontrado' });
    res.json(episodio);
  } catch (err) {
    next(err);
  }
});

module.exports = { programasRouter: router, episodiosRouter };
