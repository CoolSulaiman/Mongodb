
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({

    title:{
        type:String,
        required :true
    },

    price:{
        type : Number,
        required:true
    },

    description:{
        type:String,
        required:true,
    },

    imageUrl:{
        type:String,
        required:true
    },

    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports= mongoose.model('Products' , productSchema)

















// const mongodb = require('mongodb')
// const getDb = require('../util/database').getDb ; 

// class Product {
//   constructor(title ,price ,imageUrl ,description , id ,userId){
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id=id;
//     this.userId = userId;
//   }

//   save(){
//     const db = getDb();
//     let dbOp;
//     if(this._id){
//       //Updaate the product
//       dbOp = db.collection('products')
//       .updateOne({_id : new mongodb.ObjectId(this._id) }, {$set:this})
//     }else{
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//     .then(result=>{
//       console.log(result,"jjj")
//     })
//     .catch(err=>{
//       console.log(err)
//     })
//   }


// static fetchAll() {

//   let db = getDb();

//   return db
//   .collection('products')
//   .find()
//   .toArray()
//   .then(products=>{
//     // console.log(products)
//     return products
//   })
//   .catch(err=>{
//     console.log(err)
//   })
// }


// static findById(proId) {
//   const db = getDb();
//   return db.collection('products')
//   .find({_id:new mongodb.ObjectId(proId)})
//   .next()
//   .then(product =>{
//     console.log(product);
//     return product ;
//   })
//   .catch(err=>{
//     console.log(err)
//   })
// }

// static deleteById(prodId) {
//   const db = getDb();
//   return db.collection("products").deleteOne({_id : new mongodb.ObjectId(prodId) })
//   .then(product =>{
//     console.log(" Product Deleted");
//   })
//   .catch(err=>{
//     console.log(err)
//   })
// }
// }


// module.exports = Product;