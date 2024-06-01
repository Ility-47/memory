const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserSchema = new Schema({
    id: Number,
    name: String,
    clas: String,
    login: String,
    password: String,
    isLogin: Bool,
    status: String,
    from: String,
    logo: String,
})

const User = mongoose.model("user", UserSchema)
module.exports = User