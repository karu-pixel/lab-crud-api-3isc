require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // triggers connection on start
const studentRoutes = require('./routes/studentRoutes');
const coursesRoutes = require('./routes/coursesRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/health', (req, res) => {
  const dbStatus = db && db.threadId ? 'connected' : 'initialized';
  res.json({ status: 'ok', db: dbStatus, time: new Date().toISOString() });
});

app.use('/api', studentRoutes);
app.use('/api', coursesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/api/health`);
});