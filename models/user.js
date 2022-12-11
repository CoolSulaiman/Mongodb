
const mongoose = require('mongoose')
const Schema  = mongoose.Schema;

const userSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    cart:{
        items: [{productId:{type : Schema.Types.ObjectId ,ref:'Products',required:true}
             , quantity :{type:Number,required:true}  }]
    }
})


userSchema.methods.addToCart = function(product){
    
  const cartProductIndex  = this.cart.items.findIndex(cp=>{
    return cp.productId.toString() === product._id.toString();
  })
  const updatedCartItem = [...this.cart.items];

  let newQuantity = 1;
  if(cartProductIndex >= 0){
    newQuantity = this.cart.items[cartProductIndex].quantity +1;
    updatedCartItem[cartProductIndex].quantity =newQuantity
  }else{

    updatedCartItem.push(
      { productId:product._id ,
         quantity:newQuantity
        })
  }

  const updatedCart = {
  items: updatedCartItem
};
this.cart = updatedCart
return this.save()
}


module.exports = mongoose.model('User' , userSchema)



// const req = require('express/lib/request');
// const mongodb = require('mongodb');
// const { getOrders } = require('../controllers/shop');
// // const { use } = require('../routes/admin');
// // const Product = require('./product');\
// const ObjectId = require('mongodb').ObjectId

// const getDb = require('../util/database').getDb ; 
// class User {
//   constructor(name , email , cart ,id){
//     this.name = name;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

// static findById(userId){
//   let db = getDb();
//   return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)})
//   .then(user=>{
//     console.log(user)
//     return user
//   })
//   .catch(err=>{
//     console.log(err)
//   })
// }


// // add to cart 
// addToCart(product){

//   const cartProductIndex  = this.cart.items.findIndex(cp=>{
//     return cp.productId.toString() === product._id.toString();
//   })
//   const updatedCartItem = [...this.cart.items];

//   let newQuantity = 1;
//   if(cartProductIndex >= 0){
//     newQuantity = this.cart.items[cartProductIndex].quantity +1;
//     updatedCartItem[cartProductIndex].quantity =newQuantity
//   }else{

//     updatedCartItem.push(
//       {productId: new mongodb.ObjectId(product._id) , quantity:newQuantity})
//   }

//   const updatedCart = {
//   items: updatedCartItem
// };
// const db = getDb()
// return db.collection('users').updateOne({_id :new mongodb.ObjectId(this._id) }, {$set : {cart : updatedCart}})

// }

// getCart() {
//   const db = getDb();
//   const productIds = this.cart.items.map(i => {
//     return i.productId;
//   });
//   return db
//     .collection('products')
//     .find({ _id: { $in: productIds } })
//     .toArray()
//     .then(products => {
//       return products.map(p => {
//         return {
//           ...p,
//           quantity: this.cart.items.find(i => {
//             return i.productId.toString() === p._id.toString();
//           }).quantity
//         };
//       });
//     });
// }

// deleteItemFromCart(productId) {
//   const updatedCartItems = this.cart.items.filter(item => {
//     return item.productId.toString() !== productId.toString();
//   });
//   const db = getDb();
//   return db
//     .collection('users')
//     .updateOne(
//       { _id: new mongodb.ObjectId(this._id) },
//       { $set: { cart: {items: updatedCartItems} } }
//     );
// }


// addOrder(){
//   const db = getDb();
//   return this.getCart().then(products => {
//     const order = {
//       items : products ,
//       user: {
//         _id: new ObjectId(this._id),
//         name: this.name 
//       }
//     };
//     return db.collection('orders').insertOne(order)
//   })
//   .then(result=>{
//     this.cart = {items:[]};
//     return db.collection('users').updateOne(
//       { _id: new ObjectId(this._id) },
//       { $set: { cart: {items: [] }} }
//     );
//   })
// }


// getOrders(){
// const db = getDb();
// return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray()

// }


// }


// module.exports = User



