'use strict;'
const express=require('express')
const router=express.Router()
const db=require('../config/db')
const {isAuth,}=require('../config/middleware')
const moment=require('moment')

router.get('/',isAuth,async(req,res)=>{
    try {
        const admindetails=await db.collection('admin').get()
        res.status(200).render('addProduct',{admin:admindetails})
    } catch (error) {
        console.error(error)
    }
})

router.post('/add',async(req,res,next)=>{
    const {productName,size,price}=req.body 
    console.log(req.body);
    const purchaseData={
        'productName':productName,
        'size':size,
        'price':price,
        'date':moment().format('LL')
    }
    try {
        await db.collection('products').doc().set(purchaseData)
        res.status(201).json('data added')
    } catch (error) {
        console.log(error);
    }
})
router.get('/view',async(req,res)=>{
    try {
        const product=await db.collection('products').get()
        const admindetails=await db.collection('admin').get()
        res.status(200).render('viewProducts',{product:product,admin:admindetails})
    } catch (error) {
        console.error(error)
    }
})
router.delete('/delete/:id',async(req,res)=>{
const id=req.params.id 
try {
    await db.collection('products').doc(id).delete()
} catch (error) {
    console.error
}
})

module.exports=router