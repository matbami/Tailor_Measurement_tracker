const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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
    },
    tokens:[{
        token:{
            type: String,
            required:true
        }
    }]
})

tailorSchema.virtual('measurement',{
    ref:'Measure',
    localField:'_id',
    foreignField:'tailor'
})

tailorSchema.methods.toJSON = function(){
    const tailor = this
    const tailorObject = tailor.toObject() 

    delete tailorObject.password
    delete tailorObject.tokens

    return tailorObject
}

tailorSchema.methods.generateAuthToken = async function(){
    const tailor = this
    const token = jwt.sign({ _id: tailor._id.toString() },'measurementTracker')

    tailor.tokens = tailor.tokens.concat({token})
    await tailor.save()
   
    return token
}

//find by credential middleware
tailorSchema.statics.findByCredentials = async(email,password)=>{
    const tailor = await Tailor.findOne({email})

    if(!tailor){
        throw new Error("Unable to login")
    }

    const ismatch = await bcrypt.compare(password,tailor.password)

    if(!ismatch){
        throw new Error("Unable to login")
    }
    return tailor
}


//hash pasword
tailorSchema.pre('save', async function(next){
    const tailor = this

    if(tailor.isModified('password')){
        tailor.password = await bcrypt.hash(tailor.password,8)
        console.log(this.password)


    }
    
    next()
})
const Tailor = mongoose.model('Tailor', tailorSchema)




module.exports = Tailor