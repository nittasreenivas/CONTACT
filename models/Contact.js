const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true 
    },
    lastname:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true 
    },
    phoneNumber:{
        type:Number,
        required:true 
    },
},{
    timestamps:true
})

exports.Contact = mongoose.model('Contact',contactSchema)