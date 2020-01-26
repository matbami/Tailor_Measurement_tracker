const jwt = require('jsonwebtoken')
const Tailor = require('../Models/Tailor')

const auth = async(req,res,next) =>{
try {
    
    const token = req.header('Authorization').replace('Bearer ','')
    const decoded = jwt.verify(token,'measurementTracker')
    const tailor = await Tailor.findOne({_id:decoded._id,'tokens.token': token})

    if(!tailor){
        throw new Error()
    }
    req.token = token
    req.tailor = tailor
    next()
} catch (e) {
    res.status(401).send({error:"please authenticate"})
}

}

module.exports = auth