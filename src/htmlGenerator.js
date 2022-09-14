
const fs = require('fs')
const path = require('path')


const addPTag = (content) => {
    let returnStr = ""
    returnStr += content.replace(/[\n]{2,}/g, "</p>\n\n<p>")
    console.log(returnStr.toString())
    return returnStr

}
const generateHTML = (...args) => {

    let content = addPTag(args[1])
    let fileNameWithHTMLExt = args[0].replace('.txt', '.html')
       
    let markup = `<html lang="en">
        <head>
            <meta charset="utf-8">
            <title>${fileNameWithHTMLExt}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
            <p>${content}</p>
        </body>
         </html>`
        
         fs.writeFileSync(path.join(__dirname, `../dist/${fileNameWithHTMLExt}`), markup)
         console.log(`--- ${fileNameWithHTMLExt} generated in dist directory ---`)
}


module.exports = { generateHTML }