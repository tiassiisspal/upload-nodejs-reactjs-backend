require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");


const app = express();

/**
 * Database setup
 */

mongoose.set('strictQuery', false);

const uri = process.env.MONGO_URL;

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
  })
  .then(() => console.log(`MongoDB connected... in ... ${uri}`))
  .catch(err => console.log(`Cnn in ... ${uri} ... ` + err)
)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(require("./routes"));

app.listen(3000);
