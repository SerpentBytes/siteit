const { dispatch } = require('./utlility')

module.exports.main = (args) => {
    if(args.length < 3){
        console.log("insufficient or no arguments supplied")
    } else if(args.length === 3 && (args[2] === "-v" || args[2] === "--version")){
        dispatch("-v")
    } else if(args.length === 3 && (args[2] === "-h" || args[2] === "--help")){
        dispatch("-h")
    }
}