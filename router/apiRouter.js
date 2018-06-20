const { invoke } = require('../tools/utils')
const api = require('koa-router')({
    prefix: '/api'
});

api.get("/:object/:method", async (ctx, next) => {
    await invoke(`../controllers/`, ctx, next)
});

api.post("/:object/:method", async (ctx, next) => {
    await invoke(`../controllers/`, ctx, next)
});

module.exports = api

