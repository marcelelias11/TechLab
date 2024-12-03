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
  database: "defaultdb",
  ssl: {
    require: true,
    ca: fs.readFileSync("./src/ca/ca.pem"),
  },
});

dotenv.config();
db.connect();

db.query(`SELECT * FROM equipes`, (err, rows, fields) => {
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

server.get();

server.post("/dbstat", (req, res) => {
  if (res.body.team === 0) {
    db.query(
      `SELECT idemail FROM estudantesemail WHERE email = '${req.body.email};`,
      (err, rows, fields) => {
        if (err) throw err;
        console.log(rows);
        let idemail = rows[0];
        db.query(
          `SELECT idestudante FROM estudantes WHERE estudantesemail_idemail = '${idemail}';`,
          (err, rows, fields) => {
            if (err) throw err;
            console.log(rows);
            let idestudante = rows[0];
            db.query(
              `SELECT estatistica_has_pesquisa_estatistica_idestatistica FROM estudantes_has_equipe WHERE estudantes_idestudante = '${idestudante}';`,
              (err, rows, fields) => {
                if (err) throw err;
                console.log(rows);
                let idestatistica = rows[0];
                if (res.body.mode === "load") {
                  db.query(
                    `SELECT * FROM estatistica WHERE idestatistica = '${idestatistica}';`,
                    (err, rows, fields) => {
                      if (err) throw err;
                      console.log(rows);
                      res.status(201).send(rows);
                    }
                  );
                } else if (res.body.mode === "save") {
                  console.log(req.body.values);
                  db.query(
                    `INSERT INTO estatistica VALUES '${req.body.values}';`,
                    (err, rows, fields) => {
                      if (err) throw err;
                      res.status(201).send("Success!");
                    }
                  );
                }
              }
            );
          }
        );
      }
    );
  }
});

server.listen(8080, () => {
  console.log("Server On !");
});
