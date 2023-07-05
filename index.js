const express=require('express')
require('dotenv').config()
const db=require('./config/db')
const path=require('path')
const purchases=require('./routes/purchases')
const port=process.env.PORT ||7000
const app =express()
// ========================================================== //
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,"./public")))
// ===========================================================//
app.use('/purchase',purchases)

app.get('/',(req,res)=>{
    // console.log('Hello World');
    res.status(200).render('dashboard')
}
)
app.get('/view_purchase',(req,res)=>{
    res.status(200).render('viewPurchase')
})


app.listen(port,console.log(`server starting on http://localhost:${port}`))
