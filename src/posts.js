const fs = require("fs");

const config = require("./config");
const fm = require("front-matter"); // front-matter parser
const marked = require("marked"); // markdown-parser

const renderHTMLTemplate = data => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${data.attributes.description}" />
        <link rel="stylesheet" href="../assets/styles/grotesk.light.min.css">
        <link rel="stylesheet" href="../assets/styles/highlights.min.css">
        <link rel="stylesheet" href="../assets/styles/main.min.css">
        <title>${data.attributes.title}</title>
    </head>
    <body>
        <div class="grotesk">
            <header>
                <a href="/">Go back home</a>
                <p>-</p>
            </header>
            <div class="content">
                <h1>${data.attributes.title}</h1>
                <p>${new Date(
                  parseInt(data.attributes.date)
                ).toDateString()}</p>
                <hr />
                ${data.body}
            </div>
            <footer>
                ${`<p>© ${new Date().getFullYear()} ${
                  config.authorName
                }, blahh</p>`}
            </footer>
        </div>
    </body>
</html>
`;

const createPostObject = postPath => {
  const data = fs.readFileSync(`${config.dev.postsdir}/${postPath}.md`, "utf8");
  const content = fm(data);
// content now in the form of:
//   {
//     attributes: {
//         title: 'Just hack\'n',
//         description: 'Nothing to see here'
//     },
//     body: 'This is some text about some stuff that happened sometime ago',
//     bodyBegin: 6,
//     frontmatter: 'title: Just hack\'n\ndescription: Nothing to see here'
//   }  
  content.body = marked(content.body);
  content.path = postPath;
  return content;
};

const createPosts = posts => {
    console.log("creatPosts ", posts)
    posts.forEach(post => {
        if (!fs.existsSync(`${config.dev.outdir}/${post.path}`))
        fs.mkdirSync(`${config.dev.outdir}/${post.path}`);

        fs.writeFile(
        `${config.dev.outdir}/${post.path}/index.html`,
        renderHTMLTemplate(post),
        e => {
            if (e) throw e;
            console.log(`${post.path}/index.html was created successfully`);
        }
        );
    });
 };

module.exports = {
  createPostObject: createPostObject,
  createPosts: createPosts
};
