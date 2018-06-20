const { connect, initSchemas } = require('./init.js')
const mongoose = require('mongoose')
exports.initDatabase = async () => {
    Promise.all([await connect(), await initSchemas()])
}


