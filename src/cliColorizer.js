const chalk = require("chalk"); // module to change colour and formatting
// of terminal output

module.exports.colorize = (type, text) => {
  let coloredText = "";
  switch (type) {
    case "h": // heading
      coloredText = chalk.inverse.bold(text);
      break;
    case "cmd": // command
      coloredText = chalk.greenBright(text);
      break;
    case "flg": // flag / option
      coloredText = chalk.blueBright(text);
      break;
    case "src": // source
      coloredText = chalk.bold.yellowBright(text);
      break;
    case "err": // error
      coloredText = chalk.redBright.bold.inverse(text);
      break;
    case "success": // success messages
      coloredText = chalk.green(text);
      break;
    case "secondary": // message worth noting but not important
      coloredText = chalk.yellow(text);
      break;
  }

  return coloredText;
};
