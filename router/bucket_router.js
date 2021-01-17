const express = require('express')
const router = new express.Router()

const bucketCustom = require('./router_custom/bucket_custom')


//routers
router.post('/add', bucketCustom.ADD_BUCKET)
// router.post('/update/:id', bucketCustom.UPDATE_BUCKET)
router.get('/getALL', bucketCustom.GET_ALL_BUCKET)
router.delete('/deleteAll', bucketCustom.DELETE_ALL)




module.exports = router