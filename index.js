const express=require('express')
require('dotenv').config()
const db=require('./config/db')
const path=require('path')
const purchases=require('./routes/purchases')
const expenses=require('./routes/expenses')
const reports=require('./routes/reports')
const port=process.env.PORT ||7000
const app =express()
// ========================================================== //
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,"./public")))
// ===========================================================//
app.use('/purchase',purchases)
app.use('/expense',expenses)
app.use('/report',reports)

app.get('/',(req,res)=>{
    // console.log('Hello World');
    res.status(200).render('dashboard')
}
)
app.get('/view_purchase',(req,res)=>{
    res.status(200).render('viewPurchase')
})
app.get('/add_purchase',(req,res)=>{
    res.status(200).render('addPurchase')
})

app.get('/view_expense',(req,res)=>{
    res.status(200).render('viewExpense')
})
app.get('/add_expense',(req,res)=>{
    res.status(200).render('addExpense')
})


app.listen(port,console.log(`server starting on http://localhost:${port}`))
