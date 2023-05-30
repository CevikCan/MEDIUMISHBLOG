const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const pageController = require("./controllers/pageController");
const blogController = require("./controllers/blogController");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mediumish-db");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

app.get("/",pageController.getPostsPage);
app.get("/add-post",pageController.getAddPostPage);
app.post("/blogs",blogController.createBlog);

const port = 3000;

app.listen(port, ()=> {
    console.log("uygulama çalıştırıldı");
});