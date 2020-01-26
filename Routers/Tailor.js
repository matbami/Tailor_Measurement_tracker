const express = require('express')

const Tailor = require('../Models/Tailor')
const auth = require('../Middleware/auth')

const router = new express.Router()


//tailor creation

router.post('/tailor', async(req,res)=>{
    const tailor = new Tailor(
        req.body
    )

    try {
        await tailor.save()
        const token = await tailor.generateAuthToken()
        res.status(201).send({tailor,token})
    } catch (error) {
        res.status(400).send()
    }
})

//login tailor
router.post('/tailor/login', async(req,res)=>{
    

    try {
        const tailor = await Tailor.findByCredentials(req.body.email,req.body.password)
        const token = await tailor.generateAuthToken()
        
        // console.log(token)
        res.send({tailor,token}) 
    } catch (error) {
        res.status(400).send(error)
    }
})
//logout

router.post('/tailor/logout/', auth , async(req,res)=>{
    try {
        req.tailor.tokens = req.tailor.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.tailor.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/tailor/logoutAll/', auth , async(req,res)=>{
    try {
        req.tailor.tokens = []
            
        
        await req.tailor.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
//read my profile
router.get('/tailor/me',auth,async(req,res)=>{
    res.send(req.tailor)
})




//update tailor
router.patch('/tailors/me', auth,  async(req,res)=>{
    const updates =Object.keys(req.body)
    const allowableUpdates = ['name', 'email', 'phone', 'password']
    const isValidOperation = updates.every((update)=> allowableUpdates.includes(update))
    if(!isValidOperation){
        return res.status(404).send({error:'invaild update'})
    }
    try{

       
     
        updates.forEach((update)=>{
            req.tailor[update] = req.body[update]
        })

        await req.tailor.save()


       

       
        res.status(201).send(req.tailor)
    }catch(e){
        res.status(400).send()
    }
})

//delete tailor

router.delete('/tailors/me', auth, async(req,res)=>{
   
    try {
       
        await req.tailor.remove()
        
        res.status(200).send(req.tailor)
    } catch (error) {
        res.status(500).send()       
    }
})





module.exports = router
