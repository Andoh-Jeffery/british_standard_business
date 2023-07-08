const express=require('express')
const db=require('../config/db')
const router=express.Router()

// CREATE PURCHASE
router.post('/add',async(req,res)=>{
    const {name,quantity,size,price}=req.body 
    try {
        await db.collection('purhase').doc().set(req.body)
        res.status(201).send('data added')
    } catch (error) {
        console.log(error);
    }
    // res.status(201).send(data);
})

// READ ALL PURHCASE
router.get('/',async(req,res)=>{
    try {
        await db.collection('purchase').doc().get()
    } catch (error) {
        console.log(error);
    }
})
// READ SINGLE PURCHASE
router.get('/:id',async(req,res)=>{
    const id=req.params.id 
    try {
        const RData=await db.collection('purchase').doc(id).get()
        res.status(200).send(RData)
    } catch (error) {
        console.log(error);
    }
})
// UPDATE PURCHASE
router.put('/:id',async(req,res)=>{
    const data=req.body 
    const id=req.params.id
    try {
        await db.collection('purchase').doc(id).update(data)
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