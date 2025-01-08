const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const noteRoutes = require('./routes/note-routes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT ;


app.use(cors({
  origin: '*', // Allow only your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH','OPTIONS'], // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Notes App API!',
    status: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('MongoDB Connection Error:', err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
