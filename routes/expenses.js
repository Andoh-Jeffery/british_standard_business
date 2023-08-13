const express=require('express')
const db=require('../config/db')
const {isAuth}=require('../config/middleware')
const moment=require('moment')
const router=express.Router()

// CREATE expense
router.post('/add',async(req,res)=>{
    const {reason,amount}=req.body 
    // console.log(data);
    const expenseData={
        'reason':reason,
        'amount':amount,
        'date':moment().format('LL')
    }
    try {
        await db.collection('expense').doc().set(expenseData)
        res.status(201).send('data added')
    } catch (error) {
        console.log(error);
    }
    // res.status(201).send(data);
})

// READ ALL PURCHASE
router.get('/',isAuth,async(req,res)=>{
    try {
        const admindetails=await db.collection('admin').get()
        res.status(200).render('addExpense',{admin:admindetails})
    } catch (error) {
        console.log(error);
    }
})
// READ ALL PURCHASE
router.get('/view',isAuth,async(req,res)=>{
    try {
        const expenceData=await db.collection('expense').get()
        const admindetails=await db.collection('admin').get()
        res.status(200).render('viewExpense',{Data:expenceData,admin:admindetails})
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