const userModel = require('../../models/usersModel.js')
const mongoose = require('mongoose')


class UserModelDaos {
    constructor() {
        this.model = userModel
    }

    getUsers = async () => {
        return await userModel.find()
    }
}


module.exports = UserModelDaos