const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const noteRoutes = require('./routes/note-routes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT ;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
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