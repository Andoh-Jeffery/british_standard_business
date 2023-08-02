const express=require('express')
const db=require('../config/db')
const router=express.Router()

router.get('/',(req,res)=>{
    try {
        const purchase=db.collection('purchase').doc().get()
        const expense=db.collection('expense').doc().get()
        res.status(200).render('generateReport',{purchaseData:purchase,expenseData:expense})
    } catch (error) {
        console.log(error);
    }    
})






module.exports=router