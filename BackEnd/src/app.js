const express = require("express");
const server = express();
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const mysql = require("mysql2");
server.use(cors());
server.use(express.json());
server.use(express.static("src"));
const db = mysql.createConnection({
  host: "mysql-d5f7afc-marcelelias11-5b03.k.aivencloud.com",
  port: "19351",
  user: "avnadmin",
  password: "AVNS_Hiikpb8C2RAs7jTAOcq",
  database: "mydb",
  ssl: {
    require: true,
    ca: fs.readFileSync("./src/ca/ca.pem"),
  },
});

dotenv.config();
db.connect();

db.query(`SELECT * FROM pesquisador`, (err, rows, fields) => {
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

server.post("/load", (req, res) => {
  db.query(
    `SELECT * FROM pesquisa WHERE idpesquisador = '${req.body.id}';`,
    (err, rows, fields) => {
      if (err) throw err;
      console.log(rows);
      res.status(201).send(rows);
    }
  );
});

server.post("/save", (req, res) => {
  db.query(
    `SELECT * FROM pesquisa WHERE idpesquisa = '${req.body.pesquisa}';`,
    (err, rows, fields) => {
      if (err) throw err;
      if (rows[0] == undefined) {
        db.query(
          `INSERT INTO pesquisa (idpesquisa, dados, idpesquisador) VALUES ('${req.body.pesquisa}', '${req.body.dados}', '${req.body.id}');`,
          (err, rows, fields) => {
            if (err) throw err;
            console.log(rows);
            res.status(201).send("Success!");
          }
        );
      } else {
        res.status(400).send("Pesquisa já cadastrada!");
      }
    }
  );
});

server.post("/delete", (req, res) => {
  db.query(
    `DELETE FROM pesquisa WHERE idpesquisa = '${req.body.pesquisa}';`,
    (err, result, fields) => {
      if (err) throw err;
      console.log("deleted Record: " + result.affectedRows);
      res.status(200).send("deleted Record: " + result.affectedRows);
    }
  );
});

server.post("/cadastro", (req, res) => {
  db.query(
    `SELECT * FROM pesquisador WHERE idpesquisador = '${req.body.id}';`,
    (err, rows, fields) => {
      if (err) throw err;
      if (rows[0] == undefined) {
        db.query(
          `INSERT INTO pesquisador (idpesquisador, senha) VALUES ('${req.body.id}', '${req.body.senha}');`,
          (err, rows, fields) => {
            if (err) throw err;
            console.log(rows);
            res.status(201).send("Success!");
          }
        );
      } else {
        res.status(400).send("Usuário já cadastrado!");
      }
    }
  );
});

server.post("/login", (req, res) => {
  db.query(
    `SELECT * FROM pesquisador WHERE idpesquisador = '${req.body.id}' AND senha = '${req.body.senha}';`,
    (err, rows, fields) => {
      if (err) throw err;
      if (rows[0] == undefined) {
        res.status(400).send("Usuário ou senha inválidos!");
      } else {
        res.status(201).send("Sucesso!");
      }
    }
  );
});

server.listen(8080, () => {
  console.log("Server On !");
});
