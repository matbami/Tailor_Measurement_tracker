const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/measurement-tracker-api', {
    
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})