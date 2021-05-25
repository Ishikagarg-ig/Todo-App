const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema= new Schema({
    name:{
        type:String,
        requires:true
    },
    price:{
        type:Number,
        required:true
    }
},{timestamps:true});

//items
const Item = mongoose.model('Item',itemSchema)

module.exports = Item;