const express=require('express')
const db=require('../config/db')
const router=express.Router()

// CREATE PURCHASE
router.post('/create',async(req,res)=>{
    const data=req.body 
    try {
        await db.collection('purhase').doc().set(data)
        res.status(201).send('data added')
    } catch (error) {
        console.log(error);
    }
})

// READ PURHCASE
router.get('/',async(req,res)=>{
    try {
        await db.collection('purchase').doc().get()
    } catch (error) {
        console.log(error);
    }
})
// UPDATE PURCHASE
router.put('/:id',async(req,res)=>{
    const data=req.body 
    const id=req.params.id
    try {
        await db.collection('purchase').doc(id).set(data)
        res.status(201).send('data updated')
    } catch (error) {
        console.log(error);
    }
})
// DELETE PURCHASE
router.put('/:id',async(req,res)=>{
    const id=req.params.id
    try {
        await db.collection('purchase').doc(id).delete()
        res.status(201).send('data deleted')
    } catch (error) {
        console.log(error);
    }
})

module.exports=router