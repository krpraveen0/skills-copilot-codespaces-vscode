const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const serpApiRoutes = require('./routes/serpApi');
const contentRoutes = require('./routes/content');
const postingRoutes = require('./routes/posting');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/trends', serpApiRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/post', postingRoutes);

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Tech Blog Server running on http://localhost:${PORT}`);
});
