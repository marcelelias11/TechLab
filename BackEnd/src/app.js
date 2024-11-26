import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "mysql-d5f7afc-marcelelias11-5b03.k.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_Hiikpb8C2RAs7jTAOcq",
  database: "mydb",
  ssl: {
    rejectUnauthorized: false,
  },
});

dotenv.config();
connection.connect();

const server = express();
server.use(cors());
server.use(express.json());

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
