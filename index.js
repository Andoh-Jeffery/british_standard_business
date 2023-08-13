const express=require('express')
require('dotenv').config()
const db=require('./config/db')
const bcrypt=require('bcrypt')
const path=require('path')
const session=require('express-session')
const FireStoreStore=require('firestore-store')(session)
const purchases=require('./routes/purchases')
const expenses=require('./routes/expenses')
const reports=require('./routes/reports')
const {isAuth}=require('./config/middleware')
const port=process.env.PORT ||7000
const app =express()
// ========================================================== //
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,"./public")))
// ===========================================================//
const store=new FireStoreStore({
    database:db,
    collection:'session'
})
app.use(
    session({
        secret:'britishBusiness',
        resave:false,
        saveUninitialized:false,
        store:store
    })
)
// ==========================================================//
app.use('/purchase',purchases)
app.use('/expense',expenses)
app.use('/report',reports)

app.get('/',(req,res)=>{
    // console.log('Hello World');
    res.status(200).render('login')
})
app.get('/dashboard',isAuth,async(req,res)=>{
    const admindetails=await db.collection('admin').get()
    // console.log(admindetails);
    // console.log('Hello World');
    res.status(200).render('dashboard',{admin:admindetails})
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password);
    try {
        const user=await db.collection('admin').where("email","==",email).get()
        if(!user.empty){
            console.log('yes');
            user.forEach(async (user)=>{
                const ismatch=await bcrypt.compare(password,user.data().passowrd)
                if (!ismatch){console.log('no match')}
                req.session.isAuth=true
                req.session.isAuthorize='admin'
                res.redirect('/dashboard')
            })
        }
        else{
            console.log('no match');
        }
    } catch (error) {
        
    }
})

app.post('/signUp',async(req,res)=>{
    const {name,phone,email,password}=req.body
    const newPassword=await bcrypt.hash(password,12)
    const signUpObj={
        'name':name,
        'phone':phone,
        'email':email,
        'passowrd':newPassword
    }
    try {
       await db.collection('admin').doc().set(signUpObj) 
       res.json('account created')
    } catch (error) {
        console.log(error);
    }
})

app.get('/logout',(req,res)=>{
    try {
        req.session.destroy(err=>{
            if(err){console.log(err);}
            else{res.redirect('/')}
        });
    } catch (error) {
        console.log(error);
    }
})
// app.get('/view_purchase',(req,res)=>{
//     res.status(200).render('viewPurchase')
// })
// app.get('/add_purchase',(req,res)=>{
//     res.status(200).render('addPurchase')
// })

// app.get('/view_expense',(req,res)=>{
//     res.status(200).render('viewExpense')
// })
// app.get('/add_expense',(req,res)=>{
//     res.status(200).render('addExpense')
// })


app.listen(port,console.log(`server starting on http://localhost:${port}`))
