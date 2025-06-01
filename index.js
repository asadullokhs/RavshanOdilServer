require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const orderRoutes = require("./src/routes/orderRoute");
const commentRoutes = require("./src/routes/commentRouter")
const companyRoutes = require("./src/routes/companyRouter")
const packageRoutes = require("./src/routes/companyRouter")
const authRoutes = require("./src/routes/authRouter")

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

// routes
app.use("/api/orders", orderRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/package", packageRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 4002;
const MONGO_URL = process.env.MONGO_URL;

app.get("/", (req, res) => {
  res.send("This is Home page");
});

mongoose.connect(MONGO_URL).then(() => {
  app.listen(PORT, () => console.log(`Server responded at ${PORT} port...`));
});
