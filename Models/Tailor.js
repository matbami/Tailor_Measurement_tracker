const mongoose = require('mongoose')
const validator = require('validator')


const tailorSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email not valid')
            }
        }
        
    },
    password:{
        type:String,
        required: true,
        trim: true,
        minlength: 7
        
    },
    phone:{
        type:Number,
        required:true
    }
})
const Tailor = mongoose.model('Tailor', tailorSchema)

module.exports = Tailor