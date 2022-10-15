"use strict";

/* This file contains helper functions print coloured output
to the terminal  */

const {
  bin
} = require("../package.json");
const {
  colorize
} = require("./cli-colorizer");

/* This function calls colorize function to provides styling for
the command name for display purposes. If the executable command
is updated in package.json files, the changes would automatically
be reflected */
const cmd = () => colorize("cmd", Object.keys(bin));

/* This function calls colorize function styles
the options for display purposes */
const flag = value => colorize("flg", value);

/* This function calls colorize function to style
the source (file/directory) for display purposes */
const src = value => colorize("src", value);

/* This function calls colorize function to style
the headings for display purposes */
const hdg = value => colorize("h", value);

/* This function calls colorize function to colour code
error messages for display purposes */
const err = value => colorize("err", value);

/* This function calls colorize function to colour code
success messages for display purposes */
const success = value => colorize("success", value);

/* This function calls colorize function to colour code
messages in yellow colour for display purposes */
const secondary = value => colorize("secondary", value);
module.exports = {
  cmd,
  flag,
  src,
  hdg,
  err,
  success,
  secondary
};