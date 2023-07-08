const express=require('express')
const db=require('../config/db')
const router=express.Router()

// CREATE expense
router.post('/add',async(req,res)=>{
    const {reason,amount}=req.body 
    // console.log(data);
    try {
        await db.collection('expense').doc().set(req.body)
        res.status(201).send('data added')
    } catch (error) {
        console.log(error);
    }
    // res.status(201).send(data);
})

// READ ALL PURCHASE
router.get('/',async(req,res)=>{
    try {
        await db.collection('expense').doc().get()
    } catch (error) {
        console.log(error);
    }
})
// READ SINGLE expense
router.get('/:id',async(req,res)=>{
    const id=req.params.id 
    try {
        const RData=await db.collection('expense').doc(id).get()
        res.status(200).send(RData)
    } catch (error) {
        console.log(error);
    }
})
// UPDATE expense
router.put('/:id',async(req,res)=>{
    const data=req.body 
    const id=req.params.id
    try {
        await db.collection('expense').doc(id).update(data)
        res.status(201).send('data updated')
    } catch (error) {
        console.log(error);
    }
})
// DELETE expense
router.put('/:id',async(req,res)=>{
    const id=req.params.id
    try {
        await db.collection('expense').doc(id).delete()
        res.status(201).send('data deleted')
    } catch (error) {
        console.log(error);
    }
})

module.exports=router