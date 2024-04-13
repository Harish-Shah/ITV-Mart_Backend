let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    id:{
        type:String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    products: {
        type: [],
        required: false
    },
    cart: {
        type: [],
        required: false
    },
    phone: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt:"created_date",
        updatedAt:"updated_date"
    }
})

let userModel = mongoose.model("users", userSchema);

module.exports = userModel;