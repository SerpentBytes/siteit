const packageJson = require('../package.json')
const { colorize } = require('./cliColorizer')

const cmd = () => colorize('cmd',Object.keys(packageJson.bin))

const flag = (value) => colorize('flg', value)

const src = (value) => colorize('src', value)

const hdg = (value) => colorize('h', value)

const err = (value) => colorize('err', value)

const success = (value) => colorize('success', value)

const secondary = (value) => colorize('secondary', value)

module.exports = { cmd, flag, src, hdg, err, success, secondary }