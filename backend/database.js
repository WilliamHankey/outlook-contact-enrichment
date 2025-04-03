const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) throw err;
  console.log('Connected to SQLite');
});

// Schema definition
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      full_name TEXT,
      job_title TEXT,
      department TEXT,
      phone_number TEXT
    )
  `);

  // Seed default user (only if not already in DB)
  const testEmail = 'test@example.com';
  const testPassword = 'securepassword123';

  db.get(`SELECT * FROM users WHERE email = ?`, [testEmail], async (err, user) => {
    if (!user) {
      const hash = await bcrypt.hash(testPassword, 10);
      db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [testEmail, hash]);
      console.log(`Seeded test user: ${testEmail}`);
    }
  });

  // Seed sample contact
  const sample = {
    email: 'sender@example.com',
    full_name: 'Jane Sender',
    job_title: 'Senior Developer',
    department: 'Engineering',
    phone_number: '+1-555-1234'
  };

  db.get(`SELECT * FROM contacts WHERE email = ?`, [sample.email], (err, contact) => {
    if (!contact) {
      db.run(`
        INSERT INTO contacts (email, full_name, job_title, department, phone_number)
        VALUES (?, ?, ?, ?, ?)
      `, [
        sample.email,
        sample.full_name,
        sample.job_title,
        sample.department,
        sample.phone_number
      ]);
      console.log(`Seeded contact: ${sample.email}`);
    }
  });
});

module.exports = db;
