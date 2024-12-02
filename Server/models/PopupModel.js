const mongoose = require("mongoose")

const popupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    lookingfor: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Popup = mongoose.model("Popup", popupSchema)

module.exports = Popup