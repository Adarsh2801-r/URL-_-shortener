const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://adarsh:adarsh@cluster0.fow89ce.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.listen(5000, () => {
  console.log("Server started..");
});
app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls });
});
app.post("/shortUrl", async (req, res) => {
  await ShortUrl.create({ fullUrl: req.body.fullURL });
  res.redirect("/");
});
app.get("/:shortUrl", async (req, res) => {
  const surl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl });
  if (surl == null) {
    return res.status(401);
  }
  surl.clicks++;
  surl.save();
  res.redirect(surl.fullUrl);
});
