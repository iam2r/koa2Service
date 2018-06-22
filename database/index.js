const { connect, initSchemas } = require('./init.js')
const mongoose = require('mongoose')
exports.initDatabase = async () => {
    await Promise.all([connect(),initSchemas()])
}


