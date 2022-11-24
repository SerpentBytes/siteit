import fs from 'fs';
import path from 'path';
import { format } from 'prettier'; // format output files using prettier
import { fileURLToPath } from 'url';
import { err, success } from './cli-display.js';
// eslint-disable-next-line import/no-named-as-default
import mdParser from './md-parser.js';

// // styles constant holds reference to customs stylesheet and Google fonts
const styles = `<link rel="stylesheet" type="text/css" href="../src/siteit.css" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/dark.min.css">`;

/*  generatePTags programmatically generates tags based on regular expression
The function replaces all instances of carriage return and newline characters
with appropriate paragraph tags and a blank line */
const generatePTags = (content) => {
  const returnStr = content.replace(/[\r\n]{2,}/g, '</p>\n\n<p>');
  return `<p>${returnStr}</p>`;
};
// returns file extention
const getFileExt = (filePath) => path.extname(filePath);

const getFile = () => fileURLToPath(import.meta.url);

export const getDir = () => path.dirname(getFile());

// replace existing extention with the new extension. If new extension is empty skip file extension.
const parseFileName = (filePath, newExt = '') =>
  path.basename(filePath).replace(getFileExt(filePath), newExt || '');

const generateMarkup = (data, isIndex = false, fileExt = '') => {
  const contentForIndex = `<ul>${data.mainContent}</ul>`;
  const headingForTxtFile =
    fileExt === '.txt' ? `<h1>${data.mainHeading}</h1>` : '';
  const markup = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        ${styles}
        <title>${data.title ? data.title : 'Index'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
        ${isIndex ? '<h1>Index</h1>' : headingForTxtFile}
        ${isIndex ? contentForIndex : data.mainContent}
        </body>
        </html>`;

  return markup;
};
/*  generateHTML uses template literals and string interpolation to write html
html markup to output file. Tags are programmatically generated when call to
generatePTags is invoked with file content */
export const generateHTML = (...args) => {
  const fileExtension = getFileExt(args[0]);

  const fileNameWithHTMLExt = parseFileName(args[0], '.html');

  let content = '';
  if (fileExtension === '.txt') {
    content = generatePTags(
      args[1].substring(parseFileName(fileNameWithHTMLExt).length + 2)
    );
  } else {
    content = mdParser(args[1]); // call mdParser for markdown parsing.
  }

  const markup = generateMarkup(
    {
      title: parseFileName(args[0]),
      mainHeading: args[1].substring(0, args[1].indexOf('\n')),
      mainContent: content,
    },
    false,
    fileExtension
  );
  try {
    // create and write to file
    fs.writeFileSync(
      path.join(getDir(), `../dist/${fileNameWithHTMLExt}`),
      format(markup, { bracketSameLine: true, parser: 'html' }) // fix the html output formatting using "prettier"
    );
    console.log(
      // success message
      success(`-- ${fileNameWithHTMLExt} generated in dist directory --`)
    );
  } catch (e) {
    console.error(
      err(`-- ERROR writing to output file ${fileNameWithHTMLExt}`)
    );
  }
};
/*  generateIndexFile behaves similar to generateHTML except its generating
markup for Index file which contains list items with working relative link
to files generated by genereateHTML. This function should not be invoked
prior to invoking generateHTML */

export const generateIndexFile = (files) => {
  let content = ``;
  files.map((file) => {
    content +=
      '<li><a href=' +
      `"../dist/${parseFileName(file, '.html')}">` +
      `${parseFileName(file)}</a></li>`;
  });

  // markup for index.html
  const markup = generateMarkup({ mainContent: content }, true);

  // create and write to file:
  try {
    fs.writeFileSync(
      path.join(getDir(), '../dist/index.html'),
      format(markup, { bracketSameLine: true, parser: 'html' })
    );
    // success message
    console.log(success('-- index.html generated in dist directory --'));
  } catch (e) {
    // error message
    console.error(err(`-- ERROR generating index.html --`));
  }
};

export default { generateHTML, generateIndexFile };
