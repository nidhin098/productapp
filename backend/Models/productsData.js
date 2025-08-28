const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    title:String,
    description:String,
    status:String,
    imageURL:String,
    
    
})
module.exports = mongoose.model('products', userSchema);