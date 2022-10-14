const express = require("express");
const app = express();

app.listen(5000, () => {
  console.log("Server started..");
});
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
