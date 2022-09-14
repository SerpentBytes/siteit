const packageJson = require('../package.json')
const fs = require('fs')
const path = require('path')
const { cmd, flag, hdg, src, err, success } = require('./cliDisplay')
const { generateHTML } = require('./htmlGenerator')

const handleImproperUsage = (flag) => {
    switch(flag){
        // case "-v":
        //     console.log(`Invalid option\nusage: siteit --version\nusage: siteit -v`)
        //     break
        // case "-h":
        //     console.log(`Invalid option\nusage: siteit --help\nusage: siteit -h`)
        //     break
        case "-i":
            console.log(`-- Invalid flag --\n${cmd()} -i myfile.txt\nusage: ${cmd()} --input myfile.txt`)
            break
        default:
            console.log(`-- Invalid flag --\nusage: ${cmd()} [flag] [source]`)
    }
}
const displayNameVersion = (() => {
    console.log(`Name: ${packageJson.name}\nVersion: ${packageJson.version}`)
})


const displayManual = (() => {
    console.log(`   
${hdg('SiteIt - USAGE MANUAL')}

    usage:   
             ${cmd()} ${flag('[flag]')}
             ${cmd()} ${flag('[flag]')} ${src('[source_file]')}
             ${cmd()} ${flag('[flag]')} ${src('[source_directory]')}

    example: 
             ${cmd()} ${flag('-v')}
             ${cmd()} ${flag('-i')} ${src('source_file.txt')}
             ${cmd()} ${flag('-i')} ${src('./source_directory')}

Common SiteIt Flag Options
----------------------------------------------------------------------

    ${flag('--version | -v')}     Outputs tool name and version information

    ${flag('--help    | -h')}     Outputs Siteit command usage manual 

    ${flag('--input   | -i')}    Accepts a source file or a directory containing 
                       files as input, and outputs an HTML file for 
                       each file supplied

----------------------------------------------------------------------
                        *** END OF MANUAL ***                   
    `)
})

const outputDirManager = () => {
    console.log('-- checking if output directory exists --')
    if(fs.existsSync(path.join(__dirname, '../dist'))){
        console.log('-- deleting existing output directory --')
        fs.rm(path.join(__dirname, '../dist'), {recursive: true}, (error => {}))
        console.log('-- DONE deleting output directory --')
    } else {
        console.log('-- creating output directory -- ')
        fs.mkdirSync(path.join(__dirname, '../dist'))
        console.log(success(`-- DONE creating output directory: ${path.resolve('../dist')} --`))
    }
}

const processFile = (file) => {
    let filePath = path.isAbsolute(file) ? file : path.resolve(file)
    try{
       let content = fs.readFileSync(filePath, { encoding: 'utf8' })
       generateHTML(file, content)
       
    } catch(e){
        console.error(`${err('-- ERROR: error reading file. Make sure file supplied exists --')}`)
    }
}

const processDir = (dir) => {
    let dirPath = path.isAbsolute(dir) ? dir : path.resolve(dir)
    try{
        let files = fs.readdirSync(dirPath)
        console.log(files)
    } catch(e){

    }
}
const processInput = ((args) => {
   const src = args.splice(3).join(' ')
   console.log(src)
   try{
    if(fs.statSync(src).isFile()){
        outputDirManager()
        console.log(src)
        processFile(src)
    } else if(fs.statSync(src).isDirectory()) {
        outputDirManager()
        processDir(src)
    }

   } catch (e){
        console.error(`${err('-- ERROR Invalid or non-existing source supplied --')}`)
   }
   
})

const dispatch = ((...args) => {
    switch(args[0]){
        case '-v':
            displayNameVersion()
            break
        case '-h':
            displayManual()
            break
        case '-i':
            processInput(args[1])
            break
    }
}) 

module.exports = { dispatch, handleImproperUsage }
