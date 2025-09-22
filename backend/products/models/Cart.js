const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userID: {type: String},
    productID : {type: String},
    productName: {type: String},
    price: {type: Number},
    image: {type: String}
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart; //export schema