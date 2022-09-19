const fs = require("fs");
const path = require("path");
const pretty = require("pretty");
const { success, err } = require("./cliDisplay");

const styles = `<link rel="stylesheet" type="text/css" href="../src/siteit.css" /> 
<link rel="preconnect" href="https://fonts.googleapis.com"> 
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
<link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet">`;

const addTags = (content) => {
  let returnStr = "";
  returnStr += content.replace(/[\r\n]{2,}/g, "</p>\n\n<p>");
  return returnStr;
};
const generateHTML = (...args) => {
  let fileNameWithHTMLExt = path.basename(args[0]).replace(".txt", ".html");
  let content = addTags(
    args[1].substring(fileNameWithHTMLExt.replace(".html", "").length + 2)
  );

  let markup = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
${styles}
<title>${fileNameWithHTMLExt}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<h1>${args[1].substring(0, args[1].indexOf("\n"))}</h1>
<p>${content}</p>
</body>
</html>`;

  try {
    fs.writeFileSync(
      path.join(__dirname, `../dist/${fileNameWithHTMLExt}`),
      pretty(markup, { ocd: true })
    );
    console.log(
      success(`-- ${fileNameWithHTMLExt} generated in dist directory --`)
    );
  } catch (e) {
    console.error(
      err(`-- ERROR writing to output file ${fileNameWithHTMLExt}`)
    );
  }
};

const generateIndexFile = (files) => {
  let content = ``;
  files.map((file) => {
    content += `<li><a href="../dist/${path
      .basename(file)
      .replace(".txt", ".html")}"</a>${file.replace(".txt", "")}</li>`;
  });

  let markup = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
${styles}
<title>Index</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<h1>Index</h1>
<ul>
${content}
</ul>
</body>
</html>`;
  try {
    fs.writeFileSync(
      path.join(__dirname, `../dist/index.html`),
      pretty(markup, { ocd: true })
    );
    console.log(success(`-- index.html generated in dist directory --`));
  } catch (e) {
    console.error(err(`-- ERROR generating index.html --`));
  }
};

module.exports = { generateHTML, generateIndexFile };
