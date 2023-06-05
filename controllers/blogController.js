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
        res.redirect("/");
      });
  }

  exports.getBlogsAll = async (req,res) => {
    const page = req.query.page || 1;
    const blogsPerPage = 2;

    const totalBlogs = await Blog.find().countDocuments();


    const blogs = await Blog.find({})
    .skip((page - 1) * blogsPerPage)
    .limit(blogsPerPage);
 
    res.render("posts",{
      blogs,
      current: page,
      pages: Math.ceil(totalBlogs / blogsPerPage)
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

  exports.getSearchBlog = async (req,res) => {
    const searchQuery = req.query.blogs;
    const regex = new RegExp(searchQuery, 'i');
    const searchItems = await Blog.find({
      title: { $regex: regex },
    }).exec();
    const searchLink = `/search?q=${encodeURIComponent(searchQuery)}`;
    const searchResultsFound = searchItems.length > 0;

    res.render("search",{
      searchQuery,
      searchItems,
      searchLink,
      searchResultsFound
    });
  }

