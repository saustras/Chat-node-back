const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({

    name : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        default : ""
    }
}, {
    timestamps : true
})

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;