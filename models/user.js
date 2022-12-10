
const mongodb = require('mongodb');
// const { use } = require('../routes/admin');
// const Product = require('./product');
const getDb = require('../util/database').getDb ; 

class User {
  constructor(name , email , cart ,id){
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

static findById(userId){
  let db = getDb();
  return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)})
  .then(user=>{
    console.log(user)
    return user
  })
  .catch(err=>{
    console.log(err)
  })
}


// add to cart 
addToCart(product){

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
      {productId: new mongodb.ObjectId(product._id) , quantity:newQuantity})
  }

  

  console.log(cartProductIndex, "sufffffffffff")
const updatedCart = {
  items: updatedCartItem
};
const db = getDb()
return db.collection('users').updateOne({_id :new mongodb.ObjectId(this._id) }, {$set : {cart : updatedCart}})




// const upcart = {items:[{...product , quantity:1}]}
// const db=getDb();
// return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)}, {$set: {cart :upcart}})


}

}


module.exports = User



