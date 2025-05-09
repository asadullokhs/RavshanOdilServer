require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");


const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));


const PORT = process.env.PORT || 4002;
const MONGO_URL = process.env.MONGO_URL;

app.get("/", (req, res) => {
  res.send("This is Home page");
});

mongoose.connect(MONGO_URL).then(() => {
  app.listen(PORT, () => console.log(`Server responded at ${PORT} port...`));
});
