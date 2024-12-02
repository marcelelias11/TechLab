const express = require("express");
const server = express();
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const mysql = require("mysql2");
server.use(cors());
server.use(express.json());
server.use(express.static("src"));
const connection = mysql.createConnection({
  host: "mysql-d5f7afc-marcelelias11-5b03.k.aivencloud.com",
  port: "19351",
  user: "avnadmin",
  password: "AVNS_Hiikpb8C2RAs7jTAOcq",
  database: "defaultdb",
  ssl: {
    require: true,
    ca: fs.readFileSync("./src/ca/ca.pem"),
  },
});

dotenv.config();
connection.connect();

connection.query(`SELECT * FROM equipes`, (err, rows, fields) => {
  if (err) throw err;
  console.log(rows);
});

server.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy!" });
});
server.post("/stat", (req, res) => {
  fetch("http://localhost:5000/stat", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  })
    .then(async function (response) {
      console.log(response);
      return await response.json();
    })
    .then(async function (text) {
      console.log(text);
      res.status(201).send(text);
    })
    .catch((error) => {
      console.error(error);
    });
});
server.post("/sim", (req, res) => {
  fetch("http://localhost:5000/sim", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  })
    .then(async function (response) {
      console.log(response);
      return await response.json();
    })
    .then(async function (text) {
      console.log(text);
      res.status(201).send(text);
    })
    .catch((error) => {
      console.error(error);
    });
});

server.post("/dbstat", (req, res) => {
  fetch("http://localhost:5000/stat", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  })
    .then(async function (response) {
      console.log(response);
      return await response.json();
    })
    .then(async function (text) {
      console.log(text);
      res.status(201).send(text);
    })
    .catch((error) => {
      console.error(error);
    });
});

server.listen(8080, () => {
  console.log("Server On !");
});
