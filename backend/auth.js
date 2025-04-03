const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'dev_secret_key'; // fallback for dev

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

// Wrap DB query in a promise to allow async/await in route logic
async function validateCredentials(email, password, db) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) return reject(err);
      if (!user) return resolve(null);

      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch ? resolve(user) : resolve(null);
    });
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (_) {
    return null;
  }
}

module.exports = {
  generateToken,
  validateCredentials,
  verifyToken
};
