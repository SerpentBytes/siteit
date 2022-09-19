const { dispatch, handleImproperUsage } = require("./utility");

module.exports.main = (args) => {
  if (args.length === 3 && (args[2] === "-v" || args[2] === "--version")) {
    dispatch("-v");
  } else if (args.length === 3 && (args[2] === "-h" || args[2] === "--help")) {
    dispatch("-h");
  } else if (args[2] === "-i" || args[2] === "--input") {
    dispatch("-i", args);
  } else {
    handleImproperUsage();
  }
};
