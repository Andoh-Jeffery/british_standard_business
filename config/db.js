const firebase=require('firebase-admin')
const credentials=require('./britishSB.json')

firebase.initializeApp({
    credential:firebase.credential.cert(credentials)
})
const db=firebase.firestore()
module.exports=db;