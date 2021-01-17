const express = require('express')
const router = new express.Router()

const todoCustom = require('./router_custom/todo_custom')


//routers
router.post('/add', todoCustom.ADD_TODO)
router.delete('/delete/:id', todoCustom.DELETE_TODO)
router.post('/update/:id', todoCustom.UPDATE_TODO)
router.get('/getALL', todoCustom.GET_ALL_TODO)
router.delete('/deleteAll', todoCustom.DELETE_ALL)





module.exports = router
