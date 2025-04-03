const express = require('express');
const { validateCredentials, generateToken, verifyToken } = require('./auth');
const db = require('./database');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required.' });

  try {
    const user = await validateCredentials(email, password, db);
    if (!user)
      return res.status(401).json({ message: 'Invalid email or password.' });

    const token = generateToken(user);
    return res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/contact-info', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Missing or invalid Authorization header.' });

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded)
    return res.status(403).json({ message: 'Invalid or expired token.' });

  const queryEmail = req.query.email;

  if (!queryEmail)
    return res.status(400).json({ message: 'Missing email query parameter.' });

  db.get(`SELECT * FROM contacts WHERE email = ?`, [queryEmail], (err, contact) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    if (!contact) return res.status(404).json({ message: 'Contact not found.' });

    return res.json(contact);
  });
});

module.exports = router;
