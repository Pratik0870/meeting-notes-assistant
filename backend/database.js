const Database = require("better-sqlite3");
const db = new Database("meetings.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS meetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    participants TEXT,
    raw_notes TEXT,
    summary TEXT,
    tags TEXT,
    action_items TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;