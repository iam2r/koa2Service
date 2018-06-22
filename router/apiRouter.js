const  invoke  = require('../controllers/invoke')
const api = require('koa-router')({
    prefix: '/api'
});

api.get("/:object/:method", async (ctx, next) => {
    await invoke(`../interfaces/`, ctx, next)
});

api.post("/:object/:method", async (ctx, next) => {
    await invoke(`../interfaces/`, ctx, next)
});

module.exports = api

