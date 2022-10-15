import fs from 'fs'
import path from 'path'
import { generateHTML, generateIndexFile } from './html-generator.js'
import { getDir } from './html-generator.js'
import { err, success, secondary } from './cli-display.js'
import { handleImproperUsage } from './utility.js'

export class FileParser {
    constructor(source) {
        this.source = source[1].splice(1).toString().replace(',', ' ')
    }
    distManager() {
        try {
            console.log(
                secondary('-- Attempting to create output directory --')
            )
            fs.mkdirSync(path.join(getDir(), '../dist'))
        } catch (e) {
            // checking if directory already exists
            if (e.code === 'EEXIST') {
                console.log(
                    secondary(
                        '-- Output directory exists. Attempting to delete it --'
                    )
                )
                // delete the existing directory
                fs.rmSync(path.join(getDir(), '../dist'), {
                    recursive: true,
                    force: true,
                })
                console.log(
                    success(`-- Pre-existing output directory deleted --`)
                )
                // create a new dist directory
                fs.mkdirSync(path.join(getDir(), '../dist'))
            }
        }
        console.log(
            success(
                `-- DONE creating output directory: ${path.resolve(
                    '../dist'
                )} --`
            )
        )
    }
    processFile(altSrc) {
        this.distManager() // check if output directory exists, if it does delete it, and create a new one

        // if the source path is relative, convert it to absolute
        let filePath = altSrc
            ? path.resolve(altSrc)
            : path.isAbsolute(this.source)
            ? this.source
            : path.resolve(this.source)
        try {
            let content = fs.readFileSync(filePath, { encoding: 'utf8' })
            generateHTML(this.source, content) // generate HTML file based on paramaters supplied
        } catch (e) {
            console.error(
                `${err(
                    '-- ERROR: error reading file. Make sure file supplied exists --'
                )}`
            )
        }
    }
    processDir(altSrc) {
        let files = []
        this.distManager()
        let dirPath = altSrc
            ? path.resolve(altSrc)
            : path.isAbsolute(this.source)
            ? this.source
            : path.resolve(this.source)
        try {
            files = fs.readdirSync(dirPath)

            files.map((file) => {
                let content = fs.readFileSync(`${dirPath}/${file}`, {
                    encoding: 'utf8',
                })
                generateHTML(file, content)
            })
        } catch (e) {
            console.log(
                err(`-- ERROR -- Invalid or unsupported files supplied --`)
            )
        }
        // generate an Index.html file using the files supplied
        generateIndexFile(files)
    }
    processInput(altSrc) {
        // Remove "-i" option from the parameter and take care of spaces in source
        let src = altSrc
            ? altSrc[1].splice(1).toString().replace(',', ' ')
            : this.source

        // if user does not supply a file, print an error message
        if (src.length === 0) {
            console.error(err('-- ERROR: No source supplied --'))
        } else {
            try {
                // check if the source is a file
                if (fs.statSync(src).isFile()) {
                    this.processFile(src) // process the file
                    // check if source is a directory
                } else if (fs.statSync(src).isDirectory()) {
                    this.processDir(src) // process the directory
                }
            } catch (e) {
                console.log(e)
                console.error(
                    `${err('-- Invalid or multiple source supplied --')}`
                )
                handleImproperUsage() // print proper usage message
            }
        }
    }
    processConfig() {
        if (this.source.length === 0) {
            console.error(err('-- ERROR: No source supplied --'))
        } else {
            try {
                if (fs.statSync(this.source).isFile()) {
                    let filePath = path.isAbsolute(this.source)
                        ? this.source
                        : path.resolve(this.source)

                    let content = fs.readFileSync(filePath, {
                        encoding: 'utf8',
                    })

                    let jsonParse = JSON.parse(content)

                    console.log(
                        secondary('-- Processing Script file: ' + this.source)
                    )

                    if (jsonParse.input) {
                        let text = ['-i', ['-i', jsonParse.input]]
                        this.processInput(text)
                    }
                }
            } catch (e) {
                handleImproperUsage('-c')
            }
        }
    }
}
