const chalk = require('chalk')

module.exports.colorize = ((type, text) => {
    let coloredText = "";
    switch(type){
        case 'h':
            coloredText = chalk.inverse.bold(text)
            break
        case 'cmd': 
            coloredText = chalk.greenBright(text)
            break
        case 'flg':
            coloredText = chalk.blueBright(text)
            break
        case 'src':
            coloredText = chalk.bold.yellowBright(text)
            break
        case 'err':
            coloredText = chalk.redBright.bold.inverse(text)
            break
        case 'success':
            coloredText = chalk.green(text)
            break
        case 'secondary':
            coloredText = chalk.yellow(text)
            break
    }

    return coloredText;
})
