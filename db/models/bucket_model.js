const mongoose = require('mongoose')

const Bucket = mongoose.model('bucket',{
    code: String,
    name: {
        type: String,
        required: true,
        trim: true
    },
    marked_as_imp:Boolean,
    details:{},
    date: { type: Date, default: Date.now }
})

module.exports=Bucket