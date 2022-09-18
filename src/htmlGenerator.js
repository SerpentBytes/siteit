const fs = require("fs");
const path = require("path");
const { success, err } = require("./cliDisplay");

const addPTag = (content) => {
  let returnStr = "";
  returnStr += content.replace(/[\r\n]{2,}/g, "</p>\n\n<p>");
  return returnStr;
};
const generateHTML = (...args) => {

  let cssFileURL = args[2];
  let content = addPTag(args[1]);
  let fileNameWithHTMLExt = path.basename(args[0]).replace(".txt", ".html");

  let markup = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${fileNameWithHTMLExt}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<p>${content}</p>
</body>
</html>`;

  try {
    fs.writeFileSync(
      path.join(__dirname, `../dist/${fileNameWithHTMLExt.split("/")}`),
      markup
    );
    console.log(
      success(`-- ${fileNameWithHTMLExt} generated in dist directory --`)
    );
  } catch (e) {
    console.log(fileNameWithHTMLExt);
    console.error(
      err(`-- ERROR writing to output file ${fileNameWithHTMLExt}`)
    );
  }
};

module.exports = { generateHTML };
