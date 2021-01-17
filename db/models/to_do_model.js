const mongoose = require('mongoose')

const TODO = mongoose.model('todo',{
    code: String,
    name: {
        type: String,
        required: true,
        trim: true
    },
    bucket_id:String,
    marked:Boolean,
    details:{},
    date: { type: Date, default: Date.now }
})

module.exports=TODO