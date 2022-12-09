const mongodb =require('mongodb')
const MongoClient = mongodb.MongoClient;


const mongoConnect= (callback) =>{
  MongoClient.connect('mongodb+srv://Skhan:ameensab@cluster0.hhc4rdx.mongodb.net/?retryWrites=true&w=majority')

.then(res=>{
  console.log("Connected")
  callback(res)
})
.catch(err=>{
  console.log(err)
})
};

module.exports = mongoConnect;