const express=require('express')
const router=express.Router()

const {signUp,signIn}=require('./SignIn&Up.js')
const {add,get}=require('./AddAndGet.js')
const {update,del}=require('./UpdAndDel.js')

router.get('/get',get)
router.post('/signUp',signUp)
router.post('/signIn',signIn)
router.post('/add',add)
router.put('/update/:itemId',update)
router.delete('/delete/:itemId',del)

module.exports=router