require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = process.env.DB_PATH || './data/cultura.db';
const resolved = path.resolve(dbPath);

fs.mkdirSync(path.dirname(resolved), { recursive: true });

const db = new Database(resolved);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

module.exports = db;
