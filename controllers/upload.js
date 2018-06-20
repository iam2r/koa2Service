module.exports = {
    face: async (ctx, next) => {
        return {
            code: 0,
            message: '上传成功',
            path: ctx.data.face[0].path.split('\\').join('/')
        }
    }
}