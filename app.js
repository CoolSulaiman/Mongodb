const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const errorController = require('./controllers/error');
const User = require('./models/user')
const Order = require('./models/order')
// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const { use } = require('./routes/admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("63958bf3510e7e7c5d1ad912")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  // next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(()=>{
//   app.listen(3000);
// })

mongoose.connect('mongodb+srv://Skhan:ameensab@cluster0.hhc4rdx.mongodb.net/shop?retryWrites=true&w=majority')
.then((result)=>{
  User.findOne().then((user)=>{
    if(!user){
      const user = new User({
        name:'Dom',
        email:'dom@98',
        cart: {
          items:[]
        }
      });
    user.save()
    }
  })
  
app.listen(3000)
console.log("Connected")
})
.catch(err=>{
  console.log(err)
})