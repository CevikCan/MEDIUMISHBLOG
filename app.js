const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const pageController = require("./controllers/pageController");
const blogController = require("./controllers/blogController");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mediumish-db");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

app.use(methodOverride('_method', {
    methods: ["POST","GET"]
  }));

app.get("/",blogController.getBlogsAll);
app.get("/add-post",pageController.getAddPostPage);
app.get("/blogs/:id",blogController.getBlog);
app.get("/blogs/edit/:id",pageController.getEditPage);
app.post("/blogs",blogController.createBlog);
app.put("/blogs/:id",blogController.editBlog);

const port = 3000;

app.listen(port, ()=> {
    console.log("uygulama çalıştırıldı");
});