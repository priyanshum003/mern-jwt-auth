const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');
const secureRoutes = require('./routes/secure.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    exposedHeaders: ['set-cookie']
}));
app.use(express.json()); // Use express.json() instead of bodyParser.json()
console.log(process.env.CLIENT_URL);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', secureRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));