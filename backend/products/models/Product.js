const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

//Schema for new cream
const procuctSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    category: {type: String, required: true},
    subCategory: {type: String},
    mfd: {type: Date, required: true},
    exp: {type: Date, required: true},
    weight: {type: Number, required: true},
    sellerID: {type: String, required: true},
    imageLink: {type: String},
    createdAt: {type: Date, required: true}
});

const Product = mongoose.model("Product", procuctSchema);
module.exports = Product; 