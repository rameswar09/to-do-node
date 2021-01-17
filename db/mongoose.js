const mongoose = require("mongoose");

let urlDev = "mongodb://127.0.0.1:27017/fractal-to-do";

if (process.env.NODE_ENV === "production") {
  urlDev =
    "mongodb+srv://rameswar09:rameswar09@cluster0.ahwgi.mongodb.net/ramu-todo?retryWrites=true&w=majority";
}

// need to set env variable
mongoose.connect(urlDev, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
