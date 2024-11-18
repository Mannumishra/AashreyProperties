const mongoose = require('mongoose');

exports.connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGOOURL);
        console.log("Aashrey Connected Succesfully !!");
    } catch (error) {
        console.error("Error : ",error);
    }
}