const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const buyerReqSchema = new Schema({
    userID: {type: String},
    productsList : {type: Array}, 
    createdAt: {type: Date}, 
    status: {type: String},
    total: {type: Number},
    uName : {type: String},
    uAddress: {type: String},
    uProvince: {type: String},
    uZipCode : {type: String},
    uPhone : {type: String},
    deliveryService: {type: String}
});

const BuyerReq = mongoose.model("BuyerReq", buyerReqSchema);
module.exports = BuyerReq; //export schema
