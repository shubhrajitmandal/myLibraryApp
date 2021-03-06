if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to Atlas : myLibrary `))
  .catch(err => console.log(err));

app.engine("handlebars", hbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use("/", require("./routes/index"));
app.use("/authors", require("./routes/author"));
app.use("/books", require("./routes/book"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
