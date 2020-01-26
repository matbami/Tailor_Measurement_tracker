const express = require("express")

const Measure = require('../Models/Measurement')
const auth = require('../Middleware/auth')

const router = new express.Router()

// create a measurement
router.post('/measure', auth, async(req,res)=>{
    
    const measure =new Measure({
        ...req.body,
        tailor: req.tailor._id

    })
    try {
        await measure.save()
        res.status(201).send(measure)
    } catch (error) {
        res.status(400).send(error)
    }
})



//read all measurement
router.get('/measures',auth,async(req,res)=>{
    try {
        // const measure = await Measure.find({tailor:req.tailor._id}) 
        await req.tailor.populate('measurement').execPopulate()
        res.status(200).send(req.tailor.measurement)
    } catch (error) {
        res.status(400).send(error)
    }
})

//get one measurement
router.get('/measure/:id' ,auth, async(req,res)=>{
    const _id = req.params.id
    try {
        const measure = await Measure.findOne({_id,tailor:req.tailor._id})
        if(!measure){
            res.status(404).send('measurement not found')
        }
        res.status(200).send(measure)
    } catch (error) {
        res.status(400).send()
    }
})

//update measurement
router.patch('/measure/:id', async(req,res)=>{
    const _id = req.params.id

    try {
        const measure = await Measure.findByIdAndUpdate(_id,req.body)
        if(!measure){
            res.status(404).send('measurement not found')
        }
        console.log(measure)
        res.status(200).send(measure)
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})

//delete measurement

router.delete('/measure/:id', async(req,res)=>{
    const _id = req.params.id
    try {
        const measure = await Measure.findByIdAndDelete(_id)
        if(!measure){
            res.status(404).send('measurement not found')
        }
        res.status(200).send(measure)
    } catch (error) {
        res.status(400).send()       
    }
})



module.exports = router