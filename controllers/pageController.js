exports.getPostsPage = (req,res) => {
    res.render("posts");
}

exports.getAddPostPage = (req,res) => {
    res.render("add-post");
}