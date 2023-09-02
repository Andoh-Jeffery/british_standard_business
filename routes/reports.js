const express=require('express')
const db=require('../config/db')
const Multer=require('multer')
const {isAuth,calcTotal,}=require('../config/middleware')
const moment=require('moment')
const router=express.Router()

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

router.get('/',isAuth,async(req,res)=>{
    try {
        const purchase=await db.collection('purchase').where("date","==",moment().format('LL')).get()
        // const purchase=await db.collection('purchase').get()
        const expense=await db.collection('expense').where("date","==",moment().format('LL')).get()
        // const expense=await db.collection('expense').get()
        const admindetails=await db.collection('admin').get()
        const expensesCollection = db.collection('expense');
        const purchaseCollection = db.collection('purchase');
        let ex;
        let purch;
        // expensesCollection.get()
        //     .then((querySnapshot) => {
        //         var totalExpense = 0
        //         const valString = querySnapshot.docs.map((doc) => doc.data().amount);
        //         const valInt = valString.map((val) => parseInt(val, 10))
        //         // console.log(valString)
        //         // // Now you have an array of prices
        //         // const final = valInt.reduce((acc, cur) => {
        //         //     return acc + cur
        //         // }, totalExpense)
        //         // const currency=numberWithCommas(final)
        //         // // console.log(currency);
        //         // // console.log(final);
        //         // // console.log(totalExpense);
        //          ex=calcTotal(valInt)
        //     })
        //     .catch((error) => {
        //         console.error('Error getting documents:', error);
        //     });
        // ============================================================================== //
        const querySnapshot = await expensesCollection.get();
        // const querySnapshot =  expense;
        const pricesAsIntegers = querySnapshot.docs.map((doc) => parseInt(doc.data().amount, 10));

        // const querySnapshoot = purchase;  
        const querySnapshoot = await purchaseCollection.get();  
        const purchasepricesAsIntegers = querySnapshoot.docs.map((doc) => parseInt(doc.data().price, 10));
        const fetchData=async()=> {
            try {
            //   const purchasepricesAsIntegers = querySnapshoot.docs.map((doc) => parseInt(doc.data().price, 10));
                ex=await calcTotal(pricesAsIntegers)
                // purch=await calcTotal(purchasepricesAsIntegers)
                return ex;
            } catch (error) {
              console.error('Error getting documents:', error);
            }
          }
          const purchaseData=async()=>{
            try {
                  purch=await calcTotal(purchasepricesAsIntegers)
                  return purch;
              } catch (error) {
                console.error('Error getting documents:', error);
              }
          }
          ex=await fetchData();
          purch=await purchaseData(); 
          const intex=parseInt(ex.replace(/,/g,''),10)
          const intpurch=parseInt(purch.replace(/,/g,''),10)
          
          const firstotal=intex + intpurch
          const total=numberWithCommas(firstotal)

          console.log(total);
          
            res.status(200).render('generateReport', { purchaseData: purchase, expenseData: expense, admin: admindetails, totalExpense: ex ,totalPurchase:purch,subTotal:total,moment:moment})
    } catch (error) {
        console.log(error);
    }
})

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: { fieldSize: 5 * 1024 * 1024 }
})

router.get('/send_mail',multer.single('file'),(req,res)=>{
  const transporter=nodemailer.createTransport({
      service:'gmail',
      auth:{
          user:'ajongbahj@mail.com',
          pass: process.env.PASS
      }
  });
  const mailOptions={
      from:'ajongbaj@gmail.com',
      to:'tagav33058@gienig.com',
      subject:'Report of the day',
      attachments:[{
          filename:Date.now() + 'report',
          content:req.body.file
      }]

  }
  transporter.sendMail(mailOptions,(err,info)=>{
      if(err){
          console.log(err);
      }
      else{
          console.log('mail sent'+ info.response);
          res.send('mail sent')
      }
  })
})






module.exports=router