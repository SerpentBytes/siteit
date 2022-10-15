"use strict";

var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _pretty = _interopRequireDefault(require("pretty"));
var _cliDisplay = require("./cli-display");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
// styles constant holds reference to customs stylesheet and Google fonts
const styles = "<link rel=\"stylesheet\" type=\"text/css\" href=\"../src/siteit.css\" /> \n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"> \n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin> \n<link href=\"https://fonts.googleapis.com/css2?family=Questrial&display=swap\" rel=\"stylesheet\">";
const BOLD_REGEX_MD = /\*\*(.+?)\*\*(?!\*)/g;
const ITALIC_REGEX_MD = /\*([^*><]+)\*/g;
const CODE_REGEX_MD = /\`(.+?)\`/gm;
var _filePath = /*#__PURE__*/new WeakMap();
var _content = /*#__PURE__*/new WeakMap();
class GenerateHTML {
  constructor(filePath, content) {
    _classPrivateFieldInitSpec(this, _filePath, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _content, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _filePath, filePath);
    _classPrivateFieldSet(this, _content, content);
  }
}
/*  generatePTags programmatically generates tags based on regular expression
The function replaces all instances of carriage return and newline characters
with appropriate paragraph tags and a blank line */
const generatePTags = content => {
  let returnStr = content.replace(/[\r\n]{2,}/g, "</p>\n\n<p>");
  returnStr = returnStr.replace(/\-{3}/g, "<hr>");
  returnStr = returnStr.replace(/(\r\n|\n|\r)/gm, " ");
  returnStr = returnStr.replace(BOLD_REGEX_MD, "<strong>$1</strong>");
  returnStr = returnStr.replace(ITALIC_REGEX_MD, "<i>$1</i>");
  returnStr = returnStr.replace(CODE_REGEX_MD, "<code>$1</code>");
  return "<p>".concat(returnStr, "</p>");
};
// returns file extention
const getFileExt = filePath => _path.default.extname(filePath);

// replace existing extention with the new extension. If new extension is empty skip file extension. 
const parseFileName = function parseFileName(filePath) {
  let newExt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return _path.default.basename(filePath).replace(getFileExt(filePath), newExt ? newExt : "");
};
const generateMarkup = function generateMarkup(data) {
  let isIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let fileExt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  const contentForIndex = "<ul>".concat(data.mainContent, "</ul>");
  const headingForTxtFile = "<h1>".concat(fileExt === ".txt" ? data.mainHeading : "", "</h1>");
  let markup = "<!DOCTYPE html>\n  <html lang=\"en\">\n  <head>\n  <meta charset=\"utf-8\">\n  ".concat(styles, "\n  <title>").concat(data.title ? data.title : "Index", "</title>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  </head>\n  <body>\n  ").concat(isIndex ? "<h1>Index</h1>" : headingForTxtFile, "\n  ").concat(isIndex ? contentForIndex : data.mainContent, "\n  </body>\n  </html>");
  return markup;
};
/*  generateHTML uses template literals and string interpolation to write html 
html markup to output file. Tags are programmatically generated when call to
generatePTags is invoked with file content */
const generateHTML = function generateHTML() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  const inputFileExtension = getFileExt(args[0]);
  let fileNameWithHTMLExt = parseFileName(args[0], ".html");
  let content = generatePTags(inputFileExtension === ".txt" ? args[1].substring(parseFileName(fileNameWithHTMLExt).length + 2) : args[1]);
  const markup = generateMarkup({
    mainHeading: args[1].substring(0, args[1].indexOf("\n")),
    mainContent: content
  }, false, inputFileExtension);
  try {
    // create and write to file
    _fs.default.writeFileSync(_path.default.join(__dirname, "../dist/".concat(fileNameWithHTMLExt)), (0, _pretty.default)(markup, {
      ocd: true
    }) // fix the html output formatting using "pretty"
    );

    console.log(
    // success message
    (0, _cliDisplay.success)("-- ".concat(fileNameWithHTMLExt, " generated in dist directory --")));
  } catch (e) {
    // error message
    console.error((0, _cliDisplay.err)("-- ERROR writing to output file ".concat(fileNameWithHTMLExt)));
  }
};
/*  generateIndexFile behaves similar to generateHTML except its generating
markup for Index file which contains list items with working relative link
to files generated by genereateHTML. This function should not be invoked
prior to invoking generateHTML */

const generateIndexFile = files => {
  let content = "";
  files.map(file => {
    content += "<li><a href=\"../dist/".concat(parseFileName(file, ".html"), "\"</a>").concat(parseFileName(file), "</li>");
  });

  // markup for index.html
  const markup = generateMarkup({
    mainContent: content
  }, true);

  // create and write to file:
  try {
    _fs.default.writeFileSync(_path.default.join(__dirname, "../dist/index.html"), (0, _pretty.default)(markup, {
      ocd: true
    }));
    // success message
    console.log((0, _cliDisplay.success)("-- index.html generated in dist directory --"));
  } catch (e) {
    // error message
    console.error((0, _cliDisplay.err)("-- ERROR generating index.html --"));
  }
};
module.exports = {
  generateHTML,
  generateIndexFile
};