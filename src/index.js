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

let uri = process.env.MONGO_URL;
let store_type = process.env.STORE_TYPE;

// console.log(process.env.MONGO_URL);
// console.log(process.env.STORAGE_TYPE);

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
  })
  .then(() => console.log(`MongoDB connected... in ... ${uri} and Store Type in ${store_type}`))
  .catch(err => console.log(`Cnn in ... ${uri}  and Store Type in ${store_type} ... ` + err)
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
