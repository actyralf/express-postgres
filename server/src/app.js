const express = require("express");
const db = require("./KeyValueStore");

const app = express();
const port = 3000;

app.use("/*", (req, res, next) => {
  console.debug(req.path);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/test", (req, res) => {
  console.debug("Hello from Node.js Express Server: ", req.path);
  res.status(200).send({ name: "Dog", age: 12 });
});

const animals = [
  { name: "Dog", age: 12 },
  { name: "Cat", age: 8 },
  { name: "Bird", age: 3 },
];

app.get("/api/animals", (req, res) => {
  res.send(animals);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
