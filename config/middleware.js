const db=require('./db')
const expensesCollection = db.collection('expense');
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const isAuth=(req,res,next)=>{
    if(req.session.isAuth){
        next()
    }
    else{
    res.redirect('/')
    }
}
// const caltotal=(amount)=>{expensesCollection.get()
//             .then((querySnapshot) => {
//                 var totalExpense = 0
//                 const valString = querySnapshot.docs.map((doc) => doc.data().amount);
//                 const valInt = valString.map((val) => parseInt(val, 10))
//                 console.log(valString)
//                 // Now you have an array of prices
//                 const final = valInt.reduce((acc, cur) => {
//                     return acc + cur
//                 }, totalExpense)
//                 const currency=numberWithCommas(final)
//                 // console.log(currency);
//                 // console.log(final);
//                 // res.status(200).render('generateReport', { purchaseData: purchase, expenseData: expense, admin: admindetails, totalExpense: currency })
//                 // console.log(totalExpense);
//                 return currency
//             })
//             .catch((error) => {
//                 console.error('Error getting documents:', error);
//             });
//         }

const calcTotal=async(amount)=>{
    const final=await amount.reduce((acc,cur)=>{
        return acc + cur
    })
    const currency=numberWithCommas(final)
    return currency;
}

module.exports={
    isAuth,
    calcTotal,
    
    
}