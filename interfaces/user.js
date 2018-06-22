const mongoose = require('mongoose')
module.exports = {
    register: async ctx => {
        const User = mongoose.model('User')
        let newUser = new User(ctx.data)
        await newUser.save()
        return {
            code: 200,
            message: '注册成功'
        }  
    },

    login: async ctx => {
        const User = mongoose.model('User')
        let { userName, password } = ctx.data
        const result = await User.findOne({ userName }).exec()
        if (result) {
            let newUser = new User()
            const isMatch = await newUser.comparePassword(password, result.password)
            return { code: 200, message: isMatch }
        } else {
            return { code: 200, message: '用户名不存在' }
        }
    }
}