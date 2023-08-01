const path = require('path');
const fs = require('fs');
const rfs = require('rotating-file-stream');

const LogDir = path.join(__dirname, '../production_logs');
fs.existsSync(LogDir) || fs.mkdirSync(LogDir)

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: LogDir
})


const development = {
    name: 'deveolopment',
    asset_path: process.env.HANGOUT_ASSETPATH,
    session_cookie_key: process.env.HANGOUTS_SESSIONCOOKIEKEY,
    db: process.env.HANGOUTS_DB,
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.HANGOUT_ASSETPATH,
    session_cookie_key: process.env.HANGOUTS_SESSIONCOOKIEKEY,
    db: process.env.HANGOUTS_DB,
    morgan: {
        mode: 'combine',
        options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.HANGOUTS_ENVIRONMENT) == undefined ? development : eval(process.env.HANGOUTS_ENVIRONMENT)
