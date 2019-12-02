const express = require('express')

const tailorRouter = require('./Routers/Tailor')
const measureRouter = require('./Routers/Measurement')

require('./db/mongoose.js')

const app = express()

const port = process.env.PORT|| 3000

app.use(express.json())

app.use(tailorRouter)
app.use(measureRouter)

app.listen(port, ()=>{
    console.log('Server is up and running on port ' + port);
})