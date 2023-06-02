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

  exports.getBlogsAll = async (req,res) => {
    const blogs = await Blog.find({});
    res.render("posts",{
      blogs
    })
  }

  exports.getBlog = async (req,res) => {
    const blog = await Blog.findById(req.params.id);

    res.render("post-detail",{
      blog
    })
  }

  exports.editBlog = async (req,res) => {
    const blog = await Blog.findOne({_id: req.params.id});

    
    let uploadImage = req.files.image;
    let uploadPath = __dirname + "/../public/uploads/" + uploadImage.name;

    uploadImage.mv(uploadPath);

    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.detail = req.body.detail;
    blog.image = '/uploads/' + uploadImage.name;
    blog.save();

    res.redirect("/blogs/" + req.params.id);
  }

