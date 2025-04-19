const mongoose=require('mongoose')
function connecttoMongo(url){
    mongoose.connect(url)
    .then(()=>console.log("Mongodb connection done",url))
    .catch(err => console.error(' MongoDB connection error:', err));
}

module.exports={connecttoMongo}