var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Admin:Admin123@cluster0.8olth.mongodb.net/fbi');
console.log("mongodb connect...")
module.exports=mongoose;