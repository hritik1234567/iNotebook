const mongoose=require("mongoose");
const mongoURI="mongodb://localhost:27017/iNotebook";

const connecttomongo=()=>{
    mongoose.connect(mongoURI)
    .then(() => {
      console.log('Connected to MongoDB successfully!');
      // Your code here
    })
    .catch(error => {
      console.error('Connection error:', error.message);
    });
}
module.exports=connecttomongo;