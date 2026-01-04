const mysql = require("mysql2");

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "fullcycle",
};

function connectWithRetry() {
  const connection = mysql.createConnection(config);

  connection.connect((err) => {
    if (err) {
      console.error("MySQL connection failed. Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("Connected to MySQL!");
      createTable(connection);
      startServer(connection);
    }
  });
}

function createTable(connection) {
  connection.query(`
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255)
    )
  `);
}

function startServer(connection) {
  const express = require("express");
  const app = express();

  app.get("/", (req, res) => {
    const name = `User-${Math.floor(Math.random() * 1000)}`;

    connection.query(
      "INSERT INTO people(name) VALUES(?)",
      [name],
      () => {
        connection.query("SELECT name FROM people", (err, results) => {
          let html = "<h1>Full Cycle Rocks!</h1><ul>";
          results.forEach((r) => {
            html += `<li>${r.name}</li>`;
          });
          html += "</ul>";
          res.send(html);
        });
      }
    );
  });

  app.listen(3000, () => {
    console.log("Node app running on port 3000");
  });
}

connectWithRetry();
