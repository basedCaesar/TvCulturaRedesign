require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
const { setupSwagger } = require('./swagger');

const { runMigrations } = require('./db/migrations');
const { programasRouter, episodiosRouter } = require('./routes/programas');
const { createNoticiasRouter, CATEGORIAS } = require('./routes/noticias');
const gradeRouter = require('./routes/grade');
const podcastsRouter = require('./routes/podcasts');
const db = require('./db');

runMigrations();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    process.env.FRONTEND_URL
  ].filter(Boolean)
}));

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '../data/images')));

app.use('/api/programas', programasRouter);
app.use('/api/episodios', episodiosRouter);
app.use('/api/grade', gradeRouter);
app.use('/api/podcasts', podcastsRouter);

for (const categoria of CATEGORIAS) {
  app.use(`/api/${categoria}`, createNoticiasRouter(categoria));
}

app.get('/api/meta', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM meta ORDER BY chave ASC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

cron.schedule('0 3 * * 0', () => {
  const { runSemanal } = require('./scrapers/scraper-semanal');
  runSemanal();
});

setupSwagger(app)

app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path} —`, err.message)
  res.status(500).json({ error: err.message })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});
