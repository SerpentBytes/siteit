"use strict";

const {
  dispatch,
  handleImproperUsage
} = require("./utility");

/* First function to be executed when user runs the tool from
the command-line. The "main" function is responsible for calling
the "dispatch" function if user provides a valid option */

module.exports.main = args => {
  args = args.slice(2); // get rid of first 2 arguments
  if (args.length === 1 && (args[0] === "-v" || args[0] === "--version")) {
    dispatch("-v");
  } else if (args.length === 1 && (args[0] === "-h" || args[0] === "--help")) {
    dispatch("-h");
  } else if (args[0] === "-i" || args[0] === "--input") {
    dispatch("-i", args);
  } else if (args[0] === "-c" || args[0] === "--config") {
    dispatch("-c", args);
  } else {
    handleImproperUsage(); // print proper usage info
  }
};