const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    displayName: {type:String},
    imageUrl: {type:String},
    id: {type:String}
})

const UsersCollection =mongoose.model("users", UserSchema)
module.exports = UsersCollection