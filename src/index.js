const config = require("./config");
const postMethods  = require("./posts.js");
const fs = require("fs");

const posts = fs
  .readdirSync(config.dev.postsdir)
  .map(post => post.slice(0, -3))
  .map(post => postMethods.createPostObject(post));

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

postMethods.createPosts(posts)