# ssg_generator
create a generated site from scratch

We use these two interesting dependencies to make this work.

- [front-matter](https://www.npmjs.com/package/front-matter)
- [marked](https://www.npmjs.com/package/marked)

We create a html template and simply populate the placeholders in that template, based on the output of front-matter.
The body of the html will be the rendered markdown output to html, given our input markdown file.

The rest is just file structure and organization of the file inputs.
