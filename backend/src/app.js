const express = require('express');
const cors = require('cors')

const pasteRoutes = require('./routes/pastes.route')

const app = express();

// Middlewares
app.use(express.json());

app.use(cors())

// Routes
app.use("/api", pasteRoutes);
app.use(pasteRoutes);

module.exports = app;