"use strict";

/* a set of custom utlity functions that help manage Siteit */

const {
  name,
  version
} = require("../package.json");
const fs = require("fs");
const path = require("path");
const {
  cmd,
  flag,
  hdg,
  src,
  err,
  success,
  secondary
} = require("./cli-display");
const {
  generateHTML,
  generateIndexFile
} = require("./html-generator");

/* This function is executed when user incorrectly makes use of the
available options */
const handleImproperUsage = option => {
  switch (option) {
    case "-i":
      console.log("-- ERROR --\n".concat(cmd(), " -i myfile.txt\nusage: ").concat(cmd(), " --input myfile.txt"));
      break;
    case "-c":
      console.log("-- ERROR --\n".concat(cmd(), " -c myfile.json\nusage: ").concat(cmd(), " --config myfile.json"));
      break;
    default:
      console.log("Usage: ".concat(cmd(), " ").concat(flag("[flag]"), " ").concat(src("[source]")));
  }
};
/* This function is ultimately executed to display tool name and version when the user
 runs the tool with -v or --version option */

const displayNameVersion = () => {
  console.log("Name: ".concat(name, "\nVersion: ").concat(version));
};

/* This function is ultimately executed to display the usage guide for when -h or --help option is
used */
const displayManual = () => {
  console.log("   \n".concat(hdg("SiteIt - USAGE MANUAL"), "\n\n    usage:   \n             ").concat(cmd(), " ").concat(flag("[flag]"), "\n             ").concat(cmd(), " ").concat(flag("[flag]"), " ").concat(src("[source_file]"), "\n             ").concat(cmd(), " ").concat(flag("[flag]"), " ").concat(src("[source_directory]"), "\n\n    example: \n             ").concat(cmd(), " ").concat(flag("-v"), "\n             ").concat(cmd(), " ").concat(flag("-i"), " ").concat(src("source_file.txt"), "\n             ").concat(cmd(), " ").concat(flag("-i"), " ").concat(src("./source_directory"), "\n\nCommon SiteIt Flag Options\n----------------------------------------------------------------------\n\n    ").concat(flag("--version | -v"), "     Outputs tool name and version information\n\n    ").concat(flag("--help    | -h"), "     Outputs Siteit command usage manual \n\n    ").concat(flag("--input   | -i"), "    Accepts a source file or a directory containing \n                       files as input, and outputs an HTML file for \n                       each file supplied\n\n    ").concat(flag("--config  | -c"), "    Accepts the 'ssg-config.json' file to create a script for running multiple commands                       \n\n----------------------------------------------------------------------\n                        *** END OF MANUAL ***                   \n    "));
};
/* distManager is responsible for ensuring no existing outdirectory exists.
If an output directory is found, it is recursively deleted, and a new one is created
in its place.*/

const distManager = () => {
  try {
    console.log(secondary("-- Attempting to create output directory --"));
    fs.mkdirSync(path.join(__dirname, "../dist"));
  } catch (e) {
    // checking if directory already exists
    if (e.code === "EEXIST") {
      console.log(secondary("-- Output directory exists. Attempting to delete it --"));
      // delete the existing directory
      fs.rmSync(path.join(__dirname, "../dist"), {
        recursive: true,
        force: true
      });
      console.log(success("-- Pre-existing output directory deleted --"));
      // create a new dist directory
      fs.mkdirSync(path.join(__dirname, "../dist"));
    }
  }
  console.log(success("-- DONE creating output directory: ".concat(path.resolve("../dist"), " --")));
};
/* processFile accepts a file as a parameter. It is responsible for processing
a single input file provided by user. It reads the content of the file, and
and invokes a function call to generateHTML with srcPath, and file contents */
const processFile = srcPath => {
  distManager(); // check if output directory exists, if it does delete it, and create a new one

  // if the source path is relative, convert it to absolute
  let filePath = path.isAbsolute(srcPath) ? srcPath : path.resolve(srcPath);
  try {
    let content = fs.readFileSync(filePath, {
      encoding: "utf8"
    });
    generateHTML(srcPath, content); // generate HTML file based on paramaters supplied
  } catch (e) {
    console.error("".concat(err("-- ERROR: error reading file. Make sure file supplied exists --")));
  }
};

/* processDir accepts a directory as a parameter. It is responsible for processing
a single directory containing txt files, provided by the user. It reads the content of each the file
within the directory. It maps through an array of files, and invokes a call
to generateHTML, passing it the file path and its content, for every file.
*/

const processDir = dir => {
  let files = [];
  distManager();
  let dirPath = path.isAbsolute(dir) ? dir : path.resolve(dir);
  try {
    files = fs.readdirSync(dirPath);
    files.map(file => {
      let content = fs.readFileSync("".concat(dirPath, "/").concat(file), {
        encoding: "utf8"
      });
      generateHTML(file, content);
    });
  } catch (e) {
    console.log(err(" ".concat(e, " -- ERROR -- Invalid or unsupported files supplied --")));
  }
  // generate an Index.html file using the files supplied
  generateIndexFile(files);
};

/* processInput accepts arguments passed by the dispatch function. It is 
responsible to evaluate whether the source supplied is a source or a 
directory. Upon checking it invokes the approrpiate function responsible for the handling
input type, or prints an error message, if user supplied invalid parameter.
*/

const processInput = args => {
  // Remove "-i" option from the parameter and take care of spaces in source
  let src = args[1].splice(1).toString().replace(",", " ");

  // if user does not supply a file, print an error message
  if (src.length === 0) {
    console.error(err("-- ERROR: No source supplied --"));
  } else {
    try {
      // check if the source is a file
      if (fs.statSync(src).isFile()) {
        processFile(src); // process the file
        // check if source is a directory
      } else if (fs.statSync(src).isDirectory()) {
        processDir(src); // process the directory
      }
    } catch (e) {
      console.log(e);
      console.error("".concat(err("-- Invalid or multiple source supplied --")));
      handleImproperUsage(); // print proper usage message
    }
  }
};

const processConfig = args => {
  let src = args[1].splice(1).toString().replace(",", " ");
  if (src.length === 0) {
    console.error(err("-- ERROR: No source supplied --"));
  } else {
    try {
      if (fs.statSync(src).isFile()) {
        let filePath = path.isAbsolute(src) ? src : path.resolve(src);
        let content = fs.readFileSync(filePath, {
          encoding: "utf8"
        });
        let jsonParse = JSON.parse(content);
        console.log(secondary("-- Processing Script file: " + src));
        if (jsonParse.input) {
          let text = ["-i", ["-i", jsonParse.input]];
          processInput(text);
        }
      }
    } catch (e) {
      handleImproperUsage("-c");
    }
  }
};

/* dispatch function name is inspired by Redux dispatch function. 
Here, dispatch is responsible for dispatching the job to the right
function based on option supplied by user
*/
const dispatch = function dispatch() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  switch (args[0]) {
    case "-v":
      displayNameVersion(); // display name and version
      break;
    case "-h":
      displayManual(); // display guide
      break;
    case "-i":
      processInput(args); // process input
      break;
    case "-c":
      processConfig(args);
      break;
  }
};
module.exports = {
  dispatch,
  handleImproperUsage
};