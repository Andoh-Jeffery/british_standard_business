const express=require('express')
const db=require('../config/db')
const {isAuth,}=require('../config/middleware')
const moment=require('moment')
const router=express.Router()

// CREATE PURCHASE
router.post('/add',async(req,res)=>{

    const {name,quantity,size,price}=req.body 
    const purchaseData={
        'name':name,
        'quantity':quantity,
        'size':size,
        'price':price,
        'date':moment().format('LL')
    }
    try {
        await db.collection('purchase').doc().set(purchaseData)
        res.status(201).send('data added')
    } catch (error) {
        console.log(error);
    }
    // res.status(201).send(data);
})

// READ ALL PURHCASE
router.get('/',isAuth,async(req,res)=>{
    try {
       const productData= await db.collection('products').get()
       const admindetails=await db.collection('admin').get()
        res.render('addPurchase',{product:productData,admin:admindetails})
    } catch (error) {
        console.log(error);
    }
})
// READ ALL PURHCASE
// =================================== //
router.get('/view',isAuth,async(req,res)=>{
    try {
       const purchaseData= await db.collection('purchase').get()
       const admindetails=await db.collection('admin').get()
        res.render('viewPurchase',{Data:purchaseData,admin:admindetails})
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