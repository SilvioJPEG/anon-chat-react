require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");

const chatRoutes = require("./core/routes");
const createSocket = require("./core/socket");
require("./core/db");

app = express();
app.use(express.json());
app.use("/public", express.static(path.resolve(__dirname, "./public")));
app.use(chatRoutes);
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = createSocket(server);

server.listen(PORT, function () {
  console.log(`App listening at http://localhost:${PORT}`);
});
