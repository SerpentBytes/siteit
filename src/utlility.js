const packageJson = require('../package.json')

const displayNameVersion = (() => {
    console.log(`Name: ${packageJson.name}\nVersion: ${packageJson.version}`)
})

const displayManual = (() => {

})

const dispatch = (action => {
    switch(action){
        case '-v':
            displayNameVersion()
            break
        case '-h':
            displayManual()
    }
}) 

module.exports = { dispatch }
