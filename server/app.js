const express = require('express');
const chatRoutes = require('./routes/chat');
const app = express();

app.use(express.json());
app.use(chatRoutes)


module.exports = app;