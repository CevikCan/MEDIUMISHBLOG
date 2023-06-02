const Blog = require("../models/Blog");

exports.getPostsPage = (req,res) => {
    res.render("posts");
}

exports.getAddPostPage = (req,res) => {
    res.render("add-post");
}

exports.getEditPage = async (req,res) => {
    const blog = await Blog.findById(req.params.id);
    res.render("edit-post",{
        blog
    })
}