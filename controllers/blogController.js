const Blog = require("../models/Blog");
const fs = require("fs");

exports.createBlog = (req,res) => {
    const uploadDir = "public/uploads";

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.image;
    let uploadPath = __dirname + "/../public/uploads/" + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
        await Blog.create({
          ...req.body,
          image: "/uploads/" + uploadImage.name,
        });
        console.log(req.body);
        res.redirect("/");
      });
  }
