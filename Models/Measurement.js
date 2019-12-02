const mongoose = require('mongoose')
const validator = require('validator')




const MeasureSchema = new mongoose.Schema({

    name:{
        type:String,
        // required:true,
        default:'Customer'
    },
    dresstype:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email not valid')
            }
        }
    },
    phone:{
        type:String,
        
    },
    measurements:{
        shirt_length:{
            type: Number

        },
        back:{
            type:Number
        },
        sleeve:{
            type:Number
        },
        round_sleeve:{
            type:Number
        },
        slimming:{
            type:Number
        },
        neck:{
            type:Number
        },

        trouser_length:{
            type:Number
        },
        Band:{
            type:Number
        },
        thigh:{
            type:Number
        },
        thigh_knees:{
            type:Number
        },
        blouse_length:{
            type:Number
        },
        burst:{
            type:Number
        },
        waist_blouse:{
            type:Number
        },
        blouse_hip:{
            type:Number
        },
        halflength:{
            type:Number
        },
        skirt_length:{
            type:Number
        },
        skirt_waist:{
            type:Number
        },
        skirt_hip:{
            type:Number
        },
        
    }
})
const Measure = mongoose.model('Measure' , MeasureSchema)


module.exports = Measure
