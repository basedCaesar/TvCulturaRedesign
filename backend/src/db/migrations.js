const db = require('./index');

function runMigrations() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS meta (
      chave TEXT PRIMARY KEY,
      valor TEXT,
      atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS programas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      titulo TEXT NOT NULL,
      categoria TEXT,
      descricao TEXT,
      imagem_local TEXT,
      imagem_url TEXT,
      url_original TEXT,
      gerado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS episodios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      programa_id INTEGER REFERENCES programas(id),
      titulo TEXT,
      descricao TEXT,
      youtube_id TEXT,
      url_original TEXT,
      data_episodio DATETIME,
      gerado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS noticias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      slug TEXT UNIQUE,
      categoria TEXT,
      conteudo TEXT,
      imagem_local TEXT,
      imagem_url TEXT,
      url_original TEXT,
      publicado_em DATETIME,
      gerado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS grade (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      programa_titulo TEXT,
      categoria TEXT,
      episodio_titulo TEXT,
      descricao TEXT,
      horario TIME,
      data DATE,
      imagem_url TEXT,
      link_programa TEXT,
      atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(data, horario)
    );

    CREATE TABLE IF NOT EXISTS podcasts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      imagem_url TEXT,
      imagem_local TEXT,
      url_externa TEXT,
      slug TEXT UNIQUE,
      gerado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  try { db.exec('ALTER TABLE noticias ADD COLUMN categoria TEXT'); } catch (_) {}
  try { db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_episodios_url ON episodios(url_original)'); } catch (_) {}
}

module.exports = { runMigrations };
