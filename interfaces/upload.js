const { formatUploadPath } = require('../tools/utils');
module.exports = {
    face: async (ctx, next) => {
        return {
            code: 0,
            message: '上传成功',
            path: formatUploadPath(ctx.data.face[0].path)
        }
    }
}