const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', gameRoutes);

app.listen(PORT, () => {
    console.log(`✅ HAWKINS LAB SERVER RUNNING AT http://localhost:${PORT}`);
});